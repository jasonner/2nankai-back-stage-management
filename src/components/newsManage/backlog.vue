<template>
		<div class="content-box">
				<h4>待办事项</h4>
				<div style="border-top: 1px solid #dfdfdf;padding-top: 10px;box-sizing: border-box">
						<el-select v-model="msgStateValue" @change="msgStateChange(msgStateValue)" style="width: 120px;" placeholder="代办状态">
								<el-option
									v-for="item in msgState"
									:key="item.msgStateValue"
									:label="item.msgStateLabel"
									:value="item.msgStateValue">
								</el-option>
						</el-select>
						<el-date-picker
							v-model="timeValue"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							@change='TimeDateChange(timeValue)'
							style="width: 358px;margin-left: 10px">
						</el-date-picker>
						<el-button type="primary" style="margin-left: 10px" @click="queryMsg">查询</el-button>
						<el-input style="display: inline-block; width: 20%;margin-left: 20px" v-model="valueName" placeholder="请输入姓名进行搜索"></el-input>
						<el-button type="primary" style="margin-left: 10px" @click="searchName(valueName)">搜索</el-button>
						<div style="float: right">
								<el-button type="primary" @click="sendRecordBackDelet">批量删除</el-button>
						</div>
						<div v-loading="loading2" style="margin-top:20px;">
								<tableList :checkBox="true" :tableData='backlogList' :pageNum="params.page" :pageSize="params.pageSize" :total="total" :columns="columns" @CurrentChange="handleCurrentChange" @selectionChange="handSelectionChange"></tableList>
						</div>




						<!--查看弹层-->
						<el-dialog title="查看详情" style="text-align: center" :visible.sync="dialogLookVisible" top="20vh">
							<div style="text-align: left;border-bottom: 1px solid #dfdfdf;padding-bottom: 20px;box-sizing: border-box">
								<p><span style="font-weight: 700">发送人</span> : {{viewTabList.username}}
										<el-select v-model="msgStateValueEdit" @change="msgStateChangeEdit(msgStateValueEdit)" style="width: 120px;float: right" placeholder="代办状态">
												<el-option
													v-for="item in msgState"
													:key="item.msgStateValue"
													:label="item.msgStateLabel"
													:value="item.msgStateValue">
												</el-option>
										</el-select>
								</p>
								<h4>{{viewTabList.sendTime}}</h4>
								<p v-html="viewTabList.msgContent"></p>
								<p>提醒日期：{{viewTabList.msgData}}</p>
								<p>提醒时间段：{{viewTabList.msgDataBlock}}</p>
								<!-- <div>关联代办 <el-radio style="margin-left: 10px" v-model="radio" @change="radioChange(radio)" label="1">是</el-radio>
			               <el-radio v-model="radio" @change="radioChange(radio)" label="2">否</el-radio>
			             </div>-->
							</div>
							<div style="margin-top: 20px">
									<el-button plain @click="viewPosition">取消</el-button>
									<el-button type="primary" @click="viewSure">确定</el-button>
							</div>
						</el-dialog>

				</div>
		</div>
</template>

