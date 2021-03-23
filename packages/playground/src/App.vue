<template>
  <div style="height: 900px; width: 1600px; margin: auto" class="">
    <v-split-layout></v-split-layout>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import SplitLayoutVue from './components/SplitLayout.vue'

export default defineComponent({
  name: 'App',
  components: {
    'v-split-layout': SplitLayoutVue
  }
})
</script>
