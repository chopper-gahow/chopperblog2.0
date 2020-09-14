<template>
  <div id="BlogPage">
      <div id="pagetitle">
          <span id="title">Hchopper Blog</span>
          <span id="desc">集成编写，发布，新闻查看，个人信息编辑的共享博客系统</span>
      </div>
      <div id="firstcontent">
          <div id="firstcontentout">
              <div id="firstcontentinn">
                  <div id="titanddec">
                  <h2 id="firsttitle">欢迎使用HchopperBlog，在这里你可以畅所欲言，分享知识，学习知识</h2>
                  <span id="titledec">你可以以游客的身份访问，也可以注册并登陆账号</span>
                  </div>
                  <div id="longinuser" v-if="isLogin">
                      <div @click="goMine" id="loginheadimg">
                          <img :src="headimg" alt="">
                      </div>
                  </div>
                  <div v-if="!isLogin">
                      <el-button type="info" round @click="goLogin">去登录</el-button>
                  </div>
              </div>
          </div>
      </div>
      <div id="blogitems">
            <Blogitem>
                
            </Blogitem>
      </div>
      
  </div>
</template>

<script>
import Blogitem from "./BlogItem"
export default {
    name: "Blog",
    data(){
        return {
            headimg:sessionStorage.getItem('headimg'),
            isLogin:sessionStorage.getItem('isLogin'),
            outuser:this.$store.state.username
        }
    },
    components:{
        Blogitem
    },
    methods:{
        goLogin(){
            this.$router.push({ name: "Login" });
        },
        goPersonal(){
            this.$router.push({ name: "Personal" });
        },
        goMine(){
            this.$router.push({ name: "Mine" });

        }
    }
}
</script>

<style>
   #BlogPage{
       display: flex;
       flex-direction: column;
       align-items: center;
   }
   #pagetitle{
       display: flex;
       justify-content: center;
       align-items: center;
       height: 250px;
       display: flex;
       flex-direction: column;
   }
   #title{
       font-weight: 340;
       font-size: 3.4em;
       color: #126249;
   }
   #longinuser{
       display: flex;
       align-items: center;
   }
   #loginheadimg{
       width: 90px;
       height: 90px;
       overflow: hidden;
       border: orange 1px solid;
       border-radius: 50%;
       cursor: pointer;
   }
   #loginheadimg>img{
       width: 100%;
   }
   #desc{
       font-size: .8em;
       color: #1a1a1a;
       font-weight: 300;
   }
    #firstcontent{
        width: 100%;
        height: 300px;
        margin-bottom: 100px;
        border-radius: 10px;
    }
    #firstcontentout{
        width: 90%;
        height: 100%;
        margin: 0 auto;
        transition: .5s;
    }
    #firstcontentinn{
        width: 100%;
        height: 100%;
        background: url("/350.jpg") no-repeat;
        background-size: 100%;
        transition: .5s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0px;
        border-radius: 20px;
    }
    #firstcontentinn>span{
        color: rgb(26, 26, 25);
    }
    #firstcontentinn:hover{
        transform: scale(1.01,1.01);
    }
    #firsttitle{
        color: rgb(246, 254, 219);
        text-align: center;
    }
    #titanddec{
        height: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    #blogitems{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    #titledec{
        color: rgb(225, 255, 210);
    }
</style>