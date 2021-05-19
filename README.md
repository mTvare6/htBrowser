<h1 align="center"><em> htBrowser </em></h1>


<h3 align="center"> A browser made for developers to search through documentation while staying in editor. </h3>

![htMini](https://user-images.githubusercontent.com/57838468/118494391-ba383300-b73f-11eb-8649-4b8792a186b8.gif)
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<h3 align="center"> Keybind to pull up the window: </h3>

<p align="center">
<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>~</kbd> <br/>
  <strong>or</strong> <br/>
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>~</kbd>
</p>

#### Configuration:
htBrowser looks for config under
- `$XDG_CONFIG_HOME/htBrowser/config.json` on linux 
- `$HOME/.config/htBrowser/config.json` on macOS 
- `%%APPDATA%%/htBrowser/config.json` on windows


The following is a example config
```json
{
  "window": {
    "width": 640,
    "height": 400
  },
  "defaultURL": "https://duckduckgo.com",
  "keyBind":"CmdOrCtrl+Shift+~",
  "customURLS": [
    {
      "discord": "https://discord.com/developers/docs/intro"
    }
  ]
}
```
**window** part should be self-explantory \
**keyBind** is the keybind which pulls up the window, the string must be a valid [`accelator`](https://www.electronjs.org/docs/api/accelerator#accelerator)\
**defaultURL** is the url the browser switches by default which are overriden if customURL matches \
**customURLS** is a set of `WM_CLASS` and url paired, where the browser is launched if the current `WM_CLASS` value is one of those, the value of url is what the browser switches to.


## Building
##### To setup
```
npm install
```

##### To run
```
npm start
```
##### To build install electron-package or download from github workflows



## Todo: 
 - Add configurable shortcuts
 - Custom naviator instead of simply redirecting to duckduckgo
