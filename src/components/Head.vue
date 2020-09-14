<template>
  <div id="headnavbar">
      <div class="navbar">
          <div id="logo"><div class="logo"><span>Hchoppe</span><span id="mid">|</span><span>Blog</span></div></div>
          <div id="nav">
              <div id="navcontent">
                  <span @click="goBlog">博客</span>
                  <span >每日推荐</span>
                  <span>学习文档</span>
                  <span @click="goPersonal">个人信息</span>
                  <span>关于</span>
              </div>
          </div>
          <div id="search">
            <i class="el-icon-search"><input class="searchinp" type="text" placeholder="搜你想要"></i>
          </div>
      </div>
  </div> 
</template>

<script>
export default {
    name: "Head",

    methods:{
        goBlog(){
            this.$router.push({ name: "Blog" });
        },
        goPersonal(){
            this.$router.push({ name: "Personal" });
        },
    },
    mounted(){
      window.addEventListener('unload',()=>{
        var data = sessionStorage.getItem("username")
        if(sessionStorage.length == 0){
            console.log(data);
            this.$axios({
              method:'get',
              url:'/login/outlogin?username=' + data
            })
        } 
        
      })
  },
}
</script>

<style>
    #headnavbar{
        max-width: 100vw;
        height: 60px;
        padding: 0 20px;
        background: #FFFFFF;
        box-shadow:0px 2px 10px #ddd ;
        overflow: hidden;
    }
    .navbar{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #logo{
        height: 100%;
        display: flex;
        align-items: center;
    }
    #search{
        height: 50%;
        display: flex;
        align-items: center;
        transform: translateX(90px);
        transition: .2s;
    }
    .el-icon-search{
        cursor: pointer;
    }
    .logo{
        width: 130px;
        display: flex;
        align-items: flex-end;
        border-bottom: 3px skyblue solid;
        border-radius: 50%;
        justify-content: space-between;
    }
    .logo>span{
        font-size: 1.2em;
        color: orange;
    }
    #nav{
        display: flex;
        align-items: center;
    }
    #navcontent{
        width: 300px;
        display: flex;
        justify-content: space-between;
    }
    #navcontent>span{
        font-size: .8em;
        cursor: pointer;
        font-weight: 300;
    }
    #navcontent>span:hover{
        color: #13a953;
    }
    .searchinp{
        height: 30px;
        outline: none;
        border: none;
        margin-left: 10px;
        transition: 1s;
        color: #788186;
    }
    #search:hover{
        transform: translateX(0);
    }
</style>