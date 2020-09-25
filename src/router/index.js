import Vue from 'vue'
import VueRouter from 'vue-router'
import Head from '../components/Head.vue'
import Blog from '../components/Blog.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Personal from '../components/Personal.vue'
import BlogInfo from '../components/BlogInfo.vue'
import MineBlog from '../components/MineBlog.vue'
import MineCollect from '../components/MineCollect.vue'
import Daily from '../components/Daily.vue'
import Footer from '../components/Footer.vue'
import OthersPage from '../components/OthersPage.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

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
      main:Blog,
      footer:Footer
    }
  },
  {
    path:'/bloginfo',
    name:'BlogInfo',
    components:{
      header:Head,
      main:BlogInfo,
      footer:Footer

    }
  },
  {
    path:'/mineblog',
    name:'MineBlog',
    components:{
      header:Head,
      main:MineBlog,
      footer:Footer
    }
  },
  {
    path:'/minecollect',
    name:'MineCollect',
    components:{
      header:Head,
      main:MineCollect,
      footer:Footer
    }
  },
  {
    path:'/otherspage',
    name:'OthersPage',
    components:{
      header:Head,
      main:OthersPage,
      footer:Footer
    }
  },
  {
    path:'/daily',
    name:'Daily',
    components:{
      header:Head,
      main:Daily,
      footer:Footer
    }
  },
  {
    path:'/personal',
    name:'Personal',
    components:{
      header:Head,
      main:Personal,
      footer:Footer
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
