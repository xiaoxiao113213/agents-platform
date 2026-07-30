[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [string]$Action = 'status',
    [Alias('h')]
    [switch]$Help
)

$ErrorActionPreference = 'Stop'
$script:Root = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$script:RuntimeDir = Join-Path $script:Root '.runtime\agents-platform-local'
$script:PidFile = Join-Path $script:RuntimeDir 'service.pid'
$script:OutLog = Join-Path $script:RuntimeDir 'stdout.log'
$script:ErrLog = Join-Path $script:RuntimeDir 'stderr.log'
$script:Port = 5175
$script:HealthUrl = "http://localhost:$($script:Port)/"

function Show-Help {
    @(
        'Agents Platform 本地服务管理',
        '',
        '用法：',
        '  powershell -ExecutionPolicy Bypass -File scripts/local/service.ps1 <命令>',
        '',
        '命令：',
        '  start     启动 Vite 开发服务，默认监听 5175',
        '  restart   停止当前脚本管理的服务后重新启动',
        '  stop      只停止 PID 文件记录的服务及其子进程',
        '  status    显示 PID、端口归属、健康状态和日志位置',
        '  health    探测 http://localhost:5175/，成功退出码为 0',
        '  logs      持续查看 stdout/stderr 日志，按 Ctrl+C 退出',
        '  -h        显示本帮助',
        '',
        '端口处理：',
        '  若 5175 被外部进程占用，脚本不会终止该进程。请先停止占用者，或同时修改',
        '  package.json 中的 dev 端口、脚本中的 Port 与健康地址，再重新启动。'
    ) -join [Environment]::NewLine
}

function Get-RecordedPid {
    if (-not (Test-Path -LiteralPath $script:PidFile)) { return $null }
    $value = (Get-Content -LiteralPath $script:PidFile -Raw).Trim()
    if ($value -notmatch '^\d+$') { return $null }
    return [int]$value
}

function Get-ListeningOwnerPid {
    try {
        $connection = Get-NetTCPConnection -State Listen -LocalPort $script:Port -ErrorAction Stop |
            Select-Object -First 1
        if ($null -eq $connection) { return $null }
        return [int]$connection.OwningProcess
    } catch {
        return $null
    }
}

function Test-ProcessAlive([int]$ProcessId) {
    return $null -ne (Get-Process -Id $ProcessId -ErrorAction SilentlyContinue)
}

function Test-IsDescendant([int]$ProcessId, [int]$AncestorId) {
    $current = $ProcessId
    for ($depth = 0; $depth -lt 12; $depth++) {
        if ($current -eq $AncestorId) { return $true }
        $item = Get-CimInstance Win32_Process -Filter "ProcessId = $current" -ErrorAction SilentlyContinue
        if ($null -eq $item -or [int]$item.ParentProcessId -le 0) { return $false }
        $current = [int]$item.ParentProcessId
    }
    return $false
}

function Test-Healthy {
    try {
        $response = Invoke-WebRequest -Uri $script:HealthUrl -UseBasicParsing -TimeoutSec 3
        return $response.StatusCode -ge 200 -and $response.StatusCode -lt 400
    } catch {
        return $false
    }
}

function Show-Status {
    $recordedPid = Get-RecordedPid
    $ownerPid = Get-ListeningOwnerPid
    $alive = $null -ne $recordedPid -and (Test-ProcessAlive $recordedPid)
    $managed = $alive -and $null -ne $ownerPid -and (Test-IsDescendant $ownerPid $recordedPid)
    $healthy = Test-Healthy
    [pscustomobject]@{
        service = 'agents-platform'
        port = $script:Port
        url = $script:HealthUrl
        pidFile = $script:PidFile
        recordedPid = $recordedPid
        portOwnerPid = $ownerPid
        managed = $managed
        healthy = $healthy
        outLog = $script:OutLog
        errLog = $script:ErrLog
    } | Format-List

    if ($null -ne $ownerPid -and -not $managed) {
        $owner = Get-CimInstance Win32_Process -Filter "ProcessId = $ownerPid" -ErrorAction SilentlyContinue
        Write-Warning "端口 $($script:Port) 被外部进程占用，脚本不会停止它。PID=$ownerPid，命令=$($owner.CommandLine)"
    }
}

