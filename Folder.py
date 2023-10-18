import os

def searchForFile(filename, directory):
    for root, dirs, files in os.walk(directory):
        if filename in files:
            FILENAME = os.path.join(root, filename)
            return FILENAME
    return None

def searchForFolder(foldername, directory):
    for root, dirs, files in os.walk(directory):
        if foldername in dirs:
            FOLDERNAME = os.path.join(root, foldername)
            return FOLDERNAME
    return None

def getFolderTree(directory):
    return os.walk(directory)