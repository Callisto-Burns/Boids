global.__basedir = __dirname

const electron = require('electron')
const {app, BrowserWindow, Menu, MenuItem} = electron
const url = require('url')
const path = require('path')

let mainWindow

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        },
        resizeable: false,
        
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__basedir, "src/index.html"),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', () => {
        app.quit()
    })

    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
})

const isMac = process.platform === 'darwin'
const menuTemplate = [
    //Mac appMenu
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {role: 'quit'}
        ]
    }] : []),
    //fileMenu
    {
        label: 'File',
        submenu: [
            isMac ? {role: 'close'} : {role: 'quit'}
        ]
    },
    //viewMenu
    {
        label:'View',
        submenu: [
            {role: 'toggledevtools'}
        ]
    }

]
