<template>
  <div>
    <el-row style="display: flex; overflow:hidden;background:#fff">
      <el-col style="flex: auto">
        <div class="modules-box">
          <p class="box-text">通知公告</p>
          <div class="box-content" v-for="item in msgArr" @click="showMSG(item.id)" >
            <div style="box-sizing: border-box;display: flex">
              <div style="flex: auto
              ;">
               <span style="font-size: 16px;font-weight: 600;">{{item.title}}</span>
              </div>
              <div style="margin-top: 10px;flex: auto;text-align: right">
                <span style="font-size: 16px;margin-left: 10px">{{item.cTime}}</span>
              </div>
            </div>
            <div>
            </div>
        </div>
        </div>
      </el-col>
      <!--<el-col style="flex: auto">
        <div class="modules-box">
          <p class="box-text">新闻资讯</p>
          <div class="box-content" v-for="item in newArr">
            <span @click.stop="deleteMsg(item.msgId)"  style="position: absolute;top:10px; color: #942987; font-size:12px;right: 10px">X</span>
            <div style="font-size: 16px;font-weight: 600">
              {{item.title}}
            </div>
            <div v-html="item.content"></div>
        </div>
        </div>
      </el-col>-->
      <el-col style="flex: auto">
        <div class="modules-box">
          <p class="box-text">待办事项</p>
          <div class="box-content"  @click="showDetail()" v-for="item in waitMsgArr">
            <span @click.stop="deleteMsg(item.matterId)"   style="position: absolute;top:10px; color: #942987; font-size:12px;right: 10px">X</span>
            <div style="font-size: 16px;font-weight: 600">
              {{item.title}}
            </div>
            <div v-html="item.content"></div>
        </div>
        </div>
      </el-col>
	</el-row>

<div class="modules-box">
	<p class="box-text">业务系统</p>
	<ul class="tiaozhuan_ul">
		<!--<li><a href="#" target="_blank"><div class="li_radio"><i class="iconfont icon-shiwu"></i></div><p>预约点餐</p></a></li>
		<li><a href="#" target="_blank"><div class="li_radio"><i class="iconfont icon-renyuanxiaozu"></i></div><p>导师管理</p></a></li>
		<li><div class="li_radio purpor"><i class="iconfont icon-bianji1"></i></div><p>待上线</p></li>-->
    <li v-for="item in ClientConfigGetList" @click="goPage(item.id)"><div class="li_radio"> <img style="width: 60px;height: 60px;border-radius: 100%;vertical-align: middle" :src="item.thirdPartyImg"/> </div><p>{{item.thirdPartyName}}</p></li>
	</ul>

</div>

<div class="modules-box role" v-if="user.utypeid!=0">
	<p class="box-text">关系表格</p>
	<!--关系表格-->
		<el-table
			  :data="relationList"
			  border
			  style="width: 97%;margin:0 auto;">
			  <el-table-column
			    label="序号"
			    width="70"
			  >
			  <template slot-scope="scope">{{scope.$index+1}}</template>

			  </el-table-column>
			  <el-table-column
			    prop="username"
			    label="姓名"
			    >
			  </el-table-column>
			  <el-table-column
			    label="用户类型"
			  >
			    <template slot-scope="scope">
			    	<span>教师</span>
			    </template>
			  </el-table-column>
			  <el-table-column
			    prop="phone"
			    :formatter="formatPhone"
			    label="手机号码">

			  </el-table-column>
			  <el-table-column
			    prop="email"
			    :formatter="formatEmail"
			    label="邮箱号码">
			  </el-table-column>
    </el-table>
