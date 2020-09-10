<template>
  <div
    class="nav-bar"
    :style="{'background-color':backColor}"
  >
    <div class="nav-left">
      <slot name="left">
        <span
          v-if="leftArrow"
          class="left-arrow"
          @click="leftArrowClick"
        >&lt;</span>
      </slot>
    </div>
    <div class="nav-center">
      <slot name="center"></slot>
    </div>
    <div class="nav-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backColor: {
      type: String,
      default: ''
    },
    leftArrow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    leftArrowClick () {
      this.$emit('leftArrowClick')
    }
  },
}
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2.8rem;
  display: flex;
  box-shadow: 0px 1px 1px rgba(88, 88, 88, 0.2);
  z-index: 9;
}
.nav-left,
.nav-right {
  font-size: 1.5rem;
  flex: 1;
  line-height: 2.8rem;
  margin-left: 1rem;
}
.nav-center {
  flex: 6;
  text-align: center;
  line-height: 2.8rem;
  font-size: 1.2rem;
}
.left-arrow {
  color: #bbb;
  font-weight: 600;
}
</style>
