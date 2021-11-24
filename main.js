const { ipcMain, dialog, webContents } = require('electron');
const electron = require('electron');
const sqlite3 = require('sqlite3').verbose();

let window


// electron.app.on('will-finish-launching', (event, arg) => {

//   if (process.argv.length) {
//     // const filePath = process.argv[1]
//     // handleFile(filePath)
//     console.log(process.argv)
//     window.webContents.send('chat', process.argv)
//   }
// })

let files;
electron.app.on('open-file', (event, path) => {
  files = [path]
  if (window) {
    closeDatabase() ? openFile(files) : null
    // openFile(files)
  }
})

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  window = new electron.BrowserWindow({
    width: width / 2,
    height: height / 2,
    minWidth: width / 3,
    minHeight: height / 4,
    // fullscreen: fullscreenBool,
    // titleBarStyle: "hidden",
    frame: false,
    webPreferences: {
      experimentalFeatures: true,
      nodeIntegration: true
    }
  });
  window.loadURL("file://" + __dirname + "/public/index.html");
  window.webContents.on('dom-ready', () => {
    openFile(files)
  })
  if (process.argv.length) {
    // const filePath = process.argv[1]
    // handleFile(filePath)
    console.log(process.argv)
    setTimeout(() => {
      window.webContents.send('chat', process.argv)

    }, 1000)
  }
}

electron.app.on("ready", () => {createWindow()});

electron.app.on('window-all-closed', () => { 
  // On macOS it is common for applications and their menu bar 
  // to stay active until the user quits explicitly with Cmd + Q 
  if (process.platform !== 'darwin') { 
    app.quit() 
  } 
}) 
  
electron.app.on('activate', () => { 
    // On macOS it's common to re-create a window in the  
    // app when the dock icon is clicked and there are no  
    // other windows open. 
  if (electron.BrowserWindow.getAllWindows().length === 0) { 
    createWindow();
  } 
}) 

let cachedWindowPosition;
let cachedWindowSize;
ipcMain.on('traffic-lights', (event, arg) => {
  if (arg == 'request-toggle-fullscreen') {
    window.isFullScreen() ? window.setFullScreen(false) : window.setFullScreen(true)
  }
  if (arg == 'request-maximize-window') {
    if (window.isMaximized()) {
      window.setBounds({
        width: cachedWindowSize[0],
        height: cachedWindowSize[1],
        x: cachedWindowPosition[0],
        y: cachedWindowPosition[1],
      }, true)
    } else {
      cachedWindowPosition = window.getPosition()
      cachedWindowSize = window.getSize()
      window.maximize()
    }
  }
  if (arg == 'request-db-close') {
    closeDatabase()
  }
})

ipcMain.on('request-open-db-file', () => {
  if (fileCurrentlyOpen) {
    if (!closeDatabase()) {
      return
    }
  }
  let openPath = dialog.showOpenDialogSync(window, { 
    title: 'Open Cissiworks File', 
    properties: [
      'openFile'
    ],
    filters: [
      { name: 'Database', extensions: ['db', 'cwdb', 'sqlite'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  })
  openFile(openPath)
})

function closeDatabase() {
  if (!fileCurrentlyOpen) {
    return true
  }
  let closeDBDialog = dialog.showMessageBoxSync(window, { type: 'warning', buttons: ['Close', 'Cancel'], defaultId: 1, message: "Close Database?", detail: "Data will be saved" })
  if (!closeDBDialog) {
    window.webContents.send('request-db-close')
    fileCurrentlyOpen = false
    return true
  }
  return false
}

let fileCurrentlyOpen
function openFile(path) {
  if (!path) return false;
  fileCurrentlyOpen = path
  window.webContents.send('new-db-open', path)
  console.log(path)
  const db = new sqlite3.Database(path[0]);
  db.get("SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%' AND name IS NOT 'cw_config' ORDER BY name;", (err, row) => {
    db.all(`PRAGMA table_info(${row.name})`, (err, row) => {
      window.webContents.send('db-table-info', row)
    })
    db.all(`SELECT * FROM ${row.name}`, (err, row) => {
      window.webContents.send('open-db-file', row)
    })
  })
  db.close()
}


