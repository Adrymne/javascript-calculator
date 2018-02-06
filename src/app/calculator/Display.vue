<template>
  <div id="display-window">
    <div>
      {{ expression || '&nbsp;' }}
    </div>
    <h1>
      {{ current }}
    </h1>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState({ expression: state => state.expression.join(' ') }),
    ...mapGetters(['current'])
  }
};
</script>


<style>
#display-window {
  background-color: gray;
  padding: 0.1em 0.5em;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

h1 {
  margin-bottom: 0;
}
</style>
