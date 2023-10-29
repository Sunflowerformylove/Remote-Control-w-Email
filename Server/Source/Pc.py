import os
import time

def shutdown(sec=0):
    os.system("shutdown /s /t " + str(sec) + " /f")
    return "shutdown"


def restart(sec=0):
    os.system("shutdown /r /t " + str(sec) + " /f")
    return "restart"

def sleep(sec=0):
    time.sleep(sec)
    os.system("rundll32.exe powrprof.dll,SetSuspendState 0,1,0")