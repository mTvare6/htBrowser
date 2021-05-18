const {app, BrowserWindow, globalShortcut} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 650,
    height: 400,
    center: true,
    frame: false,
    //resizable:false,
    darkTheme: true,
    title: "htBrowser",
    focusable: false,
    alwaysOnTop: true,

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
      if(process.platform==='darwin'){
        app.hide()
      }
      else{
        app.quit()
      }
      hidden = true;
    }
    else{
      app.show()
      app.focus()
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

