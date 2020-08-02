import { remote } from "electron";

export default ({ Vue }) => {
  const currentWindow = remote.getCurrentWindow();
  const {
    cliplo: {
      db: { saved, stream, user }
    }
  } = currentWindow;
  Vue.prototype.$db = { saved, stream, user };
};
