<template>
  <div class="cart clearfix">
    <div class="cart-check">
      <input
        class="cart-checkbox"
        type="checkbox"
        :id="'red-check'+index"
        @change="itemCheck"
        v-model="itemChecked"
      ><label :for="'red-check'+index"></label>
    </div>
    <img
      class="cart-img"
      :src="data.image"
    >
    <div class="cart-mes">
      <div class="cart-title">{{data.title}}</div>
      <div class="cart-price"><span class="red">￥{{data.newPrice}}</span>
        <div class="cart-count">
          <button
            class="cart-btn"
            @click="updateCount(1)"
          >+</button>
          <span>{{goodCount}}</span>
          <button
            class="cart-btn"
            @click="updateCount(-1)"
            :disabled="goodCount<=1"
          >-</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    index: {
      type: Number
    },
    checked: Boolean
  },
  data () {
    return {
      itemChecked: false
    }
  },
  watch: {
    checked () {
      this.itemChecked = this.checked
    },
    itemChecked () {
      this.itemChecked ? this.$emit('checkChange', this.price, this.data._id) : this.$emit('checkChange', -this.price, this.data._id)
    }
  },
  computed: {
    price () {
      return this.data.newPrice * this.goodCount
    },
    goodCount () {
      return this.cartGoods[this.goodIndex].count
    }
  },
  created () {
    this.cartGoods = this.$store.state.app.user.cartGoods
    this.goodIndex = this.cartGoods.findIndex(p => p.goodId == this.data._id)
    this.data.count = this.goodCount
  },
  methods: {
    updateCount (i) {
      this.cartGoods[this.goodIndex].count += i
      this.data.count += i
      this.itemChecked && this.$emit('checkChange', i * this.data.newPrice)
      const title = this.data.title
      const index = title.match(/\d/).index
      const type = title.substr(0, index)
      this.itemChecked && this.$emit('updateCount', this.goodCount, this.data._id, this.$store.state.app.user._id)
    },
    itemCheck () {

    }
  },
}
</script>

<style scoped>
.cart {
  height: 5rem;
  margin: 0.5rem 0 0 0;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.8rem;
}
.cart-check {
  float: left;
  line-height: 5rem;
  margin-right: 0.5rem;
}
.cart-img {
  height: 5rem;
  vertical-align: middle;
  float: left;
  border-radius: 5px;
}
.cart-tag {
  float: left;
}
.cart-title {
  height: 3.3rem;
}
.cart-price {
  height: 1.8rem;
}
.cart-count {
  float: right;
  margin-right: 0.8rem;
}
.red {
  color: #f88;
}
.cart-mes {
  margin-left: 7rem;
}
.cart-btn {
  background-color: #fff;
  border: 1px solid #eee;
  margin: 0 0.3rem;
  outline: 0;
}
.cart-checkbox {
  visibility: hidden;
}
.cart-checkbox + label {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 1px solid #ccc;
}
.cart-checkbox:checked + label {
  background: url("~@/assets/images/成功.svg");
}
</style>
