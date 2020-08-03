export async function setOption({ commit, state }, payload) {
  const user = await getUser(this._vm.$db);
  const data = { ...state };
  data[payload.option] = payload.value;
  await this._vm.$db.user.update({ _id: user._id }, data);
  commit("option", payload);
}

export const seedOptions = async ({ commit, state }, db) => {
  let user = await getUser(db);
  if (!user) user = await db.user.insert(state);
  commit("seed", user);
  console.log({ user });
};

const getUser = async db => {
  return await db.user.findOne({});
};
