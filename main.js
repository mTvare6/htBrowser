const activeWindows = require('electron-active-window');
var fs = require('fs');
var isAccelerator = require("electron-is-accelerator");


const {app, BrowserWindow, globalShortcut} = require('electron')
const path = require('path')

const configDir = (process.platform!=="darwin")?`${app.getPath("appData")}/htBrowser`:`${app.getPath("home")}/.config/htBrowser`
const configPath = `${configDir}/config.json`

if (!fs.existsSync(configDir)){
  fs.mkdir(configDir)
}

if (!fs.existsSync(configPath)){
  const exampleConfig = JSON.stringify({
    "window": {
      "width": 640,
      "height": 400
    },
    "keyBind": "CmdOrCtrl+Shift+~",
    "defaultURL": "https://duckduckgo.com",
    "customURLS": [
      {
        "discord": "https://discord.com/developers/docs/intro"
      }
    ]
  })
  fs.writeFileSync(configPath, exampleConfig)
}

hidden = true;

const config =  require(configPath)
function createWindow (currentWMClass) {

  const mainWindow = new BrowserWindow(
    {
      width: (config.window || {}).width || 640,
      height: (config.window || {}).height || 640,
      center: true,
      frame: false,
      show: !hidden,
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
    for (const [wmClass, url] of Object.entries( config.customURLS[index]  )) {
      if (wmClass.toLowerCase()==currentWMClass.toLowerCase()){
        urlToLoad=url
      }
    }
  }



  mainWindow.loadURL( urlToLoad )
  return mainWindow;
}


app.whenReady().then(() => {
  let mainWindow;
  activeWindows().getActiveWindow().then((result)=>{
    mainWindow = createWindow(result["windowName"])
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  let configAcc = (config["keyBind"]||'CmdOrCtrl+Shift+~')
  if (!isAccelerator(configAcc)){
    console.log(`Accelerator ${configAcc} is not valid check https://www.electronjs.org/docs/api/accelerator#accelerator\n Using the default accelerator instead`)
  }
  const ret = globalShortcut.register(isAccelerator(configAcc)?configAcc:'CmdOrCtrl+Shift+~', () => {
    if (!hidden){
      mainWindow.hide()
      hidden = true;
    }
    else{
      mainWindow.show()
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

