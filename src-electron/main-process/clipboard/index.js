import { clipboard } from "electron";
import * as db from "../database";

export const watcher = async (dbInstance, win) => {
  return setInterval(async () => {
    const clip = clipboard.readText();
    const last = await db.getLastEntry(dbInstance);
    if (
      (clip !== "" && clip && last.length > 0 && clip !== last[0].text) ||
      last.length === 0
    ) {
      await db.insertEntry(dbInstance, clip, win);
      win.webContents.send("newClipAdded", clip);
      return;
    }
  }, 1000);
};
