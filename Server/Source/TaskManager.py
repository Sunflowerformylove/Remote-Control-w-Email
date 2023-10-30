import psutil
import subprocess
import os
import signal

# Hàm này liệt kê các quá trình ra file proc.txt
def print_all_processes():
    count = 1
    # Get a list of currently running processes and their PIDs
    running_proc = [(proc.pid, proc.name()) for proc in psutil.process_iter()]
    # Open the file in write mode
    with open("proc.txt", "w") as file:
        # Write each PID and processes name on a new line
        file.write("No\t\t")
        file.write("Process Name\tPID\n".expandtabs(40))
        for pid, app in running_proc:
            file.write(f"{count}\t\t")
            file.write(f"{app}\t{pid}\n".expandtabs(40))
            count += 1
    print("List of running processes and their PIDs saved to proc.txt.")

# Hàm này liệt kê các ứng dụng đang chạy
def print_all_apps():
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

# Hàm này đóng một ứng dụng đang chạy
def terminate_process(process_id):
    try:
        os.kill(int(process_id), signal.SIGTERM)
        print(f"Process with ID: {process_id} has been terminated.")
    except Exception as e:
        print(f"Unable to terminate process with ID: {process_id}")
        print(f"Error: {str(e)}")

# Hàm này liệt kê các quá trình với trạng thái (running với stopped: ko phản hồi)
def print_status_processes():
    count = 1
    for proc in psutil.process_iter(['pid', 'name', 'status']):
        print(f"{count}.\t".expandtabs(5), end = '')
        # print(f"Name: {proc.info['name']}\tPID: {proc.info['pid']}".expandtabs(48), f"\tStatus: {proc.info['status']}".expandtabs(8))
        print(f"Name: {proc.info['name']}\tStatus: {proc.info['status']}".expandtabs(48))
        count += 1

# Hàm này liệt kê các quá trình theo thứ tự ngốn CPU và RAM
def print_sorted_processes():
    # Lấy danh sách quá trình
    processes = [proc for proc in psutil.process_iter(
        ['pid', 'name', 'cpu_percent', 'memory_percent'])]
    # Sắp xếp theo CPU và RAM
    processes = sorted(processes, key=lambda proc: (
        proc.info['cpu_percent'], proc.info['memory_percent']))
    # In thông tin quá trình
    print('PID'.ljust(6), 'NAME'.ljust(40), 'CPU(%)'.ljust(7), 'RAM(%)')
    for proc in processes:
        memory_percent = '{:.4f}'.format(proc.info['memory_percent'])
        print(str(proc.info['pid']).ljust(6),
              str(proc.info['name']).ljust(40),
              str(proc.info['cpu_percent']).ljust(7),
              memory_percent)

# Gọi hàm ở đây:

# print_all_processes()
# print_all_apps()
# terminate_process(12345)  #Lấy process ID từ hàm print_all_apps() rồi truyền vào
# print_status_processes()
# print_sorted_processes()