<template>
  <div class="params">
    <param-item
      v-for="(value,key) in lists"
      :title="value"
      :txt="paramsData[key]"
      :class="{split:key=='bustWidth'}"
      :key="value.id"
    ></param-item>
  </div>
</template>

<script>
import paramItem from './goodComponents/paramItem.vue'
export default {
  name: 'params',
  data () {
    return {
      paramsData: {},
      lists: {
        size: '尺寸',
        shoulderWidth: '肩宽',
        closeWidth: '衣长',
        bustWidth: '胸围',
        design: '图案',
        company: '厂名',
        season: '季节',
        color: '颜色',
        address: '厂址',
        texture: '材质',
        collarType: '领型',
      },
      paramsId: ''
    }
  },
  components: {
    paramItem
  },
  created () {

  },
  activated () {
    this.paramsId = this.$route.query.paramsId
    if (!this.paramsData || this.paramsData.id !== this.paramsId) {
      this.init()
    }
  },
  methods: {
    init () {
      this.$get('goodParams', { id: this.paramsId }).then(res => {
        const data = res.data
        data.shoulderWidth = data.shoulderWidth[0].split(',')
        this.paramsData = data
      })
    }
  },
}
</script>

<style>
.split {
  border-bottom: 7px solid #eee;
}
</style>
