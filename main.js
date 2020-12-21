// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const { allowOverlaying } = require('./utils')

function createWindow () {
  // Create the browser window.
  const window = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  window.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  return window
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const offset = [100, 100]
var windows = []
app.whenReady().then(() => {
  for (let i = 0; i < 3; i++) {
    const win = createWindow()
    windows.push(win)

    if (i !== 0) { // Make the first window a normal window
      allowOverlaying(win, 5)
    }

    const size = win.getSize()
    win.setPosition(
      offset[0] + i * size[0],
      offset[1] + i * size[1],
    )
  }
  
  var i = 0;
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  setInterval(() => {
    i++
    const newVisible = i % 2 < 1
    console.log('Visible on all workspaces?', newVisible)
    for (var j = 1; j < windows.length; j++) { // Don't modify the first window
      console.log(j, windows.length)
      windows[j].setVisibleOnAllWorkspaces(newVisible, {visibleOnFullScreen: newVisible})
    }
  }, 3000)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
