<template>
	<div>
		<div class="head-comp">
			<mt-header fixed title="意见反馈">
				<router-link to="/my/settingUp" slot="left">
				    <mt-button icon="back" ></mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="content">
			<div class="field-text" style="width:100%;">
				<!--<textarea class="text-area" name="textarea" rows="3" cols="10" placeholder="请在这里填写你对想要的意见，我们将不断改进，感谢支持"></textarea>-->
				<van-cell-group>
				  <van-field
				    v-model="message"
				    label=""
				    type="textarea"
				    placeholder="请在这里填写你对想要的意见，我们将不断改进，感谢支持"
				    rows="1"
				    />
				    <!--autosize-->
				  
				</van-cell-group>
			</div>
			<div class="input-content">
				<ul>
					<li class="text-title">填写联系方式（至少填写一个）</li>
					<li>
						<van-cell-group>
						  <van-field
						    v-model="mailboxCode"
						    clearable
						    label="邮箱号"
						    placeholder="请填写邮箱号"
						    @click-right-icon="$toast('question')"
						  />
						</van-cell-group>
					</li>
					<li>
						<van-cell-group>
						  <van-field
						    v-model="WechatCode"
						    clearable
						    label="微信号"
						    placeholder="请填写微信号"
						    @click-right-icon="$toast('question')"
						  />
						</van-cell-group>
					</li>
					<li>
						<van-cell-group>
						  <van-field
						  	type="tel"
						    v-model="phoneCode"
						    clearable
						    label="手机号"
						    placeholder="请填写手机号"
						    @click-right-icon="$toast('question')"
						  />
						</van-cell-group>
					</li>
				</ul>
			</div>
			<div class="btn">
				<van-button type="primary" size="large" @click="insert">提交</van-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	export default{
		name:'feedback',
		data(){
			return{
				message:'',
				mailboxCode:'',
				WechatCode:'',
				phoneCode:''
			}
		},
		methods:{
			insert(){
				var userData = this.$cookies.get('userData');
				var userId = userData.id+'';         //工人ID
				var content = this.message+'';       //内容
				var source = '1';                   //来源 1 - 工人 2 - 运营 3 - 普通用户				
				var str = [];
				if(this.message == ''){
					Toast('您还没有填写意见');
				};
				if(this.mailboxCode == '' && this.WechatCode =='' && this.phoneCode == ''){
					Toast('至少填写一个');
				};
				if(this.mailboxCode != ''){
					var pas = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
					if(!pas.test(this.mailboxCode)){
						Toast('邮箱号码输入不正确');
					}else{
						str.push(this.mailboxCode);
					}
				};
				if(this.WechatCode != ''){
					str.push(this.WechatCode);
				};
				if(this.phoneCode != '' ){
					var reg = /^1[3456789]\d{9}$/;    //手机号码正则
					if(!reg.test(this.phoneCode)){
						Toast('手机号码输入不正确');
					}else{
						str.push(this.phoneCode);
					}
				};
				if(this.message != ''&& this.mailboxCode != '' || this.WechatCode !='' || this.phoneCode !=''){
					var arrayStr = str.join(',');
					var contact = arrayStr;
					var url = domain.insert+'?userId='+userId+'&content='+content+'&source='+source+'&contact='+contact;
					this.$axios.get(url)
					.then((res)=>{
						console.log(res)
						var _this = this;
						if(res.data.code = 1101){
							Toast(res.data.msg);
							setTimeout(function(){
								_this.$router.push('/my/settingUp')
							},1500);
						}
					});
				};
			}
		}
	}
</script>

<style scoped="scoped">
.head-comp{
	width:100%;
	position: fixed;
	top:0;
	left:0;
	z-index: 100;
}
.head-comp >>> .mint-header{
	background:#fff;
	color:#000;
	font-size:0.36rem;
	height:0.88rem;
	border-bottom: 0.02rem solid #F5F5F5;
}
.content{
	margin-top:1.08rem;
}
.text-area{
	width:100%;
	height:4rem;
	font-size:0.36rem;
	line-height: 0.6rem;
}
.text-title{
	background:#fff;
	padding:0.4rem 0.3rem;
	font-size:0.36rem;
}
.input-content{
	margin-top:0.2rem;
}
.btn{
	position:fixed;
	bottom: 0;
	width:100%;
}
.btn>>>.van-button--large{
	height:44px;
	line-height: 44px;
}
.btn>>>.van-button--primary{
	background:#428EF1;
	border:1px solid #428EF1;
}
.content>>>.van-cell{
	font-size:0.36rem;
}

.field-text>>>.van-field__label{
	width:0px;
}
.field-text>>>.van-field--min-height .van-field__control{
	min-height: 100px;
}
</style>