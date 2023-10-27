import psutil

def print_all_processes():
    count = 1
    for proc in psutil.process_iter(['pid', 'name', 'status']):
        print(f"{count}.\t".expandtabs(5), end = '')
        # print(f"Name: {proc.info['name']}\tPID: {proc.info['pid']}".expandtabs(48), f"\tStatus: {proc.info['status']}".expandtabs(8))
        print(f"Name: {proc.info['name']}\tStatus: {proc.info['status']}".expandtabs(48))
        count += 1

print_all_processes()