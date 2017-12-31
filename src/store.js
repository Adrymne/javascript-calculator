import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const NUM = 'number';
const OP = 'operator';
const CMD = 'command';

const store = new Vuex.Store({
  state: {
    current: ''
  },
  mutations: {
    press: (state, { type, value }) => {
      if (type === NUM) {
        state.current += value;
      }
    }
  }
});

export default store;
export { NUM, OP, CMD };
