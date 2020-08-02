export async function setOption({ commit, state }, { db, payload }) {
  const user = await getUser(db);
  const data = { ...state };
  data[payload.option] = payload.value;
  await db.user.update({ _id: user._id }, data);
  commit("option", payload);
}

export async function seedOptions({ commit, state }, db) {
  let user = await getUser(db);
  if (!user) user = await db.user.insert(state);
  commit("seed", user);
  console.log({ user });
}

const getUser = async db => {
  return await db.user.findOne({});
};
