import { app } from "electron";
import fs from "fs";
import Datastore from "nedb-promises";

export const dirFactory = name => {
  const folderPath = `${app.getPath("home")}/${name}`;
  fs.mkdirSync(folderPath, { recursive: true });
};

export const dbFactory = fileName => {
  const filePath = `${app.getPath("home")}/.cliplo/${fileName}`;
  return Datastore.create({
    filename: filePath,
    timestampData: true,
    autoload: true
  });
};

export const getLastEntry = async db => {
  try {
    const res = await db
      .find({})
      .sort({ createdAt: -1 })
      .limit(1);
    return res;
  } catch (err) {
    // catches errors both in fetch and response.json
    console.log("ERROR GETTING LAST DB ITEM");
    console.log({ err });
    return err;
  }
};

export const insertEntry = async (db, data, win) => {
  console.log(JSON.stringify(data, null, 2));
  const res = await db.insert({
    text: data.text,
    html: data.html,
    tags: [],
    charCount: data.text.length,
    window: data.window
  });
  win.webContents.send("newClipAdded", data.text);
  return res;
};
