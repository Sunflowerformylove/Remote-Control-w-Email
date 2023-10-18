import winreg


def getRegValue(registry):
    try:
        # Format of reg here is HKLM\Software\Microsoft\Windows\CurrentVersion\Run for example
        regValue = None
        if registry.startswith("HKCU"):
            regValue = winreg.QueryValue(
                winreg.HKEY_CURRENT_USER, registry[5:])
        elif registry.startswith("HKLM"):
            regValue = winreg.QueryValue(
                winreg.HKEY_LOCAL_MACHINE, registry[5:])
        elif registry.startswith("HKCR"):
            regValue = winreg.QueryValue(
                winreg.HKEY_CLASSES_ROOT, registry[5:])
        elif registry.startswith("HKU"):
            regValue = winreg.QueryValue(winreg.HKEY_USERS, registry[4:])
        elif registry.startswith("HKCC"):
            regValue = winreg.QueryValue(
                winreg.HKEY_CURRENT_CONFIG, registry[5:])
        else:
            regValue = None
        # compose a mail for success
    except Exception as e:
        # compose a mail for error
        exit(1)


def changeRegValue(registry, valueName, newValue):
    try:
        key = None
        if registry.startswith("HKCU"):
            key = winreg.OpenKeyEx(
                winreg.HKEY_CURRENT_USER, registry[5:], 0, winreg.KEY_ALL_ACCESS)
        elif registry.startswith("HKLM"):
            key = winreg.OpenKeyEx(
                winreg.HKEY_LOCAL_MACHINE, registry[5:], 0, winreg.KEY_ALL_ACCESS)
        elif registry.startswith("HKCR"):
            key = winreg.OpenKeyEx(
                winreg.HKEY_CLASSES_ROOT, registry[5:], 0, winreg.KEY_ALL_ACCESS)
        elif registry.startswith("HKU"):
            key = winreg.OpenKeyEx(
                winreg.HKEY_USERS, registry[4:], 0, winreg.KEY_ALL_ACCESS)
        elif registry.startswith("HKCC"):
            key = winreg.OpenKeyEx(
                winreg.HKEY_CURRENT_CONFIG, registry[5:], 0, winreg.KEY_ALL_ACCESS)
        else:
            key = None
        if key is not None:
            winreg.SetValue(key, valueName, 0, )
            # compose a mail for success
        else:
            # compose a mail for error
            exit(1)
    except Exception as e:
        # compose a mail for error
        exit(1)
