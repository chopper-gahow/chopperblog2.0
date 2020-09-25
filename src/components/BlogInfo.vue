<template>
    <div id="bloginfopage">
        <div id="bloginfotitle">
            <div>{{title}}</div>
        </div>
        <div id="writer">
            <div id="writehead" @click="gohispersonal">
                <img :src="headimg" alt="">
            </div>
            <div id="nameanddate">
                <div id="writerickname"><span  @click="gohispersonal">{{writerickname}}</span></div>
                <div>{{writedate}}</div>
            </div>
        </div>
        <div id="bloginfotext">
            <div class="ql-editor" v-html="text"></div>
        </div>
        <div id="collect">
            <div id="collectbtndiv">
                <el-button v-if="!iscollect" type="success" plain @click="collectblog" icon="el-icon-star-off">收藏这篇博客</el-button>
                <el-button v-if="iscollect" type="danger" plain @click="discollectblog" icon="el-icon-star-on">取消收藏博客</el-button>
                <div>
                    <el-button  v-if="!islike" type="primary"  plain round @click="likeblog"><van-icon id="likebtn" name="like-o" /> 赞一下</el-button>
                    <el-button  v-if="islike" type="danger"  plain round @click="dislikeblog"><van-icon id="likebtn" name="like" /> 不赞了</el-button>
                </div>
            </div>
        </div>
        <div id="comments">
            <div id="commentscomuntdiv">
                <span id="commentscount">{{commentcount}}条评论</span>
                <div id="likeandcoll">
                    <span id="commentscount">{{likecount}}点赞</span>
                    <span id="commentscount">{{collectcount}}收藏</span>
                </div>
            </div>
            <div id="commerc">
                <div id="commerhead"><img :src="commerheadimg" alt=""></div>
                <el-input v-model="comment" placeholder="请输入内容"></el-input>
                <el-button type="primary" plain @click="uploadcomment" id="commentupbtn">发表评论</el-button>
            </div>
            <div id="commentscontent" v-for="(item,index) in comments" :key=index>
                <div id="comconthead"><img :src="item.commerhead" alt=""></div>
                <div>
                    <div id="comcontnick">{{item.commernickname}}</div>
                    <div id="comconttitle">{{item.content}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let Base64 = require('js-base64').Base64;
export default {
    name:"BlogInfo",
    data(){
        return{
            writer:'',
            id: sessionStorage.getItem("blogid"),
            title: '',
            text: '',
            writedate: '',
            writerickname: '',
            headimg:'',
            visitor:sessionStorage.getItem('username'),
            commerheadimg:this.$store.state.headimg,
            comment:'',
            comments:[],
            iscollect:false,
            islike:false,
            commentcount:0,
            likecount:0,
            collectcount:0
        }
    },
    methods:{
        likeblog(){
            this.$axios({
                method:'get',
                url:'/blog/like?blogid='+this.id
            })
            .then(res=>{
                if(res.data.code == 200){
                    location.reload()
                }
                else{
                    this.$message.error(res.data.msg);
                }
            })
        },
        dislikeblog(){
            this.$axios({
                method:'get',
                url:'/blog/dislike?blogid='+this.id
            })
            .then(res=>{
                if(res.data.code == 200){
                    location.reload()
                }
                else{
                    this.$message.error(res.data.msg);
                }
            })
        },
        gohispersonal(){
            sessionStorage.setItem('othernick',this.writerickname)
            sessionStorage.setItem('otherusername',this.writer)
            this.$router.push({name:"OthersPage"})
        },
        collectblog(){
            this.$axios({
                method:'get',
                url:'/blog/collectblog?blogid='+this.id
            })
            .then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    });
                    location.reload()
                }
                else{
                    this.$message.error(res.data.msg);
                }
            })
        },
        discollectblog(){
            this.$axios({
                method:'get',
                url:'/blog/discollectblog?blogid='+this.id
            })
            .then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    });
                    location.reload()

                }
                else{
                    this.$message.error(res.data.msg);
                }
            })
        },
        uploadcomment(){
            var that = this
            this.$axios({
                method:'get',
                url:'/blog/uploadcomment?blogid='+that.id+'&comment='+that.comment
            })
            .then(res=>{
                if (res.data.code==200) {
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    });
                    location.reload()

                }
                else if (res.data.code==201){
                    this.$message.error(res.data.msg);
                }
            })
        }
    },
    mounted(){
        this.comments = this.$route.params.comments
        var that = this;
        this.$axios({
            method:'get',
            url:'/blog/findblogbyid?id='+that.id+"&visitor="+that.visitor
        })
        .then(res=>{
            this.likecount = res.data.data.liked.length
            this.collectcount = res.data.data.collected.length
            this.commentcount = res.data.data.commentcount
            this.title = res.data.data.title
            this.text = res.data.data.text
            this.writedate = res.data.data.writedate
            this.writerickname = res.data.data.writerickname
            this.headimg = res.data.data.headimg
            this.comments = res.data.data.comments
            this.writer = res.data.data.writer
        })
        .then(()=>{
            this.$axios({
                    method:'get',
                    url:'/blog/findcommentbyid?blogid='+this.id
                })
                .then(res=>{
                    this.comments = res.data.data
                    
                })
        })
        .then(()=>{
            this.$axios({
                method:'get',
                url:'/blog/isusercollect?blogid='+this.id
            })
            .then(res=>{
                if(res.data.data === true){
                    this.iscollect = res.data.data
                }
                else{
                    this.iscollect = false
                }
            })
        })
        .then(()=>{
            this.$axios({
                method:'get',
                url:'/blog/isuserlike?blogid='+this.id
            })
            .then(res=>{
                if(res.data.data === true){
                    this.islike = res.data.data
                }
                else{
                    this.islike = false
                }
            })
        })
    },
    computed:{
        realltext(){
            return Base64.decode(this.text)
        }
    },
    
}
</script>

