<template>
<div>
    <div class="modules-box">
    	<div>
    		<el-form>
	    		<el-form-item>
	            	<el-select v-model="usertype" @change="usertypeChange(usertype)" placeholder="用户类型">
	                	<el-option
					      key="-1"
					      label="全部"
					      value="-1">
					    </el-option>
	                	<el-option
					      key="0"
					      label="教师"
					      value="0">
					    </el-option>
					    <el-option
					      key="1"
					      label="学生"
					      value="1">
					    </el-option>
					    <el-option
					      key="2"
					      label="家长"
					      value="2">
					    </el-option>
					    
	               </el-select>
	            </el-form-item>
    		</el-form>
    	</div>
    	
    	
    	<div class="box-content" v-loading="loading">
    		 <tableList :tableData='onlineList' :pageNum="params.page" :pageSize="params.pageSize" :total="total" :columns="columns" @CurrentChange="handleCurrentChange"></tableList>
	    </div>
    </div>     
</div>
</template>
<script>
	import API from '@/api/api_log';
	import tableList from '@/module/tableList.vue';
	import MyButton from '@/module/MyButton.vue';
	import {formatDate} from '@/assets/filter'
  export default {
    data() {
      return {
        user:{},
        usertype:'',
        params : {
            page: 1,
            pageSize: 10
        },
        total:0,
        onlineList:[],
        loading:true,
        columns: [
          { prop: "logId", label: "序号" ,width:"60",order:true},
          { prop: "account", label: "用户账号" ,
          		render: function (h, params) {
			        return h('span', this.row.user.account)
			    }
          },
          { prop: "realname", label: "用户姓名",
          		render: function (h, params) {
			        return h('span', this.row.user.username)
			    }
          },
          { prop: "usertype", label: "用户类型" ,
          		
          	    render: function (h, params) {
          	    	let html='';
	          		if(this.row.user.utypeid==0){
	          			html = '教师'
	          		}else if(this.row.user.utypeid==1){
	          			html = '学生'
	          		}else if(this.row.user.utypeid==2){
	          			html = '家长'
	          		}else{
	          			html="访客"
	          		}
		            return h('span', html)
		        }
          },
          { prop: "startTiem", label: "上线时间",
          	    render: function (h, params) {
		            return h('span', 
		            formatDate(new Date(this.row.startTiem), 'yyyy-MM-dd hh:mm')
		        )}
          },
          { prop: "ip", label: "客户主机" },
          { prop: "deviceName", label: "设备类型" },
          { prop: "coreName", label: "浏览器名称" },

         { prop: "dom", label: "操作" ,fixed:"right",width:"120",
              render:(h, param) =>{
                  const moreButton = {
                    items:[    
                      { label: "踢除",func: { func: "del", rowList: param } }, 
                    ]
                  };
                  return h(MyButton, {
                    props: { moreButton: moreButton },
                    on: {del: this.del}
                  });
              }
         },
        ],
      }
    },
	filters:{
    formatDate(time){
        var data = new Date(time);
        return formatDate(data,'yyyy-MM-dd');
    }
   },
   components:{
      tableList,
      MyButton
   },
	mounted(){
    	this.user = JSON.parse(sessionStorage.getItem('user'));
        this.init();
    },
    methods: {
    	
    	usertypeChange(value){
    		this.usertype = value;
    		this.init();
    	},
    	init(){
    		let onlinedata = {
    			pageSize:this.params.pageSize,
    			pageNum:this.params.page,
    			userType:this.usertype
    		}
    		this.loading = true;
	        API.online(onlinedata).then((res)=>{
	    				console.log(res)
	    				if(res.code==1){
			       		this.onlineList = res.data;
			      	    this.total = res.total; 
			      	    this.loading = false;
			       }
	        })
	    },
	    
	    del(item){
	    	API.expurgate({code:item.row.code}).then((res)=>{
    				console.log(res)
    				if(res.code==1){
    					this.$message({
				          title: '操作提示',
				          message: '操作成功', 
				          type: 'success',
				        });
			       		this.init();
			       }else{
				       	this.$message({
				          title: '操作提示',
				          message: res.message, 
				          type: 'warning',
				        });
			       }
	        })
	    	
	    },
      handleCurrentChange(val) {
        this.params.page=val;
        this.init();
      },
    }
  }
</script>

<style scoped>
li{list-style:none;}
.modules-box{
    border-radius: 5px;
    border-top:2px solid #942987;
    background-color:#fff;
    padding:30px 10px;
}
.box-content{padding:0 20px;}

</style>