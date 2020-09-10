<template>
  <div class="shop-reviews">
    <textarea
      class="reviews-write"
      v-model="writeArea"
    ></textarea>
    <button
      class="reviews-btn"
      @click="writeSay"
    >参与评论</button><span :class="tig.class"> {{tig.txt}}</span>
    <item title="用户评价"></item>
    <div class="reviews">

      <div v-for="item in data">
        <div class="user">
          <img
            class="headImg"
            :src="item.headImg"
          ><span>{{item.name}}</span></div>
        <span
          v-if="$store.state.app.user&&$store.state.app.user._id==item.userId"
          class="reviews-delete"
          @click="reviewsDelete(item._id)"
        >删除</span>
        <div class="reviews-say">{{item.say}}</div>
        <div class="reviews-time">{{item.time|format}}</div>

        <div>
          <img
            v-if="item.image"
            width="100"
            height="100"
            :src="item.image"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/common/util.js'
import item from './goodComponents/paramItem.vue'
export default {
  name: 'reviews',
  data () {
    return {
      data: [],
      paramsId: '',
      tig: {
        txt: '',
        class: ''
      },
      writeArea: ''
    }
  },
  created () {


  },
  activated () {
    this.paramsId = this.$route.query.paramsId
    const id = this.data.length > 0 ? this.data[0].id : ''
    if (!this.data || id != this.paramsId) {
      this.init()
    }
  },
  deactivated () {
    this.tig.txt = ''
  },
  components: {
    item
  },
  methods: {
    init () {
      this.$get('goodReviews', { id: this.paramsId }).then(res => {
        this.data = res.data
      })
    },
    writeSay () {
      if (this.writeArea.trim() == '') {
        this.tig.txt = '不能发送空评论'
        return this.tig.class = 'err'
      }
      const user = this.$store.state.app.user
      if (!user) {
        this.tig.txt = '未登录不能发送评论'
        this.tig.class = 'err'
      } else {
        this.$post('reviews_say', { userId: user._id, paramsId: this.paramsId, say: this.writeArea }).then(res => {
          this.writeArea = ''
          this.tig.txt = '评论成功'
          this.tig.class = 'suc'
          this.data.push(res.data)
        })
      }
    },
    reviewsDelete (id) {
      this.$post('reviews_delete', { id }).then(res => {
        const index = this.data.findIndex(p => p._id == id)
        this.data.splice(index, 1)
      })
    }
  },
  filters: {
    format (val) {
      const date = new Date(parseInt(val))
      return dateFormat(date, 'YYYY-mm-dd HH:MM:SS')
    }
  }
}
</script>

<style scoped>
.reviews-write {
  width: 80%;
  height: 5rem;
  resize: none;
  margin: 0.5rem;
  outline: 0;
}
.reviews {
  padding: 0 0.8rem;
  margin-top: 0.8rem;
}
.user {
  margin-top: 1rem;
}
.headImg {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 0.5rem;
}
.reviews-say {
  margin: 0.8rem 0;
}
.reviews-time {
  margin-bottom: 1rem;
  color: #888;
}
.err {
  color: #f44;
}
.suc {
  color: #1f8;
}
.reviews-btn {
  width: 5rem;
  height: 1.5rem;
  background-color: #5af;
  border: 0;
  border-radius: 3px;
  margin-left: 0.5rem;
  color: #fff;
}
.reviews-delete {
  text-decoration: underline;
  color: #5af;
  float: right;
}
</style>