<script>

		import tableList from '@/module/tableList.vue';
		import MyButton from '@/module/MyButton.vue';
		import API from '@/api/api_news';
		import {formatDate} from '@/assets/filter'
		export default {
				name: "backlog",
				data() {
						return {
								msgState: [{
										msgStateValue: '2',
										msgStateLabel: '已完成'
								},{
										msgStateValue: '1',
										msgStateLabel: '未完成'
								}],
								matterid: '',
								msgStateValue: '',
								msgStateValueEdit: '',
								timeValue: '',
								timeValueStart:'',
								timeValueEnd:'',
								loading: false,
								changeState:false,
								valueName: '',
								backlogList: [],
								params: {
										page: 1,
										pageSize: 10,
								},
								total: 0,
								multipleSelection: [], //选择待办事项列表
								columns: [
					          { prop: "index", label: "序号" ,width:"60",order:true},
					          { prop: "userName", label: "发送人",sortable:true},
//					          { prop: "remindTime", label: "日期",sortable:true},
										{ prop: "remindTime", label: "时间" ,
										     render: function (h, params) {
												        return h('span',
												        formatDate(new Date(parseInt(this.row.remindTime)), 'yyyy-MM-dd')
												 )}
										},
					          { prop: "matterStatu", label: "状态" ,sortable:true,className:"classname",
						            render:(h,param) =>{
						            	let html = '';
						            	if(param.row.matterStatu == 1){
						            		html = '未完成'
						            		return h('b',html)
						            	}else{
						            		html = '已完成'
						            		return h('span',html)
						            	}

						            }
						        },
					          { prop: "matterTitle", label: "待办主题",width:"600"},
					          { prop: "dom", label: "操作" ,fixed:"right",width:"150",
					              render:(h, param) =>{
					                  const moreButton = {
					                    items:[
					                      {icon:'iconfont icon-chakan', func: { func: "detail", rowList: param } },
					                      {icon:'iconfont icon-shanchu', func: { func: "del", rowList: param } },

					                    ]
					                  };
					                  return h(MyButton, {
					                    props: { moreButton: moreButton },
					                    on: { detail: this.detail, del: this.del}
					                  });
					              }
					          },
					        ],
								loading2: false,
								viewTabList: {
										userName: '',
										sendTime:'',
										msgData: '',
										msgDateBlock:'',
										msgContent: ''
								},
								dialogLookVisible: false,
					  }
				},
				components: {
						tableList,
						MyButton
				},
				filters:{
			    formatDate(time){
			        var data = new Date(time);
			        return formatDate(data,'yyyy-MM-dd');
			    }
		    },
				mounted() {
						this.user = JSON.parse(sessionStorage.getItem('user')).user;
						this.init();
				},

				methods: {
					//获得待办列表
					init() {
							let promise = {
									pageNum: this.params.page,
									pageSize: this.params.pageSize,
									search: this.valueName, //按姓名查询
									start: this.timeValueStart,
									end: this.timeValueEnd,
									matterstatu: this.msgStateValue
							}
							this.loading2 = true;
							this.changeState = false;
							console.log(promise)
							API.matterList(promise).then((res) => {
									this.loading2 = false;
									console.log(res);
									this.backlogList = res.data;
									this.total = res.total;
							})

					},

					//查看
					detail(item) {
						//获取待办详情
						  this.viewTabList.username = item.row.userName
			      	API.getMatter({matterId:item.row.matterId}).then((res) =>{
			            console.log(res)
			            this.msgStateValueEdit = res.data.matterstatu + '';
			            this.viewTabList.sendTime = formatDate(new Date(parseInt(res.data.msg.sendtime)), 'yyyy-MM-dd')
			            this.viewTabList.msgContent = res.data.msg.content
			            this.viewTabList.msgData= formatDate(new Date(parseInt(res.data.remindtime)), 'yyyy-MM-dd')
			            this.viewTabList.msgDataBlock= formatDate(new Date(parseInt(res.data.starttime)), 'yyyy-MM-dd  hh:mm')+'-'+formatDate(new Date(parseInt(res.data.endtime)), 'yyyy-MM-dd  hh:mm')
			        })
							this.dialogLookVisible = true;
							this.matterid = item.row.matterId;
					},
					//查看取消
					viewPosition() {
							this.dialogLookVisible = false;
					},
					//查看确定
					viewSure() {
							console.log(this.msgStateValueEdit);
							let promise={
								 matterid:this.matterid,
								 matterstatu:this.msgStateValueEdit
							}
							console.log(this.changeState)
							if(this.changeState){//修改待办状态
								API.matterUpdate(promise).then((res) =>{
									if(res.code==1){
										this.$message({
												title: '提示',
												message: '修改成功',
												type:'success'
										});
									}else{
										this.$notify({
												title: '提示',
												message: res.message,
												type:'warning',
												offset:70
										});
									}

									this.init();
									this.dialogLookVisible = false;
								})
							}else{
								this.dialogLookVisible = false;
							}


					},


					del(item){//删除
							this.$confirm('您确定要删除这条待办事项吗？', '删除提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										center: true,
										type: 'warning'
							}).then(() => {
									let promise={
										matterIds:item.row.matterId + '-'
									}
									API.matterDel(promise).then((res) =>{
											console.log(res)
											if(res.code==1){
												this.$message({
														title: '提示',
														message: '删除成功',
														type:'success'
												});
												this.init();
											}else{
												this.$notify({
														title: '提示',
														message: res.message,
														type:'warning',
														offset:70,
												});
											}

									})

							}).catch(() => {
	//								this.$message({
	//										type: 'info',
	//										message: '已取消删除'
	//								});
						 });

					},


					sendRecordBackDelet() {	//消息批量删除
							console.log(this.multipleSelection);
							console.log(this.multipleSelection.length);
							if(this.multipleSelection.length<1) {
								console.log(77)
									this.$notify({
											title: '错误提示',
											message: '请选择待办事项',
											offset:70,
											type:'warning'
									});
							}else {
									this.$confirm('您确定要删除这' + this.multipleSelection.length + '条待办事项吗？', '删除提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消',
											center: true,
											type: 'warning'
									}).then(() => {
											let Ids = '';
											this.multipleSelection.forEach(item => {
													Ids += item.matterId + '-'
											});
											let promise={
												matterIds:Ids
											}
											console.log(promise)
											API.matterDel(promise).then((res) =>{
													console.log(res)
													if(res.code==1){
														this.$message({
																title: '提示',
																message: '删除成功',
																type:'success'
														});
														this.init();
													}else{
														this.$notify({
																title: '提示',
																message: res.message,
																type:'warning',
																offset:70
														});
													}

											})





									}).catch(() => {

									});
							}
					},

					//修改
					msgStateChangeEdit(val){
						this.changeState = true;
						console.log(val)
					},


					//代办状态筛选
					msgStateChange(val) {
						this.msgStateValue = val
						this.params.page=1;
						this.init();
//							console.log("消息状态筛选" + val);
					},
					//时间段筛选
					TimeDateChange(val) {
						if(val){
							var date1 = new Date(val[0]);
						  var date2 = new Date(val[1]);
						  this.timeValueStart = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate()
						  this.timeValueEnd = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate()
						}

					},
					//时间段查询
					queryMsg() {
						  this.params.page=1;
							this.init();
					},

					//按用户姓名搜索
					searchName(val) {
							console.log(val);
							this.valueName = val;
							this.params.page=1;
							this.init();

					},

					//分页
					handleCurrentChange(val){
						  this.params.page = val;
							this.init();
					},

					//多选
					handSelectionChange(selections){
						  this.multipleSelection = selections;
						  console.log(selections);
					},

				}
		}
</script>

<style scoped>
		.content-box {
			background: #ffffff;
			border-top: 5px solid #942987;
			border-top-right-radius: 5px;
			border-top-left-radius: 5px;
			padding: 0 10px;
			padding-bottom: 20px;
		}
</style>
