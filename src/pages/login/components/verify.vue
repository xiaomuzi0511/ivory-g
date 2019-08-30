<template>
	<div>
		<div class="login-input">
			<div>
				
				<mt-field label=" " placeholder="请输入手机号" type="tel" v-model="form.phone" ref="phonetel" />

				<mt-field label=" " placeholder="请输入验证码" type="tel" v-model="form.captcha" ref="codetext" :attr="{ maxlength: 6 }">
					<div class="code-btn" @click="onacquire">{{codeText}}
						<p v-if="isCounts">({{count}}s)</p>
					</div>
				</mt-field>
			</div>
		</div>
		<div class="btn">
			<mt-button type="primary" @click="goHome('/')">登录</mt-button>
		</div>
		<div class="checkbox">
			<div class="checkactive" @click="checkactive">
				<span :class="boxs ? 'box' :'box-active '"><i class="iconfont iconiconfontcheck" ref="iconcheck"></i></span>
				<span class="one">同意 </span>
			</div>
			<router-link to="/my/withdraw/addCard/agreement">《平台用户服务协议》</router-link>
			<router-link to="/privacypolicy">《隐私政策》</router-link>
		</div>
		<div class="small-hint">
			<router-link to="/passlogin">账户登录</router-link>
		</div>
	</div>
</template>
<script>
	import { Field } from 'mint-ui';
	import { Switch } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import axios from 'axios';
	export default {
		name: 'verify',
		data() {
			return {
				value3: true,
				form: {
					phone: '',
					captcha: '', //验证码
					value: true,
				},
				count: 0,
				isCounts: false,
				codeText: '获取验证码',
				boxs: true, //协议是否被勾选
				openId:''
			}
		},
		methods: {
			//点击登录按钮
			goHome(path){
				//手机号码
				var phoneValue = this.form.phone;
				var reg = /^1[3456789]\d{9}$/;
				//验证码
				var captcha = this.form.captcha;

				if(phoneValue == '' || captcha == '') {
					Toast('请输入完整信息')
				} else if(!reg.test(phoneValue)) {
					Toast('手机号码输入不正确');
				} else if(this.boxs == true) {
					Toast('请阅读并同意用户协议');
				} else {
					//				this.$router.replace(path)
					this.onLoginCode()
				}
			},
			//点击获取验证码事件
			onacquire(){
				var phoneValue = this.form.phone;
				var reg = /^1[3456789]\d{9}$/;
				if(!reg.test(phoneValue)) {
					Toast('手机号码输入不正确');
				} else {
					if(this.count == 0) {
						//调用获取验证码接口事件
						this.getAuthCode();
					}
				}
			},
			//是否同意协议
			checkactive(){
				this.boxs = !this.boxs
				if(this.boxs == true) {
					this.$refs.iconcheck.style = 'display:none';
				} else {
					this.$refs.iconcheck.style = 'display:block';
				}
			},
			//获取验证码接口
			getAuthCode(){
				var phoneValue = this.form.phone;
				phoneValue = phoneValue + '';
				if(phoneValue != '') {
					this.$axios({
						method: 'get',
						url: domain.getCode + '?phone=' + phoneValue
					}).then((res) => {
						console.log(res)
						if(res.data.ret == false) {
							this.codeText = '获取验证码'
							this.isCounts = false;
							clearInterval(this.timer)
							alert(res.data.msg)
//							Toast(res.data.msg);
						} else {
							this.isCounts = true;
							var time = 60;
							this.count = time;
							this.codeText = '重发验证码'
							this.timer = setInterval(() => {
								this.count--;
								if(this.count == 0) {
									this.codeText = '获取验证码'
									this.isCounts = false;
									clearInterval(this.timer)
								}
							}, 1000);
						}

					})
				}
			},
			//手机验证码登录接口
			onLoginCode(){
				var phoneValue = this.form.phone;
				phoneValue = phoneValue + ''
				var captcha = this.form.captcha;
				// 0 - 不同意 1 - 同意
				var check = 0;
				if(this.boxs == true) {
					check = '0';
				} else {
					check = '1';
				}
				
				let api_data = this.$qs.stringify({
					phone: phoneValue,
					code: captcha,
					check: check,
					openid:this.openId
				})
				var url = domain.phoneLogin;
				this.$axios.post(url, api_data).then(res => {
					if(res.data.code == 1119) {
						localStorage.setItem("ivory_token", res.data.data[1]);
						this.$cookies.set("userData", res.data.data[2]);
						this.$cookies.set('ivory_token', res.data.data[1]);
						this.$router.push('/');
					} else {
						Toast('您输入的验证码不正确，请重新输入')
					}
				})

			},
			getCode (){
	           	const AppId = 'wxcddc63cbdae7e64a';
				var code = this.getUrlParam('code');
				var redirect_uri = window.location.origin + window.location.pathname;
//				var redirect_uri = 'http://xymo.natapp1.cc/#/login';
//				var redirect_uri = 'https://m.ivory-x.com/#/login';
				var wx_link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + AppId + '&redirect_uri=' + encodeURIComponent(redirect_uri)+ '&response_type=' + code + '&scope=snsapi_base' + '&state=STATE#wechat_redirect'
	           	
	           if (code == null || code === ''){
	           		window.location.href = wx_link;
	           		code = this.getUrlParam('code');
	           } else {
	                this.getOpenId(code) //把code传给后台获取用户信息
	           }
			},
			// 通过code获取 openId等用户信息，/api/user/wechat/login 为后台接口
			getOpenId(code){ 
				let _this = this;
				var url = domain.authCode;
				var code = _this.$qs.stringify({
					code:code,
					state:'2'
				});
				_this.$axios({
					method:'post',
					url:url,
					data:code
				}).then((res)=>{
					console.log(res)
					if(res.data.code == 1124){
						this.openId = res.data.data;
						this.$cookies.set('openid',res.data.data);
					}
					
				})
			},
			getUrlParam(name){ //封装方法
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
				var r = window.location.search.substr(1).match(reg); //匹配目标参数
				if(r != null) return unescape(r[2]);
				return null; //返回参数值
			},
		},
		mounted(){
			//如果是微信浏览器就去获取code
			var _this = this;
			var openid = _this.$cookies.get('openid');
			if (/MicroMessenger/.test(window.navigator.userAgent)){ 
				if(openid == null ||openid == 'undefined'){
					_this.getCode();
				}else{
					_this.openId = openid;
				} 
			};
		},
		
	}
