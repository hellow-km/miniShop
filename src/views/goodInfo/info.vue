<template>
  <div class="info">
    <navbar
      @leftArrowClick="goBack()"
      :backColor="'#fff'"
      class="navbar"
    >
      <ul
        class="nav clearfix"
        slot="center"
      >
        <li
          v-for="(val,key,index) in navLis"
          :class="{infoCurrent:navCurrent===key}"
          @click="navClick(key)"
        >{{val}}</li>
      </ul>
    </navbar>
    <b-scroll
      ref="infoScroll"
      height="70vh"
      @scrollStart="scrollStart"
    >

      <keep-alive :exclude="notCached">
        <router-view @getParamsId="getParamsId"></router-view>
      </keep-alive>
    </b-scroll>
    <bottom-bar
      :redStar="redStar"
      @starGood="starGood"
      @intoCart="intoCart"
      :cartTxt="cartTxt"
    ></bottom-bar>
  </div>
</template>

<script>
import navbar from '@/components/common/navbar/navBar.vue'
import bScroll from '@/components/common/betterScroll.vue'
import bottomBar from './goodComponents/bottomBar.vue'
export default {
  name: 'info',
  data () {
    return {
      navLis: { goodInfo: '商品', params: '参数', reviews: '评论', giveGood: '推荐' },
      navCurrent: '',
      goodInfoId: '',
      goodInfoType: '',
      paramsId: '',
      notCached: this.$store.state.app.infoNotCache,
      redStar: false,
      user: '',
      cartTxt: ''
    }
  },
  components: {
    navbar,
    bScroll,
    bottomBar
  },
  created () {
    this.goodInfoId = this.$route.query.infoId
    this.paramsId = this.$route.query.paramsId
    this.goodInfoType = this.$route.query.type
    this.navCurrent = this.$route.name
    this.star_cartInit()
  },
  mounted () {
    this.$refs.infoScroll.scrollTo(0, 0)
  },
  watch: {
    $route () {
      this.goodInfoId = this.$route.query.infoId
      this.paramsId = this.$route.query.paramsId
      this.goodInfoType = this.$route.query.type
      this.navCurrent = this.$route.name
      this.notCached = this.$store.state.app.infoNotCache
      this.star_cartInit()
    }
  },
  methods: {
    scrollStart () {
      this.$refs.infoScroll.refresh()
    },
    navClick (key) {
      this.navCurrent = key
      this.$refs.infoScroll.scrollTo(0, 0)
      const type = this.goodInfoType
      if (this.$route.name != this.navCurrent) {
        this.$router.replace({
          name: key,
          query: {
            paramsId: this.paramsId,
            infoId: this.goodInfoId,
            type
          }
        })
      }
    },
    star_cartInit () {
      this.user = this.$store.state.app.user
      if (!this.user) return this.cartTxt = '加入购物车'
      if (this.user.starGoods.length > 0) {
        this.redStar = this.user.starGoods.some(p => p.goodId == this.goodInfoId)
      } else {
        this.redStar = false
      }
      if (this.user.cartGoods.length > 0) {
        this.cartTxt = this.user.cartGoods.some(p => p.goodId == this.goodInfoId) ? '已加入购物车' : '加入购物车'
        this.user.cartGoods.some(p => {
          p.goodId == this.goodInfoId
        })
      } else {
        this.cartTxt = '加入购物车'
      }
    },
    starGood () {
      if (!this.user) {
        return this.$router.push('/login')
      }
      this.$post('info_star_good', {
        userId: this.user._id,
        infoId: this.goodInfoId,
        type: this.goodInfoType
      }).then(res => {
        this.redStar = !this.redStar
        let index = 0
        const has = this.user.starGoods.some((p, i) => {
          index = i
          return p.goodId == this.goodInfoId
        })
        if (has) {
          this.user.starGoods.splice(index, 1)
        } else {
          this.user.starGoods.push({
            goodId: this.goodInfoId,
            type: this.goodInfoType,
          })
        }
      })
    },
    intoCart () {
      if (!this.user) {
        return this.$router.push('/login')
      }
      if (this.cartTxt == '已加入购物车') {
        return false
      }
      this.cartTxt = '已加入购物车'

      this.$post('info_cart_good', {
        userId: this.user._id,
        infoId: this.goodInfoId,
        type: this.goodInfoType
      }).then(res => {
        let index = 0
        const has = this.user.cartGoods.some((p, i) => {
          index = i
          return p.goodId == this.goodInfoId
        })
        if (has) {
          this.user.cartGoods.splice(index, 1)
        } else {
          this.user.cartGoods.push({
            goodId: this.goodInfoId,
            type: this.goodInfoType,
            count: 1
          })
        }
      })
    },
    getParamsId (id) {
      this.paramsId = id
    },
    goBack () {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="less">
.info {
  height: 100vh;
  position: relative;
  z-index: 9999;
  font-size: 0.9rem;
  padding-top: 3rem;
  background-color: #f8f8f8;
}
.navbar {
  z-index: 99999 !important;
}
.nav {
  padding: 0;
  display: flex;
  list-style: none;
  width: 80%;
  margin: 0 auto;
  li {
    float: left;
    flex: 1;
    font-size: 0.9rem;
  }
}
.infoCurrent {
  color: #f88;
}
</style>
