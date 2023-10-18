import subprocess

def runShellCommand(command):
    result = subprocess.run([command], shell=True, check=True, capture_output=True, timeout=60, text=True)
    if result.returncode != 0:
        return result.stderr
    return result.stdout

def runShellCommandWithArgs(command, args):
    result = subprocess.run([command, args], shell=True, check=True, capture_output=True, timeout=60, text=True)
    if result.returncode != 0:
        return result.stderr
    return result.stdout

def runPythonScript(script):
    result = subprocess.run(["python", script], shell=True, check=True, capture_output=True, timeout=60, text=True)
    if result.returncode != 0:
        return result.stderr
    return result.stdout

def runPythonScriptWithArgs(script, args):
    result = subprocess.run(["python", script, args], shell=True, check=True, capture_output=True, timeout=60, text=True)
    if result.returncode != 0:
        return result.stderr
    return result.stdout