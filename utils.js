const { app } = require("electron")

function allowOverlaying (win, level) {
  if (process.platform != 'darwin') return

  if (level) win.setAlwaysOnTop(true, 'normal', level)
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
  
  app.dock.show()
}

module.exports = {
  allowOverlaying
}