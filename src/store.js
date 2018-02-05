import Vue from 'vue';
import Vuex from 'vuex';
import { findLast } from './util';
import evaluate from './evaluate';
import { NUM, OP } from './types';

Vue.use(Vuex);

const DEFAULT = undefined;
const STATE_DEFAULTS = {
  isLazy: false,
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

const isNum = value => !Number.isNaN(parseFloat(value));
const getCurrent = state => state.current || state.result || '0';

export const mutations = {
  pushOperator: (state, value) => {
    state.expression = state.expression.concat(getCurrent(state), value);
    state.current = '';
    state.result = '';
  },
  inputNum: (state, value) => {
    if (value === '.' && state.current.includes('.')) {
      return;
    }
    Object.assign(state, set({ current: state.current + value }));
  },
  clearResult: state => {
    Object.assign(state, set({ result: DEFAULT }));
  },
  clearAll: state => {
    Object.assign(state, set({ expression: DEFAULT, current: DEFAULT }));
  },
  clearEntry: state => {
    if (state.current) {
      Object.assign(state, set({ current: DEFAULT }));
    } else {
      const last = findLast(isNum, state.expression);
      Object.assign(
        state,
        set({ expression: DEFAULT, current: last ? last : DEFAULT })
      );
    }
  },
  evaluate: state => {
    if (state.expression.length === 0) {
      return;
    }

    const result = evaluate(
      state.expression.concat(state.current || '0').join(' ')
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
        result: state.current || DEFAULT,
        current: DEFAULT
      })
    );
  },
  toggleEvaluationMode: state => {
    state.isLazy = !state.isLazy;
  }
};

const store = new Vuex.Store({
  state: set(STATE_DEFAULTS),
  mutations,
  getters: {
    current: getCurrent
  },
  actions: {
    press: ({ state, commit }, { type, value }) => {
      if (type === OP) {
        if (!state.isLazy) {
          commit('evaluate');
        }
        commit('pushOperator', value);
      } else if (type === NUM) {
        commit('inputNum', value);
        commit('clearResult');
      } else {
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
          case 'MODE':
            commit('toggleEvaluationMode');
            break;
          default:
            throw new Error(
              `Unknown input: ${JSON.stringify({ type, value })}`
            );
        }
      }
    }
  }
});

export default store;
