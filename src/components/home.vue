
<template>
    <el-container style="height: 100%">
      <el-aside :class="!isCollapse?'showSider':'hideSider'">
        <span class="logo"></span>
        <el-menu class="el-menu-vertical-demo" :default-active="$route.path" theme="dark" v-bind:router="true" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <template v-for="(link,index) in menuList">

            <el-menu-item :index="link.children[0].path" v-if="link.leaf&&link.menuShow" class="parentli">
              <i :class="link.iconCls"></i>
              <span slot="title">{{link.children[0].name}}</span>
            </el-menu-item>
            <el-submenu :index="index+''" v-else-if="!link.leaf&&link.menuShow">
              <template slot="title">
                <i :class="link.iconCls"></i>
                <span>{{link.name}}</span>
              </template>
              <el-menu-item :index="term.path" v-for="term in link.children" v-if="term.menuShow" style="padding-left:50px;">{{term.name}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
	  <el-container>
	    <el-header>
	    	<div class="header-top">
	    	  <el-col :span="12" style="">
	            <i class="menu-icon" style="color:#fff;float:left;" @click="isCollapse = !isCollapse"></i>
	          	<div style="display: inline-block;color:#fff;margin-left:20px;font-size:13px;float:left;height:40px;">
          			<div style='float:left;'>
					   <i class="iconfont icon-riqi"></i><span style="margin-right:10px;">{{weather.time}} {{weather.weekday}}</span>
					   <i class="iconfont icon-naozhong"></i><span style="margin-right:10px;">{{weather.detail}}</span>
          			</div>
          			<div v-if="weatherDialog" style='float:left;'>
          				<img :src="weather.icon" style='margin-top:13px;width:40px;height:40px;float:left;'/>
          				<span>{{weather.main}}</span>
          			</div>
	           </div>

	    	  </el-col>
	          <el-col :span="12" style="text-align:right">
             <!-- <el-popover
                placement="bottom"
                :title="noticeUnreadTitle"
                width="200"
                trigger="click"
                @click="msgClick"
              >
                <el-badge slot="reference" :value="noticeUnread" class="item-dot">
                  <i class="iconfont icon-Pathx"></i>
                </el-badge>
              </el-popover>
              <el-popover
                placement="bottom"
                :title="informUnreadTitle"
                width="200"
                trigger="click"
              >
                <el-badge  slot="reference" :value="informUnread" class="item-dot">
                  <i class="iconfont icon-youxiang"></i>
                </el-badge>
              </el-popover>
              <el-popover
                placement="bottom"
                :title="msgUnreadTitle"
                width="200"
                trigger="click"
                >
                <el-badge  slot="reference" :value="msgUnread" class="item-dot">
                  <i class="iconfont icon-qizi_icon"></i>
                </el-badge>
              </el-popover>-->
              <el-badge :value="msgUnread" class="item-dot" style="position: relative">
                <i class="iconfont icon-youxiang" @click="msgShow = !msgShow"></i>
                <div class="hover-notice-box" v-for="item in msgUnreadArr" v-show="msgShow">
                  <div class="hover-notice-content-title">消息</div>
                  <div class="hover-notice-content">
                    <div style="display: flex">
                      <p style="flex: 1"><i class="el-icon-warning" style="color: #942987;font-size: 12px;margin-right: 4px;"></i>主题</p>
                      <p style="flex: 1;text-align: right"> 30分钟前</p>
                    </div>
                    <div>{{item.title}}</div>
                  </div>
                </div>
              </el-badge>
              <el-badge :value="noticeUnread"  class="item-dot" style="position: relative">
                  <i class="iconfont icon-Pathx" @click="noticeShow = !noticeShow"></i>
                  <div class="hover-notice-box" v-for="item in noticeUnreadArr" v-show="noticeShow">
                    <div class="hover-notice-content-title">通知</div>
                    <div class="hover-notice-content">
                      <div style="display: flex">
                        <p style="flex: 1"><i class="el-icon-warning" style="color: #942987;font-size: 12px;margin-right: 4px;"></i>主题</p>
                        <p style="flex: 1;text-align: right"> 30分钟前</p>
                      </div>
                      <div>{{item.title}}</div>
                    </div>
                  </div>
               </el-badge>
              <el-badge :value="informUnread" class="item-dot" style="position: relative">
                <i class="iconfont icon-qizi_icon" @click="informShow = !informShow"></i>
                <div class="hover-notice-box hover-notice-box-left" v-for="item in informArr" v-show="informShow" style="left: -160px">
                  <div class="hover-notice-content-title">公告</div>
                  <div class="hover-notice-content">
                    <div style="display: flex">
                      <p style="flex: 1"><i class="el-icon-warning" style="color: #942987;font-size: 12px;margin-right: 4px;"></i>主题</p>
                      <p style="flex: 1;text-align: right"> 30分钟前</p>
                    </div>
                    <div>{{item.title}}</div>
                  </div>
                </div>
              </el-badge>

		          <el-dropdown trigger="click" @command="handleCommand">
		        	<div>
			        	<span class="person"><img :src="user.currimg" style='width:40px;height:40px;border-radius:50%;'/></span>
		                <span class="el-dropdown-link">
		                  {{user.realname}}<i class="el-icon-arrow-down el-icon--right"></i>
		                </span>
		            </div>
		            <el-dropdown-menu slot="dropdown">
		                <router-link to="personInfo"><el-dropdown-item>个人资料</el-dropdown-item></router-link>
		                <el-dropdown-item command="editPass">修改密码</el-dropdown-item>
		                <el-dropdown-item command="loginout">退出</el-dropdown-item>
		            </el-dropdown-menu>

              	</el-dropdown>
			      </el-col>
	        </div>
	    </el-header>
	    <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:0px 0px 15px">
            <el-breadcrumb-item v-if="$route.name == $route.matched[0].name">{{$route.name}}</el-breadcrumb-item>
            <el-breadcrumb-item v-else v-for="titleTerm in $route.matched">{{titleTerm.name}}</el-breadcrumb-item>
          </el-breadcrumb>

          <router-view/>

        </el-main>
	  </el-container>
    <el-dialog class="hint"
    title="提示"
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
      <span style="margin:auto;">您确认退出当前登录吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="sureDel">确 定</el-button>
        <el-button size="small" @click="centerDialogVisible = false">取 消</el-button>
      </span>

    </el-dialog>
    <el-dialog title="修改密码" width="40%" @close="closeDialog('upPassword')" :visible.sync="dialogPasswordVisible" >
        <el-form :model="upPassword" status-icon :rules="rulesPassword" ref="upPassword" label-width="100px" class="demo-ruleForm">
          <el-form-item label="原密码"  prop="oldPwd">
            <el-input :type="oldPassword" v-model="upPassword.oldPwd" placeholder="请输入原密码"></el-input>
            <span @click.stop="changePasswordType('oldPassword')" :class="hidden1?'password-eye  el-icon-view':'password-eye iconfont icon-biyan1'" ></span>
          </el-form-item>
          <el-form-item label="密码" prop="newPwd">
            <el-input :type="newPassword" v-model="upPassword.newPwd" @input="p_len"  placeholder="密码应为8-20位字母,数字,符号的组合。请至少选择两种类型"></el-input>
            <span @click.stop="changePasswordType('newPassword')" :class="hidden2?'password-eye  el-icon-view':'password-eye iconfont icon-biyan1'" ></span>
         	<div class="lnu_container">
				<p v-bind:class="{ number_valid: passwordStrength.contains_number }">低</p>
				<p v-bind:class="{ lovercase_valid: passwordStrength.contains_lovercase }">中</p>
				<p v-bind:class="{ uppercase_valid: passwordStrength.contains_uppercase }">高</p>
			</div>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input :type="surePassword" v-model="upPassword.checkPass" placeholder="请确认密码"></el-input>
            <span @click.stop="changePasswordType('surePassword')" :class="hidden3?'password-eye  el-icon-view':'password-eye iconfont icon-biyan1'"></span>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">

          <el-button @click="dialogPasswordVisible = false">取 消</el-button>
          <el-button type="primary" @click="savePassword('upPassword')">确定修改</el-button>
        </div>
      </el-dialog>




		<el-dialog
	  title="请您完善信息"
	  :center="center"
	  :visible.sync="dialogBangding"
	  width="30%"
	  >
	  <span>为了您的账户安全建议您绑定手机号或者邮箱</span>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogBangding = false">关闭</el-button>
	    <!--<el-button type="primary" @click="dialogBangding = false">确 定</el-button>-->
	  </span>
	 </el-dialog>

		<el-dialog
		 title="协议有变更，请您重新确认协议"
		 :center="center"
		 :visible.sync="changeagreeDialog"
		 width="50%"
		 :show-close="showClose"
		 :close-on-click-modal="closeModal"
		>
		  <div>
			  <h2>用户协议</h2>
			  <div class="agreement" style="height:320px;overflow-y:scroll;text-align:left;margin-bottom:20px;">
				<!--{{userAgreement}}-->

				<el-input
					  type="textarea"
					  autosize
					  resize="none"
					  readonly="readonly"
					  v-model="userAgreement">
				</el-input>
				<div class="checkagree"><el-checkbox v-model="checkedAgree" @change="agreeChange">我已阅读并且同意此用户协议</el-checkbox></div>
			  </div>

			  <span slot="footer" class="dialog-footer">
			  	<el-button @click="notAgreeClose">拒绝</el-button>
			    <el-button :type="typeinfo" @click="agreeClose" :disabled="agreedisabled">确 定</el-button>
			  </span>
		  </div>

		</el-dialog>


      <!--同意协议修改密码绑定微信开始-->
		<el-dialog
		 title="请您根据向导完成操作"
		 :center="center"
		  :visible.sync="dialogAgree"
		  width="50%"
		  :show-close="showClose"
		  :close-on-click-modal="closeModal"
		  >

		<el-steps :active="active" simple finish-status="success" style="padding:13px 16%">
			  <el-step title="步骤一"></el-step>
			  <el-step title="步骤二"></el-step>
		</el-steps>
		<div v-if="active==0" style="margin-top:30px;">
			  <h2>用户协议</h2>
			  <div class="agreement" style="height:320px;overflow-y:scroll;text-align:left;margin-bottom:20px;">
				<!--{{userAgreement}}-->
				<el-input
					  type="textarea"
					  autosize
					  resize="none"
					  readonly="readonly"
					  v-model="userAgreement">
				</el-input>
				<div class="checkagree"><el-checkbox v-model="checkedAgree" @change="agreeChange">我已阅读并且同意此用户协议</el-checkbox></div>

			  </div>

			  <span slot="footer" class="dialog-footer">
			  	<el-button @click="notAgreeClose">拒绝</el-button>
			    <el-button :type="typeinfo" @click="agreeClose" :disabled="agreedisabled">确 定</el-button>
			  </span>
		</div>

		<div class="step-box" v-if="active==1">
		  	<h2>建议登录修改密码</h2>
		  	<el-form :model="upPassword" status-icon :rules="rulesPassword" ref="upPassword" label-width="100px" class="demo-ruleForm">
	          <!--<el-form-item label="原密码" prop="oldPwd">
	            <el-input :type="oldPassword" v-model="upPassword.oldPwd" placeholder="请输入原密码"></el-input>
	          	<span @click.stop="changePasswordType('oldPassword')" class="password-eye  el-icon-view" ></span>
	          </el-form-item>-->
	          <el-form-item label="新密码" prop="newPwd">
	            <el-input :type="newPassword" v-model="upPassword.newPwd" @input="p_len" placeholder="密码应为8-20位字母,数字,符号的组合。请至少选择两种类型"></el-input>
	          	<span @click.stop="changePasswordType('newPassword')" :class="hidden2?'password-eye el-icon-view':'password-eye iconfont icon-biyan1'" ></span>
	          	<div class="lnu_container">
					<p v-bind:class="{ number_valid: passwordStrength.contains_number }">低</p>
					<p v-bind:class="{ lovercase_valid: passwordStrength.contains_lovercase }">中</p>
					<p v-bind:class="{ uppercase_valid: passwordStrength.contains_uppercase }">高</p>
				</div>
	          </el-form-item>
	          <el-form-item label="确认密码" prop="checkPass">
	            <el-input :type="surePassword" v-model="upPassword.checkPass" placeholder="请再次输入密码"></el-input>
	          	<span @click.stop="changePasswordType('surePassword')" :class="hidden3?'password-eye el-icon-view':'password-eye iconfont icon-biyan1'" ></span>
	          </el-form-item>
	        </el-form>
          	<el-button type="primary" @click="saveFirstPassword('upPassword')">确定</el-button>
          	<p style="text-align:left;font-size:12px;color:red;">为了您的账户安全，首次登录请修改密码</p>
		</div>

		<div class="step-box" v-if="active==2">
		  	<img src="../../static/finishsmile.png">
                <h1 style="color:#13CE66;">恭喜您已完成所有步骤</h1>
		  		<p>请您用新密码重新登录，建议您登录后在个人中心进行账号绑定，便于您找回密码</p>
		  	<el-button style="margin-top: 20px;" type="primary" @click="finishedFirst">确定</el-button>
		</div>
		</el-dialog>
    <!--同意协议结束 -->

	</el-container>
</template>

<script>

import {bus} from '@/bus/bus.js';
import API from '@/api/api_user';
import MSGAPI from '@/api/api_news';
import HASH from '@/assets/hash';
import axios from 'axios'
export default {
  name: 'home',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if(!/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{8,20}$/.test(value)){
      	callback(new Error('密码应为8-20位字母,数字,符号的组合。请至少选择两种类型'));
      }else if(value == this.upPassword.oldPwd){
      	callback(new Error('新密码不能与旧密码相同'));
      }else {
        if (this.upPassword.newPwd !== '') {
          this.$refs.upPassword.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.upPassword.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatePhone = (rule,value,callback) =>{
    	if(value===''){
    		callback(new Error('此项不能为空！'))
    	}else if(/^[1][3,4,5,7,8][0-9]{9}$/.test(value)||/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)){
    		callback();
    	}else{
    		callback(new Error('格式不正确!'))
    	}

    };
    return {
      //消息
      msgUnread: '',
      msgUnreadTitle: '',
      msgUnreadContent: '',
      msgShow: false,
      msgUnreadArr: [],
      //通知
      noticeUnreadArr: [],
      noticeUnreadTitle: '',
      noticeUnreadContent: '',
      noticeUnread: '',
      noticeShow: false,
      //公告
      informUnread: '',
      informUnreadTitle: '',
      informUnreadContent: '',
      informArr: [],
      informShow: false,
      menuList:[],
      oldPassword: "password",
      newPassword: "password",
      surePassword: "password",
      hidden1:true,
      hidden2:true,
      hidden3:true,
      typeinfo:"info",
      changeagreeDialog:false,
      weather:{
      	icon:'',
      	main:'',
      	time:'',
      	weekday:'',
      	detail:''
      },
      weatherDialog:false,
      list:[
        {name:'a'},
        {name:'b'},
        {name:'c'},
      ],
      user:{},
      passwordStrength: {
	    contains_lovercase: false,
	    contains_number: false,
	    contains_uppercase: false
	  },
      userAgreement:'',
      dialogBangding:false,
      active: 0,
      isCollapse: false,
      message: 'hello!',
      centerDialogVisible:false,
      dialogPasswordVisible:false,
      showClose:false,
      closeModal:false,
 	  center:true,
      dialogAgree: false,
      checkedAgree: false,
      agreedisabled:true,
      upPassword:{
        userId:'',
        oldPwd:'',
        newPwd:'',
        checkPass:''
      },

      getYanzheng:{
      	inputPhone:''
      },
      // 是否禁用按钮
	  codeDisabled: false,
	  // 倒计时秒数
	  countdown: 60,
	  // 按钮上的文字
	  codeMsg: "获取验证码",
	  codeTs:'',
	  inputCode:'',
	  // 定时器
	  timer: null,
      exitInputPhone:false,
      rulesPassword:{
          oldPwd: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
          ],
          newPwd: [
            {required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true,validator: validatePass2, trigger: 'blur' }
          ]
      },
      rulesYanzhengPhone:{
      	  inputPhone: [
            { required: true, validator: validatePhone, trigger: 'blur' }
          ]
      }

    }
  },
  created(){
      bus.$on('goto', (url) => {
        this.$router.push(url);
      })
  },
  computed:{

  },
  components:{

  },
  beforeMount(){
  	this.user = JSON.parse(sessionStorage.getItem('user')).user;
  	MSGAPI.getMyTodo({}).then((res)=>{
  		console.log(res)
  		if(res.code==1&&res.total!=0){
  			this.$notify({
	          title: '操作提示',
	          message: '您有'+res.total+'条待办未处理',
	          type: 'warning',
	          offset: 70
	        });
  		}

  	})
  	MSGAPI.getMyTodoOneHourLater({}).then((res)=>{
  		console.log(res)
  		if(res.code==1&&res.total!=0){
  			this.$notify({
	          title: '操作提示',
	          message: '您有'+res.total+'条待办要处理',
	          type: 'warning',
	          offset: 70
	        });
  		}
  	})
  	setInterval(function(){
    	MSGAPI.getMyTodoOneHourLater({}).then((res)=>{
	  		console.log(res)
	  		if(res.code==1&&res.total!=0){
	  			this.$notify({
		          title: '操作提示',
		          message: '您有'+res.total+'条待办要处理',
		          type: 'warning',
		          offset: 70
		        });
	  		}

	  	})
    },10*60*1000)//十分钟请求一次


  	API.menuGet({}).then((res)=>{//请求menulist
      if(res.data && res.data.length > 0) {
        res.data.forEach(item => {
          if(this.$router.options.routes && this.$router.options.routes.length >0 ){
            this.$router.options.routes.forEach( tem => {
                if(item.code == tem.code){
                  tem.name = item.name;
                  if(tem.children && tem.children.length>0){
                    tem.children.forEach( em =>{
                      /*if(em.code == item.code){
                        em.menuShow = true
                      }else {
                        em.menuShow = false
                      }*/
                    })
                  }
                this.menuList.push(tem);
              }
            })
          }
        })
      }else {
        this.menuList.push({
          path: '/',
          name: '首页',
          component: () => import('@/components/home.vue'),
          leaf: true, // 只有一个节点
          menuShow: true,
          code: 'shouye',
          iconCls: 'el-icon-menu', // 图标样式class
          children: [
            {path: '/index', component: () => import('@/components/index/index.vue'), name: '首页', menuShow: true},
          ]
        }
        )
      }
    })

  },
  mounted(){
    //未读消息获取
    this.UnreadMsg();
    //获取消息
    var date = new Date();
    this.weather.time = `${date.getFullYear()}年${date.getMonth() +1}月${date.getDate()}号`;
	  this.weather.weekday = `${date.getDay()}`;
    if(this.weather.weekday==0){
      this.weather.weekday='七';
    }else if(this.weather.weekday==1){
      this.weather.weekday='一';
    }else if(this.weather.weekday==2){
      this.weather.weekday='二';
    }else if(this.weather.weekday==3){
      this.weather.weekday='三';
    }else if(this.weather.weekday==4){
      this.weather.weekday='四';
    }else if(this.weather.weekday==5){
      this.weather.weekday='五';
    }else if(this.weather.weekday==6){
      this.weather.weekday='六';
    }
	  this.weather.weekday='星期'+this.weather.weekday;
    this.weather.detail =  `${date.getHours()}:${date.getMinutes()}`;
    let that = this;
    setInterval(function(){
    	var date = new Date();
    	that.weather.detail =  `${date.getHours()}:${date.getMinutes()}`
    },1000)
      //xhr
    var request = new XMLHttpRequest();
    request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?q=tianjin&mode=json&units=metric&cnt=7&appid=f12159c1f548ea9ab7b5ff1907b1df50', true);
//	let that = this;
    request.onload = function() {
        if (this.status == 200) {
        	that.weatherDialog = true;
        	var w = JSON.parse(this.response);
        	console.log(that.weather)
			that.weather.icon ='http://openweathermap.org/img/w/'+ w.list[0].weather[0].icon+'.png';
			that.weather.main = parseInt(w.list[0].temp.min) +'℃ ' +' - '+ parseInt(w.list[0].temp.max)+' ℃ '
        }
    };
    request.send();


	//0代表初始新用户，1代表协议密码都修改了，2代表只勾了协议密码未修改，
    //3代表协议变更，密码已修改，4代表协议变更，密码未修改
    if(this.user.firstloginstatus==0||this.user.firstloginstatus==3||this.user.firstloginstatus==4){//0代表初始用户
    	API.agreeShow({userType:this.user.utypeid}).then((res)=>{//请求协议
    		console.log(res)
			if(res.code==1){
				this.userAgreement = res.data.content;

			}else if(res.code==2){//未登录
				this.$router.push('/');
			}
      	})

    	if(this.user.firstloginstatus==3){//3代表协议变更，密码已修改
    		this.changeagreeDialog = true;
    	}else{
    		this.dialogAgree = true;
	    	this.active=0;
    	}

    }else if(this.user.firstloginstatus==1){//密码协议都修改了，检测是否绑定
    	API.authenShow({userId:this.user.userid}).then((res)=>{
    		console.log(res)
			if(res.code==1){//请求成功
				if(!res.data){//一个都没有绑定false 现在后台给的数据是根据email和phone为空进行判断的，不是根据emailbind和phonebind字段进行判断的
					this.$router.push('/personInfo');
					this.$notify({
			          title: '操作提示',
			          message: '检测您未绑定任何账户，安全等级较低，建议您绑定个人信息',
			          type: 'warning',
			          offset: 70
			        });
				}
			}else if(res.code==2){//未登录
				this.$router.push('/');
			}else{
				this.$notify({
		          title: '操作提示',
		          message: res.data,
		          iconClass: 'el-icon-info',
		          offset: 70
		        });
			}
      	})

    }else if(this.user.firstloginstatus==2){//2代表只勾了协议密码未修改
	    this.dialogAgree = true;
	    this.active=1;
    }

    //修改密码和初始密码相同时
    console.log(this.user.cleartextpwd == this.user.account+this.user.randomnum);
    if(this.user.cleartextpwd == this.user.account+this.user.randomnum || !this.user.cleartextpwd || this.user.cleartextpwd == ''){
      this.dialogAgree = true;
      this.active=1;
    }

  },
  methods: {

      //获取未读消息条数
      UnreadMsg(){
        let promise1 = {
          userId: this.user.userid
        }
        MSGAPI.getUnreadMsg(promise1).then( (res) => {//消息
          console.log(res);
          if(res.data && res.code === 1){
            res.data.forEach((item)=>{
              console.log(item);
              if(item.name == "消息" ){
                this.msgUnread = item.total;
                this.msgUnreadTitle = item.title;
                this.msgUnreadContent = item.content;
                this.msgUnreadArr.push(item);
              }else if(item.name == "通知"){
                this.informUnread = item.total;
                this.informUnreadTitle = item.title;
                this.informUnreadContent = item.content;
                this.informArr.push(item);
              }else if(item.name == "公告"){
                this.noticeUnreadTitle = item.title;
                this.noticeUnreadContent = item.content;
                this.noticeUnread = item.total;
                this.noticeUnreadArr.push(item);
              }
            })
          }else {
            this.msgUnread = '';
          }
        })
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      noticeEnter(){
        console.log('很多杀害的撒');
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      sureDel(){
        API.logout({}).then((res)=>{
            console.log(res)
            this.$router.push('/');
//             sessionStorage.clear();
        })
      },
      p_len(){
	      console.log(this.upPassword.newPwd)
		  this.passwordStrength.contains_number = /\d/.test(this.upPassword.newPwd);
	      this.passwordStrength.contains_lovercase = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{8,20}$/.test(this.upPassword.newPwd);
	      this.passwordStrength.contains_uppercase = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,}$/.test(this.upPassword.newPwd);
     },
      // 点击右上角
      handleCommand(command) {
          if(command == 'loginout'){//退出
              this.centerDialogVisible= true;
          }else if(command == 'editPass'){//修改密码
              this.upPassword.userId = this.user.userId;
              this.dialogPasswordVisible=true;
          }
      },
      closeDialog(form){
        this.$refs[form].resetFields();
      },
      //改变密码显示和隐藏的状态
    changePasswordType(type) {
        if(type==="oldPassword"){
          if(this.oldPassword == "password"){
            this.oldPassword = "text";
            this.hidden1 = false;
          }else if( this.oldPassword == "text"){
            this.oldPassword = "password"
            this.hidden1 = true;
          }
        }else if(type==="newPassword"){
          if(this.newPassword == "password"){
          	this.hidden2 = false;
            this.newPassword = "text"
          }else if( this.newPassword == "text"){
            this.newPassword = "password"
            this.hidden2 = true;
          }
        }else {
          if(this.surePassword == "password"){
            this.surePassword = "text"
            this.hidden3 = false;
          }else if( this.surePassword == "text"){
            this.surePassword = "password"
            this.hidden3 = true;
          }
        }
      },
    saveFirstPassword(formName){
    	this.$refs[formName].validate((valid) => {
          if (valid) {
          	//密码加密
            let firstPassword = {
              userId: this.user.userid,
              newPwd: HASH.hex_sha1(this.upPassword.newPwd)+ '-'+ this.upPassword.newPwd
            }
            API.firstUppwd(firstPassword).then((res)=>{
            	console.log(res)
            	if(res.code==1){
            		this.active++;
            	}
            })


          }
        })
    },
    savePassword(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //密码加密
            let newPassword = {
              userId:this.user.userid,
              oldPwd:HASH.hex_sha1(this.upPassword.oldPwd),
              newPwd:HASH.hex_sha1(this.upPassword.newPwd) +'-'+this.upPassword.newPwd
            }
            console.log(newPassword)

            API.modifyPwd(newPassword).then((res)=>{
            	console.log(res)
              if(res.code==1){
                this.dialogPasswordVisible = false;
	            	this.$router.push('/');
		          	this.$notify({
		              title: '操作提示',
		              message: '您已经成功修改了密码，请重新登录',
		              iconClass: 'el-icon-info',
		              offset: 70
		           });
              }else{
                this.$notify({
                  title: '操作提示',
                  message: res.data,
                  iconClass: 'el-icon-info',
                  offset: 70
                });

              }



            });
          }
        });
      },
    agreeChange(val){
    	val?this.agreedisabled=false:this.agreedisabled=true
    	val?this.typeinfo='primary':this.typeinfo='info'
    },
    notAgreeClose(){
      	this.$router.push('/');
//      sessionStorage.clear();

    },
    agreeClose(){
    	let kk = 0;
    	if(this.user.firstloginstatus==3){
    		this.changeagreeDialog = false;
    		kk = 1;
    	}else if(this.user.firstloginstatus==0||this.user.firstloginstatus==4){
    		kk = 2;
    	}
      	let agreeUser = {
              userid:this.user.userid,
              account:this.user.account,
              username:this.user.username,
              utypeid:this.user.utypeid,
              firstloginstatus:kk
        }
      	console.log(agreeUser)
      	API.updateUser(agreeUser).then((res)=>{
			if(this.user.firstloginstatus==3){
				this.changeagreeDialog = false;
				API.showByid({id:this.user.userid}).then((res)=>{
					if(res.code==1){
						sessionStorage.setItem('user',JSON.stringify(res.data));
					}
				})

			}else{
				if (this.active++ > 3) this.active = 4;
			}
      		this.$notify({
	          title: '操作提示',
	          message: '欢迎您使用本系统',
	          iconClass: 'el-icon-info',
	          offset: 70
	        });
        })

      },
		submitFinished(){
			 if(this.inputCode==''){
			 	this.codeTs='验证码不能为空'
			 }else{
			 	if(this.exitInputPhone){
			 		if (this.active++ > 4) this.active = 5;
			 	}
			 }

		},
    getCode(formData) {
			this.$refs[formData].validate((valid) => {
	          	if (valid) {
	          		this.exitInputPhone=true;
	            	// 验证码60秒倒计时
					  if (!this.timer) {
					   	this.timer = setInterval(() => {
					   		if (this.countdown > 0 && this.countdown <= 60) {
					    		this.countdown--;
					    		if (this.countdown !== 0) {
					    			this.codeMsg = "重新发送(" + this.countdown + ")";
					    		} else {
						    		clearInterval(this.timer);
						    		this.codeMsg = "获取验证码";
						    		this.countdown = 60;
						    		this.timer = null;
						    		this.codeDisabled = false;
					    		}
					   		}
					    }, 1000)
					  }
	            }else{

	            }

			});
		},
		finishedFirst(){
			this.dialogAgree=false;
        	this.$router.push('/');
          	this.$notify({
              title: '操作提示',
              message: '您已经修改了密码，请重新登录',
              iconClass: 'el-icon-info',
              offset: 70
            });
		},
    }//method方法结束
}
</script>

