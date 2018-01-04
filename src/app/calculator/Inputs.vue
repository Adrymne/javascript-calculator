<template>
  <div id="calculator-inputs">
    <component
      v-for="btn in buttons"
      :is="btn.component"
      :key="btn.text"
      :variant="inputVariant(btn)"
      @click="btn.onClick">
      {{ btn.text }}
    </component>
  </div>
</template>

<script>
import { OP, CMD, NUM } from 'types';
import ModeToggle from './inputs/ModeToggle.vue';

/* prettier-ignore */
const buttonOrder = [
  'AC', 'CE', '%', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', 'MODE', '='
];
const buttonData = {
  AC: { type: CMD },
  CE: { type: CMD },
  '=': { type: CMD },
  MODE: { type: CMD, component: 'mode-toggle' },

  '%': { type: OP },
  '+': { type: OP },
  '-': { type: OP },
  '*': { type: OP, text: '\u00D7' },
  '/': { type: OP }
};
const initButton = store => text => {
  const btn = Object.assign(
    { text, type: NUM, component: 'b-btn' },
    buttonData[text]
  );
  return {
    ...btn,
    onClick: () => store.dispatch('press', { type: btn.type, value: text })
  };
};

export default {
  components: {
    'mode-toggle': ModeToggle
  },
  data() {
    return { buttons: buttonOrder.map(initButton(this.$store)) };
  },
  methods: {
    inputVariant(btn) {
      return btn.type === NUM ? 'light' : 'secondary';
    }
  }
};
</script>

<style>
div#calculator-inputs {
  display: flex;
  flex-wrap: wrap;
}

.btn {
  width: 25%;
  border-radius: 0;
  border: 0.5px solid lightgray !important;
  height: 6vw;
  min-height: 50px;

  font-size: 1.5em;
}
.btn:focus,
.btn:active {
  outline: none;
  box-shadow: none;
}
</style>
