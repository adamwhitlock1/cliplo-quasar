import { app, BrowserWindow, nativeTheme, powerSaveBlocker } from "electron";
import * as db from "./database";
import * as clip from "./clipboard";

// import * as activeWin from './window'
import { machineIdSync } from "node-machine-id";

const windowStateKeeper = require("electron-window-state");

try {
  if (
    process.platform === "win32" &&
    nativeTheme.shouldUseDarkColors === true
  ) {
    require("fs").unlinkSync(
      require("path").join(app.getPath("userData"), "DevTools Extensions")
    );
  }
} catch (_) {}

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = __dirname;
}

let mainWindow;

function createWindow() {
  powerSaveBlocker.start("prevent-app-suspension");
  db.dirFactory(".cliplo");
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  });
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 850,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,
      enableRemoteModule: true,
      transparent: true,
      backgroundColor: "#50FFFFFF"

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  });

  // machineEncryptionKey used for encrypting the databases
  const machineEncryptionKey = machineIdSync();

  // initialize dbs and bind them to the window for passing to renderer
  mainWindow.cliplo = {
    db: {
      saved: db.dbFactory("saved.db", machineEncryptionKey),
      stream: db.dbFactory("stream.db", machineEncryptionKey),
      user: db.dbFactory("user.db", machineEncryptionKey),
      tags: db.dbFactory("tags.db", machineEncryptionKey),
      insertEntry: db.insertEntry
    }
  };

  mainWindow.cliplo.db.stream.ensureIndex({ fieldName: "text" });

  mainWindowState.manage(mainWindow);
  mainWindow.loadURL(process.env.APP_URL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // start watcher to monitor clipboard for new entries
  clip.watcher(mainWindow.cliplo.db.stream, mainWindow);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
