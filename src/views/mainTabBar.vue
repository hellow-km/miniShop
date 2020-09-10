<template>
  <tarbar>
    <tarbar-item
      imgUrl="/images/home"
      title="首页"
      to="/home"
    />
    <!-- <tarbar-item
      imgUrl="/images/list"
      title="分类"
      to="/list"
    /> -->
    <tarbar-item
      imgUrl="/images/cart_empty"
      title="购物车"
      ext=".png"
      to="/cart"
    />
    <tarbar-item
      imgUrl="/images/my"
      title="我的"
      to="/my"
    />
  </tarbar>
</template>

<script>
import tarbar from '@/components/common/tabbar/tarbar.vue'
import tarbarItem from '@/components/common/tabbar/tarbarItem.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    tarbar, tarbarItem
  }
}
</script>

<style>
</style>
