<template>
  <div class="main">
    <div
      class="phone-swipper clearfix"
      ref="swipper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      @transitionend="changeEnd"
    >
      <slot></slot>
    </div>
    <ul
      class="circleCollection"
      v-if="imgCount>1"
    >
      <li
        v-for="(i,index) in imgCount"
        :class="{current:circleCurrent===index}"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    imgCount: {
      type: Number,
      default: 5,
      requied: true
    },
    timeMS: {
      type: Number,
      default: 3000
    },
    proportion: {
      type: Number,
      default: 0.3
    },
    transTime: {
      type: Number,
      default: 0.5
    },
    setTimer: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      current: 1,
      touchStartX: 0,
      imgWidth: 0,
      swipper: {},
      distance: 0,
      timer: null,
      transformFlag: true
    }
  },
  computed: {
    circleCurrent () {
      if (this.current == 0) {
        return this.imgCount - 1
      } else if (this.current == this.trueCount - 1) {
        return 0
      } else {
        return this.current - 1
      }
    },
    trueCount () {
      return this.imgCount + 2
    }
  },
  watch: {
    current (newVal, oldVal) {
      if (this.imgCount <= 1) return
      this.swipper.style.transform = `translateX(${-this.imgWidth * newVal}px)`
    }
  },
  mounted () {
    if (this.imgCount <= 1) {
      this.$nextTick(() => {
        if (this.$refs.swipper.children[0]) {
          return this.$refs.swipper.children[0].width = 100 + '%'
        }
      })
    }
    let timer1 = setInterval(() => {
      this.$nextTick(() => {
        this.swipper = this.$refs.swipper
        if (this.swipper && this.swipper.querySelectorAll('.swipper-item')) {
          let imgList = this.swipper.querySelectorAll('.swipper-item')
          if (imgList && imgList[this.imgCount - 1]) {

            let lastImg = imgList[this.imgCount - 1].cloneNode(true);
            let firstImg = imgList[0].cloneNode(true);

            this.swipper.insertBefore(lastImg, imgList[0]);
            this.swipper.appendChild(firstImg)

            this.swipper.style.width = this.trueCount * 100 + '%'
            this.swipper.style.height = imgList[0].offsetHeight + 'px'

            imgList = this.swipper.querySelectorAll('.swipper-item')
            for (let i = 0; i < this.trueCount; i++) {
              imgList[i].style.width = 100 / this.trueCount + '%'
            }
            lastImg.width = firstImg.width = imgList[0].width
            this.imgWidth = imgList[0].width

            this.swipper.style.transition = '0s'
            this.swipper.style.transform = `translateX(${-this.imgWidth * this.current}px)`
            if (this.setTimer) {
              this.timer = setInterval(() => {
                this.swipper.style.transition = this.transTime + 's'
                this.current++
              }, this.timeMS)
            }
            clearInterval(timer1)
          }
        }
      })
    }, 5)

  },
  methods: {
    touchStart (e) {
      e.preventDefault()
      if (this.imgCount <= 1) return
      this.timer && clearInterval(this.timer)
      if (this.distance) this.distance = 0
      if (!this.transformFlag) return
      this.swipper.style.transition = '0s'
      this.touchStartX = e.touches[0].pageX
      return false
    },
    touchMove (e) {
      e.preventDefault()
      if (this.imgCount <= 1) return
      if (!this.transformFlag) return
      const x = e.touches[0].pageX
      this.distance = x - this.touchStartX
      this.swipper.style.transform = `translateX(${-this.imgWidth * this.current + this.distance}px)`

    },
    touchEnd (e) {
      e.preventDefault()
      if (this.imgCount <= 1) return
      if (!this.transformFlag || !this.distance) return
      if (this.distance >= this.proportion * this.imgWidth) {
        if (this.current >= 0) {
          this.current--
        }
      }
      else if (this.distance <= -this.proportion * this.imgWidth) {
        if (this.current < this.trueCount - 1) {
          this.current++
        }
      }
      this.swipper.style.transition = this.transTime + 's'
      this.swipper.style.transform = `translateX(${-this.imgWidth * this.current}px)`
      if (this.setTimer) {
        this.timer = setInterval(() => {
          this.swipper.style.transition = this.transTime + 's'
          this.current++
        }, this.timeMS)
      }
      this.transformFlag = false
    },
    changeEnd () {
      if (this.imgCount <= 1) return
      this.transformFlag = true
      this.swipper.style.transition = '0s'
      if (this.current >= this.trueCount - 1) {
        this.current = 1
      } else if (this.current <= 0) {
        this.current = this.trueCount - 2
      }
    }
  },
}
</script>

<style lang="less" scoped>
.main {
  overflow: hidden;
  position: relative;
  .phone-swipper {
    transition: all 0.5s;
    .swipper-item {
      float: left;
    }
  }
  .circleCollection {
    padding: 0;
    position: absolute;
    bottom: 0.2rem;
    left: 50%;
    transform: translateX(-50%);
    list-style: none;
    li {
      width: 10px;
      height: 10px;
      background-color: #ccc;
      float: left;
      margin-left: 5px;
      border-radius: 50%;
    }
  }
}
.left {
  float: left;
}
.current {
  background-color: #f44 !important;
}
</style>