<style scoped lang='scss'>
a{text-decoration: none;}
.item-dot{height:30px;line-height:30px;color:#fff;margin:0 10px;}
.item-dot i{margin:0;font-size:18px;}
.icon-biyan1{line-height:1;margin:0!important;}
.checkagree{margin-bottom:20px;text-align:left;font-weight:700;}
.infoul{overflow:hidden;}
.eachinfo{float:left;width:33%;line-height:50px;text-align:left;}
.third-tools{width:60%;margin:0 auto;}
.third-tools li{width:33%;text-align:center;list-style:none;float:left;text-align:center;cursor:pointer;}
.third-tools li p{margin:5px 0;font-size:12px;}
.menu-icon{
	display:inline-block;
	width:20px;height:20px;margin-top:20px;cursor:pointer;
	background:url(../../static/menu-icon.png) no-repeat;
}
.header-top{
  text-align:left;
  .person{
    width:40px;
    height:40px;
    border-radius:100%;
    display:inline-block;
    overflow:hidden;
    vertical-align: middle;
    background-color:#fff;
    img{
      width:40px;
      height:40px;
    }
  }
}

.el-header, .el-footer {
    background-color: #942987;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #6a005d;
    color: #333;
    text-align: left;
  }

  .el-main {
    background-color: #f3f3f3;
    color: #333;
    .main-contain{
      padding:15px;
      background-color:#fff;
      border-radius:8px;
    }
  }
  .main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 60px;
      width:100%;
      bottom: 0px;
      overflow: hidden;
    }
