import Vue from 'vue';
import Vuex from 'vuex';
import { findLast } from './util';
import evaluate from './evaluate';
import { NUM, OP } from './types';

Vue.use(Vuex);

const DEFAULT = undefined;
const STATE_DEFAULTS = {
  expression: [],
  current: '',
  result: '0'
};
const set = values =>
  Object.entries(values).reduce(
    (result, [key, value]) =>
      Object.assign(result, {
        [key]: typeof value !== 'undefined' ? value : STATE_DEFAULTS[key]
      }),
    {}
  );

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
    Object.assign(state, set({ expression: DEFAULT, current: DEFAULT }));
  },
  clearEntry: state => {
    if (state.current) {
      Object.assign(state, set({ current: DEFAULT }));
    } else {
      const last = findLast(({ type }) => type === NUM, state.expression);
      Object.assign(
        state,
        set({ expression: DEFAULT, current: last ? last.value : DEFAULT })
      );
    }
  },
  evaluate: state => {
    if (state.expression.length === 0) {
      return;
    }

    const result = evaluate(
      state.expression.concat({ type: NUM, value: state.current })
    );
    Object.assign(
      state,
      set({
        expression: DEFAULT,
        current: result.toString()
      })
    );
  },
  prepareNext: state => {
    Object.assign(
      state,
      set({
        result: state.current,
        current: DEFAULT
      })
    );
  }
};

const store = new Vuex.Store({
  state: set({ expression: DEFAULT, current: DEFAULT, result: DEFAULT }),
  mutations,
  actions: {
    press: ({ commit }, { type, value }) => {
      if (type === OP) {
        commit('evaluate');
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
          commit('prepareNext');
          break;
        default:
          throw new Error(`Unknown input: ${{ type, value }}`);
      }
    }
  }
});

export default store;