</div>
    <!--查看弹层-->
    <el-dialog title="详情" style="text-align: center" :visible.sync="dialogLookVisible" top="20vh">
      <div class="msg-row-text" v-for="item in waitMsgArr " style="text-align: left; line-height:30px;padding-left: 20px">
          <div><span style="font-size: 18px;color: #000;font-weight: 600">发送人</span>: {{ item.userName}}</div>
          <div style="display: flex; border-bottom: 1px solid rgba(229,229,229,1);margin: 20px 0;padding-bottom: 20px">
            <div style="flex: 1"> 标题 : {{item.title}}</div>
            <div style="flex: 1;text-align: right"><span>发送时间</span>: {{item.remindTime}}</div>
          </div>
          <div><span v-html="item.content"></span></div>
        <div @click="closedialogLookVisible()"  style="width:50px;height:24px;line-height: 24px; margin: 0 auto;margin-top: 40px; text-align: center; border:1px solid rgba(148,41,135,1);border-radius:4px;font-family:MicrosoftYaHei;font-weight:bold;color:rgba(148,41,135,1);">关闭 </div>
      </div>
    </el-dialog>
    <div class="modules-box">
          <p class="box-text">日志更新信息</p>
          <div  v-loading="loadingUpdate" v-bind:style="{height:height,padding:'20px',position:'relative',overflow:'hidden'}">
              <div v-html="logMsg"></div>
              <div v-if="openUpdateLogString" style="height:50px;width:100%;position:absolute;bottom:0;background:#fff;"></div>
              <span v-if="openUpdateLogString" style="position:absolute;bottom:10px;left:49%;cursor:pointer;font-size:12px;color:#999;" @click="openUpdateLog">点击查看全部</span>
          </div>
    </div>
  </div>
</template>

