import os

def getFolderTree(directory):
    tree = ''
    for root, dirs, files in os.walk(directory):
        level = root.replace(directory, '').count(os.sep)
        indent = ' ' * 4 * (level)
        tree += '{}{}/\n'.format(indent, os.path.basename(root))
        subIndent = ' ' * 4 * (level + 1)
        for f in files:
            tree += '{}{}\n'.format(subIndent, f)
    return tree