import { BrowserWindow, app } from 'electron';
import * as path from 'path';

const indexPageHTML = path.join(__dirname, 'index.html');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile(indexPageHTML)
}