import os


sec = 300  # 5 minutes


def shutdowm():
    os.system("shutdown -s -t {sec}")
    return "shutdown"


def restart():
    os.system("shutdown -r -t {sec}")
    return "restart"

# sleep mode


def sleep():
    os.system("shutdown -h -t {sec}")
