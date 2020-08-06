const getAllStream = async db => {
  try {
    return await db.stream.find({}).sort({ createdAt: -1 });
  } catch (err) {
    console.log("ERROR LOADING CLIP STREAM");
    console.log(err);
    throw err;
  }
};

export const stream = async ({ commit }, db) => {
  try {
    const res = await getAllStream(db);
    commit("stream", res);
  } catch (err) {
    console.log("ERROR LOADING CLIP STREAM");
    console.log(err);
  }
};

export const remove = async ({ commit }, { db, item }) => {
  try {
    await db.stream.remove({ _id: item._id }, {});
    const res = await getAllStream(db);
    commit("stream", res);
  } catch (err) {
    console.log("ERROR REMOVING CLIP");
    console.log(err);
  }
};

const first = async db => {
  try {
    return await db.stream.findOne({}).sort({ createdAt: -1 });
  } catch (err) {
    console.log("ERROR GETTING FIRST CLIP FROM STREAM");
    console.log(err);
  }
};

export const clearStream = async (context, db) => {
  try {
    const firstClip = await first(db);
    await db.stream.remove({ $not: { _id: firstClip._id } }, { multi: true });
    context.dispatch("stream", db);
  } catch (err) {
    console.log("ERROR CLEARING CLIP STREAM");
    console.log(err);
  }
};

export const seedOptions = async ({ commit, state }, db) => {
  let user = await getUser(db);
  if (!user) user = await db.user.insert(state);
  commit("seed", user);
  console.log({ user });
};

const getUser = async db => {
  return await db.user.findOne({});
};
