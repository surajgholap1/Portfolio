@echo off
title Portfolio Local Server
echo Starting local web server for Suraj Gholap's Portfolio...
echo.
echo Open in browser: http://localhost:8080
echo Press Ctrl+C to stop.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8080/'); $listener.Start(); Start-Process 'http://localhost:8080/'; while ($listener.IsListening) { $context = $listener.GetContext(); $req = $context.Request; $res = $context.Response; $path = $req.Url.LocalPath.TrimStart('/'); if ([string]::IsNullOrEmpty($path)) { $path = 'index.html' }; $filePath = Join-Path (Get-Location) $path; if (Test-Path $filePath -PathType Leaf) { $bytes = [System.IO.File]::ReadAllBytes($filePath); $ext = [System.IO.Path]::GetExtension($filePath).ToLower(); switch ($ext) { '.html' { $res.ContentType = 'text/html' } '.css' { $res.ContentType = 'text/css' } '.js' { $res.ContentType = 'application/javascript' } '.json' { $res.ContentType = 'application/json' } '.png' { $res.ContentType = 'image/png' } '.jpg' { $res.ContentType = 'image/jpeg' } '.svg' { $res.ContentType = 'image/svg+xml' } default { $res.ContentType = 'application/octet-stream' } }; $res.OutputStream.Write($bytes, 0, $bytes.Length) } else { $res.StatusCode = 404 }; $res.Close() }"
pause
