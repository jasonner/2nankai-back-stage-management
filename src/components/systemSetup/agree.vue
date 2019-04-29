<template>
<div>
    <div class="modules-box">
    	<div class="box-content" v-loading="loading">
    		<el-tabs type="card" @tab-click="handleClick">
			  <el-tab-pane>
			  	<span slot="label">教师</span>
			  	<div style="text-align:right;">
			  		<!--<el-button type="primary" @click="addTeacher">新增协议</el-button>-->
			  		<el-button type="primary" @click="editTeacher">协议修改</el-button>	
			  	</div>
			  	
			  	<el-card class="box-card agreement">
				  <div>
				  	
				  	<el-input style="border:none;"
					  type="textarea"
					  :rows="18"
					  readonly="readonly"
					  v-model="agreeTeacher">
					</el-input>
				  </div>
				</el-card>
			  	
			  	
			  </el-tab-pane>
			  <el-tab-pane label="学生">
			  	<div style="text-align:right;">
			  		<!--<el-button type="primary" @click="addStudent">新增协议</el-button>-->
			  		<el-button type="primary" @click="editStudent">协议修改</el-button>	
			  	</div>
			  	
			  	<el-card class="box-card agreement">
				  <div>
				  	
				  	<el-input style="border:none;"
					  type="textarea"
					  :rows="18"
					  readonly="readonly"
					  v-model="agreeStudent">
					</el-input>
				  </div>
				</el-card>
			  	
			  </el-tab-pane>
			  <el-tab-pane label="家长">
			  	<div style="text-align:right;">
			  		<!--<el-button type="primary" @click="addParent">新增协议</el-button>-->
			  		<el-button type="primary" @click="editParent">协议修改</el-button>	
			  	</div>
			  	
			  	<el-card class="box-card agreement">
				  <div>
				  	<el-input style="border:none;"
					  type="textarea"
					  :rows="18"
					  readonly="readonly"
					  v-model="agreeParent">
					</el-input>
				  </div>
				</el-card>

			  </el-tab-pane>
			</el-tabs>
	    </div>
	    
	    <el-dialog
		  :title="addagreeTitle"
		  :visible.sync="centerDialogVisible"
		  width="70%"
		  center>
		  <div>
		  	<el-input
			  type="textarea"
			  :rows="18"
			  placeholder="请输入协议内容"
			  v-model="content">
			</el-input>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="centerDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="agreeQueDing">确 定</el-button>
		  </span>
		</el-dialog>
		
		
		<el-dialog
		  :title="addagreeTitle"
		  :visible.sync="centerDialogVisibleEdit"
		  width="70%"
		  center>
		  <div>
		  	<el-input
			  type="textarea"
			  :rows="18"
			  placeholder="请输入协议内容"
			  v-model="agreement">
			</el-input>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="centerDialogVisibleEdit = false">取 消</el-button>
		    <el-button type="primary" @click="agreeQueDingEdit">确 定</el-button>
		  </span>
		</el-dialog>
	    
	    
    </div>     
</div>
</template>
<script>
	import API from '@/api/api_log';
  export default {
    data() {
      return {
        user:{},
        loading:false,
        usertype:'0',//0教师1学生2家长
        agreeTeacher:'',
        agreeStudent:'',
        agreeParent:'',
        content:'',
        addagreeTitle:'',
        centerDialogVisible:false,
        centerDialogVisibleEdit:false,
        agreement:'',
        id:'',
      }
    },

	mounted(){
    	this.user = JSON.parse(sessionStorage.getItem('user')).user;
        this.init();
    },
    methods: {
    	init(){
    		this.loading = true;
	        API.agreeShow({userType:this.usertype}).then((res)=>{
	        	console.log(res)
	    		if(res.code==1){
	    			if(this.usertype==0){
	    				this.agreeTeacher = res.data.content
	    			}else if(this.usertype==1){
	    				this.agreeStudent = res.data.content
	    			}else if(this.usertype==2){
	    				this.agreeParent = res.data.content
	    			}
	    			this.id = res.data.protoid;
		       		this.loading = false;
		        }else{
		        	this.$message({
			          title: '操作提示',
			          message: res.message, 
			          type: 'warning',
			        });
		        }
	        })
	    },
	    
	    update(){
	    	this.loading = true;
	    	let promise={
	    		content:this.agreement,
	    		userId:this.user.userid,
	    		protoid:this.id,//协议id
	    	}
	    	API.agreeUpdate(promise).then((res)=>{
	        	console.log(res)
	    		if(res.code==1){
//	    			if(this.usertype==0){
////	    				this.agreeTeacher = res.data.content
//	    			}else if(this.usertype==1){
////	    				this.agreeStudent = res.data.content
//	    			}else if(this.usertype==2){
////	    				this.agreeParent = res.data.content
//	    			}
	    			
	    			this.init();
		       		this.loading = false;
		        }else{
		        	this.$message({
			          title: '操作提示',
			          message: res.message, 
			          type: 'warning',
			        });
		        }
	        })
	    },
	    
	    
	    
	    handleClick(tab, event) {
	        console.log(tab.index);
	        this.usertype = tab.index;
	        this.init();
	    },
	    agreeQueDing(){
	    	if(this.content.replace(/\s+/g,"")==''){
	    		this.$message({
			          title: '操作提示',
			          message: '协议内容不能为空', 
			          type: 'warning',
			        });
	    	}else{
	    		this.centerDialogVisible=false;
	    		this.agreeAdd(this.content,this.usertype)
	    	}
	    },
	    
	    agreeQueDingEdit(){
	    	if(this.agreement.replace(/\s+/g,"")==''){
	    		this.$message({
			          title: '操作提示',
			          message: '协议内容不能为空', 
			          type: 'warning',
			        });
	    	}else{
	    		this.centerDialogVisibleEdit=false;
	    		this.update()
	    	}
	    },
	    
	    
	    agreeAdd(content,utypeid){
	    	let promise={
	    		creator:this.user.userid,
	    		content:content,
	    		utypeid:utypeid
	    	}
	    	console.log(promise)
	    	API.agreeAdd(promise).then((res)=>{
	        	
	    		if(res.code==1){
		       		this.$message({
			          title: '操作提示',
			          message: '添加成功', 
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

	    addTeacher(){
	    	this.centerDialogVisible=true;
	    	this.addagreeTitle = '教师协议'
	    	this.content='';
	    },
	    addStudent(){
	    	this.centerDialogVisible=true;
	    	this.addagreeTitle = '学生协议'
	    	this.content='';
	    },
	    addParent(){
	    	this.centerDialogVisible=true;
	    	this.addagreeTitle = '家长协议'
	    	this.content='';
	    },
	    
	    editTeacher(){
	    	this.centerDialogVisibleEdit=true;
	    	this.addagreeTitle = '教师协议'
	    	this.agreement=this.agreeTeacher;
	    },
	    editStudent(){
	    	this.centerDialogVisibleEdit=true;
	    	this.addagreeTitle = '学生协议'
	    	this.agreement=this.agreeStudent;
	    },
	    editParent(){
	    	this.centerDialogVisibleEdit=true;
	    	this.addagreeTitle = '家长协议'
	    	this.agreement=this.agreeParent;
	    },
      
    }
  }
</script>

<style scoped>
li{list-style:none;}
.box-card{margin:20px 0;}
.modules-box{
    border-radius: 5px;
    border-top:2px solid #942987;
    background-color:#fff;
    padding:30px 10px;
}
.box-content{padding:0 20px;}

</style>