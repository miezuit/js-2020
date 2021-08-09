import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

import store from './store/store'
import router from './router/router'

new Vue({
  store,
  router,
  beforeCreate() { this.$store.commit('initializeStore') }, 
  render: h => h(App)
}).$mount('#app')
