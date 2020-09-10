import router, {
  roleRoutes,
  whiteRoute
} from './router'
import store from "./store/";

store.dispatch('getUser')

let routes = []
const getWhiteRoute = (arr, prevArr = []) => {
  const nameArr = prevArr
  arr.map(p => {
    if (p.children) {
      getWhiteRoute(p.children, nameArr)
    }
    if (p.name) {
      nameArr.push(p.name)
    }
  })
  return nameArr
}
const whiteRouteList = getWhiteRoute(whiteRoute, [])

const index = whiteRoute.findIndex(p => p.path == '/info')

const infoNotCache = []

router.beforeEach((to, from, next) => {
  const isInfoComp = whiteRoute[index].children.some(p => p.name == to.name)
  if (isInfoComp) {
    if (to.meta.keepAlive == false && !infoNotCache.includes(to.name)) {
      infoNotCache.push(to.name)
    } else if (to.meta.keepAlive == true && infoNotCache.includes(to.name)) {
      infoNotCache.splice(infoNotCache.findIndex(p => p == to.name), 1)
    }
    const infoExclude = infoNotCache.length >= 1 ? infoNotCache.join(',') : ''
    store.commit('setCache', infoExclude)
  }
  //let Token = store.state.app.user && store.state.app.user.token ? store.state.app.user.token : ''
  let user = sessionStorage.getItem('user')
  let Token = user ? JSON.parse(user).token : ''

  if (routes.length === 0 && Token) {
    routes = roleRoutes
    router.addRoutes(routes)
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next({
      path: to.path,
      query: to.query
    })
  } else if (!whiteRouteList.includes(to.name) && !Token) {
    next({
      name: 'login'
    })
    document.title = '登录'
  } else {
    next()
    if (to.meta.title) {
      document.title = to.meta.title;
    }
  }

})
