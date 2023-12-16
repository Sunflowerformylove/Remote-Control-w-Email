const electron = require("electron");
const path = require("path");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const childProcess = require("child_process");
const backend = childProcess.spawn("powershell.exe", ["/C", path.join(path.dirname(path.dirname(__dirname)), "/Scripts/Backend.ps1")], {
    detached: true,
    shell: true,
    stdio: "ignore",
});

let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        frame: true,
        transparent: false,
        webPreferences: {
            nodeIntegration: true
        },
    });
    // and load the index.html of the app.
    mainWindow.loadURL('file://' + path.dirname(__dirname) + '/build/index.html');
    backend.unref();
    mainWindow.center();
    mainWindow.maximize();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    app.quit();
    backend.kill();
});