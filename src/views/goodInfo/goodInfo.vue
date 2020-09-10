<template>
  <div class="goodInfo">
    <div class="good">
      <swipper
        :imgList="info.swipperImgs"
        ref="goodSwipper"
      />
      <div class="good-mes">
        <div class="good-upMes">
          <p>{{info.title}}</p>
          <span v-if="info.newPrice">
            <span class="good-newPrice">￥{{info.newPrice}}</span>
            <span class="good-oldPrice">￥{{info.price}}</span>
            <img
              class="specialPrice"
              src="~@/assets/images/specialPrice.jpg"
            >
          </span>
          <span
            class="good-newPrice"
            v-else
          >￥{{info.price}}</span>
        </div>
        <div class="good-downMes">
          <div class="good-sell gray">
            <span class="left">销量 {{info.sells}}</span>
            <span>收藏{{info.star}}人</span>
            <span class="right">{{info.sendTime}}</span>
          </div>
          <div class="good-back">
            <span class="left">退货补运费</span>
            <span>全国包邮</span>
            <span class="right">7天无理由退货</span>
          </div>
        </div>
      </div>
      <div class="hr"></div>
      <div class="shop-mes clearfix">
        <div class="shop-title">
          <img
            class="shop-logo"
            :src="info.shopLogo"
          >
          <span>{{info.shopName}}</span>
        </div>
        <div class="shop-score clearfix">
          <div class="left good-sell-mes clearfix">
            <label class="left shop-label">
              <div>{{allSells}}</div>
              <div class="shop-letter">总销量</div>
            </label>
            <label class="left shop-label shop-good-count">
              <div>{{info.allGoods}}</div>
              <div class="shop-letter">全部宝贝</div>
            </label>
          </div>
          <div class="left good-score">
            <div>
              <span>描述相符 </span><span>{{info.sayScore}}</span>
              <span
                class="high"
                v-if="info.sayScore>=4.5"
              >高</span>
              <span
                class="low"
                v-else
              >低</span>
            </div>
            <p class="price-score">
              <span>价格合理 </span><span>{{info.priceScore}}</span>
              <span
                class="high"
                v-if="info.priceScore>=4.5"
              >高</span>
              <span
                class="low"
                v-else
              >低</span>
            </p>
            <div>
              <span>质量满意 </span><span>{{info.goodScore}}</span>
              <span
                class="high"
                v-if="info.goodScore>=4.5"
              >高</span>
              <span
                class="low"
                v-else
              >低</span>
            </div>
          </div>
        </div>

        <div class="btn-div">
          <button
            @click="toShop"
            class="shop-btn"
          >进店逛逛</button>
          <p v-show="showToShopMes">功能未实现</p>
        </div>
      </div>
      <div class="hr"></div>

      <div class="downPage">
        <p class="downPage-title">
          {{info.message}}
        </p>
        <div>
          穿着效果
          <img
            width="100%"
            height="80"
            src="@/assets/images/advertise.jpg"
          >
          <img
            v-for="(item,index) in info.goodImg"
            width="100%"
            :src="item"
            @load="imgLoad(index===info.goodImg.length-1)"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import infoData from './goodData.js'
import swipper from './goodComponents/goodSwipper.vue'
export default {
  name: 'goodInfo',
  data () {
    return {
      info: {},
      params: {},
      showToShopMes: false,
      infoId: '',
      type: '',
    }
  },
  components: {
    swipper,
  },
  computed: {
    allSells () {
      return (this.info.allSells / 10000).toFixed(2) + '万'
    }
  },
  created () {
    const keepAlive = this.$route.meta.keepAlive
    this.infoId = this.$route.query.infoId
    this.type = this.$route.query.type
    if (!keepAlive) {
      this.init()
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$route.meta.keepAlive = true
    next()
  },
  activated () {
    const keepAlive = this.$route.meta.keepAlive
    if (keepAlive) {
      this.infoId = this.$route.query.infoId
      this.type = this.$route.query.type
      if (!this.info || this.info._id !== this.infoId) {
        this.init()
      }
    }
  },
  methods: {
    init () {
      infoData(this.infoId, this.type).then(res => {
        this.info = res
        this.$emit('getParamsId', this.info.id)
      })
    },
    imgLoad (is) {
      // if (is) {
      //   this.$refs.infoScroll.refresh()
      // }
    },
    toShop (e) {
      e.preventDefault();
      this.showToShopMes = true
      setTimeout(() => {
        this.showToShopMes = false
      }, 1000)
    }
  },
}
</script>

<style lang="less" scoped>
.high {
  background-color: #2a6;
}
.low {
  background-color: #f66;
}
.high,
.low {
  padding: 0 0.1rem;
  color: #fff;
  margin-left: 0.25rem;
}

.gray {
  color: #ccc;
}
.hr {
  height: 0.3rem;
  background-color: #eee;
  margin-bottom: 2rem;
}
.goodInfo {
  .good {
    padding: 0 0.5rem;
    font-family: "Microsoft Yahei";
    .good-mes {
      .good-upMes {
        height: 7rem;
        p {
          font-size: 1.5rem;
        }
        .good-newPrice {
          font-size: 1.5rem;
          color: #f66;
        }
        .good-oldPrice {
          color: #ccc;
          font-size: 0.75rem;
          text-decoration: line-through;
          margin-left: 0.2rem;
        }
        .specialPrice {
          width: 3.5rem;
          height: 1.8rem;
          margin-left: 0.5rem;
        }
      }
      .good-sell {
        font-size: 0.9rem;
        text-align: center;
      }
      .good-back {
        padding: 1.8rem 0;
        text-align: center;
        font-size: 0.8rem;
        span {
          display: inline-block;
          line-height: 1.2rem;
          background: url("~@/assets/images/成功.svg") no-repeat left;
          background-size: 1.2rem 1.2rem;
          padding-left: 1.5rem;
        }
      }
    }
  }
}

.shop-mes {
  .shop-title {
    .shop-logo {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 0.5rem;
    }
  }
  .shop-score {
    .good-sell-mes {
      margin-top: 1.5rem;
      padding-left: 1.5rem;
      .shop-label {
        text-align: center;
        div:last-child {
          margin-top: 0.5rem;
        }
        .shop-letter {
          font-size: 0.8rem;
        }
      }
      .shop-good-count {
        padding: 0 1.5rem;
        border-right: 2px solid #eee;
      }
    }
    .good-score {
      width: 9rem;
      text-align: center;
      margin: 0.7rem 0 0 1rem;
      font-size: 0.8rem;
      .price-score {
        margin: 0.5rem 0;
      }
    }
  }
  .btn-div {
    height: 5rem;
    text-align: center;
    .shop-btn {
      margin-top: 2rem;
      border-radius: 10px;
      width: 10rem;
      line-height: 1.8rem;
      border: 0;
      background-color: #eee;
    }
  }
}
.downPage {
  .downPage-title {
    margin: 0;
    padding: 1rem 0;
    font-size: 0.88rem;
    background: url("~@/assets/images/线.png") no-repeat left top,
      url("~@/assets/images/线.png") no-repeat right bottom;
    background-size: 5rem 1rem;
  }
}
</style>
