<template>
  <div>
  	<div style="width:60%;margin:0 auto;text-align:center;font-size:26px;color:#942987;">
  		<img src="../../../static/weihu.png" style="width:100%;"/>
  			<span v-if="show">维护倒计时{{stopTime}}</span>
  	</div>
  	
   	 
  </div>
</template>
<script>
  export default {
    data() {
      return {
      	time:'',
        stopTime:'',
        show:true,
      };
    },
	  mounted(){
    		this.time = parseInt(this.$route.query.time);
    		this.getTimes();
    },
    methods: {
				getTimes(){
            // 获取结束时间的日期
            var endTime = new Date(this.time);
            // 获取当前日期
            var nowTime = new Date();
            // 获取结束时间与当前时间的总毫秒数
            var t = endTime.getTime() - nowTime.getTime();
            // 定义4个变量 存放日期
            var d = 0;
            var h = 0;
            var m = 0;
            var s = 0;
            // 如果获取的毫秒数>0
            if(t > 0){
                // 获取相对应的天时分秒
                d = Math.floor(t/1000/60/60/24);
                h = Math.floor(t/1000/60/60%24);
                m = Math.floor(t/1000/60%60);
                s = Math.floor(t/1000%60);
            }
            this.stopTime = (d+"天"+h+"时"+m+"分"+s+"秒")
            if(endTime<=nowTime){
            	console.log(7878)
            	this.show = false;
            	clearInterval(interval);
            	return false;
            } 
            var interval = setInterval(this.getTimes,1000)//执行倒计时的函数
 
      },

    }
  }
</script>

<style scoped lang='scss'>
li{list-style:none;}
.modules-box{
    border-radius: 5px;
    border-top:2px solid #942987;
    background-color:#fff;
    padding:30px 10px;
}
.box-content{padding:0 20px;overflow:hidden;}
.person{overflow:hidden;float:left;width:27%;height:597px;border:1px solid #eee;border-radius:5px;padding:20px;text-align:center;}
p .usertype{background:#942987;padding:2px 10px;border-radius:10px;color:#fff;font-size:12px;margin:-2px 0 0 10px;}
.person .touxiang{
	border:2px solid rgba(0,0,0,0.1);
	border-radius:100%;
	width:100px;
	height:100px;
	display:inline-block;
	margin:8px 20px;

}
.person form{cursor:pointer;z-index:100;left:54%;width:33px;overflow:hidden;top:53%;position:absolute;opacity: 0;filter:alpha(opacity=0);}
.person .absolu{left:54%;top:53%;position:absolute;background:#fff;border-radius:50%;z-index:10;border:1px solid #ddd;text-align:center;width:30px;height:30px;line-height:33px;}
.person .absolu i{color:#942987;}
.infos{
  overflow:hidden;
  display: flex;
  flex-wrap:wrap;
  height:250px;width:58%;border:1px solid #eee;
  margin:0 20px;
  float:left;
  padding:20px;
  border-radius:5px;
  li{
    flex: auto;
    width: 100%;
    flex-direction: column;
    height:45px;
    line-height:45px;
      .el-button{
        padding: 5px 10px;
      }
  }
}

.infos li i{color:#942987;padding:0 10px;font-size:18px;}
.third{
  overflow:hidden;
  border-radius:5px;
  width:58%;padding:20px;float:left;border:1px solid #eee;margin:20px;
  .third-box{
    display: flex;
    flex-direction: column;
    li{
      flex: auto;
      line-height: 70px;
      img{
        vertical-align: middle;
      }
      span{
        text-align:center;
        display: inline-block;
        width: 150px;
      }
      .el-button{
        padding: 5px 10px;
      }
    }
  }
}
.change-tel-input{
    width:90%;
    margin: 0 auto;
    border-radius: 5px;
    border:1px solid #dfdfdf;
    height: 30px;
    padding-left: 10px;
  }
.change-email-input{
  width: 40%;
 margin-top: 10px;
  border-radius: 5px;
  border:1px solid #dfdfdf;
  height: 30px;
  padding-left: 10px;
}
  .GetVerifyingCode{
    padding: 10px 15px;
    margin-left: 75px;
  }
 .list{height:40px;line-height:40px;}
 .radio{margin-right:5px;display:inline-block;width:13px;height:13px;border-radius:50%;background:#942987;}
</style>
