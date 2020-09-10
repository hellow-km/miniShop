<template>
  <div>
    <nav-bar
      :leftArrow="false"
      backColor="#68a"
    >
      <span slot="center">收藏</span>
    </nav-bar>
    <div class="my-star">
      <div
        class="star clearfix"
        v-for="item in data"
        @click="linkTo(item)"
      >
        <img
          class="star-img"
          :src="item.image"
        >
        <div class="star-mes">
          <div class="star-title">{{item.title}}</div>
          <div class="star-price"><span class="red">￥{{item.newPrice}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/common/navbar/navBar.vue'
export default {
  data () {
    return {
      data: [],
      user: ''
    }
  },
  components: {
    navBar
  },
  created () {
    this.user = this.$store.state.app.user
    if (!this.user) return
    let params = {
      fashion: [],
      news: [],
      select: [],
    }
    this.user.starGoods.map(p => {
      params[p.type].push(p.goodId)
    })
    this.$post('my_star', params).then(res => {
      this.data = res.data
    })
  },
  methods: {
    linkTo (item) {
      const title = item.title
      const index = title.match(/\d/).index
      const type = title.substr(0, index)
      this.$router.push({
        path: '/info',
        query: {
          paramsId: item.id,
          infoId: item._id,
          type
        }
      })
    }
  },
}
</script>

<style scoped>
.my-star {
  padding-top: 3.2rem;
}
.star {
  height: 5rem;
  margin: 0.5rem 0 0 0;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.8rem;
}
.star-img {
  height: 5rem;
  vertical-align: middle;
  float: left;
  border-radius: 5px;
  margin-left: 0.5rem;
}
.star-title {
  height: 3.3rem;
}
.star-price {
  height: 1.8rem;
}
.red {
  color: #f88;
}
.star-mes {
  margin-left: 5rem;
}
</style>
