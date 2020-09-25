<template>
    <div id="blogitems">
        <div id="blogitem" v-for="(item,index) in blogitems" :key="index" @click="goBlog(item._id,item.writer)" >
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
        <el-tooltip class="item" effect="dark" content="撰写博客" placement="left">
        <button id="writeblogbtn" @click="openDialog"><i class="el-icon-edit"></i></button>
        </el-tooltip>
        <el-dialog
            id="blogdialog"
            title="撰写博客"
            :visible.sync="centerDialogVisible"
            width="85%"
            center>
            <el-input v-model="title" placeholder="请输入标题..."></el-input>
            <!-- {{text}} -->
            <!-- {{bsText}} -->
            <el-card style="height: 500px;">
                <el-row v-loading="quillUpdateImg">
                    <quill-editor v-model="text" ref="myQuillEditor" style="height: 410px;" :options="editorOption">
                    </quill-editor>
                    <el-upload
                            style="display:none"
                            class="avatar-uploader"
                            action="http://upload-z2.qiniup.com"
                            :data="postData"
                            :show-file-list="false"
                            :on-success="uploadSuccess"
                            :before-upload="beforeUpload">
                    </el-upload>
                </el-row>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="upload">发 布</el-button>
            </span>
        </el-dialog>
    </div>
    
</template>

<script>
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
import  Quill  from 'quill'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
var fonts = ['SimSun','SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];
var Font = Quill.import('formats/font');
Font.whitelist = fonts; //将字体加入到白名单 
Quill.register(Font, true);
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],
  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image'],
  ['clean']                                         // remove formatting button
]
export default {
    name:"Blogitem",
    data(){
        return{
            quillUpdateImg:false,  
            blogitems:[],
            centerDialogVisible:false,
            title:'',
            text:``,
            isLogin:sessionStorage.getItem('isLogin'),
            postData:{
                token:this.$store.state.qiniutoken,
                domain:'hcpr.s3-cn-south-1.qiniucs.com'
            },
            editorOption:{
                placeholder:"请在这里输入内容...",
                modules:{
                    imageResize:{
                            displayStyles:{
                                backgroundColor:'black',
                                border:'none',
                                color:'white'
                            },
                            modules:['Resize','DisplaySize','Toolbar']
                    },
                    imageDrop:true,
                    toolbar:{
                        container:toolbarOptions,
                        handlers:{
                            'image': function (value) {
                                    if (value) {
                                        document.querySelector('.avatar-uploader input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                        }
                    }
                }
            },
        }
    },
    components:{
        quillEditor
    },
    methods:{
        goBlog(id,writer){
            if(this.$store.state.isLogin==false){
                this.$message.error('先登陆，宝贝儿');

            }else{
                this.$router.push({name:"BlogInfo"})
                sessionStorage.setItem('blogid',id)
                sessionStorage.setItem('blogwriter',writer)
            }
        },

        beforeUpload() {this.quillUpdateImg = true},
        uploadSuccess(res) {
            let quill = this.$refs.myQuillEditor.quill
            if(res.hash!==''){
                let length = quill.getSelection().index;
                quill.insertEmbed(length,'image','http://hchopper.top/'+res.hash)
                quill.setSelection(length + 1)
            }
            else{
                this.$message.error('图片插入失败')
            }
            this.quillUpdateImg= false

        },
        openDialog(){
            console.log(this.postData.token);

            if(sessionStorage.length!==0){
                this.centerDialogVisible = true
            }
            else{
                this.$message.error('请先登录');
            }
        },
        upload(){
            
            var that = this;
            this.$axios.post('/blog/writeblog',{
                title:that.title,
                text:that.text
            })
            .then(res=>{
                console.log(res);
                if(res.data.code==200){
                    this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
                    that.centerDialogVisible = false
                    location.reload()
                }else if(res.data.code==201){
                    this.$message.error('请先登录');
                }
                else{
                    this.$message.error(res.data.msg);
                }
            })
        }
    },
    mounted(){
            this.$axios({
                url:'/blog/getblog',
                method:'get'
            })
            .then(res=>{
                this.blogitems=res.data.data.reverse()
            })
            .then(()=>{
                this.$axios({
                        method:'get',
                        url:'/token/cper/gettoken'
                    })
                .then(res=>{
                        this.postData.token = res.data.token
                })
            })
            .catch(error=>{
                console.log(error);
                console.log('请求失败')
                })
            
    }
}
</script>

<style>
    #inininfo{
        display: flex;
        align-items: center;
    }
    #inininfo>i{
        margin-left: 5px;
    }
    #inininfo>van-icon{
        margin-left: 5px;
    }
    #writeblogbtn{
        width: 40px;
        height: 40px;
        position: fixed;
        right: 30px;
        bottom: 30px;
        transition: .5s;
        background: #409EFF;
        color: white;
        border: none;
        outline: none;
        border-radius: 50%;
        cursor: pointer;
    }

    #writeblogbtn:hover {
        width: 50px;
        height: 50px;

    }

    #blogitems{
        width: 100%;
    }
    #blogitem{
        min-width: 366px;
        max-width: 366px;
        height: 470px;
        background: white;
        margin:30px 30px;
        transition: .3s;
        cursor: pointer;
    }
    #blogitem:hover{
        transform: translateY(-5px);
    }
    #blogitemhead{
        width: 100%;
        height: 200px;
        overflow: hidden;
    }
    #blogitemhead>img{
        width: 100%;
    }
    #blogitemtitle{
        max-width: 100%;
        max-width: 100%;
        height: 110px;
        font-size: 1.3em;
        font-weight: 900;
        padding: 0 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
    #blogitemtext{
        max-width: 100%;
        max-width: 100%;
        height: 84px;
        font-size: 1.2em;
        font-weight: 400;
        padding: 0 20px;
        color: #888;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
    #blogiteminfo{
        max-width: 100%;
        max-width: 100%;
        height: 76px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        color: rgb(72, 72, 72);
    }
</style>