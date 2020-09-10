import model from '@/api'
const app = {
  state: {
    user: '',
    infoNotCache: ''
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setCache(state, cache) {
      state.infoNotCache = cache
    }
  },
  actions: {
    getUser(context, callback) {
      //用户名密码都在sessionStorage里面哈哈哈,想到的可以用token(我这不行),_id请求新接口数据,但是懒了
      let user = sessionStorage.getItem('user')
      if (!user) return
      user = JSON.parse(user)
      const {
        userName,
        passWord
      } = user
      model.$post('login', {
        userName,
        passWord
      }).then(res => {
        if (res.data.token) {
          context.commit('setUser', res.data)
          sessionStorage.setItem('user', JSON.stringify(res.data))
        } else {
          this.errorMes = res.data
        }
        callback && callback()
      })
    }
  }
}

export default app
