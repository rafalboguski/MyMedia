

const electron = require('electron')
const app = electron.app
app.commandLine.appendSwitch('disable-smooth-scrolling');

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

  var createNewCard = function (event, urlToOpen) {

    var parentWin = event.sender.getOwnerBrowserWindow();
    var pos = parentWin.getPosition();
    var size = parentWin.getSize();
    var max = parentWin.isMaximized();

    setTimeout(function () {
      var list = BrowserWindow.getAllWindows();
      list.forEach(w => {
        if (w.id > 1 && w.getMaximumSize()[0] < 10000 && w.getMaximumSize()[1] < 10000) {
          w.close();
        }
      })
    }, 50);

    var win = new BrowserWindow({
      x: pos[0],
      y: pos[1],
      width: size[0],
      height: size[1]
    });
    if (max) { win.maximize(); }
    win.setMaximumSize(20000, 20000)
    win.loadURL(urlToOpen);
    win.webContents.on('new-window', createNewCard);

    var list = BrowserWindow.getAllWindows();
    list.forEach(w => { w.focus(); })

    parentWin.focus();
  }

  mainWindow.webContents.on('new-window', createNewCard);


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


