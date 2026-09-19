# Command Code zh-CN patch uninstaller: restore pristine index.html and remove zh.js
$renderer = Join-Path $env:LOCALAPPDATA "Programs\Command Code\resources\app\out\renderer"
if (-not (Test-Path $renderer)) { Write-Output "ERROR: renderer dir not found."; exit 1 }

if (Test-Path "$renderer\index.html.orig") {
  Move-Item "$renderer\index.html.orig" "$renderer\index.html" -Force
  Write-Output "Restored original index.html."
} else {
  # fallback: just strip the injected tag
  $h = "$renderer\index.html"
  $c = [IO.File]::ReadAllText($h) -replace '<script src=`"\./zh\.js`" defer></script>', ''
  [IO.File]::WriteAllText($h, $c)
  Write-Output "Removed script tag (no .orig backup found)."
}
Remove-Item "$renderer\zh.js" -Force -ErrorAction SilentlyContinue
Write-Output "OK: patch removed. Restart Command Code."
