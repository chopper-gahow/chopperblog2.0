<template>
  <div id="dailyPage">
      <div id="dailycontent">
          <div id="dailyfirst">
              <div id="firstleft">
                  <div id="fistleftimg">
                      <img src="https://img-home.csdnimg.cn/images/20200916045750.png" alt="">
                  </div>
              </div>
              <div id="firstright">
                  <div id="rightitems"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Daily',
    data(){
        return{
            // leftimage:''
        }
    },
    mounted(){
        this.$axios({
            methd:'get',
            url:'/getcsdnblog'
        })
        .then(res=>{
            // this.leftimage = res.data.dataleft.leftimage
            console.log(res);
        })
    }
}
</script>

<style>
    #dailycontent{
        margin-top: 70px;
    }
    #dailyfirst{
        width: 904px;
        height: 332px;
        background: white;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
    #firstleft{
        width: 49%;
        height: 332px;
        display: flex;
        flex-direction: column;
 
    }
    #fistleftimg{
        width: 100%;
        height: 176px;
        background: blue;
        border-radius: 10px;
    }
    #fistleftimg img{
        width: 100%;
    }
    #firstright{
        width: 49%;
        height: 100%;
        background: burlywood;
    }
</style>