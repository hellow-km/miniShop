export default [{
  name: 'cart',
  path: '/cart',
  component: () => import('@/views/cart/cart.vue'),
  meta: {
    title: '购物车'
  }
}]
