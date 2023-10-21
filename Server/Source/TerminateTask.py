import os
import signal

def terminate_process(process_id):
    try:
        os.kill(int(process_id), signal.SIGTERM)
        print(f"Process with ID: {process_id} has been terminated.")
    except Exception as e:
        print(f"Unable to terminate process with ID: {process_id}")
        print(f"Error: {str(e)}")

# You can call the function with the process ID obtained from the first program.
# For example, if the process ID is 12345:
# terminate_process(12345)