<script>
import {getCookie} from '@/unit/unit.js';
import API from '@/api/api_user';
import HASH from '@/assets/hash';
import MSGAPI from '@/api/api_news';
import APILOG from '@/api/api_log';
import tableList from '@/module/tableList.vue';
import MyButton from '@/module/MyButton.vue';
import XChart from '@/module/charts/line.vue';
import options from '@/assets/line-chart';
export default {
	data () {
		let option = options.bar
	    return {
        ClientConfigGetList: [],
        dialogLookVisible: false,
	    	id: 'test',
     		option: option,
     		user: {},
     		loadingUpdate:true,
     		openUpdateLogString:false,
     		height:'500px',
     		user:{},
	      relationList:[],
	      logMsg: '',
	      logMsg:'',
	      logMsg:'暂无信息',
        detail:[{
          content:'',
          title:'',
        }],
        msgArr: [],
        newArr: [],
        waitMsgArr:[],
	    }
    },
    components:{
      tableList,
      MyButton,
      XChart
    },
    mounted(){
    	this.user = JSON.parse(sessionStorage.getItem('user')).user;
      this.init();
      this.UnreadMsg();
      this.getBacklog();
      API.relationList({}).then((res)=>{

        	let arr=[];
        	if(res.data.section){
        		res.data.section.forEach(item=>{
	        		arr.push(item);
	        	})
        	}
        	if(res.data.skzinfo){
        		res.data.skzinfo.forEach(item=>{
	        		arr.push(item);
	        	})
        	}
          this.relationList = arr;

        })
      APILOG.LogmsgShow({}).then((res)=>{
      	  this.loadingUpdate = false;
	    		if(res.code==1){
	    			this.logMsg = res.data[0].content;

	    			if(res.data[0].content.length>500){
	    				this.openUpdateLogString = true;
	    				this.height = '500px';
	    			}else{
	    				this.openUpdateLogString = false;
	    				this.height = 'auto';
	    			}

		      }
	      })

    },
    methods:{
	      init(){
	          API.ClientConfigGet().then((res)=>{
	            console.log(res);
	            if(res.data && res.data.length>0){
	              this.ClientConfigGetList = res.data;
              }
            })
        },
	    	openUpdateLog(){
	    		this.height = 'auto';
	    		this.openUpdateLogString = false;
	    	},
        closedialogLookVisible(){
          this.dialogLookVisible = false;
        },
	     	formatEmail(row, column){
	     		if(row.eisopen){
                return row.email;
           }else{
                return '--';
           }
	      },
	      formatPhone(row, column){
	     		if(row.pisopen){
                return row.phone;
           }else{
                return '--';
           }
	      },
        //获取通知公告
        UnreadMsg(){
	        let that = this;
          MSGAPI.getNewInfo().then((res)=>{
            if(res.code === 1 && res.data.posts && res.data.posts.length>0){
              let arr = []
              res.data.posts.forEach((item)=>{
                let obj = {
                  title: item.title,
                  content: item.content,
                  cTime: item.date,
                  url: item.url,
                  id: item.id
                }
                arr.push(obj);
              })
              that.msgArr = arr;
            }
          })
      },
        //获取待办事项
        getBacklog() {
          let promise = {
            pageNum: '1',
            pageSize: '10',
            matterstatu: '1'
          }
          this.loading2 = true;
          this.changeState = false;
          console.log(promise)
          MSGAPI.matterList(promise).then((res) => {
          this.loading2 = false;
          console.log(res);
          let Arr = [];
          if(res.data && res.data.length>0){
            res.data.forEach((item)=>{
              let obj = {
                title: '待办主题',
                content: item.matterTitle,
                matterId: item.matterId,
                remindTime: this.getLocalTime(item.remindTime),
                userName: item.userName
              }
              Arr.push(obj);
            })
          }
          this.waitMsgArr = Arr;
        })
      },
        //时间戳转日期
        getLocalTime(nS) {
          var date = new Date(nS*1);//如果date为13位不需要乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
          var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
          var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
          var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
          return Y+M+D+h+m+s;
        },
        //展示详情
        showMSG(id){
	    	  console.log(id);
	    	  console.log('展示详情')
          let Base64 =  require("js-base64").Base64;
          let account  = Base64.encode(this.user.account);
          let cleartextpwd = Base64.encode(this.user.cleartextpwd);
          window.open('http://www.2nankai.cn/Announcement/193fa25a32e81b87d551fd72e2701cdf.php?log=' + account + '&pwd=' + cleartextpwd + '&p=' + id + '');
        },
        //删除消息和待办事项
        deleteMsg(id){
	    	  console.log(id);
          this.$confirm('您确定要删除吗？', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true,
            type: 'warning'
          }).then(() => {
            let promise = {
              matterIds: id
            };
            MSGAPI.matterDel(promise).then( (res) =>{
              console.log(res);
              if(res.code === 1){
                this.getBacklog();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else {
                this.$message.error('删除失败');
              }
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //查看详情
        showDetail(){
	     	  this.dialogLookVisible = true;
        },
        goPage(ID){
	        console.log(ID)
	        var that = this;
          let Base64 =  require("js-base64").Base64;
          let account  = Base64.encode(that.user.account);
          let cleartextpwd = Base64.encode(that.user.cleartextpwd);
          $.ajax({
            url: 'http://www.2nankai.cn/mediacms/193fa25a32e81b87d551fd72e2701cdf.php',
            type: "get",
            data: {
              'log': that.user.account,
              'pwd': that.user.cleartextpwd
            },
            success: function(res){
              console.log(res);
              if(ID == '5'){
                window.open('http://www.2nankai.cn/Announcement/193fa25a32e81b87d551fd72e2701cdf.php?log=' + account + '&pwd=' + cleartextpwd + '');
              }else if(ID == '6') {
                window.open('http://www.2nankai.cn/mediacms/193fa25a32e81b87d551fd72e2701cdf.php?log=' + account + '&pwd=' + cleartextpwd + '');
              }else {
                let promise = {
                  userId: that.user.userid,
                  id: ID
                }
                API.RedirectThirdParty(promise).then((res)=>{
                  console.log(res);
                  if(res.code === 1){
                    window.open(res.data);
                  }
                })
              }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
$color:#942987;
a{text-decoration: none;color:#333;}
.tiaozhuan_ul{overflow:hidden;padding:10px 0;}
.tiaozhuan_ul li{list-style:none;float:left;text-align:center;margin:10px;}
.tiaozhuan_ul li .li_radio{width:70px;height:70px;line-height:70px;text-align:center;border-radius:50%;}
.tiaozhuan_ul li .purpor{background:#ddd;}
.tiaozhuan_ul li i{font-size:26px;color:#fff;}
.modules-box{
	border-radius: 5px;
	border-top:2px solid $color;
	background-color:#fff;
	margin-bottom:20px;
	.box-text{
		border-bottom:1px solid #ddd;
		margin:0px;
		line-height:35px;
		text-indent:20px;
	}
	.box-content{
		padding:10px;
    border: 1px solid #dfdfdf;
    border-left: 2px solid $color;
    border-radius: 5px;
    margin-left: 10px;
    height: 40px;
    margin-top: 10px;
    box-shadow:0 4px 4px #eee;
    position: relative;
    img{
      width: 40px !important;
      height: 40px !important;
      float: left !important;
      margin-right: 10px;
    }
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
