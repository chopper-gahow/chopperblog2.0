import Vue from 'vue'
import VueRouter from 'vue-router'
import Head from '../components/Head.vue'
import Blog from '../components/Blog.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Personal from '../components/Personal.vue'
import BlogInfo from '../components/BlogInfo.vue'
import Mine from '../components/Mine.vue'
import Daily from '../components/Daily.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    redirect:'/blog'
  },
  {
    path:'/blog',
    name:'Blog',
    components:{
      header:Head,
      main:Blog
    }
  },
  {
    path:'/bloginfo',
    name:'BlogInfo',
    components:{
      header:Head,
      main:BlogInfo
    }
  },
  {
    path:'/mine',
    name:'Mine',
    components:{
      header:Head,
      main:Mine
    }
  },
  {
    path:'/daily',
    name:'Daily',
    components:{
      header:Head,
      main:Daily
    }
  },
  {
    path:'/personal',
    name:'Personal',
    components:{
      header:Head,
      main:Personal
    }
  },
  { 
    path:'/login',
    name:'Login',
    components:{
      main:Login
    }
  },
  { 
    path:'/register',
    name:'Register',
    components:{
      main:Register
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
