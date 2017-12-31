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
  </div>
</template>

<script>
import Display from './calculator/Display.vue';
import Inputs from './calculator/Inputs.vue';

export default {
  components: {
    'calculator-display': Display,
    'calculator-inputs': Inputs
  }
};
</script>

<style>
#calculator {
  width: 50vw;
}
</style>

