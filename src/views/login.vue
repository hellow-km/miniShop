<template>
  <div>
    <div class="login">
      <nav-bar :leftArrow="false">
        <span slot="center">登录</span>
      </nav-bar>
      <tab
        :tabNames="['登录','注册']"
        class="tab"
        @tabClick='tabClick'
        :nowCurrent="text"
      />
      <div class="user">
        <label for="username">用户名</label><br>
        <input
          type="text"
          name="userName"
          id="username"
          v-model="login.userName"
        >
      </div>
      <div
        class="user"
        v-if="text=='注册'"
      >
        <label for="name">昵称</label><br>
        <input
          type="text"
          name="name"
          id="name"
          v-model="login.name"
        >
      </div>
      <div class="password">
        <label for="password">密码</label><br>
        <input
          type="password"
          name="passWord"
          id="password"
          v-model="login.passWord"
        >
      </div>
      <button
        @click="submit"
        class="submit"
      >{{text}}</button> <span class="err">{{errorMes}}</span>
    </div>
  </div>
</template>

<script>
import tab from '@/components/common/tab/tab.vue'
import navBar from '@/components/common/navbar/navBar.vue'
export default {
  data () {
    return {
      login: {
        userName: '',
        name: '',
        passWord: '',
      },
      errorMes: ''
    }
  },
  components: {
    tab,
    navBar
  },
  computed: {
    text () {
      return this.$route.name == 'login' ? '登录' : '注册'
    }
  },
  methods: {
    tabClick (val) {
      this.errorMes = ''
      if (val == '登录') {
        this.$router.replace('/login')
      } else {
        this.$router.replace('/register')
      }
    },
    submit () {
      const { userName, passWord, name } = this.login
      if (userName.trim() == '') return this.errorMes = '用户名不能为空'
      if (passWord.trim() == '') return this.errorMes = '密码不能为空'
      if (this.text == '登录') {
        this.$post('login', { userName, passWord }).then(res => {
          if (res.data.token) {
            this.$store.commit('setUser', res.data)
            sessionStorage.setItem('user', JSON.stringify(res.data))
            this.$router.replace('/home')
          } else {
            this.errorMes = res.data
          }
        })
      } else {
        if (name.trim() == '') return this.errorMes = '昵称不能为空'
        this.$post('register', { userName, name, passWord }).then(res => {
          if (res.data.success) {
            this.errorMes = res.data.success
          } else {
            this.errorMes = res.data.warn
          }
        })
      }
    }
  },
}
</script>

<style scoped>
.login {
  width: 18rem;
  margin: 10rem auto;
  background-color: #f5f5f5;
}
.tab {
  background-color: #f5f5f5;
}
.user,
.password {
  overflow: hidden;
  margin: 1rem 0 0 2rem;
}
#password,
#username,
#name {
  width: 80%;
  height: 1.2rem;
  border: 1px solid #666;
  border-radius: 5px;
  outline: 0;
  text-indent: 5px;
  margin-top: 0.2rem;
}
.submit {
  width: 6rem;
  height: 1.5rem;
  margin: 1rem 0 1.5rem 3rem;
  border-radius: 5px;
  border: 0;
  box-shadow: 0px 1px 0px #555;
}
.err {
  color: #f55;
  font-size: 0.6rem;
}
</style>
