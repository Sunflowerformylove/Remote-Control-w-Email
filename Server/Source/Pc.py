import os


def shutdown(sec=0):
    os.system("shutdown /s /t " + str(sec) + " /f")
    return "shutdown"


def restart(sec=0):
    os.system("shutdown /r /t " + str(sec) + " /f")
    return "restart"

def sleep(sec=0):
    os.system("shutdown /h /t " + str(sec) + " /f")