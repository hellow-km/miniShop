<template>
  <div class="recommend clearfix">
    <div
      class="recommend-item"
      v-for="item in recommend"
    >
      <a href="javascript:;">
        <div>
          <img :src="item.image">
        </div>
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommend: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less">
.recommend {
  display: flex;
  height: 130px;
  margin-top: 15px;
  border-bottom: 8px solid #eee;
  .recommend-item {
    flex: 1;
    text-align: center;
    float: left;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
}
</style>
