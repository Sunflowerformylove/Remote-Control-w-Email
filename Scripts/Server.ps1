try{
    Write-Host "Hello from Server.ps1." -ForegroundColor Green
    Write-Host "This script is written with the sole purpose of running the server for the controlled computer." -ForegroundColor Green
    Write-Host "Don't run or execute any scripts you don't trust." -ForegroundColor Red
    Write-Host "This script is safe to run or execute if is downloaded from Github.`nhttps://github.com/Sunflowerformylove/Remote-Control-w-Email" -ForegroundColor Green
    
    $parentPath = Split-Path $PSScriptRoot -Parent

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
            python Server/Source/Server.py
        }
        else{
            pause
            Read-Host -Prompt "Press Enter to exit"
            exit
        }
    }