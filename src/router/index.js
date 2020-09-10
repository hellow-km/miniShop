import Vue from 'vue'
import VueRouter from 'vue-router'
import whiteRoute from './modules/whiteRoute'
import cart from './modules/cart'
import my from './modules/my'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: whiteRoute
})

const roleRoutes = [
  ...my, ...cart
]

export {
  whiteRoute,
  roleRoutes
}

export default router
