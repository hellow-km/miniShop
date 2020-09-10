<template>
  <div class="goods-cart">
    <cart-item
      v-for="(item,index) in data"
      :data="item"
      :index="index"
      :key="item.id"
      :checked="checked"
      @updateCount="updateCount"
      @checkChange="checkChange"
    ></cart-item>
    <div class="priceAll">
      <input
        class="cart-all-check"
        type="checkbox"
        id="all-check"
        v-model="checkAll"
        @change="checkAllChange"
      ><label for="all-check"></label><span>全选</span>
      <span class="price">合计￥{{allPrice}}</span>
      <div
        class="pay-btn right"
        @click="payBefore"
      >结算</div>
      <div
        class="removeSelect right"
        @click="removeGoods"
      >删除选中</div>
    </div>
    <cart-dialog
      v-show="dialogVisible"
      diaTitle="结算"
      :mes="mes"
      @submit="submit"
      @cancle="cancle"
    />
  </div>
</template>

<script>
import cartItem from './cartItem.vue'
import cartDialog from '@/components/common/dialog.vue'
export default {
  data () {
    return {
      user: '',
      data: [],
      allPrice: 0,
      checked: false,
      checkAll: false,
      dialogVisible: false,
      goodIdList: [],
    }
  },
  components: {
    cartItem,
    cartDialog
  },
  computed: {
    mes () {
      return '需要支付' + this.allPrice + ',确认付款吗？'
    }
  },
  created () {
    this.user = this.$store.state.app.user
    if (!this.user) return
    let params = {
      fashion: [],
      news: [],
      select: [],
    }
    this.user.cartGoods.map(p => {
      params[p.type].push(p.goodId)
    })
    this.$post('cart', params).then(res => {
      this.data = res.data
    })
  },
  methods: {
    updateCount (count, goodId, userId) {
      this.$post('cartCount', { goodId, userId, count }).then(res => { })
    },
    checkChange (price, goodId) {
      this.allPrice = parseFloat((this.allPrice + price).toFixed(2))
      const p = (this.data.reduce((prev, cur) => {
        return prev + cur.newPrice * cur.count
      }, 0)).toFixed(2)

      this.checkAll = this.allPrice == p ? true : false
      if (!goodId) return
      if (!this.goodIdList.includes(goodId)) {
        this.goodIdList.push(goodId)
      } else {
        const index = this.goodIdList.findIndex(p => p == goodId)
        this.goodIdList.splice(index, 1)
      }
    },
    checkAllChange () {
      this.checked = this.checkAll
    },
    submit () {
      const userId = this.user._id
      this.$post('cartPay', { userId, payMoney: this.allPrice, goodIds: this.goodIdList }).then(res => {
        if (res.data.err) {
          this.dialogVisible = false
          alert('余额不足')
        } else {
          this.dialogVisible = false
          alert('支付成功，已扣款')
          this.user.money -= this.allPrice
          this.allPrice = 0
          this.user.cartGoods = this.user.cartGoods.filter(p => {
            if (this.goodIdList.includes(p.goodId)) {
              return false
            } else {
              return true
            }
          })
          this.data = this.data.filter(p => {
            if (this.goodIdList.includes(p._id)) {
              return false
            } else {
              return true
            }
          })
        }
      })
    },
    cancle () {
      this.dialogVisible = false
    },
    payBefore () {
      if (this.allPrice > 0) {
        this.dialogVisible = true
      }
    },
    removeGoods () {
      if (this.goodIdList.length == 0) return
      this.$post('cart_remove', { userId: this.user._id, goodIdList: this.goodIdList }).then(res => {
        this.user.cartGoods = this.user.cartGoods.filter(p => {
          if (this.goodIdList.includes(p.goodId)) {
            return false
          } else {
            return true
          }
        })
        this.data = this.data.filter(p => {
          if (this.goodIdList.includes(p._id)) {
            return false
          } else {
            return true
          }
        })
        this.allPrice = 0
      })
    }
  },
}
</script>

<style>
.goods-cart {
  padding-bottom: 7rem;
}
.priceAll {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 3.4rem;
  background-color: #eee;
  line-height: 2.5rem;
  padding-left: 0.5rem;
}
.price {
  margin-left: 1rem;
}
.cart-all-check {
  visibility: hidden;
}
.cart-all-check + label {
  position: relative;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 1px solid #ccc;
  top: 0.2rem;
  left: -0.3rem;
}
.cart-all-check:checked + label {
  background: url("~@/assets/images/成功.svg");
}

.pay-btn {
  background-color: #f88;
  width: 5rem;
  text-align: center;
  color: #fff;
}
.removeSelect {
  margin-right: 0.8rem;
  width: 5rem;
  text-align: center;
  color: #f88;
}
</style>
