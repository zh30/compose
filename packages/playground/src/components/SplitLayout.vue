<template>
  <split-container
    class="split-fill split-row"
    data-gutter="40"
    data-auto-hide
    @hide="onHide">
    <div id="sidebar" class="fill-height"></div>
    <div id="content" class="fill-height"></div>
    <div id="rightbar" class="fill-height" data-split-disable="left|right|both"></div>
<!--    <div v-if="test"></div>-->
    <!--    <split-container class="split-fill split-column">-->
    <!--      <div id="top" class="fill-height"></div>-->
    <!--      <div id="middle" class="fill-height"></div>-->
    <!--      <div id="bottom" class="fill-height"></div>-->
    <!--    </split-container>-->
  </split-container>
</template>

<script>
import { defineComponent, onMounted, nextTick, ref } from 'vue'

export default defineComponent({
  name: 'VSplitLayout',
  setup() {
    const test = ref(false)

    function onHide(arg) {
      console.log('onHide', arg)
    }

    onMounted(() => {
      setInterval(() => {
        test.value = !test.value
      }, 1000)
    })
    return {
      onHide,
      test
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
  margin: 20px;
  background-color: rgb(46, 206, 126);
}

#rightbar {
  width: 400px;
  background-color: #ec3f3f;
}

#top {
  background-color: red;
}

#middle {
  background-color: yellow;
}

#bottom {
  background-color: blue;
}


.split-gutter {
  height: 100%;
  width: 20px;
  background-color: orange;
  cursor: w-resize;
  position: fixed;
}
</style>
