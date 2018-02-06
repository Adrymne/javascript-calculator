import Vue from 'vue';
import Vuex from 'vuex';
import Type from 'union-type';
import runEval from './evaluate';
import { NUM, OP } from './types';

Vue.use(Vuex);

export const Value = Type({ None: [], Input: [String], Result: [Number] });

const STATE_DEFAULTS = {
  isLazy: false,
  expression: [],
  current: Value.None
};
const set = values =>
  Object.entries(values).reduce(
    (result, [key, value]) =>
      Object.assign(result, {
        [key]: typeof value !== 'undefined' ? value : STATE_DEFAULTS[key]
      }),
    {}
  );

const getCurrent = state =>
  state.current.case({ None: () => 0, Input: x => x, Result: x => x });
const appendInput = (value, current) =>
  value === '.' && current.includes(value) ? current : current + value;
const evaluate = expression => runEval(expression.join(' '));

export const mutations = {
  pushOperator: (state, value) => {
    const newExpression = state.current.case({
      None: () => state.expression.concat('0', value),
      Input: current => state.expression.concat(current, value),
      Result: current => state.expression.concat(current.toString(), value)
    });
    Object.assign(
      state,
      set({ expression: newExpression, current: Value.None })
    );
  },
  inputNum: (state, value) => {
    const result = state.current.case({
      Input: current => appendInput(value, current),
      _: () => value
    });
    Object.assign(state, set({ current: Value.Input(result) }));
  },
  clearAll: state => {
    Object.assign(state, set({ expression: [], current: Value.None }));
  },
  clearEntry: state => {
    Object.assign(state, set({ current: Value.None }));
  },
  evaluate: state => {
    const result = state.current.case({
      None: () =>
        state.expression.length > 0
          ? evaluate([...state.expression, state.expression[0]])
          : 0,
      Result: x => evaluate([...state.expression, x]),
      Input: x => evaluate([...state.expression, x])
    });
    if (result !== undefined) {
      Object.assign(
        state,
        set({ expression: [], current: Value.Result(result) })
      );
    }
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
