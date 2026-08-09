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
Add-Type -AssemblyName System.Net.Http
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$source = (Resolve-Path (Join-Path $root $SourceRoot)).Path
$archive = Join-Path $source "dist\releases\$Version\devops-$Version-linux-x64.tar.gz"
$internalNotes = Join-Path $source "docs\releases\$Version.md"
$publicNotes = Join-Path $root "docs\releases\$Version.md"
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
if (-not (Test-Path -LiteralPath $internalNotes)) { throw "缺少内部正式版本说明：$internalNotes" }
if (-not (Test-Path -LiteralPath $publicNotes)) { throw "缺少官网公开版本说明：$publicNotes" }
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
$githubClient = $null
try {
    $branch = (& git branch --show-current).Trim()
    if ($branch -ne 'master') { throw "正式发布必须在 master 分支执行，当前分支为 $branch。" }

    pnpm install --frozen-lockfile
    if ($LASTEXITCODE -ne 0) { throw 'pnpm install 失败。' }
    $env:AGENTS_PLATFORM_SOURCE_ROOT = $source
    pnpm package
    if ($LASTEXITCODE -ne 0) { throw '官网构建或 package 失败。' }
    if (-not (Test-Path -LiteralPath $siteArchive)) { throw "官网发布包未生成：$siteArchive" }

    Invoke-Git @('add', '-A')
    & git diff --cached --quiet
    if ($LASTEXITCODE -ne 0) {
        Invoke-Git @('commit', '-m', "release: $Version")
    }

    Invoke-Git @('push', 'origin', 'master')
    $remoteTag = (@(& git ls-remote --tags origin "refs/tags/$Version") -join "`n").Trim()
    if ($remoteTag -and -not $Resume) {
        throw "远端 Tag $Version 已存在。正式 Tag 不允许覆盖；仅补传附件时请使用 -Resume。"
    }
    if (-not $remoteTag) {
        Invoke-Git @('tag', '-a', $Version, '-m', "Agents Platform $Version")
        Invoke-Git @('push', 'origin', "refs/tags/$Version")
    }

    $githubClient = [System.Net.Http.HttpClient]::new()
    $githubClient.Timeout = [TimeSpan]::FromMinutes(30)
    $githubClient.DefaultRequestHeaders.Authorization = [System.Net.Http.Headers.AuthenticationHeaderValue]::new('Bearer', $env:GITHUB_TOKEN)
    $githubClient.DefaultRequestHeaders.Accept.ParseAdd('application/vnd.github+json')
    $githubClient.DefaultRequestHeaders.UserAgent.ParseAdd('agents-platform-release-script')
    $githubClient.DefaultRequestHeaders.Add('X-GitHub-Api-Version', '2022-11-28')
    $releaseUri = "https://api.github.com/repos/$Repository/releases/tags/$Version"

    function Get-GitHubRelease {
        $response = $githubClient.GetAsync($releaseUri).GetAwaiter().GetResult()
        try {
            if ([int]$response.StatusCode -eq 404) { return $null }
            if (-not $response.IsSuccessStatusCode) {
                $detail = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
                throw "读取 GitHub Release 失败：$([int]$response.StatusCode) $detail"
            }
            $json = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
            return $json | ConvertFrom-Json
        } finally {
            $response.Dispose()
        }
    }

    $release = Get-GitHubRelease
    if ($null -ne $release -and -not $Resume) {
        throw "GitHub Release $Version 已存在。正式 Release 不允许覆盖；仅补传附件时请使用 -Resume。"
    }
    if ($null -eq $release) {
        $publicReleaseBody = [System.IO.File]::ReadAllText($publicNotes, [System.Text.Encoding]::UTF8)
        $bodyObject = @{
            tag_name = $Version
            target_commitish = 'master'
            name = "Agents Platform $Version"
            body = $publicReleaseBody
            draft = $false
            prerelease = $false
        }
        $body = $bodyObject | ConvertTo-Json
        $roundTripBody = ($body | ConvertFrom-Json).body
        if ($roundTripBody -isnot [string] -or $roundTripBody -cne $publicReleaseBody) {
            throw 'GitHub Release 正文 JSON 往返校验失败，禁止创建 Release。'
        }
        $content = [System.Net.Http.StringContent]::new($body, [System.Text.UTF8Encoding]::new($false), 'application/json')
        $response = $null
        try {
            $response = $githubClient.PostAsync("https://api.github.com/repos/$Repository/releases", $content).GetAwaiter().GetResult()
            if (-not $response.IsSuccessStatusCode) {
                $detail = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
                throw "创建 GitHub Release 失败：$([int]$response.StatusCode) $detail"
            }
            $release = ($response.Content.ReadAsStringAsync().GetAwaiter().GetResult()) | ConvertFrom-Json
        } finally {
            if ($response) { $response.Dispose() }
            $content.Dispose()
        }
    }

    $releaseFiles = @($archive, $publicNotes, $siteArchive)
    $existingNames = @($release.assets | ForEach-Object { $_.name })
    $uploadBase = $release.upload_url -replace '\{\?name,label\}$', ''
    foreach ($file in $releaseFiles) {
        $name = [System.IO.Path]::GetFileName($file)
        if ($existingNames -contains $name) {
            Write-Host "附件已存在，跳过：$name"
            continue
        }
        $uploadUri = '{0}?name={1}' -f $uploadBase, [uri]::EscapeDataString($name)
        $stream = [System.IO.File]::OpenRead($file)
        $request = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::Post, $uploadUri)
        $request.Headers.ExpectContinue = $false
        $request.Content = [System.Net.Http.StreamContent]::new($stream)
        $request.Content.Headers.ContentType = [System.Net.Http.Headers.MediaTypeHeaderValue]::new('application/octet-stream')
        $request.Content.Headers.ContentLength = $stream.Length
        Write-Host "正在上传：$name"
        $response = $null
        try {
            $response = $githubClient.SendAsync($request, [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead).GetAwaiter().GetResult()
            if (-not $response.IsSuccessStatusCode) {
                $detail = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
                throw "上传 GitHub Release 附件失败：$name $([int]$response.StatusCode) $detail"
            }
        } finally {
            if ($response) { $response.Dispose() }
            $request.Dispose()
            $stream.Dispose()
        }
    }

    $verifiedRelease = Get-GitHubRelease
    $expectedBody = [System.IO.File]::ReadAllText($publicNotes, [System.Text.Encoding]::UTF8)
    if ($verifiedRelease.body -isnot [string] -or $verifiedRelease.body -cne $expectedBody) {
        throw 'GitHub Release 正文与客户版说明不一致。'
    }
    $expectedAssets = @{}
    foreach ($file in $releaseFiles) {
        $expectedAssets[[System.IO.Path]::GetFileName($file)] = Get-Item -LiteralPath $file
    }
    foreach ($name in $expectedAssets.Keys) {
        $asset = @($verifiedRelease.assets | Where-Object { $_.name -eq $name })
        if ($asset.Count -ne 1) { throw "GitHub Release 附件数量异常：$name（实际 $($asset.Count)）" }
        if ($asset[0].state -ne 'uploaded') { throw "GitHub Release 附件尚未上传完成：$name" }
        if ([long]$asset[0].size -ne [long]$expectedAssets[$name].Length) {
            throw "GitHub Release 附件大小不一致：$name"
        }
    }

    $tempRoot = [System.IO.Path]::GetFullPath([System.IO.Path]::GetTempPath()).TrimEnd('\') + '\'
    $verificationDir = [System.IO.Path]::GetFullPath((Join-Path $tempRoot "agents-platform-release-$Version-$([guid]::NewGuid().ToString('N'))"))
    if (-not $verificationDir.StartsWith($tempRoot, [StringComparison]::OrdinalIgnoreCase)) {
        throw "GitHub Release 验收目录不在系统临时目录内：$verificationDir"
    }
    New-Item -ItemType Directory -Path $verificationDir | Out-Null
    try {
        foreach ($file in $releaseFiles) {
            $name = [System.IO.Path]::GetFileName($file)
            $asset = @($verifiedRelease.assets | Where-Object { $_.name -eq $name })[0]
            $downloaded = Join-Path $verificationDir $name
            Write-Host "正在回读验收：$name"
            $input = $null
            $output = $null
            try {
                $input = $githubClient.GetStreamAsync($asset.browser_download_url).GetAwaiter().GetResult()
                $output = [System.IO.File]::Create($downloaded)
                $input.CopyTo($output)
            } finally {
                if ($output) { $output.Dispose() }
                if ($input) { $input.Dispose() }
            }
            $localHash = (Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash
            $remoteHash = (Get-FileHash -LiteralPath $downloaded -Algorithm SHA256).Hash
            if ($localHash -cne $remoteHash) { throw "GitHub Release 附件回读摘要不一致：$name" }
            if ($name.EndsWith('.tar.gz', [StringComparison]::OrdinalIgnoreCase)) {
                & tar -tzf $downloaded *> $null
                if ($LASTEXITCODE -ne 0) { throw "GitHub Release 远端压缩包无法完整读取：$name" }
            }
        }
    } finally {
        if (Test-Path -LiteralPath $verificationDir) {
            Remove-Item -LiteralPath $verificationDir -Recurse -Force
        }
    }
    Write-Host "正式发布和远端回读验收完成：https://github.com/$Repository/releases/tag/$Version"
} finally {
    if ($githubClient) { $githubClient.Dispose() }
    Pop-Location
}
