<template>
<div>  
    <div class="modules-box" v-if="show">
        <p class="box-text">学科组设置</p>
        <div class="box-content" v-loading="loading">
            <el-row style="border-bottom:1px dashed #eee;height:55px;">
                <el-col :span="14">
                    <el-form  class="demo-form-inline">
                        <el-row :gutter="20">
                            <el-col :span="5">
	                            <el-form-item>
	                            	<el-select v-model="subjectName" @change="subjectChange(subjectName)" placeholder="学科筛选">
				                    	<el-option
									      key="-1"
									      label="全部"
									      value="-1">
									    </el-option>
				                    	<el-option
									      v-for="item in subjectArr"
									      :key="item.subjectid"
									      :label="item.vname"
									      :value="item.subjectid">
									    </el-option>
				                    </el-select>
	                               
	                            </el-form-item> 
                            </el-col>
                            
                        </el-row>
                    </el-form>
                </el-col>
                <el-col :span="10" style="text-align:right;">
                    <el-form  class="demo-form-inline">
                        <el-row :gutter="20">
                            <div style="display:inline-block;width:60%;">
	                            <el-form-item>
			                        <el-input v-model="searchValue" @change="searchValueChange(searchValue)" placeholder="请输入姓名进行搜索" @keyup.enter.native="search" prefix-icon="el-icon-search"></el-input>
			                    </el-form-item>
                            </div>
                            <div style="display:inline-block;margin-right:10px;">
	                            <el-form-item>
	                            	<!--icon="el-icon-search"-->
			                        <el-button type="primary" @click="search()">搜索</el-button>
			                    </el-form-item>
                            </div>
                            <!--<el-col :span="5" style="text-align:right">
			                    <el-button type="primary" @click="addrole()">新增</el-button>
			                </el-col>-->
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
            
            <el-row style="text-align:right;margin-bottom:20px;">
            	<!--<el-button type="primary" @click="daoru()">导入</el-button>-->	
            	<el-button type="primary" @click="addSubjetUser()">新增</el-button>	
            </el-row>
            
            <tableList :checkBox="true" :tableData='subjectList' :pageNum="params.page" :pageSize="params.pageSize" :total="total" :columns="columns" @CurrentChange="handleCurrentChange" @selectionChange="handSelectionChange"></tableList>
        </div>
        
        
        <el-dialog
		  title="角色状态修改"
		  :visible.sync="statusDialog"
		  width="30%"
		  center>
		  <div style="width:100%;text-align:center;">{{statusDialogInfo}}</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="statusDialog = false">取 消</el-button>
		    <el-button type="primary" @click="statusDialogQD">确 定</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog
		  title="删除学科组长"
		  :visible.sync="delDialog"
		  width="30%"
		  center>
		  <div style="width:100%;text-align:center;">确定要删除此学科组长吗？</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="delDialog = false">取 消</el-button>
		    <el-button type="primary" @click="delDialogQD">确 定</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog
		  title="学科组长变更"
		  :visible.sync="editSubjectDialog"
		  width="70%"
		  :before-close="beforeClose"
		  >
		  
		  	<h4 style="display:inline-block;margin:0 0 4px 0;"><span class="xuhuabordius"></span>当前</h4>
		  	<div>学科组长:{{subjectLeaderNow}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;学科:{{subjectNow}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;负责年级:{{grades}}</div>
		  	
		  	<h4><span class="xuhuabordius"></span>选择变更人</h4>
            <div style="text-align:right;padding-bottom:20px;">
            	
            	<!--<el-radio-group v-model="radioBumen" style="margin-right:10px;">
  						<el-radio :label="1" @click.native.prevent="clickitem(1)">按部门搜索</el-radio>
				</el-radio-group>
	            	
            	<span v-if="bumenseachshow">
            		<el-input style="width:35%;" v-model="searchUserValueBM" placeholder="请输入部门进行搜索" prefix-icon="el-icon-search"></el-input>
                	<el-button type="primary" @click="searchEditBumen()">搜索</el-button>	
                </span>
                <span v-else>
                	<el-input style="width:35%;" v-model="searchUserValue" placeholder="请输入姓名,手机号，邮箱号进行搜索" prefix-icon="el-icon-search"></el-input>
                	<el-button type="primary" @click="searchEdit()">搜索</el-button>
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
			                        <el-button type="primary" @click="searchEdit()">搜索</el-button>
			                    </el-form-item>
	                        </div>
	                        
	                    </el-col>
                   </el-row>
	             </el-form> 
            	
                
            </div>
		  	
		    <div v-loading="loadingEdit" style="width:100%;text-align:center;">
				    <el-table
				    	class="radioNone"
			  			border 
			  			style="width: 100%;text-align:left;"
					    ref="multipletableEdit"
					    :data="subjectEdit"
					>
					    <el-table-column label="单选" width="60">
                            <template scope="scope">
                                <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope)"></el-radio>
                            </template>
                        </el-table-column>
					    <el-table-column
					      prop="index"
					      label="序号"
					      width="60">
					      <template slot-scope="scope"> {{scope.$index+1+(paramsEdit.page-1)*paramsEdit.pageSize}}</template>
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
			  		<el-pagination style="margin-top:10px;text-align:right;margin-bottom:20px;"
			        @current-change="handleCurrentChangeEdit"
			        :current-page="paramsEdit.page"
			        :page-size="paramsEdit.pageSize"
			        prev-text="上一页"
			        next-text="下一页"
			        layout="total,jumper, prev, pager, next"
			        :total="totalEdit">
			        </el-pagination>
				
		  		
		  		
			  	<el-button @click="beforeClose">取消</el-button>
			    <el-button type="primary" @click="submitEditForm()">提交</el-button>

		  </div>
		</el-dialog> 
    </div>
	<router-view v-if="!show"></router-view>
</div>
		
</template>


<script>
import API from '@/api/api_authorization';
import tableList from '@/module/tableList.vue';
import MyButton from '@/module/MyButton.vue';
  export default {
    data() {
      return {
      	user:{},
      	show:true,
      	radio:'',
      	radioEdit:false,
      	grades:'',
      	loading:true,
      	loadingClass:false,
      	xkmaster:'',
      	xkgid:'',
      	loadingEdit:true,
      	subjectName:'',
      	subjectid:-1,
      	subjectNameAdd:'',
      	gradeNameAdd:'',
      	classNameAdd:'',
      	subjectidAdd:-1,
      	gradeid:-1,
      	classid:-1,
      	subjectArrAdd:[],
      	gradeArrAdd:[],
      	classArrAdd:[],
      	subjectArr:[],
      	subjectEdit:[],
      	searchValue:'',
      	searchUserValueBM:'',
      	searchUserValue:'',
      	subjectNow:'',
      	subjectLeaderNow:'',
      	statusDialog:false,
      	delDialog:false,
      	editSubjectDialog:false,
      	statusDialogInfo:'',
      	systembuiltIn:'',
      	vstatus:'',
      	vstatuschange:'',
      	vcode:'',
      	vsort:'',
      	vname:'',
      	total:0,
      	totalEdit:0,
      	subjectList:[],
      	
      	params : {
            page: 1,
            pageSize: 10
        },
        paramsEdit : {
            page: 1,
            pageSize: 10
        },
        
        columns: [
          { prop: "index", label: "序号" ,width:"60",order:true},
          { prop: "name", label: "学科组长"},
          { prop: "subject", label: "学科"}, 
          { prop: "grade", label: "年级",
          	render:(h,param) =>{
		        let grades ='';
	          	param.row.grade.forEach(item=>{
	          		grades += item +'；'
	          	})
	            return h('span', grades)
	        }
          },
          { prop: "dom", label: "操作" ,fixed:"right",width:"200",
              render:(h, param) =>{
                  const moreButton = {
                    items:[    
                      {icon:'iconfont icon-xiugai_f', func: { func: "update", rowList: param } },
                      {icon:'iconfont icon-shanchu', func: { func: "del", rowList: param } },
                      
                    ]
                  };
                  return h(MyButton, {
                    props: { moreButton: moreButton },
                    on: { update: this.update, del: this.del}
                  });
              }
          },
        ],
      	
      };
    },
    components:{
      tableList,
      MyButton
    },
     watch: {
		'$route': function (to, from) {
//	        console.log(this.$route.query.show)
	       
	        if(this.$route.path=='/subject'){
	        	this.show = true;
	        	this.subjectid = -1;
	        	this.subjectName='';
	        	this.searchValue='';
	        	this.init();
	        }
	　　 }
    },
     mounted(){ 
     	API.subjectAll({}).then((res)=>{
			console.log(res)
			if(res.code==1){
				this.subjectArr = res.data;
				this.subjectArrAdd = res.data;
			} 
		})
     	API.skGrade({}).then((res)=>{//获得年级
			console.log(res)
			if(res.code==1){
				this.gradeArrAdd = res.data;
			} 
		})
    	this.user = JSON.parse(sessionStorage.getItem('user')).user;
        this.init();
    },
    methods: {
		resert(){
			this.radio = '';
			this.radioEdit = false;
			this.searchUserValue='';
			this.searchUserValueBM='';
	    	this.paramsEdit.page=1;
	    	this.radioEdit = false;
	    	this.subjectNameAdd='';
	      	this.gradeNameAdd='';
	      	this.classNameAdd='';
	      	this.subjectidAdd=-1;
	      	this.gradeid=-1;
	      	this.classid=-1;
	      	
		},
    	
    	init(){
    		let promise={
    			search:this.searchValue,
    			subjectid:this.subjectid,//
    			pageSize:this.params.pageSize,
    			pageNum:this.params.page
    		}
    		   this.loading = true; 
    		API.subjectLeaderList(promise).then((res)=>{
    			console.log(res)
    			if(res.code==1){
    				this.subjectList = res.data;   				
    				this.total = res.total;
    			}else{
    				
    			}
    			this.loading = false;            
    		})
    		let that = this;
			setTimeout(function(){that.loading = false },5000);
	    },
	    
	    
	    EditAllUser(){
    	
	    	let promise={
    			search:this.searchUserValue,
    			subjectId:this.subjectidAdd,//学科id
    			gradeId:this.gradeid,//年级id
    			classNum:this.classid,
    			pageSize:this.paramsEdit.pageSize,
    			pageNum:this.paramsEdit.page	
	
    		}
    		   this.loadingEdit = true; 
    		API.skLeaderList(promise).then((res)=>{
    			console.log(res)
    			if(res.code==1){	
    				this.subjectEdit = res.data;   				
	    		    this.totalEdit = res.total;
    			}else{
    				
    			}
    			this.loadingEdit = false;          
    		})
	    	
	    	
	    },
	    subjectChange(val){
        	
        	this.subjectid = val;
        	this.init();
        },
	    updateRole(roleid){
	    	let promise={
	    		vname : this.vname,
				vcode : this.vcode,
				vsort : this.vsort,
				vstatus : this.vstatuschange,
				roleid : roleid
	    	}
	    	API.roleUpdate(promise).then((res)=>{
    			console.log(res)
    			if(res.code==1){
    				this.$message({
			          title: '操作提示',
			          message: '修改成功', 
			          type: 'success',
			        });
    				this.init();
    			}else{
    				this.$message({
		                title: '操作提示',
		                message: res.message,
		                type: 'warning',
		            });
		            this.loading = false; 
    			}	         
    		})
	    	
	    },
	    
		getCurrentRow(val){//选择变更人单选
	        console.log(val)
	        this.xkmaster = val.row.userId
	        this.radioEdit = true;
	    },
	    submitEditForm(){
	    	if(this.radioEdit){
	    		let promise={
	    			xkgid:this.xkgid,//学科id
	    			xkmaster:this.xkmaster,//用户id
	    		}
	    		this.editSubjectDialog = false;
	    		this.loading = true;
	    		API.subjectLeaderEdit(promise).then((res)=>{
	    			console.log(res)
	    			if(res.code==1){
	    				this.init();
	    				this.$message({
				          title: '操作提示',
				          message: '修改成功', 
				          type: 'success',
				        });
	    			}else{
	    				this.$message({
				          title: '操作提示',
				          message: res.message, 
				          type: 'warning',
				        });
	    			}
	    			this.loading = false; 
	    			this.resert();
	    		})
	    	}else{
	    		this.$message({
		          title: '操作提示',
		          message:'请选择变更人员', 
		          type: 'warning',
		        });
	    	}
	    	
	    },
	    beforeClose(){
	    	this.resert();
	    	this.editSubjectDialog=false;
	    },
	    handleCurrentChange(val) {
	    	this.loading = true;
	        this.params.page=val;
	        this.init();
        },
        handSelectionChange(selections){
        	console.log(selections);
        },
        
        handleCurrentChangeEdit(val) {
	        this.paramsEdit.page=val;
	        this.radio = '';
	        this.radioEdit = false;
	        this.EditAllUser();
        },
        handSelectionChangeEdit(selections){
        	console.log(selections);
        },
    	systembuiltInFun(val){//勾选是否位系统内置change 1代表是，0代表否
    		console.log(val)
			this.loading = true;
			this.systembuiltIn=val;
    		this.init();
    	},
    	statusFun(val){//状态选择方法change
    		console.log(val)
    		this.loading = true;
    	    this.vstatus = val;
    		this.init();
    	},
    	
    	searchValueChange(val){
    		this.searchValue = val;
    		console.log(val)
    	},
    	//搜索
    	search(){
    		if(this.searchValue){
    			this.loading = true;
    			this.init();
    		}else{
    			this.$message({
		          title: '操作提示',
		          message: '请输入搜索内容', 
		          type: 'warning',
		        });
    		}
    		
    	},
    	
    	searchEdit(){
    		this.radio = '';
    		this.radioEdit = false;
	    	if(this.searchUserValue){
	    		this.paramsEdit.page=1;
    			this.EditAllUser();
    		}else{
    			this.$message({
		          title: '操作提示',
		          message: '请输入搜索内容', 
		          type: 'warning',
		        });
    		}
	    },
	    subjectChangeAdd(val){
        	this.subjectidAdd = val;
        	this.radio = '';
	        this.radioEdit = false;
        	this.EditAllUser();
        },
        gradeChangeAdd(val){
        	this.radio = '';
	        this.radioEdit = false;
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
        	this.EditAllUser();
        	
        },
        classChangeAdd(val){
        	this.classid = val;
        	this.radio = '';
	        this.radioEdit = false;
        	this.EditAllUser();
        },
    	
    	
    	addSubjetUser(){//新增角色
    		this.show = false;
    		this.$router.push('/subjectAdd'); 	
    	},
    	update(item){//编辑
    		console.log(item)
    		this.subjectNow = item.row.subject;
    		this.subjectLeaderNow = item.row.name;
    		this.xkgid = item.row.xkgid;
    		this.grades='';
    		item.row.grade.forEach(item=>{
	          		this.grades += item +'；'
	        })
    		this.editSubjectDialog = true;
    		this.subjectidAdd = item.row.subjectId;
    		this.EditAllUser();
    	},
    	del(item){//删除
    		console.log(item)
    		this.xkgid = item.row.xkgid
    		this.delDialog = true;
 	
    	},
    	
    	
    	
    	stop(item){//权限里的停用
    		console.log(item)
    		if(item.row.vstatus===0){//正常
    			this.vstatuschange = 1;
    			this.statusDialog = true;
    			this.statusDialogInfo = '确定停用'+item.row.vname+ ' ？'
    		}else{
    			this.vstatuschange = 0;
    			this.statusDialog = true;
    			this.statusDialogInfo = '确定启用'+item.row.vname+ ' ？'
    		}
			this.vname = item.row.vname
			this.vcode = item.row.vcode
			this.vsort = item.row.vsort
			this.roleid = item.row.roleid	
    	},
    	statusDialogQD(){
    		this.statusDialog = false;
    		this.loading = true;
    		this.updateRole(this.roleid)
    	},
    	delDialogQD(){
    		this.delDialog = false;
    		this.loading = true;
    		API.subjectLeaderDel({xkzid:this.xkgid}).then((res)=>{
    			console.log(res);
    			if(res.code==1){
    				this.$message({
			          title: '操作提示',
			          message: '删除成功', 
			          type: 'success',
			        });
			        this.init();
    			}else{
    				this.$message({
			          title: '操作提示',
			          message: res.message, 
			          type: 'warning',
			        });
			        this.loading = false;
    			}	
    		})
    	}
    	
    }
    
    
  };
</script>
<style scoped  lang='scss'>
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
    }
    
}
</style>