</script>

<style scoped>
	.login-input>>>.mint-cell {
		min-height: 1.2rem;
	}
	
	.verify>>>.mint-button {
		width: 100%;
		margin-top: 0.52rem;
	}
	
	.login-input>>>.mint-field .mint-cell-title {
		width: 0;
	}
	
	.code-btn {
		font-size: 0.28rem;
		color: #CBCBCB;
		border: 1px solid #f2f2f2;
		padding: 0.16rem;
		border-radius: 0.1rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		text-align: center;
		color: #428EF1;
	}
	
	.login-input>>>.mint-cell-wrapper {
		background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
		border-bottom: 0.02rem solid #d9d9d9;
	}
	
	.login-input>>>.mint-cell:last-child {
		background-image: linear-gradient(0deg, #fff, #fff 50%, transparent 50%);
	}
	
	.verify>>>.mint-field-core::placeholder {
		color: #ccc;
	}
	
	.small-hint {
		display: flex;
		justify-content: space-between;
		margin-top: 0.22rem;
	}
	
	.small-hint>a {
		color: #428EF1;
	}
	
	.btn>>>.mint-button--primary {
		background: #428EF1;
	}
	
	.checkbox {
		padding: 0.24rem 0 0.4rem 0;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-size: 0.24rem;
		flex-wrap: nowrap;
	}
	
	.box {
		border: 1px solid #999999;
		width: 0.24rem;
		height: 0.24rem;
		display: flex;
		font-size: 0.28rem;
		margin-right: 0.14rem;
	}
	
	.iconiconfontcheck {
		font-size: 0.28rem;
		font-weight: 600;
		color: #fff;
		display: none;
	}
	
	.box-active {
		width: 0.28rem;
		height: 0.28rem;
		display: flex;
		background: #5386E9;
		font-size: 0.28rem;
		margin-right: 0.14rem;
	}
	
	.checkactive {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #999999;
	}
	
	.checkactive .one {
		flex-wrap: nowrap;
	}
</style>