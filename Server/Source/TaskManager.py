import psutil
import subprocess
import os
import signal

def get_processes_list():
    processes = [(proc.pid, proc.name()) for proc in psutil.process_iter()]
    processes_str = "\n".join([f"PID: {pid}, Name: {name}" for pid, name in processes])
    return processes_str

def get_running_apps():
    running_apps = []
    cmd = 'powershell "gps | where {$_.MainWindowTitle } | select Description,Id"'
    proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
    for line in proc.stdout:
        if not line.decode()[0].isspace():
            line = line.decode().rstrip()
            running_apps.append(line)
    running_apps_str = "\n".join(running_apps)
    return running_apps_str

def terminate_process(process_id):
    try:
        os.kill(int(process_id), signal.SIGTERM)
        return f"Process with ID: {process_id} has been terminated."
    except Exception as e:
        return f"Unable to terminate process with ID: {process_id}\nError: {str(e)}"

def get_processes_with_status():
    processes_status = []
    for proc in psutil.process_iter(['pid', 'name', 'status']):
        process_info = f"Name: {proc.info['name']}\tStatus: {proc.info['status']}"
        processes_status.append(process_info)
    processes_status_str = "\n".join(processes_status)
    return processes_status_str

def get_sorted_processes():
    processes = [proc.info for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent'])]
    sorted_processes = sorted(processes, key=lambda proc: (proc['cpu_percent'], proc['memory_percent']))
    sorted_processes_str = ""
    for proc in sorted_processes:
        memory_percent = '{:.4f}'.format(proc['memory_percent'])
        sorted_processes_str += f"{str(proc['pid'])}\t{str(proc['name'])}\t{str(proc['cpu_percent'])}\t{memory_percent}\n"
    return sorted_processes_str

# # Example usage:
# processes_list = get_processes_list()
# print(processes_list)

# running_apps = get_running_apps()
# for app in running_apps:
#     print(app)

# result = terminate_process(12345)  # Replace 12345 with the desired process ID
# print(result)

# processes_status = get_processes_with_status()
# for process_info in processes_status:
#     print(process_info)

# sorted_processes = get_sorted_processes()
# for proc in sorted_processes:
#     print(proc)
