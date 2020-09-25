<template>
  <div id="otherspage">
      <div id="othernick">
        <div id="leftline"></div>
        <div><span id="textnick">{{othernickname}}</span></div>
        <div id="rightline"></div>
      </div>
      <div id="otherblogcount">{{blog.length}}篇博客</div>
      <div id="otheritems">
          <div id="blogitem" v-for="(item,index) in blog" :key="index" @click="goBlog(item._id,item.writer)" >
            <div id="blogitemhead">
                <img :src="item.headimg">
            </div>
            <div id="blogitemtitle">
                {{item.title}}
            </div>
            <div id="blogitemtext" v-html="item.text"> 
            </div>
            <div id="blogiteminfo">
                <div>{{item.writedate}}</div>
                <div id="inininfo">
                    <i class="el-icon-view"></i> {{item.visitors.length}}
                    <i class="el-icon-star-off"></i> {{item.collected.length}}
                    <van-icon name="like-o" /> {{item.liked.length}}
                </div>
                <div>{{item.writerickname}}</div>
            </div>
        </div>
      </div>
      
  </div>
</template>

<script>
export default {
    data(){
        return{
            othernickname:sessionStorage.getItem('othernick'),
            otherusername:sessionStorage.getItem('otherusername'),
            blog:[]
        }
    },
    mounted(){
        var that = this
        this.$axios({
            method:'get',
            url:'blog/findsomeoneblog?username='+ that.otherusername
        })
        .then(res=>{
            this.blog = res.data.data
            console.log(this.blog);
        })
    }
}
</script>

<style>
    #otheritems{
        display: flex;
        justify-content: center;
    }
    #otherspage{
        width: 100vw;
        min-height: 100vh;
    }
    #othernick{
        width: 70%;
        height: 70px;
        margin: 0 auto;
        margin-top: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #leftline,#rightline{
        width: 40%;
        height: 1px;
        border-top: 1px #D9E0E0 solid;
    }
    #textnick{
        color: #42494F;
        font-size: 2em;
        margin: 0 10px;
    }
    #otherblogcount{
        width: 20%;
        height: 50px;
        margin: 0 auto;
        /* background: red; */
        text-align: center;
        font-size: 1.5em;
        color: #42494F;
        font-weight: 300;
        margin-top: 10px;
    }
</style>