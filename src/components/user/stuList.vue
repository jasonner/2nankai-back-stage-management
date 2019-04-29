<template>
  <div>
	<el-row>
		<el-col :span="24">
			<div class="modules-box">
		  		<p class="box-text">学生平均成绩波动统计</p>
		  		<div class="box-content">
			  		<x-chart :id="id" :option="option"></x-chart>
				</div>
		  	</div>
		</el-col>
	</el-row>
  </div>
</template>

<script>
import API from '@/api/api_user';
import XChart from '@/module/charts/line.vue'
import options from '@/assets/line-chart'
export default {
	data () {
		let option = options.bar
	    return {
	    	 id: 'test',
     		 option: option
	    }
    },
    components:{
      XChart
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
       
      },
      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
$color:#942987;
.modules-box{
	border-radius: 5px;
	border-top:2px solid $color;
	background-color:#fff;
	.box-text{
		border-bottom:1px solid #ddd;
		margin:0px;
		line-height:35px;
		text-indent:20px;
	}
	.box-content{
		padding:10px;
		.title-box{
			background-color: #fff;
			border-radius: 5px;
			border: 1px solid #ddd;
			border-left: 2px solid $color;
			margin-bottom: 10px;
		}
		.person{
			text-align:center;
			color:#666;
			img{
				border:5px solid rgba(0,0,0,0.2);
				border-radius:100%;
				width:100px;
				height:100px;
				display:inline-block;
				margin:8px 0px;
			}
			p{
				line-height:1.7;
				margin:0;
			}
		}
	}
	
}


</style>
