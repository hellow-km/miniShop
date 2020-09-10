<template>
  <swipper
    :imgCount="data.length"
    :setTimer="false"
    ref="swipper"
  >
    <img
      v-for="(item,index) in data"
      class="swipper-item"
      :src="item"
    >
  </swipper>
</template>

<script>
import swipper from '@/components/common/swipper/swipper.vue'
export default {
  name: 'goodSwipper',
  props: {
    imgList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      data: [],
      visible: true
    }
  },
  created () {
  },
  watch: {
    imgList () {
      this.data = this.imgList
    }
  },
  activated () {

  },
  components: {
    swipper
  },
  methods: {
    refresh () {

    }
  },
}
</script>

<style>
.swipper-item {
  height: 15rem;
}
</style>
