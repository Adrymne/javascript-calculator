<template>
  <div id="calculator-inputs">
    <b-btn
      v-for="btn in buttons"
      :key="btn.text"
      :style="btn.style"
      :variant="btn.type ? 'secondary' : 'light'"
      @click="btn.onClick">
      {{ btn.text }}
    </b-btn>
  </div>
</template>

<script>
import { OP, CMD, NUM } from 'store';

/* prettier-ignore */
const buttonOrder = [
  'AC', 'CE', '%', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', '='
];
const buttonData = {
  AC: { type: CMD },
  CE: { type: CMD },
  '=': { type: CMD },

  '%': { type: OP },
  '+': { type: OP },
  '-': { type: OP },
  '*': { type: OP, text: '\u00D7' },
  '/': { type: OP },

  '0': { style: { width: '50%' } }
};
const initButton = store => text => {
  const btn = Object.assign({ text, type: NUM }, buttonData[text]);
  return {
    ...btn,
    onClick: () => store.commit('press', { type: btn.type, value: text })
  };
};

export default {
  data() {
    return { buttons: buttonOrder.map(initButton(this.$store)) };
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

  font-size: 1.5em;
}
.btn:focus,
.btn:active {
  outline: none;
  box-shadow: none;
}
</style>
