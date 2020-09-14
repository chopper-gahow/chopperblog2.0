import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickname:sessionStorage.getItem('nickname'),
    headimg:sessionStorage.getItem('headimg'),
    _id:'',
    username:sessionStorage.getItem('username'),
    password:sessionStorage.getItem('password'),
    birth:sessionStorage.getItem('birth'),
    isLogin:sessionStorage.getItem('isLogin'),
    qiniutoken:sessionStorage.getItem('qiniutoken')
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
