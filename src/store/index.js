import Vue from "vue";
import Vuex from "vuex";

import clip from "./clip";
import user from "./user";

Vue.use(Vuex);

export default () => {
  const Store = new Vuex.Store({
    modules: {
      user,
      clip
    },
    state: {},
    strict: process.env.DEV
  });
  return Store;
};
