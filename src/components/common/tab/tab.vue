<template>
  <div
    class="tab"
    ref="tab"
  >
    <div
      class="tab-item"
      v-for="item in tabNames"
    >
      <span
        @click="tabClick(item)"
        class="title"
        :class="{current:item===current}"
      >{{item}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabNames: {
      type: Array,
      default () {
        return []
      }
    },
    nowCurrent: String
  },
  data () {
    return {
      current: ''
    }
  },
  created () {
    this.current = this.nowCurrent ? this.nowCurrent : this.tabNames[0]
  },
  watch: {
    nowCurrent () {
      this.current = this.nowCurrent
    }
  },
  methods: {
    tabClick (val) {
      this.current = val
      this.$emit('tabClick', val)
    }
  },
}
</script>

<style lang="less">
.tab {
  z-index: 99;
  background-color: #fff;
  display: flex;
  padding-bottom: 0.5rem;
  .tab-item {
    flex: 1;
    text-align: center;
    .title {
      display: inline-block;
      padding: 0.25rem 0.4rem;
    }
  }
}
.current {
  border-bottom: 2px solid #d66;
  color: #d66;
}
</style>
