
 <template>     
    <div class="wrap">

    	<div class="wrap-box">
	        <div style="padding-bottom:10px;color:#666;">
	    		<img src="../../../static/forgetlogo.png" height="40px">
	    		
	    		<div style="float:right;padding-top:25px;font-size:12px;">已有账号，<router-link to="login">登录</router-link></div>
	    	</div>
    	  <div class="wrap-box2">
    		
    		<header>账号安全</header>
    		
    		<div class="wrap-box-div" v-if="active==1">
    			<p class="center">找回密码</p>
    			<el-form :model="forgetYZ" :rules="rulesYanzheng" ref="forgetYZ" class="demo-form">
			  		<el-form-item label="" prop="phoneANDemail">
		            	<el-input type="text" autofocus="autofocus" v-model="forgetYZ.phoneANDemail" placeholder="请输入手机号或者邮箱号"></el-input>
		            </el-form-item>
		       </el-form>
		  		<el-button type="primary" @click="getCode('forgetYZ')">{{codeMsg}}</el-button>	
	      		<div class="el-form-item is-required " style="width:50%;float:left;margin-right:20px;position:relative;">
	      			<el-input :class="codeerror?'iserror':''" type="text" v-model="inputCode" placeholder="请输入验证码"></el-input>
	      			<div class="el-form-item__error" style="position:absolute;bottom:0;left:0;">{{codeTs}}</div>
	      		</div>
    			
    			<div style="margin-top: 40px;"><el-button style="width:100%;" type="primary" @click="submitFinished()">下一步</el-button></div>
    		</div>
    		
    		<div class="wrap-box-div" v-if="active==2">
    			<p class="center">修改密码</p>
    			<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="密码" prop="pass">
				    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="确认密码" prop="checkPass">
				    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
				  </el-form-item>
				  
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
				    <el-button @click="resetForm('ruleForm2')">重置</el-button>
				  </el-form-item>
				</el-form>
    		</div>
    		
    		
    		
    		<div class="wrap-box-div" v-if="active==3">
    			<p class="center">设置成功</p>
    			<p class="center">您已成功设置密码，请用新密码登录</p>
    			<div style="margin-top: 40px;"><el-button style="width:100%;" type="primary" @click="forgetlogin()">登录</el-button></div>
    		</div>
    		
    		
    		
    		
    		
    	</div>
    	
	 </div>
    </div>

</template>
<script>
import API from '@/api/api_user';
import HASH from '@/assets/hash'
export default {
  	
  	
  	
    data() {
    	
    	var validateYZ= (rule,value,callback) =>{
	    	if(value===''){
	    		callback(new Error('此项不能为空！'))
	    	}else if(/^[1][3,4,5,7,8][0-9]{9}$/.test(value)||/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)){
	    		callback();	
	    	}else{
	    		callback(new Error('请输入正确的邮箱号或手机号'))
	    	}
	    	
	    };
	    
	      var validatePass = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入密码'));
	        } else {
	          if (this.ruleForm2.checkPass !== '') {
	            this.$refs.ruleForm2.validateField('checkPass');
	          }
	          callback();
	        }
	      };
	      var validatePass2 = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请再次输入密码'));
	        } else if (value !== this.ruleForm2.pass) {
	          callback(new Error('两次输入密码不一致!'));
	        } else {
	          callback();
	        }
	      };
	    
	    
    	
      return {
      	
  	  	  ruleForm2: {
	          pass: '',
	          checkPass: ''
          },
          rules2: {
	          pass: [
	            { validator: validatePass, trigger: 'blur' }
	          ],
	          checkPass: [
	            { validator: validatePass2, trigger: 'blur' }
	          ]
          },
          email: '',
          active:1,
          codeerror:false,
          rulesYanzheng:{
	      	  phoneANDemail: [
	            { required: true, validator: validateYZ, trigger: 'blur' }
	          ]
	      },
	      codeDisabled: false,
	      forgetYZ:{
	      	phoneANDemail:''
	      },
		  countdown: 60,// 倒计时秒数	  
		  codeMsg: "获取验证码",// 按钮上的文字
		  codeTs:'',
		  inputCode:'',
		  timer: null,// 定时器
		  yz:false,
		  code:0
      };
    },
    methods: {
    	getCode(formData) {
			this.$refs[formData].validate((valid) => {
	          	if (valid) {
	          		this.yz=true;
	            	// 验证码60秒倒计时
					  if (!this.timer) {
					  	API.forgetsignIn({registerAcc:this.forgetYZ.phoneANDemail}).then((res)=>{
					  			this.code = res.data;
			      		})
					  	console.log(655)
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
		submitFinished(){
			if(this.yz){
				if(this.inputCode==''){
					this.codeerror=true
				 	this.codeTs='验证码不能为空'
				 	
				 }else if(this.inputCode==this.code&&this.code!=0){
				 	this.active++;
				 	
				 	this.$notify({
			          title: '操作提示',
			          message: '验证成功，请您设置登录密码',
			          iconClass: 'el-icon-info',
			          offset: 70
			        });		 	
				 }else{
				 	this.codeerror=true
				 	this.codeTs='验证码错误'
				 }
			}else{
				
			}	
		},

		submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	let forpass = {
	          		register:this.forgetYZ.phoneANDemail,
	          		password:HASH.hex_sha1(this.ruleForm2.pass)
	          	}
	          	console.log(forpass);
	          	API.forgetUpdate(forpass).then((res)=>{
			  			console.log(res)
	      		})
	            this.active++;
	          } else {
	          	
	            return false;
	          }
	        });
	    },
      	resetForm(formName) {
        	this.$refs[formName].resetFields();
      	},
      	forgetlogin(){
      		this.$router.push("/login");
      	}
    }//method方法结束
 }
</script>
<style scoped>
	a{text-decoration: none;color:#942987;}
	.center{text-align:center;}
	.wrap{background-color:#F4F4F4;position:relative;height:100%;}
	.wrap-box{border-radius: 8px;position:absolute;width:660px;height:350px;margin-top:-250px;margin-left:-330px;top:50%;left:50%;}
	.wrap-box2{background:#fff;}
	.wrap header{
		background:#942987;
		text-align:center;
		height:60px;line-height:60px;
		color:#fff;
		border-radius: 8px 8px 0 0;
	}
	.wrap-box-div{
		background:#fff;
		padding:10px 10px 40px 10px;
		width:50%;
		margin:0 auto;
		text-align:center;
	}
	
</style>
