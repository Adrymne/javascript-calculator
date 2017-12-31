import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const NUM = 'number';
export const OP = 'operator';
export const CMD = 'command';

export const mutations = {
  pushOperator: (state, value) => {
    state.expression = [
      { type: NUM, value: parseFloat(state.current) },
      { type: OP, value }
    ];
    state.current = '';
  },
  inputNum: (state, value) => {
    state.current += value;
  }
};

const store = new Vuex.Store({
  state: {
    expression: [],
    current: ''
  },
  mutations,
  actions: {
    press: ({ commit }, { type, value }) => {
      if (type === OP) {
        commit('pushOperator', value);
      } else if (type === NUM) {
        commit('inputNum', value);
      }
    }
  }
});

export default store;
