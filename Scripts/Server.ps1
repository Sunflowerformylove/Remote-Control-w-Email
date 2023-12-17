try{
    Write-Host "Hello from Server.ps1." -ForegroundColor Green
    Write-Host "This script is written with the sole purpose of running the server for the controlled computer." -ForegroundColor Green
    Write-Host "Don't run or execute any scripts you don't trust." -ForegroundColor Red
    Write-Host "This script is safe to run or execute if is downloaded from Github.`nhttps://github.com/Sunflowerformylove/Remote-Control-w-Email" -ForegroundColor Green
    
    $parentPath = Split-Path $PSScriptRoot -Parent
    $port = 5000
    
    $connection = Test-NetConnection -ComputerName "localhost" -Port $port
    
    function Kill-Port($port){
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
    }
    
    Kill-Port $port
    Set-Location -Path $parentPath
    pip3 install -r requirement.txt --quiet
    python Server/Source/Server.py
    
    Write-Host "Server.ps1 is running the server for the Electron app or the React app" -ForegroundColor Green
    Write-Host "Don't close this window" -ForegroundColor Green
    Write-Host "If you want to close the server, make sure to close the RDCVE app and press Ctrl + C" -ForegroundColor Green
    }
    catch {
        Write-Host "An error occurred" -ForegroundColor Red
        Write-Host "The error message is: $_" -ForegroundColor Red
        Write-Host "Do you want to restart the server? (y/n)" -ForegroundColor Yellow
        $res = Read-Host
        if($res -eq "y"){
            cls
            Kill-Port $port
            python Server/Source/Server.py
        }
        else{
            pause
            Read-Host -Prompt "Press Enter to exit"
            exit
        }
    }