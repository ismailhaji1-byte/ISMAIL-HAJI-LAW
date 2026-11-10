[CmdletBinding(SupportsShouldProcess=$true)]
param()
$ErrorActionPreference = 'Stop'
$previewWorkspace = Split-Path -Parent $PSScriptRoot
$previewStatePath = Join-Path $previewWorkspace 'artifacts\public-preview-process.json'
if (-not (Test-Path -LiteralPath $previewStatePath)) {
    Write-Output 'No public preview process is recorded.'
    return
}
$previewState = Get-Content -LiteralPath $previewStatePath -Raw | ConvertFrom-Json
$previewTunnel = Get-Process -Id $previewState.pid -ErrorAction SilentlyContinue
if (-not $previewTunnel) {
    Write-Output 'The public preview is already stopped.'
    return
}
$expectedPreviewExe = Join-Path $previewWorkspace 'tools\cloudflared.exe'
$recordedPreviewStart = ([DateTimeOffset] $previewState.processStartedUtc).UtcDateTime
if ($previewTunnel.Path -ne $expectedPreviewExe -or
    [Math]::Abs(($previewTunnel.StartTime.ToUniversalTime() - $recordedPreviewStart).TotalSeconds) -gt 1) {
    throw 'The process identity has changed. Nothing was stopped.'
}
if ($PSCmdlet.ShouldProcess('ismaillaw public preview tunnel', 'Stop')) {
    Stop-Process -Id $previewTunnel.Id
    Write-Output 'Public preview stopped. The local website remains available at http://127.0.0.1:4173/en/.'
}
