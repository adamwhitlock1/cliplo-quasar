import activeWin from "active-win";

export const getWin = async () => {
  try {
    console.log(await activeWin());
  } catch (err) {
    console.log({ err });
  }
};
