<template>
  <div
    id="bScroll"
    ref="bScroll"
  >
    <div
      class="content"
      ref="content"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import bScroll from 'better-scroll'
import Pullup from '@better-scroll/pull-up'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    isPullUp: {
      type: Boolean,
      default: false
    },
    canLoad: {
      type: Boolean,
      default: false
    },
    height: {
      type: String
    }
  },
  data () {
    return {
      scroll: null,
      contentHeight: 0,
      bScrollHeight: 0
    }
  },
  created () {

  },
  mounted () {
    this.scroll = new bScroll(this.$refs.bScroll, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.isPullUp
    })

    this.scroll.on('scrollStart', () => {
      this.$emit('scrollStart')
    })

    this.scroll.on('scroll', (p) => {
      this.$emit('scroll', p)
    })
    if (this.isPullUp) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        if (this.canLoad) {
          this.scroll.finishPullUp()
        }
      })
    }
    this.$refs.bScroll.style.height = this.height
  },
  methods: {
    scrollTo (x, y, time = 500) {
      this.scroll.scrollTo(x, y, 500)
    },
    refresh () {
      this.scroll.refresh()
    },
    closePullUp () {
      this.scroll.closePullUp()
    },
    openPullUp () {
      this.scroll.openPullUp({ pullUpLoadOptions: true })
    },
    stop () {
      this.scroll.stop()
    }
  },
}
</script>

<style scoped>
.content {
}
</style>
