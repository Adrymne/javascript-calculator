import Vue from 'vue';
import Vuex from 'vuex';
import { findLast } from './util';
import evaluate from './evaluate';
import { NUM, OP } from './types';

Vue.use(Vuex);

export const mutations = {
  pushOperator: (state, value) => {
    state.expression = [
      { type: NUM, value: state.current },
      { type: OP, value }
    ];
    state.current = '';
  },
  inputNum: (state, value) => {
    state.current += value;
  },
  clearAll: state => {
    Object.assign(state, { expression: [], current: '' });
  },
  clearEntry: state => {
    if (state.current) {
      state.current = '';
    } else {
      const last = findLast(({ type }) => type === NUM, state.expression);
      Object.assign(state, {
        expression: [],
        current: last ? last.value : ''
      });
    }
  },
  evaluate: state => {
    if (state.expression.length === 0) {
      return;
    }

    const result = evaluate(
      state.expression.concat({ type: NUM, value: state.current })
    );

    Object.assign(state, {
      expression: [],
      current: result.toString()
    });
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
      switch (value) {
        case 'AC':
          commit('clearAll');
          break;
        case 'CE':
          commit('clearEntry');
          break;
        case '=':
          commit('evaluate');
          break;
        default:
          throw new Error(`Unknown input: ${{ type, value }}`);
      }
    }
  }
});

export default store;