.el-submenu.is-active{
  background-color:#942987;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /*margin-top:20px;*/
  }
  .showSider{
    width:200px !important;
    transition:all 0.4s;
    .logo{
      width:100%;
      height:60px;
      line-height:60px;
     /* background:url(../../static/logo-open.png) center center no-repeat;*/
      background:url(../../static/logo-open.png) center center no-repeat;
      background-size:88%;
      display: inherit;
      img{
        width:100%;
        height:60px;
      }
    }
    .el-menu--collapse{
      /*margin-top:20px;*/
    }
  }
  .hideSider{
    width:60px !important;
    transition:all 0.4s;
    .logo{
      width:100%;
      height:60px;
      background-size:60%;
      background:url(../../static/logo-close.png) center center no-repeat;

      line-height:60px;
      display: inherit;
      img{
        width:100%;
        height:60px;
      }
    }
    .el-menu--collapse{
      width:60px !important;
      border-right:0px;
/*      margin-top:20px;*/
    }
  }

  .el-dropdown{cursor:pointer;}

  /*修改密码显示和影藏*/
  .password-eye{
    position: absolute;
    right: -20px;
    top: 10px;
  }

  .input_container {
  display: block;
  margin: 0 auto;
  width: 320px;
  height: auto;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}
.password_length {
  padding: 2px 10px;
  position: absolute;
  top: 50%;
  right: 10px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  background: #FBD490;
  color: rgba(71, 87, 98, 0.8);
  border-radius: 4px;
  font-size: 13px;
  display: none;
  -webkit-transition: all .1s;
  transition: all .1s;
}

