<template>
  <div id="calculator-inputs">
    <b-btn
      v-for="btn in buttons"
      :key="btn.text"
      :style="btn.style"
      :variant="btn.type ? 'secondary' : 'light'">
      {{ btn.text }}
    </b-btn>
  </div>
</template>

<script>
// TODO: import these values as type constants
const OP = 'operator';
const CMD = 'command';

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
const buttons = buttonOrder.map(text =>
  Object.assign({ text }, buttonData[text])
);

export default {
  data: () => ({ buttons })
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
