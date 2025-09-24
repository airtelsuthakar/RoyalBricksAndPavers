# PowerShell script to create a simple HTTP server

$Hso = New-Object Net.HttpListener
$Hso.Prefixes.Add("http://localhost:8000/")
$Hso.Start()

Write-Host "Server started at http://localhost:8000/"
Write-Host "Press Ctrl+C to stop the server"

while ($Hso.IsListening) {
    $HC = $Hso.GetContext()
    $HRes = $HC.Response
    $HReq = $HC.Request
    
    $requestedFile = $HReq.Url.LocalPath.Substring(1)
    
    # If no file is specified, serve index.html
    if ($requestedFile -eq "") {
        $requestedFile = "index.html"
    }
    
    $filePath = Join-Path $PSScriptRoot $requestedFile
    
    if (Test-Path $filePath -PathType Leaf) {
        $contentType = "text/plain"
        
        # Set content type based on file extension
        switch ([System.IO.Path]::GetExtension($filePath)) {
            ".html" { $contentType = "text/html" }
            ".css" { $contentType = "text/css" }
            ".js" { $contentType = "application/javascript" }
            ".json" { $contentType = "application/json" }
            ".png" { $contentType = "image/png" }
            ".jpg" { $contentType = "image/jpeg" }
            ".gif" { $contentType = "image/gif" }
        }
        
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $HRes.ContentType = $contentType
        $HRes.ContentLength64 = $content.Length
        $HRes.OutputStream.Write($content, 0, $content.Length)
    } else {
        $HRes.StatusCode = 404
        $notFoundMessage = "404 - File not found: $requestedFile"
        $content = [System.Text.Encoding]::UTF8.GetBytes($notFoundMessage)
        $HRes.ContentType = "text/plain"
        $HRes.ContentLength64 = $content.Length
        $HRes.OutputStream.Write($content, 0, $content.Length)
    }
    
    $HRes.Close()
}

$Hso.Stop()