const {app, BrowserWindow, globalShortcut} = require('electron')
const path = require('path')

function createWindow () {
    const mainWindow = new BrowserWindow({
      width: 650,
      height: 400,
      center: true,
      frame: false,
      resizable:false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })


  mainWindow.loadFile('index.html')

}

hidden = false;

  app.whenReady().then(() => {
    createWindow()
    app.hide()
    hidden = true;

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    const ret = globalShortcut.register('CmdOrCtrl+Shift+~', () => {
      if (!hidden){
        app.hide()
        hidden = true;
      }
      else{
        app.show()
        hidden = false;
      }
    })
    if (!ret) {
      console.log('registration failed')
    }

  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
    // Unregister all shortcuts.
      globalShortcut.unregisterAll()
  })

