<template>
  <div id="calculator-inputs">
    <b-btn
      v-for="btn in buttons"
      :key="btn.text"
      :variant="inputVariant(btn)"
      @click="btn.onClick">
      {{ btnText(btn) }}
    </b-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { OP, CMD, NUM } from 'types';

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
  MODE: { type: CMD },

  '%': { type: OP },
  '+': { type: OP },
  '-': { type: OP },
  '*': { type: OP, text: '\u00D7' },
  '/': { type: OP }
};
const initButton = store => text => {
  const btn = Object.assign({ text, type: NUM }, buttonData[text]);
  return {
    ...btn,
    onClick: () => store.dispatch('press', { type: btn.type, value: text })
  };
};

export default {
  data() {
    return { buttons: buttonOrder.map(initButton(this.$store)) };
  },
  computed: mapState(['isLazy']),
  methods: {
    inputVariant(btn) {
      return btn.type === NUM ? 'light' : 'secondary';
    },
    btnText(btn) {
      if (btn.text === 'MODE') {
        return this.isLazy ? 'LAZY' : 'EAGER';
      }
      return btn.text;
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

  font-size: 1.5em;
}
.btn:focus,
.btn:active {
  outline: none;
  box-shadow: none;
}
</style>
