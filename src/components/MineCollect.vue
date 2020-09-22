<template>
  <div id="minepage">
      <div id="personalcard">
          <div id="personalcardhead"><img :src="headimg"></div>
          <div id="personalcardnick">{{nickname}}</div>
          <div id="personalcardlist">
                <div id="personalmyblog" @click="goMineBlog" style="cursor:pointer;">
                  <div id="myblogcount">{{myblogcount}}</div>
                  我的博客
                </div>
              <div id="personalmycollection" @click="goMineCollect" style="cursor: pointer;">
                  <div id="mycollectioncount">{{mycollectcount}}</div>
                  我的收藏
              </div>
          </div>
      </div>
      <div id="middleflex"> 
          <div id="personalblogcard" v-if="ishascontent">
            <div id="personalblogcarditem" v-for="(item,index) in mycollect" :key="index" @click="goBlog(item._id)">
                <div id="personalblogcarditemhead">
                    <div id="personalblogcarditemheadimg"><img :src="item.headimg" alt=""></div>
                    <div id="personalblogcarditemheadinfo">
                        <div id="personalblogcarditemheadnick">{{item.writerickname}}</div>
                        <div>{{item.writedate}}</div>
                    </div>
                </div>
                <div id="personalblogcarditemcontent">
                    <div id="contentright"><img :src="item.headimg" alt=""></div>
                    <div id="contentleft">
                        <div id="contentlefttitle">{{item.title}}</div>
                        <div id="contentlefttext" v-html="item.text"></div>
                    </div>
                </div>
                <div id="personalblogcarditemfoot">
                    <div><i class="el-icon-s-comment">{{commentscount}}</i></div>
                    <div><i class="el-icon-view"></i> {{item.visitors.length}}</div>
                </div>
            </div>
          </div>
          <div id="nocontent" v-if="!ishascontent">
              <h1>还没有收藏博客~~~</h1>
          </div>
      </div>

      <div id="writesomething">
          还不知道写点啥
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            headimg:this.$store.state.headimg,
            nickname:this.$store.state.nickname,
            myblog:[],
            mycollect:[],
            myblogcount:0,
            mycollectcount:0,
            commentscount:0,
            ishascontent:''
        }
    },
    methods:{
        goMineBlog(){
            this.$router.push({ name: "MineBlog" });
        },
        goMineCollect(){
            location.reload()
        },
        goBlog(id){
            if(this.$store.state.isLogin==false){
                this.$message.error('先登陆，宝贝儿');

            }else{
                this.$router.push({name:"BlogInfo"})
                sessionStorage.setItem('blogid',id)
            }   
        }
    },
    mounted(){
        this.$axios({
            method:'get',
            url:'/blog/findblogbycollect'
        })
        .then(res=>{
            if(res.data.code == 201){
                this.mycollectcount = 0
            }
            else if(res.data.code == 200){
                
                this.mycollect = res.data.data
                if(this.mycollect.length == 0){
                    this.ishascontent=false
                }
                else if(this.mycollect.length != 0){
                    this.ishascontent=true
                }
                var a = []
                a = res.data.data
                this.mycollectcount = a.length
            }
        })
        .then(()=>{
            this.$axios({
            method:'get',
            url:'/blog/findpersonblog'
            })
            .then(res=>{
                this.myblog = res.data.data
                var b = []
                b = res.data.data
                this.myblogcount = b.length
            })
        })
        .then(()=>{
            this.$axios({
                    method:'get',
                    url:'/blog/findcommentbyid?blogid='+this.id
                })
                .then(res=>{
                    this.commentscount = res.data.data.length;
                })
        })
    }
}
</script>

<style>
    #minepage{
        display: flex;
        justify-content: space-between;
        width: 100vw;
        min-height: 100vh;
        margin: 0 auto;
        padding: 0 250px;
        background: rgba(202, 222, 255, 0.865);
    }
    #personalcard{
        width: 330px;
        height: 350px;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 0;
        position: relative;
        margin: 40px 0;
    }
    #personalblogcard{
        width: 40vw;
        min-height: 100vh;
        padding-top: 20px;

    }
    #nocontent{
        width: 40vw;
        min-height: 100vh;
        padding-top: 20px;
        display:flex;
        justify-content: center;
    }
    #writesomething{
        width: 330px;
        height: 600px;
        background: white;
        margin: 40px 0;

    }
    #personalcardhead{
        width: 130px;
        height: 130px;
        border-radius: 50%;
        overflow: hidden;
        border: blanchedalmond 1px solid;
    }
    #personalcardhead img{
        width: 100%;
    }
    #personalcardnick{
        width: 100%;
        height: 50px;
        margin-top: 10px;
        font-size: 2em;
        text-align: center;
        border-bottom: 1px #ddc solid;
    }
    #personalcardlist{
        display: flex;
        justify-content: space-between;
        width: 200px;
        position: absolute;
        bottom: 30px;
    }
    #personalmyblog{
        width: 70px;
        height: 70px;
        text-align: center;
        
    }
    #personalmycollection{
        width: 70px;
        height: 70px;

        text-align: center;
    }
    #myblogcount{
        font-size: 2em;
        color: #aaa;
        text-align: center;
    }
    #mycollectioncount{
        font-size: 2em;
        color: #aaa;
        text-align: center;
    }
    #personalblogcarditem{
        width: 80%;
        height: 270px;
        background: white;
        margin: 15px auto;
        position: relative;
        border-radius: 5px;
    }
    #personalblogcarditemhead{
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        padding-left: 20px;
    }
    #personalblogcarditemheadimg{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 20px;
    }
    #personalblogcarditemheadimg img{
        width: 100%;
    }
    #personalblogcarditemheadnick{
        font-size: 1.4em;
        color: #FB7199;
    }
    #personalblogcarditemcontent{
        width: 80%;
        height: 55%;
        border: 1px #E5E9EF solid;
        display: flex;
        margin: 0 auto;
        border-radius: 5px;
    }
    #contentright{
        width: 50%;
        height: 100%;
        border-radius: 5px;
        overflow:hidden;
    }
    #contentright img{
        width: 100%;
    }
    #contentlefttitle{
        width: 100%;
        height: 50px;
        font-size: 1.5em;
        font-weight: bold;
        margin-left: 20px;
    }
    #contentlefttext{
        width: 100%;
        height: 50px;
        font-size: 1.2em;
        margin-left: 30px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    #personalblogcarditemfoot{
        width: 80%;
        height: 40px;
        display: flex;
        margin: 0 auto;
        border-radius: 5px;
        display: flex;
        align-items: center;
    }
    #personalblogcarditemfoot div{
        margin-right: 30px;
    }
</style>