function Stop-ManagedTree {
    $recordedPid = Get-RecordedPid
    if ($null -eq $recordedPid -or -not (Test-ProcessAlive $recordedPid)) {
        if (Test-Path -LiteralPath $script:PidFile) { Remove-Item -LiteralPath $script:PidFile -Force }
        Write-Host 'Agents Platform 本地服务未运行。'
        return
    }

    $all = Get-CimInstance Win32_Process
    $childrenByParent = @{}
    foreach ($item in $all) {
        $parent = [int]$item.ParentProcessId
        if (-not $childrenByParent.ContainsKey($parent)) { $childrenByParent[$parent] = @() }
        $childrenByParent[$parent] += [int]$item.ProcessId
    }

    $ordered = New-Object System.Collections.Generic.List[int]
    function Add-Children([int]$ParentId) {
        if (-not $childrenByParent.ContainsKey($ParentId)) { return }
        foreach ($childId in $childrenByParent[$ParentId]) {
            Add-Children $childId
            $ordered.Add($childId)
        }
    }
    Add-Children $recordedPid
    foreach ($processId in $ordered) {
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
    }
    Stop-Process -Id $recordedPid -Force -ErrorAction SilentlyContinue
    Remove-Item -LiteralPath $script:PidFile -Force -ErrorAction SilentlyContinue
    Write-Host 'Agents Platform 本地服务已停止。'
}

function Start-ServiceProcess {
    New-Item -ItemType Directory -Force -Path $script:RuntimeDir | Out-Null
    $recordedPid = Get-RecordedPid
    $ownerPid = Get-ListeningOwnerPid
    if ($null -ne $recordedPid -and (Test-ProcessAlive $recordedPid)) {
        if (Test-Healthy) {
            Write-Host "Agents Platform 已运行：$($script:HealthUrl)"
            Show-Status
            return
        }
        throw "PID 文件记录的进程仍在运行但健康检查失败。请执行 scripts/local/service.ps1 logs 查看日志，或执行 restart。"
    }
    if ($null -ne $ownerPid) {
        $owner = Get-CimInstance Win32_Process -Filter "ProcessId = $ownerPid" -ErrorAction SilentlyContinue
        throw "端口 $($script:Port) 已被外部进程占用，PID=$ownerPid，命令=$($owner.CommandLine)。脚本不会停止外部进程；请先处理占用，或同步修改开发端口和健康地址。"
    }

    $pnpm = (Get-Command pnpm.cmd -ErrorAction Stop).Source
    $process = Start-Process -FilePath $pnpm -ArgumentList @('dev') -WorkingDirectory $script:Root `
        -RedirectStandardOutput $script:OutLog -RedirectStandardError $script:ErrLog -WindowStyle Hidden -PassThru
    Set-Content -LiteralPath $script:PidFile -Value $process.Id -Encoding ascii

    for ($attempt = 0; $attempt -lt 30; $attempt++) {
        Start-Sleep -Milliseconds 500
        if (Test-Healthy) {
            Write-Host "Agents Platform 已启动：$($script:HealthUrl)"
            return
        }
        if (-not (Test-ProcessAlive $process.Id)) { break }
    }
    throw "服务未在 15 秒内就绪。请查看 $($script:OutLog) 和 $($script:ErrLog)。"
}

function Show-Logs {
    New-Item -ItemType Directory -Force -Path $script:RuntimeDir | Out-Null
    if (-not (Test-Path -LiteralPath $script:OutLog)) { New-Item -ItemType File -Path $script:OutLog | Out-Null }
    if (-not (Test-Path -LiteralPath $script:ErrLog)) { New-Item -ItemType File -Path $script:ErrLog | Out-Null }
    Write-Host "stdout: $($script:OutLog)"
    Write-Host "stderr: $($script:ErrLog)"
    Get-Content -LiteralPath $script:OutLog, $script:ErrLog -Tail 80 -Wait
}

if ($Help -or $Action -in @('-h', '--help', 'help')) {
    Show-Help
    exit 0
}

switch ($Action.ToLowerInvariant()) {
    'start' { Start-ServiceProcess }
    'restart' { Stop-ManagedTree; Start-ServiceProcess }
    'stop' { Stop-ManagedTree }
    'status' { Show-Status }
    'health' {
        if (Test-Healthy) { Write-Host "健康：$($script:HealthUrl)"; exit 0 }
        Write-Error "不可用：$($script:HealthUrl)"
        exit 1
    }
    'logs' { Show-Logs }
    default { Show-Help; throw "未知命令：$Action" }
}
