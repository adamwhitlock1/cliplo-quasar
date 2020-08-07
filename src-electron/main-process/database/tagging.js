import { fileFormatDictionary } from "./dictionaries/formats";
import { applicationDictionary } from "./dictionaries/applications";

export const getFileFormatTags = window => {
  if (window.title) {
    return fileFormatDictionary.filter(tag => {
      return window.title.indexOf(tag.format) !== -1;
    });
  }
  return [];
};

export const getApplicationContextTags = window => {
  if (window.owner) {
    return applicationDictionary.filter(app => {
      return window.owner.name.indexOf(app.name) !== -1;
    });
  }
  return [];
};
