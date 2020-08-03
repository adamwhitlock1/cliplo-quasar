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

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
};
