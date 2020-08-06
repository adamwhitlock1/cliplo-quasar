import { remote } from "electron";

export default ({ Vue }) => {
  const currentWindow = remote.getCurrentWindow();
  const {
    cliplo: {
      db: { saved, stream, user, insertEntry }
    }
  } = currentWindow;
  Vue.prototype.$db = { saved, stream, user, insertEntry };
  Vue.prototype.$electronWindow = currentWindow;
};
