<template>
<div>  
    <div class="modules-box">
        <p class="box-text">新增</p>
        <div class="box-content">
            <div class="role" style="border-bottom:1px solid #F6F6F6;padding-bottom:20px;margin-bottom:20px;">
	            <h4> <span class="xuhuabordius"></span>选择</h4>
	           
	            <el-form style="margin-bottom:10px;border-bottom:1px dashed #eee">          
					<el-form-item style="display:inline-block;">
	                    <el-select v-model="gradeName" @change="gradeChange(gradeName)" placeholder="年级选择">
	                    	<el-option
						      v-for="item in gradeArr"
						      :key="item.sectionid"
						      :label="item.vname"
						      :value="item.sectionid">
						    </el-option>
	                    </el-select>
	                </el-form-item>
	                <el-form-item style="display:inline-block;">
	                    <el-select v-model="subjectName" @change="subjectChange(subjectName)" placeholder="学科选择">
	                    	<el-option
						      v-for="item in subjectArr"
						      :key="item.subjectid"
						      :label="item.vname"
						      :value="item.subjectid">
						    </el-option>
	                    </el-select>
	                </el-form-item>
	            </el-form>
	                
	            <h4><span class="xuhuabordius"></span>选择人员</h4>
	            <div style="text-align:right;padding-bottom:20px;">
	            	<!--<el-radio-group v-model="radioBumen" style="margin-right:10px;">
  						<el-radio :label="1" @click.native.prevent="clickitem(1)">按部门搜索</el-radio>
					</el-radio-group>
	            	
	            	<span v-if="bumenseachshow">
	            		<el-input style="width:35%;" v-model="searchUserValueBM" placeholder="请输入部门进行搜索" prefix-icon="el-icon-search"></el-input>
	                	<el-button type="primary" @click="searchBumen()">搜索</el-button>	
	                </span>
	                <span v-else>
	                	<el-input style="width:35%;" v-model="searchUserValue" placeholder="请输入姓名,手机号，邮箱号进行搜索" prefix-icon="el-icon-search"></el-input>
	                	<el-button type="primary" @click="search()">搜索</el-button>
	                </span>-->
	               <el-form> 
	                <el-row :gutter="20">     	
                    	<el-col :span="3">
                            <el-form-item>
                            	<el-select v-model="gradeNameAdd" @change="gradeChangeAdd(gradeNameAdd)" placeholder="年级筛选">
			                    	
			                    	<el-option
								      key="-1"
								      label="全部"
								      value="-1">
								    </el-option>
			                    	<el-option
								      v-for="item in gradeArrAdd"
								      :key="item.sectionid"
								      :label="item.vname"
								      :value="item.sectionid">
								    </el-option>
			                    </el-select>
                               
                            </el-form-item> 
                        </el-col>
                        
                    	<el-col :span="3">
                        	<el-form-item>
			                    <el-select v-model="classNameAdd" :loading="loadingClass" @change="classChangeAdd(classNameAdd)" placeholder="班级筛选">
			                    	<el-option
								      key="-1"
								      label="全部"
								      value="-1">
								    </el-option>
			                    	<el-option
								      v-for="item in classArrAdd"
								      :key="item.sectionid"
								      :label="item.vname"
								      :value="item.sectionid">
								    </el-option>
			                    </el-select>
			                </el-form-item>
		                </el-col>
                        <!--<el-col :span="3">
                            <el-form-item>
                            	<el-select v-model="subjectNameAdd" @change="subjectChangeAdd(subjectNameAdd)" placeholder="学科筛选">
			                    	
			                    	<el-option
								      key="-1"
								      label="全部"
								      value="-1">
								    </el-option>
								    
			                    	<el-option
								      v-for="item in subjectArrAdd"
								      :key="item.subjectid"
								      :label="item.vname"
								      :value="item.subjectid">
								    </el-option>
			                    </el-select>
                               
                            </el-form-item> 
                        </el-col>-->
                        <el-col :span="18">
	                        <div style="display:inline-block;">
	                            <el-form-item>
			                        <el-input v-model="searchUserValue" placeholder="请输入姓名进行搜索" prefix-icon="el-icon-search"></el-input>
			                    </el-form-item>
	                        </div>
	                        <div style="display:inline-block;margin-right:10px;">
	                            <el-form-item>
			                        <el-button type="primary" @click="search()">搜索</el-button>
			                    </el-form-item>
	                        </div>
	                        
	                    </el-col>
                   </el-row>
	             </el-form>   
	                
	            </div>
	            <div v-loading="loading">
	                <!--<tableList :checkBox="true" :tableData='subjectAllUser' :pageNum="params.page" :pageSize="params.pageSize" :total="total" :columns="columns" @CurrentChange="handleCurrentChange" @selectionChange="handSelectionChange"></tableList>-->
      				<el-table
      					class="radioNone"
			  			border 
			  			style="width: 100%"
					    ref="multipletable"
					    :data="subjectAllUser"
					>
					    <el-table-column label="单选" width="50">
                            <template scope="scope">
                                <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope)"></el-radio>
                            </template>
                        </el-table-column>
					    <el-table-column
					      prop="index"
					      label="序号"
					      width="60">
					      <template slot-scope="scope"> {{scope.$index+1+(params.page-1)*params.pageSize}}</template>
					    </el-table-column>
					    <el-table-column
					      prop="username"
					      label="授课教师"
					    >
					    </el-table-column>
					    <el-table-column
					      prop="gradeId"
					      label="年级"
					      show-overflow-tooltip>
					    </el-table-column>
					    
					    <el-table-column
					      prop="classNum"
					      label="班级"
					      show-overflow-tooltip>
					    </el-table-column>
					    
					    <el-table-column
					      prop="subjectId"
					      label="所授学科"
					      show-overflow-tooltip>
					    </el-table-column>
					    
					    
					  </el-table>
				  		<el-pagination style="margin-top:10px;text-align:right"
				        @current-change="handleCurrentChange"
				        :current-page="params.page"
				        :page-size="params.pageSize"
				        prev-text="上一页"
				        next-text="下一页"
				        layout="total,jumper, prev, pager, next"
				        :total="total">
				        </el-pagination>
	            
	            
	            </div>
      			
            </div>

            <div style="text-align:center;"><el-button type="" @click="cancel">取消</el-button><el-button type="primary" @click="submit">确认</el-button></div>
            
        </div>
    </div>
