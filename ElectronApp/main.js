const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: true
    //      frame: false,
    //      title: "myApp",
    //      transparent: true
    //      titleBarStyle: "hidden-inset"
  })

  // require('electron-context-menu')({
  //   prepend: (params, browserWindow) => [{
  //     label: 'Rainbow',
  //     // only show it when right-clicking images
  //     visible: params.mediaType === 'image'
  //   }]
  // });

  //  mainWindow.setMenu(null);

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

