<template>
  <swipper :imgCount="imgList.length">

    <img
      v-for="item in imgList"
      class="swipper-item"
      :src="item.image"
      @load="swipperImgLoading"
    >
    <!-- <img
        class="swipper-item"
        src="@/assets/images/taobao/sofa/sofa (1).jpg"
      >
      <img
        class="swipper-item"
        src="@/assets/images/taobao/sofa/sofa (2).jpg"
      > -->
  </swipper>
</template>

<script>
import swipper from '@/components/common/swipper/swipper.vue'
export default {
  props: {
    imgList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    swipper
  },
  data () {
    return {
      flag: true
    }
  },
  methods: {
    swipperImgLoading () {
      if (this.flag) {
        this.$emit('imgLoad')
        this.flag = false
      }
    }
  },
}
</script>

<style scoped>
.swipper-item {
  height: 10rem;
}
</style>
