param([string]$commitMsgFile)

Write-Host "Commit message validation..."
bun commitlint --edit $commitMsgFile

if ($LASTEXITCODE -ne 0) {
    Write-Host "Commit message invalid. Please fix."
    exit 1
}

Write-Host "Commit message valid according to Conventional Commit"