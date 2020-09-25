<template>
    <div id="personalPage">
        <div v-if="isLogin" id="editbox">
            <h1>个人信息</h1>
            <el-tabs v-model="activeName" @tab-click="handleClick" id="edit">
                <el-tab-pane label="个人资料" name="first">
                    <div>
                        <div id="nicknameupdate">

                            <el-input v-model="editnickname" id="nicknameinput" :placeholder="nickname"></el-input>
                            <el-button id="updatebtn" type="success" plain @click="editniknam">修改昵称</el-button>
                        </div>
                        <div class="block">

                            <span class="demonstration"></span>
                            <el-date-picker
                                id="birthinput"
                                v-model="editbirth"
                                type="date"
                                :placeholder="birth">
                            </el-date-picker><br>
                            <el-button id="updatebtn" type="success" plain @click="editbth">修改生日</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="头像管理" name="second">
                    <div id="fangyuan">
                        <div id="zhengimg">
                        <img id="img" v-if="imageUrl" :src="imageUrl" class="avatar">
                        <img id="img" v-else :src="personalheadimg">
                    </div>
                    <div id="yuanimg">
                        <img id="img" v-if="imageUrl" :src="imageUrl" class="avatar">
                        <img id="img" v-else :src="personalheadimg">
                    </div>
                    </div>
                    <el-button type="success" round @click="toggleShow" plain>设置头像</el-button>
                     <my-upload  
                     @crop-success="cropSuccess" 
                     @crop-upload-success="handleAvatarSuccess"
                     v-model="show" 
                     :width="200" 
                     :height="200" 
                     img-format="png" 
                     :size="size"
                     langType='zh'
                     :noRotate='false'
                     field="file"
                     url='http://upload-z2.qiniup.com'
                     :params=postData
                     ></my-upload>
                    <img :src="imageUrl">
                </el-tab-pane>
                <el-tab-pane label="账号信息" name="third">
                    <div>账号：{{personalusername}}</div>
                    <el-button type="warning" @click="outLogin" round id="out">退出登陆</el-button> 
                </el-tab-pane>
            </el-tabs>
        </div>
        <div id="nologin" v-else>
            您还没有登陆，请登录~~~
        </div>
    </div>
</template>
<script>
import 'babel-polyfill'; 
import myUpload from 'vue-image-crop-upload';

export default {
    name:'Personal',
    data(){
        return {
            quillUpdateImg:false,
            editpassword:'',
            editnickname:'',
            editbirth:'',
            personalheadimg:this.$store.state.headimg,
            activeName: 'first',
            isLogin:sessionStorage.getItem('isLogin'),
            imageUrl:'',
            postData:{
                token:this.$store.state.qiniutoken,
                domain:'hcpr.s3-cn-south-1.qiniucs.com',
            },
            personalusername:this.$store.state.username,
            personalpassword:this.$store.state.password,
            outuser:this.$store.state.username,
            show:false,
            size:2.1
        }
    },
    components: {
      "my-upload": myUpload
    },
    mounted(){
        console.log(123);
        console.log(this.$store.state.qiniutoken);
        this.$axios({
                        method:'get',
                        url:'/token/cper/gettoken'
                    })
                    .then(res=>{
                        this.postData.token = res.data.token
                        sessionStorage.setItem('qiniutoken',res.data.token)
                    })
    },
    methods:{
        cropSuccess(){
            console.log('read tp upload');
        },
        toggleShow() {
            this.show = !this.show;
        },
        outLogin(){
            var that = this
            this.$axios({
                method:'get',
                url:'/login/outlogin?username='+that.outuser
            })
            .then(res=>{
                
                console.log(res);
                if(res.data.code==200){
                    this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
                    sessionStorage.clear()
                    this.isLogin=false;
                    this.$router.push({ name: "Blog" });
                }
                else{
                    this.$message.error('退出失败，检查网络后重试');
                }
            })
            
            },
        handleAvatarSuccess(res, file) {
            var that = this
            try {
                this.imageUrl = file.raw;
            } catch (error) {
                this.imageUrl = window.URL.createObjectURL(file.raw);
            }
            this.$axios({
                method:"get",
                url:'/personal/editheadimg?headimg=http://hchopper.top/'+res.hash,
            }).then(ress=>{
                sessionStorage.setItem('headimg',ress.data.data.headimg)
                that.$store.state.headimg=sessionStorage.getItem('headimg')
                location.reload()  
            })
            .then(()=>{
                this.$message({
                        showClose: true,
                        message: '头像修改成功',
                        type: 'success'
                        });
            })
        },
        editniknam(){
            var that = this;
            this.$axios({
                url:'/personal/editnickname?nickname='+that.editnickname,
                method:'get'
            })
            .then((res,err)=>{
                if(res.data.code == 200){
                    sessionStorage.setItem('nickname',res.data.data.nickname)
                    that.$store.state.nickname=sessionStorage.getItem('nickname')
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                        });
                }
                else{
                    console.log(err);
                    this.$message.error('修改失败');
                    }
            })
            
        },
        editbth(){
            var that = this;
            this.$axios({
                url:'/personal/editbirth?birth='+that.a,
                method:'get'
            })
            
            .then((res,err)=>{
                if(res.data.code == 200){
                    sessionStorage.setItem('birth',res.data.data.birth)
                    that.$store.state.birth=sessionStorage.getItem('birth')
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                        });
                }
                else{
                    console.log(err);
                    this.$message.error('修改失败');
                    }
            })
        },
        handleClick(tab, event) {
            console.log(tab, event);
      }

    },
    computed:{
        a(){
            var date = this.editbirth
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        username(){
            return this.$store.state.username
        },
        password(){
            return this.$store.state.password
        },
        headimg(){
            return this.$store.state.headimg
        },
        nickname(){
            return this.$store.state.nickname
        },
        birth(){
            return this.$store.state.birth
        }
        
    }
}
</script>
<style>
    #fangyuan{
        width: 400px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-bottom: 50px;
    }
    #yuanimg{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        border:3px rgb(96, 164, 118) dashed;
    }
    #yuanimg>img{
        width: 100%;
    }
    #nologin{
        padding-top: 30%;
        text-align: center;
    }
    #zhengimg{
        height: 200px;
        width: 200px;
        border:3px  rgb(96, 164, 118) dashed;
    }
    #zhengimg>img{
        width: 100%;
    }
    #personalPage{
        width: 70vw;
        height: 85vh;
        margin: 0 auto;
    }
    #birthinput{
        cursor: pointer;
    }
    #editbox{
        width: 100%;
        height: 100%;
        background: white;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        border: 2px skyblue solid;
        border-radius: 10px;

    }
    #edit{
        display:flex;
        flex-direction: column;
        align-items: center;
        height: 80%;
    }
    #nicknameupdate{
        margin-top: 50px;
        margin-bottom: 50px;
    }
    #updatebtn{
        margin-top: 20px;
    }
.upload {
  width: 600px;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  width: 300px;
  height: 300px;
  border: 2px dashed #ca1717;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
#img{
    width: 100%;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>