<template>
  <div id="display-window">
    <div>
      {{ expression }}
    </div>
    <h1>
      {{ current || '&nbsp;' }}
    </h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    current: 'current',
    expression: state => state.expression.map(({ value }) => value).join(' ')
  })
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
