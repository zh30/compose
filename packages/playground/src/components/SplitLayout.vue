<template>
  <split-container
    class="split-fill split-row"
    data-gutter="20"
    data-auto-hide
    @hide="onHide">
    <div id="sidebar" class="fill-height" data-split="{size: 100}"></div>
    <div id="content" class="fill-height"></div>
    <split-container class="split-fill split-column" data-direction="column">
      <div id="top" class="fill-height"></div>
      <div id="middle" class="fill-height"></div>
      <div id="bottom" class="fill-height"></div>
    </split-container>
  </split-container>
</template>

<script>
import { defineComponent, onMounted, nextTick, ref } from 'vue'

export default defineComponent({
  name: 'VSplitLayout',
  setup() {
    function onHide(arg) {
      console.log('onHide', arg)
    }

    return {
      onHide
    }
  }
})
</script>

<style>

.fill-height {
  height: 100%;
}

#sidebar {
  min-width: 300px;
  background-color: rgb(253, 181, 86);
}

#content {
  width: 100%;
  background-color: rgb(46, 206, 126);
}

#top {
  background-color: red;
}
#middle {
  background-color: yellow;
  border: 10px solid black;
  margin: 20px;
}
#bottom {
  background-color: blue;
}

</style>
