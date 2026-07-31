[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^v\d+\.\d+\.\d+$')]
    [string]$Version,
    [string]$SourceRoot = '..',
    [string]$Repository = 'xiaoxiao113213/agents-platform',
    [switch]$Resume
)

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$source = (Resolve-Path (Join-Path $root $SourceRoot)).Path
$archive = Join-Path $source "dist\releases\$Version\devops-$Version-linux-x64.tar.gz"
$notes = Join-Path $source "docs\releases\$Version.md"
$siteArchive = Join-Path $root "package\agents-platform-site-$Version.tar.gz"
$maxAssetBytes = 2GB

function Invoke-Git([string[]]$Arguments) {
    & git @Arguments
    if ($LASTEXITCODE -ne 0) { throw "git 命令失败：git $($Arguments -join ' ')" }
}

if (-not $env:GITHUB_TOKEN) {
    throw '缺少 GITHUB_TOKEN。请设置具有 agents-platform 仓库 Contents 写权限的 Token。'
}
if (-not (Test-Path -LiteralPath $archive)) { throw "缺少正式 Linux 发布包：$archive" }
if (-not (Test-Path -LiteralPath $notes)) { throw "缺少正式版本说明：$notes" }
if ((Get-Item -LiteralPath $archive).Length -ge $maxAssetBytes) {
    throw "正式包达到或超过 GitHub 单附件 2 GiB 上限：$archive。请先降低发布包体积或设计分片交付，不要增加哈希文件。"
}

$packageJson = Get-Content -LiteralPath (Join-Path $root 'package.json') -Raw | ConvertFrom-Json
if ("v$($packageJson.version)" -ne $Version) {
    throw "package.json 版本 v$($packageJson.version) 与目标版本 $Version 不一致。"
}
$releaseSource = Get-Content -LiteralPath (Join-Path $root 'src\content\releases.ts') -Raw
$stablePattern = "version:\s*'$([regex]::Escape($Version))'[\s\S]{0,400}?status:\s*'stable'"
if ($releaseSource -notmatch $stablePattern) {
    throw "src/content/releases.ts 未登记目标正式版本 $Version。"
}

Push-Location $root
try {
    $branch = (& git branch --show-current).Trim()
    if ($branch -ne 'master') { throw "正式发布必须在 master 分支执行，当前分支为 $branch。" }

    pnpm install --frozen-lockfile
    if ($LASTEXITCODE -ne 0) { throw 'pnpm install 失败。' }
    pnpm package
    if ($LASTEXITCODE -ne 0) { throw '官网构建或 package 失败。' }
    if (-not (Test-Path -LiteralPath $siteArchive)) { throw "官网发布包未生成：$siteArchive" }

    Invoke-Git @('add', '-A')
    & git diff --cached --quiet
    if ($LASTEXITCODE -ne 0) {
        Invoke-Git @('commit', '-m', "release: $Version")
    }

    Invoke-Git @('push', '--force-with-lease', 'origin', 'master')
    $remoteTag = (@(& git ls-remote --tags origin "refs/tags/$Version") -join "`n").Trim()
    if ($remoteTag -and -not $Resume) {
        throw "远端 Tag $Version 已存在。正式 Tag 不允许覆盖；仅补传附件时请使用 -Resume。"
    }
    if (-not $remoteTag) {
        Invoke-Git @('tag', '-a', $Version, '-m', "Agents Platform $Version")
        Invoke-Git @('push', 'origin', "refs/tags/$Version")
    }

    $headers = @{
        Authorization = "Bearer $($env:GITHUB_TOKEN)"
        Accept = 'application/vnd.github+json'
        'X-GitHub-Api-Version' = '2022-11-28'
        'User-Agent' = 'agents-platform-release-script'
    }
    $releaseUri = "https://api.github.com/repos/$Repository/releases/tags/$Version"
    $release = $null
    try {
        $release = Invoke-RestMethod -Method Get -Uri $releaseUri -Headers $headers
        if (-not $Resume) { throw "GitHub Release $Version 已存在。正式 Release 不允许覆盖；仅补传附件时请使用 -Resume。" }
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -ne 404) { throw }
    }
    if ($null -eq $release) {
        $body = @{
            tag_name = $Version
            target_commitish = 'master'
            name = "Agents Platform $Version"
            body = Get-Content -LiteralPath $notes -Raw
            draft = $false
            prerelease = $false
        } | ConvertTo-Json
        $release = Invoke-RestMethod -Method Post -Uri "https://api.github.com/repos/$Repository/releases" -Headers $headers -ContentType 'application/json' -Body $body
    }

    $existingNames = @($release.assets | ForEach-Object { $_.name })
    $uploadBase = $release.upload_url -replace '\{\?name,label\}$', ''
    foreach ($file in @($archive, $siteArchive)) {
        $name = [System.IO.Path]::GetFileName($file)
        if ($existingNames -contains $name) {
            Write-Host "附件已存在，跳过：$name"
            continue
        }
        $encodedName = [uri]::EscapeDataString($name)
        Write-Host "正在上传：$name"
        Invoke-WebRequest -Method Post -Uri "$uploadBase`?name=$encodedName" -Headers $headers -ContentType 'application/octet-stream' -InFile $file | Out-Null
    }
    Write-Host "正式发布完成：https://github.com/$Repository/releases/tag/$Version"
} finally {
    Pop-Location
}
