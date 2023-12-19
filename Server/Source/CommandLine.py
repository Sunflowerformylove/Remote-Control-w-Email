import ctypes, sys
import subprocess

def isUserAdmin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False
    
def splitCommand(command):
    return command.split(" ")

def runShellCommand(command):
    command = splitCommand(command)
    if not isUserAdmin():
        ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, " ".join(sys.argv), None, 1)
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, timeout=60, text=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        return e.stderr