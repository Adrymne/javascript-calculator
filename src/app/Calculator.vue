<template>
  <div id="calculator">
    <b-row>
      <b-col>
        <calculator-display />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <calculator-inputs />
      </b-col>
    </b-row>
    <div class="text-muted text-right">
      View source on
      <b-link :href="source">GitHub</b-link>
    </div>
  </div>
</template>

<script>
import Display from './calculator/Display.vue';
import Inputs from './calculator/Inputs.vue';

export default {
  components: {
    'calculator-display': Display,
    'calculator-inputs': Inputs
  },
  data: () => ({
    source: 'https://github.com/Adrymne/javascript-calculator'
  })
};
</script>

<style>
#calculator {
  width: 50vw;
  min-width: 400px;
}
</style>

