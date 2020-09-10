<template>
  <div class="goods">
    <div
      class="goods-item"
      v-for="item in data"
      @click="itemClick(item)"
    >
      <div>
        <img
          class="good-img"
          :src="item.image"
          @load="imgLoad"
        >
      </div>
      <div class="good-title">{{item.title}}</div>
      <div class="good-mes">
        ￥<span class="good-price">{{item.newPrice}}</span>
        <span class="good-stars">
          <img
            class="star"
            src="@/assets/images/star.svg"
          >{{item.star}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
  },
  mounted () {

  },
  methods: {
    imgLoad () {
      //this.$bus.$emit('imgIsLoad')
    },
    itemClick (item) {
      this.$emit('itemClick', item)
    }
  },
}
</script>

<style lang="less" scoped>
.goods {
  padding: 0 1rem;
  display: flex;
  flex-wrap: wrap;
  // width: 100%;
  justify-content: center;
  .goods-item {
    width: 45%;
    margin: 0.25rem 0.3rem;
    border-radius: 5px;
    .good-img {
      width: 100%;
    }
    .good-mes,
    .good-title {
      text-align: center;
      .good-price {
        color: #f44;
      }
    }
    .good-mes {
      margin-top: 0.2rem;
      font-size: 0.95rem;
      .good-stars {
        color: #444;
        font-size: 0.8rem;
        margin-left: 0.8rem;
        .star {
          vertical-align: top;
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
