<template>
    <div class="content-box role">
      <!--消息类型-->


		<div class="meeting-box1">
	        <div class="h3-title">参会统计</div>
	        <div style="text-align:right;border-bottom:1px solid #eee;border-top:1px solid #eee;padding:10px 0;"><el-button type="primary" @click="goback()">返回</el-button></div>
		</div>
		
		
		
		<div style="width: 20%;margin-bottom:10px;">
          <el-select v-model="grade" @change="gradeChange(grade)" placeholder="年级">
            <el-option
		      v-for="item in gradeArr"
		      :key="item.sectionid"
		      :label="item.vname"
		      :value="item.sectionid">
		    </el-option>
          </el-select>
        </div>
        <!--<tableList :tableData='JZHlist' :pageNum="params.page" :pageSize="params.pageSize" :total="total" :columns="columns" @CurrentChange="handleCurrentChange" @selectionChange="handSelectionChange"></tableList>-->
		<el-table
		      :data="JZHlist"
		      stripe
		      style="width: 100%">
		      <el-table-column
		        prop="grad"
		        label="年级">
		      </el-table-column>
		      <el-table-column
		        prop="class"
		        label="班级">
		      </el-table-column>
		      <el-table-column
		        prop="time"
		        label="日期">
		      </el-table-column>
		      <el-table-column
		        prop="join"
		        label="应到人数">
		      </el-table-column>
		      <el-table-column
		        prop="total"
		        label="实到人数">
		      </el-table-column>
	    </el-table>


    </div>
</template>

<script>
  import API from '@/api/api_news';
  import APIGrade from '@/api/api_authorization';
  export default {
    data() {
      return {
        user: {},
        gradeArr:[],
        grade:'',
        loading:false,
        JZHlist:[],
        params:{
        	page:1,
        	pageSize:10
        },
        
        total: 0,
      }
    },
    mounted () {
      this.user = JSON.parse(sessionStorage.getItem('user')).user;
      APIGrade.skGrade({}).then((res)=>{
		if(res.code==1){
			this.gradeArr = res.data;
		} 
	  })
      this.init();
     
    },
    methods: {
     	
     	init(){
     		
//   		let promise={
//   			
//   		}
     		API.getParticipationList({gradid:this.grade}).then((res)=>{
              console.log(res);
              if(res.code==1){
                this.JZHlist = res.data;
              }
            })
     		
     	},
     	gradeChange(val){
     		this.grade = val;
     		this.init();
     	},
     	
     	
     	handleCurrentChange(val) {
	        this.params.page=val;
//	        this.init();
        },

		goback(){
			this.$router.push({path:'/meeting'})	
		},

 


 


     /*分页*/
//    handleSizeChange(val) {
//      console.log(`每页 ${val} 条`);
//      this.getUserList(this.pageNum, val);
//      this.pageSize = val;
//    },
//    handleCurrentChange(val) {
//      console.log(`当前页: ${val}`);
//      this.getUserList(val,this.pageSize);
//      this.pageNum = val;
//    },
//    

      
    }
  }
</script>

<style scoped lang="scss">
  .content-box{
  	padding:0 10px;
  	border-radius: 5px;
    border-top:2px solid #942987;
    background-color:#fff; 

    /*发送人*/
    .meeting-box1{
      padding:15px 0;
      background: #ffffff;
      .h3-title{
      	font-size:14px;
      	font-weight:600;
      	margin-bottom:10px;
      }
    }
    
    
    /*框*/
    .meeting-box2{
      margin-bottom:20px;
      background: #ffffff;
      border:1px solid #E6E6E6;
      border-radius: 5px;
      .h3-title{
      	font-size:14px;
      	font-weight:600;
      	padding:10px;
      	background:#F6F6F6;
      }
      
      .box-div{
      	padding:10px;
      }
    }

    /*重新编辑和发送*/
    .seding-box{
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