</div>
	
		
</template>
<script>
import API from '@/api/api_authorization';
import tableList from '@/module/tableList.vue';
import MyButton from '@/module/MyButton.vue';
  export default {
  	name: "role-add",
    data() {
      return {
      	user:{},
      	loading:true,
      	loadingClass:false,
      	subjectName:'',
      	gradeName:'',
      	subjectNameAdd:'',
      	gradeNameAdd:'',
      	classNameAdd:'',
      	subjectid:-1,
      	gradeid:-1,
      	classid:-1,
      	subjectArrAdd:[],
      	gradeArrAdd:[],
      	classArrAdd:[],
      	subjectArr:[],
      	gradeArr:[],
      	searchUserValue:'',
      	searchUserValueBM:'',
      	subjectAllUser: [],
      	total:0,
      	radioBumen:'',
      	radio:'',
      	userclickRadio:false,
      	userid:'',
      	bumenseachshow:false,
      	isbumen:false,
      	params : {
            page: 1,
            pageSize: 10
        }
		
      };
    },
    components:{
      tableList,
      MyButton
    },
   
    mounted(){
    	this.user = JSON.parse(sessionStorage.getItem('user')).user;
    	API.skGrade({}).then((res)=>{//获得年级
			console.log(res)
			if(res.code==1){
				this.gradeArr = res.data;
				this.gradeArrAdd = res.data;
			} 
		})
    	API.subjectAll({}).then((res)=>{//获得学科
			console.log(res)
			if(res.code==1){
				this.subjectArr = res.data;
				this.subjectArrAdd = res.data;
			} 
		})
    	this.init();
    },
    methods: {
    	clickitem(e){
    		e === this.radioBumen ? this.radioBumen = '' : this.radioBumen = e
    		console.log(this.radioBumen);
    		if(this.radioBumen){
    			this.bumenseachshow = true;
    		}else{
    			this.bumenseachshow = false;
    		}
    	},
    	init(){

			let promise={
    			search:this.searchUserValue,
    			subjectId:this.subjectName,//学科id
    			gradeId:this.gradeid,//年级id
    			classNum:this.classid,
    			pageSize:this.params.pageSize,
    			pageNum:this.params.page	
				
				
    		}
    		   this.loading = true; 
    		API.skLeaderList(promise).then((res)=>{
    			console.log(res)
    			if(res.code==1){	
    				this.subjectAllUser = res.data;   				
	    		    this.total = res.total;
    			}else{
    				
    			}
    			this.loading = false;            
    		})

	    	let that = this;
			setTimeout(function(){that.loading = false},20000);
	    },
	    handleCurrentChange(val) {
	        this.params.page=val;        
	        this.init();
        },
        getCurrentRow(val){//选择变更人单选
	        console.log(val)
	        this.userid = val.row.userId;
	        this.userclickRadio=true;
	    },

        subjectChange(val){
        	this.subjectName = val;
        	this.params.page = 1;
        	
        	this.init();
        	this.userclickRadio=false;
	    	this.radio = '';
        },
        
        gradeChange(val){
        	this.gradeName = val;
        	
        	console.log(val)
        },
        
        
        subjectChangeAdd(val){
        	this.subjectid = val;
        	this.params.page = 1;
	    	this.radio = '';
	    	this.userclickRadio=false;
	    	
        	this.init();
        },
        gradeChangeAdd(val){
        	this.gradeid = val;
        	
        	this.classArrAdd =[];
        	this.classNameAdd='';
        	this.classid = -1;
        	this.loadingClass = true;
        	API.skClass({pid:val}).then((res)=>{
				console.log(res)
				if(res.code==1){
					this.loadingClass = false;
					this.classArrAdd = res.data;
				}
				
			})
        	
        	this.params.page = 1;
	    	this.radio = '';
	    	this.userclickRadio=false;
        	this.init();
        	
        },
        classChangeAdd(val){
        	this.classid = val;
        	this.params.page = 1;
	    	this.radio = '';
	    	this.userclickRadio=false;
	    	console.log(this.gradeid)
        	this.init();
        },
        

	    cancel(){
	    	this.$router.push({path:'/prepareLessons', query: {show: true}})
	    },
	    submit() {
//	    	console.log(this.subjectName)
	    	if(this.subjectName&&this.gradeName){
	    		
	    		if(this.userclickRadio){
		    		let promise={
		    			xkgid:this.subjectName,//学科id
		    			bkmasters : this.userid+'-',//用户id
		    			gradeid : this.gradeName//年级id
		    		}
		    		API.bkLeaderCreate(promise).then((res)=>{
		    			console.log(res);
		    			if(res.code==1){
		    				this.$message({
				                title: '操作提示',
				                message: '添加成功',
				                type: 'success',
				            });
				           this.$router.push({path:'/prepareLessons', query: {show: true}})
		    			}else if(res.code==10107){
		    				this.$message({
				                title: '操作提示',
				                message: '添加失败！该年级该学科的备课组长已存在。',
				                type: 'warning',
				            });
		    			}else{
		    				this.$message({
				                title: '操作提示',
				                message: res.message,
				                type: 'warning',
				            });
		    			}
		    			
		    		})
	    		}else{
	    			this.$message({
		                title: '操作提示',
		                message: '请选择人员',
		                type: 'warning',
		            });
	    		}
    			
    		}else{
    			this.$message({
	                title: '操作提示',
	                message: '学科以及年级均不能为空',
	                type: 'warning',
	            });
    		}
    		
    		
    		
	    	

	    },
   
	    search(){
	    	if(this.searchUserValue){
//	    		this.isbumen = false;
	    		this.params.page = 1;
	    		this.radio = '';
	    		this.userclickRadio=false;
    			this.init();
    		}else{
    			this.$message({
		          title: '操作提示',
		          message: '请输入搜索内容', 
		          type: 'warning',
		        });
    		}
	    },
//	    searchBumen(){
//	    	if(this.searchUserValueBM){
//	    		this.isbumen = true;
//	    		this.params.page = 1;
//	    		this.radio = '';
//	    		this.userclickRadio=false;
//  			this.init();
//  		}else{
//  			this.$message({
//		          title: '操作提示',
//		          message: '请输入搜索内容', 
//		          type: 'warning',
//		        });
//  		}
//	    },
	    
	    
	    
	
	    
    }
    
    
  };
</script>
<style scoped  lang='scss'>
 $color:#942987;
 h4{margin:15px 0;padding-left:10px;}
 ul{padding:10px 0;}
 .ul-li{margin:4px 2px;position:relative;list-style: none;float:left;padding:4px 12px;border-radius:3px;border:1px solid #ccc;}
 .ul-li i{position:absolute;top:-10px;right:-6px;font-size:15px;cursor:pointer;color:#D4A9CF;}
 .xuhuabordius{margin:0 15px 0 0;display:inline-block;border-radius:50%;width:10px;height:10px;background:#942987;box-shadow:0 0 1px 4px #D6A3D0;}
.quanxian{min-height:400px;float:left;border:1px solid #eee;border-radius:5px;width:100%;margin-left:20px;}
.quanxiantitle{color:#666;font-size:14px;height:45px;line-height:45px;padding:0 10px;background:#F6F6F6;}
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
    }
    
}
</style>