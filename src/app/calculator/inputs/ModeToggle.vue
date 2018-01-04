<template>
  <b-btn @click="onClick">
    {{ text }}
  </b-btn>
</template>

<script>
import { mapState } from 'vuex';
import { CMD } from 'types';

export default {
  computed: mapState({
    text: state => (state.isLazy ? 'LAZY' : 'EAGER')
  }),
  methods: {
    onClick() {
      this.$store.dispatch('press', { type: CMD, value: 'MODE' });
    }
  }
};
</script>