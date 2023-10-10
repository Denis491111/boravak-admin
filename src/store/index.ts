import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);

const store = new Store({
  modules: {},
  getters: {},
  actions: {
    actionExample() {
      store.commit("toggleStateFieldExample");
      return {};
    }
  },
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  }
});

export default store;
