<template>
  <div>
    <nav-bar
      :leftArrow="false"
      backColor="#68a"
    >
      <span slot="center">我的</span>
    </nav-bar>
    <div class="user-head">
      <img
        class="user-headImg"
        :src="user.headImage"
      >
      <div class="user-names">
        <div class="user-name">{{user.name}}</div>
        <div class="user-userName">{{user.userName}}</div>
      </div>
    </div>
    <div class="menu-list">
      <router-link
        class="menu-item"
        tag="div"
        to="/my/star"
      >
        <img
          class="item-img"
          src="~@/assets/images/star.svg"
        >
        <span>我的收藏</span>
      </router-link>

      <router-link
        class="menu-item"
        tag="div"
        to="/my/money"
      >
        <img
          class="item-img"
          src="~@/assets/images/钱包 (1).png"
        >
        <span>我的钱包</span>
      </router-link>

    </div>
  </div>
</template>

<script>
import navBar from '@/components/common/navbar/navBar.vue'
export default {
  data () {
    return {
      user: this.$store.state.app.user,

    }
  },
  components: {
    navBar
  },
  created () {

  },
}
</script>

<style lang="less" scoped>
.user-head {
  height: 5rem;
  border-bottom: 10px solid #eee;
  padding: 4rem 0 0 0.5rem;
  .user-names {
    position: relative;
    display: inline-block;
    height: 4rem;
    top: -1rem;
    left: 0.8rem;
    .user-name {
      font-size: 1.3rem;
    }
    .user-userName {
      color: #999;
    }
  }
  .user-headImg {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
}
.menu-list {
  .menu-item {
    position: relative;
    line-height: 3rem;
    border-bottom: 1px solid #eee;
    padding-left: 3rem;
    .item-img {
      position: absolute;
      width: 1.5rem;
      height: 1.5rem;
      top: 0.6rem;
      left: 0.5rem;
    }
  }
  .menu-item:last-child {
    border-bottom: 10px solid #eee;
  }
}
</style>
