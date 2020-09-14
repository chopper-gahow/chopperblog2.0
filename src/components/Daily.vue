<template>
    <div id="dailyPage">
        <div id="dailycontent">
            <div id="dailydec">
                <span>每日推荐（摘自csdn博客）</span>
            </div>
            <div id="ps">*浏览时会跳转至CSDN博客</div>
            <div v-for="(item,index) in dailyblog" :key="index">
                <a :href="item.dylink">
                <div id="dailyitems">
                    <div id="dailyhead"><img :src="item.headimg" alt=""></div>
                    <div id="dailytitle">{{item.title}}</div>
                </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Daily",
    data(){
        return{
            dailyblog:[]
        }
    },
    mounted(){
        this.$axios({
            method:'get',
            url:'/getcsdnblog'
        })
        .then(res=>{
            console.log(res);
            this.dailyblog = res.data.data
        })
    }
}
</script>

<style>
    #dailyPage{
        width: 100vw;
        min-height: 100vh;
    }
    #dailycontent{
        width: 50vw;
        min-height: 100vh;
        margin: 0 auto;
        background: white;
    }
    #dailydec{
        width: 50vw;
        display: flex;
        justify-content: center;

    }
    #dailydec span{
        text-align: center;
        width: 15em;
        font-size: 1.8em;
        color: rgb(106, 106, 31);
        border-bottom: 4px red double;
    }
    #dailyitems{
        width: 70%;
        height: 80px;
        margin: 0 auto;
        margin-bottom: 10px;
        border: 1px rgb(255, 127, 72) solid;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(243, 255, 231);

    }
    #dailyhead{
        width: 96px;
        height: 53px;
        background: red;
        border-radius: 5px;
        margin-right: 60px;
        overflow: hidden;
    }
    #dailyhead img{
        width: 100%;
    }
    #ps{
        width: 100%;
        text-align: center;
        margin-bottom: 40px;

    }
    #dailytitle{
        width: 300px;
        height: 70px;
        font-size: 1.3em;
        color: rgb(28, 28, 28);
    }
</style>