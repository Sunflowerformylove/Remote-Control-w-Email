import subprocess
import TerminateTask

count = -1

cmd = 'powershell "gps | where {$_.MainWindowTitle } | select Description,Id"'
proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
for line in proc.stdout:
    if not line.decode()[0].isspace():
        # only print lines that are not empty
        # decode() is necessary to get rid of the binary string (b')
        # rstrip() to remove `\r\n`
        line = line.decode().rstrip()
        if count <= 0:
            print(f"\t{line}")
        else:
            print(f"{count}\t{line}")
        count += 1
        
# terminate task
id = int(input("\nEnter the ID of the process you want to terminate: "))
TerminateTask.terminate_process(id)