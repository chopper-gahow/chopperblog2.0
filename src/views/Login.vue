<template>
    <div id="login">
        <div id="logincom">
            <div>
                <h1 id="CperBlog">登陆</h1>
            </div>
            <div id="zcinput">
                <h2>用户登陆</h2>
                <el-input v-model="username" placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
                <el-input show-password v-model="password" placeholder="请输入密码" prefix-icon="el-icon-user"></el-input>
            </div>
            <div>
            <el-button type="primary" @click="clkLogin" round id="btndl" @keyup.enter.native="clkLogin">登陆</el-button>
            <el-button type="primary" @click="gogoRegister" round id="btngozc">没有账号？去注册</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Login",
    data(){
        return{
            username:'',
            password:''
        }
    },
    methods:{
        clkLogin(){
            var that = this
            this.$axios({
                url:'/login/userLogin?username='+that.username+'&password='+that.password,
                method:'get'
            })
            .then(res=>{
                if(res.config.url === '/login/userLogin?username=&password='){
                    this.$message.error('用户名密码不能为空');
                }
                else if(res.config.url !== '/login/userLogin?username=&password='&& res.data === 'no!'){
                    this.$message.error('用户名或密码错误');
                }
                else if(res.config.url !== '/login/userLogin?username=&password='&& res.data !== 'no!'){
                    this.$router.push({ name: "Blog" });
                    this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
                    this.$store.state.username=res.data.data.username
                    this.$store.state.password=res.data.data.password
                    this.$store.state.nickname=res.data.data.nickname
                    this.$store.state.birth=res.data.data.birth
                    this.$store.state.headimg=res.data.data.headimg
                    sessionStorage.setItem('id',res.data.data.id)
                    sessionStorage.setItem('username',res.data.data.username)
                    sessionStorage.setItem('password',res.data.data.password)
                    localStorage.setItem("username",res.data.data.username)
                    this.$store.state.isLogin=true
                    sessionStorage.setItem('isLogin',true)
                    sessionStorage.setItem('headimg',res.data.data.headimg)
                    sessionStorage.setItem('nickname',res.data.data.nickname)
                    sessionStorage.setItem('birth',res.data.data.birth)
                    console.log(res);
                }

            })
            .catch(error=>{
                this.$message.error('错了哦');
                console.log(error);
                }
                );  
        },
        gogoRegister(){
            this.$router.push({ name: "Register" });
        }
    },

}
</script>
<style>
    #login{
        padding: 0;
        margin: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        background: skyblue;
    }
    #logincom{
        margin: auto;
        width: 300px;
        height: 600px;
        background: white;
        padding: 0 40px;
        border-radius: 5px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        opacity: 0.85;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
    #logincom p{
        font-size: .8em;
        color: #757C80;
    }
    #btndl{
        width: 100%;
        margin-bottom: 20px;
    }
    #btngozc{
        width: 100%;
        margin: 0;
    }
</style>