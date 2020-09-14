<template>
  <div id="app">
    <router-view name="header"/>
    <router-view name="main"/>
  </div>
</template>

<script>

export default {
  data(){
        return{
          begintime:'',
          differTime:''
        }
  },
  mounted(){
    window.addEventListener("unload", () =>{
        this.differTime = new Date().getTime() - this.beginTime;
        console.log(this.differTime);
        if(this.differTime <= 5){
          var data = localStorage.getItem('username')
          this.$axios({
            method:'get',
            url:'/login/outlogin?username=' + data
          })
          .then(()=>{
            localStorage.clear()
          })
        }
    })
    window.addEventListener("beforeunload", () => {
        this.beginTime = new Date().getTime();
    })
  }
}
</script>
<style>

  *{
    padding: 0;
    margin: 0;
  }
  #app{
    max-width: 100vw;
    min-height: 100vh;
    background: #f5f6f7;
  }
</style>
