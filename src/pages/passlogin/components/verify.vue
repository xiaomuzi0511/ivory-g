<template>
	<div>
		<div class="login-input">
			<div >
				<mt-field label=" " placeholder="请输入手机号" type="tel" v-model="form.phone" @blur.native.capture='phoneBlur' ref="phonetel"></mt-field>
				<mt-field label=" " placeholder="请输入密码" type="password" v-model="form.password" ref="codetext"  @blur.native.capture='passBlur'>
				  	<!--<div class="code-btn">忘记密码</div>-->
				</mt-field>
			</div>
			
		</div>

		<div class="btn">
			<mt-button type="primary" @click="goHome('/home')">登录</mt-button>
		</div>

		<div class="small-hint">
			<!--<span @click="switchover">注册</span>-->
			<router-link to="/passlogin/register">注册</router-link>
			<router-link to="/passlogin/forgetpass">忘记密码</router-link>
		</div>
		
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
			form:{
				phone:'',
				password:'',
				account:'',
				captcha:'',
				inviteCode:'',
				value:true,
			},
			count:0,
			isCounts:false,
			codeText:'获取验证码',
			boxs:true
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
		goHome(path){
			var phoneValue = this.form.phone;
			var passValue = this.form.password;
			var phonereg=/^1[3456789]\d{9}$/;
			var passreg = /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,20}$/;
			var checkpassValue = this.form.checkpass;
			if(phoneValue == '' ||passValue == ''){
				Toast('请输入完整信息')
			}else if(!phonereg.test(phoneValue)){
				Toast('手机号码输入不正确');
			}else if(passValue.length < 6 || passValue.length > 20){
				Toast('密码不能少于6位,多余20位')
			}else if(!passreg.test(passValue)){
				Toast('密码必须字母加数字')
			}else{
				this.$router.replace(path)
			}
		},
		switchover(){
			this.isShow = !this.isShow
		},
		onacquire(){
			this.isCounts = true;
			if(this.count == 0){
			var time = 13; 
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
	},
	mounted(){
//		let cell_text = this.$refs.phonetel.$children[0].$el.children[1].children[0].firstElementChild;
//		let code_text = this.$refs.codetext.$children[0].$el.children[1].children[0].firstElementChild;
//		console.log(code_text)
//		cell_text.className = 'iconfont iconwode'
//		code_text.className = 'iconfont iconmima'
	}
}
</script>

<style scoped> 
.login-input >>> .mint-field .mint-cell-title{
	width:1rem;	
}
.login-input >>> .mint-cell:first-child .mint-cell-wrapper{
	background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
	font-size:0.36rem;
}
.login-input >>>.mint-cell{
	min-height: 1.2rem;
}
  .verify >>>.mint-button{
  	width:100%;
  	margin-top:0.4rem;
  }
.login-input >>>  .mint-field .mint-cell-title{
	width:0;
}

 .iconmima, .iconwode{
 	font-size:.36rem;
 }
 .verify >>>.mint-field-core::placeholder{
 	color:#ccc;
 }
 .small-hint{
 	display: flex;
 	justify-content: space-between;
 	color:#999;
 	margin-top:0.22rem;
 }
.small-hint > a{
	color:#999;
}
 .wire{
 	width:6rem;
 	height:0.02rem;
 	background:#f2f2f2;
 	margin-top:1.38rem;
 }
 .btn >>>.mint-button--primary{
 	background:#428EF1;
 }

</style>