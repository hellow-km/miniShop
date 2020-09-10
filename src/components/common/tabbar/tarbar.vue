<template>
  <div class="tab-bar">
    <slot>
    </slot>
  </div>
</template>

<script>
import tarbarItem from './tarbarItem.vue'
export default {
  components: {
    tarbarItem
  }
}

</script>

<style scoped>
.tab-bar {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3.2rem;
  background-color: #f6faf6;
  box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.1);
  z-index: 9000;
}
</style>
