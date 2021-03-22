<template>
  <div class="container">
    <div id="sidebar" class="sidebar fill-height"></div>
    <div id="content" class="content fill-height"></div>
  </div>
</template>

<script>
import { defineComponent, nextTick } from 'vue'

import { useLayout } from '@axlejs/split-layout'

export default defineComponent({
  name: 'SplitLayout',
  setup() {

    nextTick(() => {
      useLayout(['#sidebar', "#content"])
    })

    return {}
  }
})
</script>

<style>
.container {
  width: 1366px;
  height: 768px;
  display: grid;
  border: 1px solid red;
  grid-template-columns: 30% 70%;
}

.fill-height {
  height: 100%;
}

.sidebar {
  background-color: rgb(253, 181, 86);
}

.content {
  background-color: rgb(46, 206, 126);
}
</style>
