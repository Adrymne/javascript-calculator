<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <calculator />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Calculator from './app/Calculator.vue';

export default {
  components: {
    calculator: Calculator
  }
};
</script>

<style scoped>
div.container-fluid {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>