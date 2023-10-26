import platform
import psutil
import os


def getSystemInfo():
    architecture = platform.architecture()
    machineType = platform.machine()
    networkName = platform.node()
    processor = platform.processor()
    OSName = platform.system()
    OSRelease = platform.release()
    OSVersion = platform.version()
    RAMTotal = psutil.virtual_memory().total / (1024.0 ** 3)
    RAMCurrentGB = psutil.virtual_memory()[3]/(1024.0 ** 3)
    RAMCurrentPercent = psutil.virtual_memory()[2]
    CPUTotal = os.cpu_count()
    CPUCurrent = psutil.cpu_percent()
    DiskPartitions = psutil.disk_partitions()
    DiskTotal = psutil.disk_usage('/').total / (1024.0 ** 3)
    DiskCurrent = psutil.disk_usage('/').percent
    DiskUsed = psutil.disk_usage('/').used / (1024.0 ** 3)
    resultDict = {'architecture': architecture, 'machineType': machineType, 
                    'networkName': networkName, 'processor': processor, 
                    'OSName': OSName, 'OSRelease': OSRelease, 'OSVersion': OSVersion, 'RAM': RAMTotal, 
                    'RAMCurrentGB': RAMCurrentGB, 'RAMCurrentPercent': RAMCurrentPercent, 'CPUTotal': CPUTotal,
                    'CPUCurrent': CPUCurrent, 'DiskPartitions': DiskPartitions, 'DiskTotal': DiskTotal,
                    'DiskCurrent': DiskCurrent, 'DiskUsed': DiskUsed}
    return resultDict

for key, value in getSystemInfo().items():
    print(key, value)