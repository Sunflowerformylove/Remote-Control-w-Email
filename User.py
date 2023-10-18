class USER:
    # Attributes
    email = ""
    accessLevel = 0 # 0 = Low level, 1 = High level, 2 = Admin
    alias = ""
    # Constructor
    def __init__(self, email, accessLevel, alias):
        self.email = email
        self.accessLevel = accessLevel
        self.alias = alias
    # Methods
    def getEmail(self):
        return self.email
    def getAccessLevel(self):
        return self.accessLevel
    def getAlias(self):
        return self.alias
    def setEmail(self, email):
        self.email = email
    def setAccessLevel(self, accessLevel):
        self.accessLevel = accessLevel
    def setAlias(self, alias):
        self.alias = alias
    def description(self):
        return "Email: " + self.email + "\nAccess Level: " + str(self.accessLevel) + "\nAlias: " + self.alias