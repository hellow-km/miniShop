<template>
  <div>
    <good-list
      :data="info"
      @itemClick="itemClick"
    ></good-list>
  </div>
</template>

<script>
import goodList from '../common/goodsLi.vue'
export default {
  name: 'giveGood',
  data () {
    return {
      info: [],
      keepAlive: true
    }
  },
  components: {
    goodList
  },
  created () {
    this.$get('home_data', {
      type: this.$route.query.type,
      page: Math.floor(Math.random() * 6),
      pageSize: 20
    }).then(res => {
      this.info = res.data
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name == 'goodInfo') {
      to.meta.keepAlive = this.keepAlive
    }
    next()
  },
  activated () {
    this.keepAlive = true
  },
  methods: {
    itemClick (item) {
      this.keepAlive = false
      this.$router.replace({
        path: '/info',
        query: {
          paramsId: item.id,
          infoId: item._id,
          type: this.$route.query.type
        }
      })
    }
  },
}
</script>

<style>
</style>
