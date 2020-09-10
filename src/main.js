import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import models from './api'
import "@/permission"

import FastClick from 'fastclick'
FastClick.attach(document.body);

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

for (const key in models) {
  if (models.hasOwnProperty(key)) {
    Vue.prototype[key] = models[key]
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
