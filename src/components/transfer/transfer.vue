<template>
    <div  v-loading.fullscreen.lock="fullscreenLoading">
    </div>
</template>

<script>
    export default {
        name: "transfer",
        data () {
          return{
            user : {},
            fullscreenLoading: true,
          }
        },
        mounted () {
          this.user = sessionStorage.getItem('user');
          this.initData();
        },
        methods: {
          initData () {
            let that = this;
            $.ajax({
              url: 'http://www.2nankai.cn/mediacms/193fa25a32e81b87d551fd72e2701cdf.php',
              type: "get",
              data: {
                'log': that.user.account,
                'pwd': that.user.cleartextpwd
              },
              success: function(res){
                  that.$router.push('/index');
                  that.fullscreenLoading = false
              },
              error:function(data){
                console.log('出错啦');
                console.log(data);
              }
            })
          }
        }
    }
</script>

<style scoped>

</style>
