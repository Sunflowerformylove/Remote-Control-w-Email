import psutil

# Hàm để lấy thông tin quá trình và sắp xếp
def sorted_processes():
    # Lấy danh sách quá trình
    processes = [proc for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent'])]

    # Sắp xếp theo CPU và RAM
    processes = sorted(processes, key=lambda proc: (proc.info['cpu_percent'], proc.info['memory_percent']))

    return processes

# Hàm để in thông tin quá trình
def print_processes(processes):
    print('PID'.ljust(6), 'NAME'.ljust(40), 'CPU(%)'.ljust(7), 'RAM(%)')
    for proc in processes:
        memory_percent = '{:.4f}'.format(proc.info['memory_percent'])
        print(str(proc.info['pid']).ljust(6),
              str(proc.info['name']).ljust(40),
              str(proc.info['cpu_percent']).ljust(7),
              memory_percent)

# Gọi các hàm
processes = sorted_processes()
print_processes(processes)