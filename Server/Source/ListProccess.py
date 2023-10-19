import psutil

count = 1

# Get a list of currently running processes and their PIDs
running_proc = [(proc.pid, proc.name()) for proc in psutil.process_iter()]

# Open the file in write mode
with open("proc.txt", "w") as file:
    # Write each PID and processes name on a new line
    for pid, app in running_proc:
        file.write(f"{count}\t\t")
        file.write(f"{app}\t{pid}\n".expandtabs(40))
        count += 1

print("List of running processes and their PIDs saved to proc.txt.")