.valid_password_length {
  background: #00AD7C;
  color: rgba(255, 255, 255, 0.9);
}

.show_password_length {
  display: block;
}

.lnu_container {
  display: block;
  text-align:right;
  position:absolute;
  bottom:-30px;right:0;
  width: 100px;
  height: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
}

.lnu_container p {
  width: 30px;
  height: auto;
  font-size: 12px;
  line-height: 1.2;
  text-align: center;
  border-radius: 2px;
  color: rgba(71, 87, 98, 0.8);
  /*background: -webkit-linear-gradient(left, #00AD7C 50%, #eee 50%);
  background: linear-gradient(to right, #00AD7C 50%, #eee 50%);*/
  background-size: 201% 100%;
  background-position: right;
  -webkit-transition: background .3s;
  transition: background .3s;
}

.lnu_container p:nth-child(1) {
  background: -webkit-linear-gradient(left, #EB3838 50%, #eee 50%);
  background: linear-gradient(to right, #EB3838 50%, #eee 50%);
  background-size: 201% 100%;
  background-position: right;
  -webkit-transition: background .3s;
  transition: background .3s;
}

.lnu_container p:nth-child(2) {
  background: -webkit-linear-gradient(left, #E2C91F 50%, #eee 50%);
  background: linear-gradient(to right, #E2C91F 50%, #eee 50%);
  background-size: 201% 100%;
  background-position: right;
  -webkit-transition: background .3s;
  transition: background .3s;
}

.lnu_container p:nth-child(3) {
  background: -webkit-linear-gradient(left, #00AD7C 50%, #eee 50%);
  background: linear-gradient(to right, #00AD7C 50%, #eee 50%);
  background-size: 201% 100%;
  background-position: right;
  -webkit-transition: background .3s;
  transition: background .3s;
}


.lovercase_valid,
.number_valid,
.uppercase_valid {
  background-position: left !important;
  color: rgba(255, 255, 255, 0.9) !important;
}

.valid_password_container {
  display: block;
  margin: 10px auto;
  border-radius: 4px;
  position: relative;
  background: #00AD7C;
  width: 20px;
  height: 20px;
  visibility: hidden;
  opacity: 0;
}

.show_valid_password_container {
  visibility: visible;
  opacity: 1;
}

.tick {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: white;
  stroke-width: 25;
  stroke-linecap: round;
  stroke-dasharray: 180;
  stroke-dashoffset: 180;
}

.checked {
  -webkit-animation: draw 0.5s ease forwards;
  animation: draw 0.5s ease forwards;
}
.hover-notice-box{
  position: absolute;
  padding: 0 8px;
  border-left: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  top: 45px;
  left: -100px;
  width: 210px;
  background: #fff;
  z-index: 100;
}
.hover-notice-content-title{
  text-align: left;
  font-size:12px;
  font-family:MicrosoftYaHei;
  font-weight:bold;
  color:rgba(51,51,51,1);
}
.hover-notice-content{
  font-size: 12px;
  height: 70px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #dfdfdf;
  color: #000;
  text-align: left;
  line-height: 15px;
  overflow:hidden; //超出的文本隐藏
  text-overflow:ellipsis; //溢出用省略号显示
  white-space:nowrap; //溢出不换行

}
.hover-notice-box::after{
  content: ' ';
  position: absolute;
  top: -12px;
  left: 98px;
  display: block;
  width: 0;
  height: 0;
  border-width: 0 12px 12px;
  border-style: solid;
  border-color: transparent transparent #fff;
}
.hover-notice-box-left::after{
  left: 154px;
}
@-webkit-keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

</style>

