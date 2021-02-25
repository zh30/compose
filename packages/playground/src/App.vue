<template>
  <split-layout></split-layout>
</template>

<script>
import { defineComponent } from 'vue'

import SplitLayoutVue from './components/SplitLayout.vue'

export default defineComponent({
  name: 'App',
  components: {
    'split-layout': SplitLayoutVue
  }
})
</script>
