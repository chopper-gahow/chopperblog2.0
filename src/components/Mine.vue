<template>
  <div id="minePage">
      <div id="minediv">
        <el-tabs id="minehead" v-model="activeName" @tab-click="handleClick" @click="goBlog(item._id)">
            <el-tab-pane label="我的收藏" name="first" id="tabschild">
                <div v-for="(item,index) in mycollect" :key="index" id="collectitem" @click="goBlog(item._id)">
                    <div id="mycolhead"><img :src="item.headimg" alt=""></div>
                    <div id="mycolwriter">{{item.writerickname}}</div>
                    <div id="mytitleandtext">
                        <div id="mycolltitle">{{item.title}}</div>
                    </div>
                </div>
                
            </el-tab-pane>
            <el-tab-pane label="我的博客" name="second">
                <div id="lal">
                    <div v-for="(item,index) in myblog" :key="index" id="collectitem" @click="goBlog(item._id)">
                    <div id="mycolhead"><img :src="item.headimg" alt=""></div>
                    <div id="mycolwriter">{{item.writerickname}}</div>
                    <div id="mytitleandtext">
                        <div id="mycolltitle">{{item.title}}</div>
                    </div>
                    </div>
                    <div id="deletebutton" v-for="(item) in myblog" :key="item._id">
                            <el-button type="danger" icon="el-icon-delete" circle @click="deletethis(item._id)" :loading="isloading"></el-button>
                    </div>
                </div>
            </el-tab-pane>
         </el-tabs>
      </div>
  </div>
</template>

<script>
export default {
    name:"Mine",
    data(){
        return{
            activeName: 'first',
            mycollect:[],
            myblog:[],
            isloading:false,
            a:0,
            b:0,
            c:0
        }
    },
    methods: {
      
      handleClick() {
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
            this.mycollect = res.data.data
        })
        .then(()=>{
            this.$axios({
            method:'get',
            url:'/blog/findpersonblog'
            })
            .then(res=>{
                this.myblog = res.data.data
            })
        })
    }
}
</script>

<style>
    #minePage{
        width: 50%;
        margin: 0 auto;
        background: white;
        min-height: 100vh;
    }
    #minediv{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    #minehead{
        display: flex;
        /* justify-content: center; */
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-height: 100vh;

    }
    #collectitem{
        height: 60px;
        width: 35vw;
        background: rgb(231, 252, 231);
        border: 1px rgb(193, 193, 193) solid;
        border-radius: 25px;
        display: flex;
        margin-bottom: 20px;
        transition: .3s;
        margin-top: 10px;
        cursor: pointer;
    }
    #collectitem:hover{
        background: rgb(210, 252, 210);
        transform: translateY(-2px);
    }
    #mycolhead{
        width: 60px;
        height: 60px;
        overflow: hidden;
        border-radius: 30px;
    }
    #mycolhead>img{
        width: 100%;
    }
    #mycolwriter{
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 10vw;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    #mytitleandtext{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #mycolltitle{
        font-size: 1.2em;
        font-weight: bold;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    #deletebutton{
        width: 60px;
        height: 60px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    #lal{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>