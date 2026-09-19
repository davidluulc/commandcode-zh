# Command Code zh-CN patch installer (portable version)
# Usage: run in PowerShell after Command Code desktop is installed.
$renderer = Join-Path $env:LOCALAPPDATA "Programs\Command Code\resources\app\out\renderer"
$src = Join-Path $PSScriptRoot "zh.js"

if (-not (Test-Path $renderer)) { Write-Output "ERROR: Command Code renderer dir not found. Is the desktop app installed?"; exit 1 }
if (-not (Test-Path $src)) { Write-Output "ERROR: zh.js missing next to this script."; exit 1 }

# 1) backup pristine index.html (first run only)
if ((Test-Path "$renderer\index.html") -and -not (Test-Path "$renderer\index.html.orig")) {
  Copy-Item "$renderer\index.html" "$renderer\index.html.orig"
  Write-Output "Backup saved: index.html.orig"
}

# 2) install the translation layer
Copy-Item $src "$renderer\zh.js" -Force

# 3) inject the script tag if absent
$h = "$renderer\index.html"
$c = [IO.File]::ReadAllText($h)
if ($c -notmatch 'zh\.js') {
  $c = $c.Replace("</body>", "<script src=`"./zh.js`" defer></script></body>")
  [IO.File]::WriteAllText($h, $c)
}

if (([IO.File]::ReadAllText($h)) -match 'zh\.js') {
  Write-Output "OK: Chinese patch installed. Fully quit and restart Command Code."
} else {
  Write-Output "FAIL: could not patch index.html."
}
