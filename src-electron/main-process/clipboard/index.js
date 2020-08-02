import { clipboard } from "electron";
import * as db from "../database";

export const watcher = async (dbInstance, win) => {
  return setInterval(async () => {
    const text = clipboard.readText();
    const html = clipboard.readHTML();
    const last = await db.getLastEntry(dbInstance);
    if (
      (text && text !== "" && last.length > 0 && text !== last[0].text) ||
      last.length === 0
    ) {
      await db.insertEntry(dbInstance, { text, html }, win);
      win.webContents.send("newClipAdded", text);
      return;
    }
  }, 500);
};
