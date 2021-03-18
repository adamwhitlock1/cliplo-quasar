import { app } from "electron";
import fs from "fs";
import Datastore from "nedb-promises";
import { getFileFormatTags, getApplicationContextTags } from "./tagging";
import crypto from "crypto";

export const dirFactory = name => {
  const folderPath = `${app.getPath("home")}/${name}`;
  fs.mkdirSync(folderPath, { recursive: true });
};

export const dbFactory = (fileName, encryptionKey) => {
  let algorithm = "aes-256-cbc"; // you can choose many algorithm from supported openssl
  let secret = encryptionKey || "none";
  let key = crypto
    .createHash("sha256")
    .update(String(secret))
    .digest("base64")
    .substr(0, 32);
  const filePath = `${app.getPath("home")}/.cliplo/${fileName}`;
  return Datastore.create({
    filename: filePath,
    timestampData: true,
    autoload: true,
    afterSerialization(plaintext) {
      const iv = crypto.randomBytes(16);
      const aes = crypto.createCipheriv(algorithm, key, iv);
      let ciphertext = aes.update(plaintext);
      ciphertext = Buffer.concat([iv, ciphertext, aes.final()]);
      return ciphertext.toString("base64");
    },
    beforeDeserialization(ciphertext) {
      const ciphertextBytes = Buffer.from(ciphertext, "base64");
      const iv = ciphertextBytes.slice(0, 16);
      const data = ciphertextBytes.slice(16);
      const aes = crypto.createDecipheriv(algorithm, key, iv);
      let plaintextBytes = Buffer.from(aes.update(data));
      plaintextBytes = Buffer.concat([plaintextBytes, aes.final()]);
      return plaintextBytes.toString();
    }
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
    tags: [
      ...getFileFormatTags(data.window),
      ...getApplicationContextTags(data.window)
    ],
    charCount: data.text.length,
    window: data.window
  });
  win.webContents.send("newClipAdded", data.text);
  return res;
};
