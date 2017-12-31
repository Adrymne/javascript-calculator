import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const NUM = 'number';
export const OP = 'operator';
export const CMD = 'command';

const store = new Vuex.Store({
  state: {
    current: ''
  },
  mutations: {
    inputNum: (state, value) => {
      state.current += value;
    }
  },
  actions: {
    press: ({ commit }, { type, value }) => {
      if (type === NUM) {
        commit('inputNum', value);
      }
    }
  }
});

export default store;
