<template>
  <div id="home">
    <nav-bar
      backColor="#f99"
      :leftArrow="false"
      ref="nav"
    >
      <span
        slot="center"
        class="title"
      >购物街</span>
    </nav-bar>
    <div>
      <b-scroll
        @scroll="scroll"
        ref="homeScroll"
        :probeType="3"
        @pullingUp="pageRequest"
        isPullUp
        :canLoad="goodsList[tabName].canLoad"
        @scrollStart="scrollStart"
        height="75vh"
      >
        <home-swipper
          v-if="imgList.length>0"
          :imgList="imgList"
          @imgLoad="imgLoad"
        />
        <recommend
          v-if="recommendList.length>0"
          :recommend="recommendList"
        />
        <a href="javascript:;">
          <img
            src="@/assets/images/recommend_bg.jpg"
            width="100%"
          >
        </a>
        <tab
          :tabNames="tabList"
          :nowCurrent="tabCurrentName"
          @tabClick="tabToggle"
          ref="tab"
          class="innerTab"
          v-show="!fixedTabShow"
        />
        <goodLi
          :data="nowTabData"
          @itemClick="goodClick"
        ></goodLi>
        <p
          class="good-loading"
          v-if="goodsList[tabName].canLoad"
        >loading...</p>
        <p
          class="good-loading"
          v-else
        >没有更多了</p>
      </b-scroll>
      <backTop
        v-show="toTopVisible"
        @click.native="toTop"
      ></backTop>
      <tab
        :tabNames="tabList"
        @tabClick="tabToggle"
        :nowCurrent="tabCurrentName"
        class="fixedTab"
        ref="fixedTab"
        v-show="fixedTabShow"
      />
    </div>
  </div>
</template>

<script>
import navBar from '@/components/common/navbar/navBar.vue'
import tab from '@/components/common/tab/tab.vue'
import homeSwipper from './homeChildren/homeSwipper.vue'
import recommend from './homeChildren/recommend.vue'
import goodLi from '../common/goodsLi.vue'
import bScroll from '@/components/common/betterScroll.vue'
import backTop from '@/components/content/backTop.vue'
export default {
  name: 'home',
  data () {
    return {
      imgList: [],
      recommendList: [],
      tabCurrentName: '流行',
      tabList: ['流行', '新款', '精选'],
      page: 1,
      goodsList: {
        fashion: { page: 0, data: [], canLoad: true, y: 0 },
        news: { page: 0, data: [], canLoad: true, y: 0 },
        select: { page: 0, data: [], canLoad: true, y: 0 }
      },
      nowTabData: [],
      toTopVisible: false,
      pageSize: 16,
      tabOffsetTop: 0,
      fixedTabShow: false,
      navHeight: 0,
      prevTab: '',
      savePageY: 0
    }
  },
  components: {
    navBar,
    homeSwipper,
    recommend,
    tab,
    goodLi,
    bScroll,
    backTop
  },
  computed: {
    tabName () {
      const obj = {
        '流行': 'fashion',
        '新款': 'news',
        '精选': 'select'
      }
      return this.tabCurrentName ? obj[this.tabCurrentName] : 'fashion'
    }
  },
  watch: {
    tabCurrentName (newVal, oldVal) {
      this.$refs['homeScroll'].stop()
      this.nowTabData = this.goodsList[this.tabName].data
      this.$refs['homeScroll'].closePullUp()
      const y = this.goodsList[this.tabName].y
      setTimeout(() => {
        this.$refs['homeScroll'].scrollTo(0, y, 1)
        this.$refs['homeScroll'].openPullUp()
      }, 200)
    }
  },
  created () {
    this.$get('multidata', {}, {
      instanceNum: 1
    }).then(res => {
      this.imgList = res.data.data.banner.list;
      this.recommendList = res.data.data.recommend.list
    })
    const requests = ['fashion', 'news', 'select']
    requests.forEach((item, index) => {
      this.requestData({
        type: item,
        page: this.goodsList[item].page,
        pageSize: this.pageSize + index * 2,
        callback: (res) => {
          this.goodsList[item].data = res.data
          if (item == this.tabName) {
            this.nowTabData = res.data
          }
        }
      })
    })

  },
  mounted () {
    // const refresh = this.debounce(this.$refs.homeScroll.refresh, 50)
    // this.$bus.$on('imgIsLoad', () => {
    //   refresh()
    // })
  },
  activated () {
  },
  deactivated () {
    this.$refs['homeScroll'].stop()
  },
  methods: {
    debounce (fuc, delay) {
      let timer = null
      return () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          fuc.apply(this)
        }, delay)
      }
    },
    tabToggle (val) {
      this.tabCurrentName = val
    },
    requestData (options) {
      this.$get('home_data', {
        type: options.type,
        page: options.page,
        pageSize: options.pageSize
      },
        {
          instanceNum: 2
        }).then(res => {
          options.callback && options.callback(res)
        })
    },
    scroll (p) {
      this.goodsList[this.tabName].y = p.y
      this.toTopVisible = -p.y >= 900 ? true : false
      if (this.tabOffsetTop) {
        if (-p.y >= this.tabOffsetTop - this.navHeight) {
          this.fixedTabShow = true
        } else {
          this.fixedTabShow = false
        }
      }
    },
    toTop () {
      this.$refs['homeScroll'].scrollTo(0, 0)
    },
    pageRequest () {
      this.goodsList[this.tabName].page++
      this.requestData({
        type: this.tabName,
        page: this.goodsList[this.tabName].page,
        pageSize: this.pageSize,
        callback: res => {
          const tabName = this.tabName
          setTimeout(() => {
            if (res.data.length === 0) return this.goodsList[tabName].canLoad = false
            this.goodsList[tabName].data.push(...res.data)
          }, 500)
        }
      })
    },
    scrollStart () {
      this.$refs.homeScroll.refresh()
    },
    imgLoad () {
      setTimeout(() => {
        this.tabOffsetTop = this.$refs.tab.$el.offsetTop
        this.navHeight = this.$refs.nav.$el.offsetHeight
        this.$refs.fixedTab.$el.style.top = this.navHeight + 'px'
        for (const key in this.goodsList) {
          this.goodsList[key].y = -(this.tabOffsetTop)
        }
      }, 50)
    },
    goodClick (item) {
      this.$router.push({
        path: '/info',
        query: {
          type: this.tabName,
          infoId: item._id
        }
      })
    }
  },
}
</script>

<style scoped>
.title {
  font-weight: 600;
  color: #eee;
}
#home {
  padding: 2.8rem 0 4rem 0;
  overflow: hidden;
}
.good-loading {
  text-align: center;
  font-size: 1.5rem;
  opacity: 0.5;
}
.fixedTab {
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
}
.innerTab {
  position: fixed;
  left: 0;
  right: 0;
}
</style>
