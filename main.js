const activeWindows = require('electron-active-window');




const {app, BrowserWindow, globalShortcut} = require('electron')
const path = require('path')

const config =  require((process.platform==="linux")?`${app.getPath("appData")}/htBrowser/config.json`:`${app.getPath("home")}/.config/htBrowser/config.json`)

function createWindow (currentWMClass) {

  const mainWindow = new BrowserWindow(
    {
      width: (config.window || {}).width || 640,
      height: (config.window || {}).height || 640,
      center: true,
      frame: false,
      //resizable:false,
      darkTheme: true,
      title: "htBrowser",
      alwaysOnTop: true,

      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    }
  )
  let urlToLoad = (config.defaultURL || "https://duckduckgo.com");

  for (index in  (config.customURLS || {} )){
    for (const [wmClass, url] of Object.entries(config.customURLS[index])) {
      if (wmClass.toLowerCase()==currentWMClass.toLowerCase()){
        urlToLoad=url
      }
    }
  }



  mainWindow.loadURL( urlToLoad )
  return mainWindow;
}

hidden = false;

app.whenReady().then(() => {
  let mainWindow
  activeWindows().getActiveWindow().then((result)=>{
    mainWindow = createWindow(result["windowName"])
  });
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  const ret = globalShortcut.register('CmdOrCtrl+Shift+~', () => {
    if (!hidden){
      mainWindow.hide()
      console.log("Received hide bind")
      hidden = true;
    }
    else{
      mainWindow.show()
      console.log("Received show bind")
      mainWindow.focus()
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

