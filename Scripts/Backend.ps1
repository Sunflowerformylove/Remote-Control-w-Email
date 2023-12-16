Write-Host "Hello from Backend.ps1" -ForegroundColor Green
Write-Host "This script is written with the sole purpose of running the server for the Electron app or the React app" -ForegroundColor Green
Write-Host "It is not meant to be run on its own" -ForegroundColor Green
Write-Host "Don't run or execute any scripts you don't trust" -ForegroundColor Red

$parentPath = Split-Path $PSScriptRoot -Parent
$backendPath = Join-Path $parentPath "Backend"
$port = 3001

$connection = Test-NetConnection -ComputerName "localhost" -Port $port

if ($connection.TcpTestSucceeded) {
    Write-Host "Port $port is already in use" -ForegroundColor Red
    Write-Host "Do you want to kill the process that is using port $port? (y/n)" -ForegroundColor Yellow

    do {
        $answer = Read-Host
    } while ($answer -ne "y" -and $answer -ne "n")

    if ($answer -eq "y") {
        $process = Get-Process -Id (Get-NetTCPConnection -LocalPort $port).OwningProcess
        $process | Stop-Process -Force
        Write-Host "The process that was using port $port has been killed" -ForegroundColor Green
    }
    else {
        Write-Host "The process that was using port $port has not been killed" -ForegroundColor Red
        Write-Host "The server will not be started" -ForegroundColor Red
        pause
        exit
    }
}

Set-Location -Path $backendPath
node --no-deprecation ./dist/bundle.js

Write-Host "Backend.ps1 is running the server for the Electron app or the React app" -ForegroundColor Green
Write-Host "Don't close this window" -ForegroundColor Green
Write-Host "If you want to close the server, close the Electron app or the React app" -ForegroundColor Green