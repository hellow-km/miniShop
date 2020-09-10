<template>
  <div>
    <nav-bar
      :leftArrow="false"
      backColor="#68a"
    >
      <span slot="center">钱包</span>
    </nav-bar>
    <div class="money-page">
      <div class="money">
        <div class="money-mes">
          <div class="money-num">{{user.money.toFixed(2)}}</div>
          <div>余额</div>
        </div>
      </div>
      <div class="money-opetare">
        <div
          class="money-invest"
          @click="invest"
        ><span class="invest-border">充值</span></div>
        <div class="money-outAway">消费明细</div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/common/navbar/navBar.vue'
export default {
  data () {
    return {
      user: ''
    }
  },
  components: {
    navBar
  },
  created () {
    this.user = this.$store.state.app.user
  },
  methods: {
    invest () {
      this.$router.push({
        path: '/my/invest'
      })
    }
  },
}
</script>

<style scoped>
.money {
  background: url("~@/assets/images/timg.jpg") no-repeat;
  background-size: cover;
  height: 10rem;
  text-align: center;
  position: relative;
}
.money-mes {
  position: relative;
  top: 5rem;
  color: #fff;
}
.money-num {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}
.money-page {
  padding-top: 2.8rem;
}
.money-opetare {
  display: flex;
  line-height: 3rem;
  border-bottom: 1px solid #eee;
}
.money-invest {
  flex: 1;
  text-align: center;
  background: url("~@/assets/images/钱包.png") no-repeat center;
  background-position-x: 3.5rem;
  background-size: 1rem 1rem;
}
.money-outAway {
  flex: 1;
  text-align: center;
  background: url("~@/assets/images/明细.png") no-repeat center;
  background-position-x: 2.5rem;
  background-size: 1rem 1rem;
}
.invest-border {
  padding: 0 40%;
  border-right: 1px solid #eee;
}
</style>
