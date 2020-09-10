<template>
  <div id="app">
    <keep-alive include="home">
      <router-view />
    </keep-alive>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import tabBar from './views/mainTabBar.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    tabBar
  },
}
</script>
<style>
@import "assets/css/base.less";
</style>
