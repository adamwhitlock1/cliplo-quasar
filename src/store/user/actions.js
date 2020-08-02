export async function setOption({ commit, state }, { db, payload }) {
  const user = await getUser(db);
  const data = { ...state };
  data[payload.option] = payload.value;
  await db.user.update({ _id: user._id }, data);
  commit("option", payload);
}

export async function seedOptions({ commit, state }, db) {
  const user = await getUser(db);
  if (!user) {
    const seeded = await db.user.insert(state);
    return;
  }
}

const getUser = async db => {
  return await db.user.findOne({});
};
