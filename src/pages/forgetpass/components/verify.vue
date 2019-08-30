<template>
		<div>
			<mt-field label="" placeholder="请输入手机号" type="tel" v-model="form.phone" @blur.native.capture='phoneBlur'></mt-field>
			<mt-field label="" placeholder="请输入验证码" v-model="form.captcha" ref="codetext">
				 <div class="code-btn" @click="onacquire">{{codeText}} <p v-if="isCounts">({{count}}s)</p></div>
			</mt-field>
			<mt-field label="" placeholder="请输入密码" type="password" v-model="form.password" @blur.native.capture='passBlur'></mt-field>
			<mt-field label="" placeholder="请输入密码" type="password" v-model="form.checkpass" @blur.native.capture='checkpassBlur'></mt-field>
			<div class="passhint">密码需为字母(区分大小写、数字、符号两种以上组成的6-20位字符</div>

			<mt-button type="primary" @click="goHome('/passlogin')">确认</mt-button>

		</div>
</template>
<script>
import { Field } from 'mint-ui';
import { Switch } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
	name :'verify',
	data(){
		return {
			value3: true,
			count:0,
			isCounts:false,
			codeText:'获取验证码',
			boxs:true,
			form:{
				phone:'',
				password:'',
				checkpass:'',
				captcha:'',
				inviteCode:'',
				value:true
			}
		}
	},
	methods:{
		//验证手机号码
		phoneBlur(){
			//手机号码验证
			var phoneValue = this.form.phone;
			var reg=/^1[3456789]\d{9}$/;
			if(phoneValue == ''){
				Toast('手机号码不能为空');
			}else{
				if(!reg.test(phoneValue)){
				 Toast('手机号码输入不正确');
				}
			}
		},
		//密码验证
		passBlur(){
			var passValue = this.form.password;
			var reg = /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,20}$/;
			if(passValue == ''){
				Toast('密码不能为空')
			}else if(passValue.length < 6 || passValue.length > 20){
				Toast('密码不能少于6位,多余20位')
			}else{
				if(!reg.test(passValue)){
					Toast('密码必须字母加数字')
				}
			}
		},
		//确认密码
		checkpassBlur(){
			var checkpassValue = this.form.checkpass;
			var passValue = this.form.password;
			if(passValue != checkpassValue){
				Toast('您的确认密码有误')
			}
		},
		goHome(path){
			var phoneValue = this.form.phone;
			var passValue = this.form.password;
			var checkpassValue = this.form.checkpass;
			var phonereg=/^1[3456789]\d{9}$/; //手机验证
			var passreg = /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,20}$/; //密码验证
			
			if(phoneValue == '' ||passValue == '' || checkpassValue==''){
				Toast('请输入完整信息')
			}else if(passValue.length < 6 || passValue.length > 20){
				Toast('密码不能少于6位,多余20位')
			}else if(!passreg.test(passValue)){
				Toast('密码必须字母加数字')
			}else if(!phonereg.test(phoneValue)){
				Toast('手机号码输入不正确');
			}else if(passValue != checkpassValue){
				Toast('您的确认密码有误')
			}else{
				this.$router.replace(path)
			}
		},
		onacquire(){
			this.isCounts = true;
			if(this.count == 0){
			var time = 60; 
			this.count = time;
			this.codeText = '重发验证码'
			this.timer = setInterval(()=>{
				this.count--;
				console.log(this.count)
				if(this.count == 0){
					clearInterval(this.timer)
				}
			},1000);
			
			}	
		},
		checkactive(){
			this.boxs = !this.boxs
			if(this.boxs == true){
				this.$refs.iconcheck.style = 'display:none'
			}else{
				this.$refs.iconcheck.style = 'display:block'
			}
		},
	}
}
</script>

<style scoped> 
 .verify >>>.mint-cell-wrapper{
 	background:#fff;
 	border-bottom: 1px solid #f5f5f5;
 	display: flex;
 	flex-direction: column;
 	align-items: flex-start;
 	font-size:0.28rem;
 }
 .verify >>>.mint-field{
 	height:15%
 }
 .verify >>>.mint-cell-value{
 	width:100%;
 }
 .verify >>> .mint-switch{
 	height:15%
 }
 .verify >>>.mint-cell-title{
 	margin-top:10px;
 }
  .verify >>>.mint-button{
  	width:100%;
  	margin:20px 0;
  }
 .verify >>>.mint-field-core{
 	height:100%;
 }
  .switch{
  	display: flex;
  	flex-direction: row;
  	justify-content: space-between;
  	align-items: center;
  	margin-top:10px;
  	padding:0 10px;
  }
  .verify >>>.mint-switch-core{
  	height:27px;
  }
   .verify >>> .mint-switch-core::before{
   	height:25px;
   }
  .verify >>>  .mint-switch-core::after{
   	height:25px;
  }
   .code-btn{
 	font-size:0.28rem;
 	color:#CBCBCB;
 	border:1px solid #f2f2f2;
 	padding:0.16rem ;
 	border-radius: 0.1rem;
 	display: flex;
 	flex-direction: row;
 	justify-content: center;
 	text-align: center;
	color:#428EF1;
 }
 .passhint{
 	color:#989898;
 	margin-top:0.26rem;
 	line-height: 0.5rem;
 }
 .checkbox{
	padding:0.24rem 0 0.4rem 0;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	font-size:0.24rem;
}
.box{
	border:1px solid #999999;
	width:0.24rem;
	height:0.24rem;
	display: flex;
	font-size:0.28rem;
	margin-right:0.14rem;
}
.iconiconfontcheck{
	font-size:0.28rem;
	color:#fff;
	display: none;
}
.box-active{
	width:0.28rem;
	height:0.28rem;
	display: flex;
	background:#5386E9;
	font-size:0.28rem;
	margin-right:0.14rem;
}
.checkactive{
	display: flex;
	flex-direction: row;
	align-items: center;
	color:#999999;
}
</style>