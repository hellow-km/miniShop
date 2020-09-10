<template>
  <div>
    <nav-bar
      backColor="#68a"
      @leftArrowClick="leftArrowClick"
    >
      <span slot="center">充值</span>
    </nav-bar>
    <div class="invest">
      <div>
        <input
          class="invest-ipt"
          type="number"
          placeholder="充值金额"
          v-model="investMoney"
        >
      </div>
      <button
        class="invest-btn"
        @click="invest"
      >充值</button>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/common/navbar/navBar.vue'
export default {
  data () {
    return {
      user: '',
      investMoney: ''
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
      this.$post('invest', { userId: this.user._id, money: this.investMoney }).then(res => {
        this.user.money += parseFloat(this.investMoney)
        alert('充值成功')
        this.investMoney = ''
      }).catch(err => {
        console.log(err);
      })
    },
    leftArrowClick () {
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
.invest {
  width: 100%;
  padding-top: 4rem;
}
.invest-ipt {
  width: 80%;
  height: 2rem;
  text-indent: 5px;
}
.invest-btn {
  margin-top: 0.5rem;
  width: 80%;
  height: 2rem;
}
</style>
