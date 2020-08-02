import activeWin from "active-win";

export const getWin = async () => {
  try {
    return await activeWin();
  } catch (err) {
    return err;
  }
};
