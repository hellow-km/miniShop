<template>
  <div class="bottom-bar">
    <div class="menus">
      <div class="left bar-menu">
        <div><img src="@/assets/images/客服.png"></div>
        <span>客服</span>
      </div>
      <div class="left bar-menu">
        <div><img src="@/assets/images/店铺.png"></div>
        <span>店铺</span>
      </div>
      <div class="left bar-menu">
        <div>
          <img
            v-if="redStar"
            src="@/assets/images/star-active.svg"
          >
          <img
            v-else
            src="@/assets/images/star.svg"
          >
        </div>
        <span @click="starGood">{{redStar?'已收藏':'收藏'}}</span>
      </div>
    </div>
    <div class="oprate">
      <div
        class="left bar-shopping"
        @click="intoCart"
      >{{cartTxt}}</div>
      <div
        class="left bar-pay"
        @change="buyGood"
      >购买</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    redStar: {
      type: Boolean,
      default: false
    },
    cartTxt: {
      type: String
    }
  },
  data () {
    return {

    }
  },
  methods: {
    starGood () {
      this.$emit('starGood')
    },
    intoCart () {
      this.$emit('intoCart')
    },
    buyGood () {
      this.$emit('buyGood')
    }
  },
}
</script>

<style lang="less" scoped>
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  height: 3.5rem;
  display: flex;
  .menus {
    flex: 4;
    .bar-menu {
      margin: 0.3rem 0.8rem;
      text-align: center;
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
  .oprate {
    flex: 4;
    .bar-shopping {
      line-height: 3.5rem;
      background-color: #ff1;
      text-indent: 10px;
      width: 60%;
      text-align: center;
    }
    .bar-pay {
      line-height: 3.5rem;
      background-color: #f88;
      text-align: center;
      color: #fff;
      width: 40%;
    }
  }
}
</style>