<style>
    #likeandcoll{
        font-size: 1em;
        color: #2A2E2E;
        font-weight: 600;
    }
    #likeandcoll>span{
        margin-left: 30px;
    }
    #likebtn{
        color: red;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    #collectbtndiv{
        display: flex;
        justify-content: space-between;
    }
    #bloginfotitle{
        width: 100%;
        height: 300px;
        background: url("/Infobg.jpg") no-repeat;
        background-size: 115%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #bloginfotitle>div{
        text-align: center;
        color: white;
        width: 60%;
        font-size: 2.7em;
    }
    #writer{
        max-width: 50%;
        max-height: 100px;
        margin: 0 auto;
        padding: 20px 20px;
        display: flex;
    }
    #nameanddate{
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    #writerickname{
        width: auto;
        color: #13aa52;
    }
    #writerickname>span{
        cursor: pointer;
    }
    #writerickname>span:hover{
        text-decoration: underline;
    }
    #writehead{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
    }
    #writehead>img{
        width: 100%;
    }
    #collect{
        margin: 0 auto ;
        width: 50%;
        height: 50px;
    }
    #bloginfotext{
        width: 50%;
        min-height: 600px;
        margin: 0 auto;
        font-size: 1.3em;
        line-height: 2em;
    }
    #commentscount{
        border-bottom: 2px solid #13A953;
        font-size: 1em;
        color: #2A2E2E;
        font-weight: 600;
    }
    #commentscomuntdiv{
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        border-bottom: 2px solid #E7E9ED;
    }
    #comments{
        width: 50%;
        margin: 0 auto;
        min-height: 100px;
    }
    #commerhead{
        min-width: 60px;
        max-width: 60px;
        min-height: 60px;
        max-height: 60px;
        border-radius: 10%;
        overflow: hidden;
        display: flex;
        align-items: center;
        margin-right: 10px;
    }
    #commerhead>img{
        width: 100%;
    }
    #commerc{
        width: 100%;
        margin-top: 30px;
        display: flex;
        align-items: center;
    }
    #commentupbtn{
        margin-left: 10px;
    }
    #commentscontent{
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        padding: 0 30px;
        border-bottom: 2px #E7E9ED solid;
    }
    #comconthead{
        width: 60px;
        height: 60px;
        border-radius:6px;
        overflow: hidden;
        margin-right: 10px;
    }
    #comcontnick{
        margin-right: 10px;
        font-size: .6em;
        font-weight:900;
        color:#13A953
    }
    #comconthead>img{
        width: 100%;
    }
    #nameandate{
        display: flex;
    }
</style>