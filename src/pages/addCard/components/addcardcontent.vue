<template>
	<div class="addcardContent">
		<div class="cell">
			<mt-cell title="请绑定制卡人本人的银行卡"></mt-cell>
		</div>
		
		<div class="field">
			<mt-field label="持卡人" placeholder="请输入持卡人" v-model="username"></mt-field>
			<mt-field label="卡号" placeholder="银行卡号" type="number" v-model="number"></mt-field>
			<mt-field label="手机号" placeholder="持卡人身份证号" type="tel" v-model="website"></mt-field>
			<mt-field label="验证码" v-model="captcha">
			  <!--<img src="../assets/100x100.png" height="45px" width="100px">-->
			  	<div class="retransmission" @click="oncountDown"><p>{{Downtext}}</p><p v-if="countshow"> ({{count}}s)</p> </div>
			</mt-field>
		</div>
		<div class="checkbox">
			<div class="checkactive" @click="checkactive">
				<span :class="boxs ? 'box' :'box-active '"  ><i class="iconfont iconiconfontcheck" ref="iconcheck"></i></span>
				<span>同意</span>
			</div>
			<router-link to="/my/withdraw/addCard/agreement">《用户协议》</router-link>
		</div>
		<div class="btn">
			<mt-button size="large" @click="goverfybank">同意协议并绑定</mt-button>
		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
	name:'addcardcontent',
	data(){
		return {
			username:'',
			website:'',
			number:'',
			captcha:'',
			count:'',
			timer:null,
			Downtext:'获取验证码',
			countshow:false,
			boxs:true
		}
	},
	methods:{
		goverfybank(){
			MessageBox.alert('您的手机号与银行卡系统预留的手机号不一致，请核对后在重试').then(action => {
				
			});
			this.$router.push('/my/withdraw')
		},
		oncountDown(e){
			this.Downtext = '重发送验证码'
			this.countshow = true
			if(this.count == 0){
				var countDown = 60;
				this.count = countDown;
				this.timer = setInterval(()=>{
				if(this.count == 0){
					clearInterval(this.timer)
				}
				},1000)
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

<style scoped="scoped">
.addcardContent{
	margin-top:0.88rem;
}
.field{
	margin-top:0.2rem;
}
.field >>> .mint-cell:first-child .mint-cell-wrapper{
	background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
}
.field >>> .mint-cell:last-child{
	background-image: linear-gradient(0deg, #fff, #fff 50%, transparent 50%); 
}
.cell >>> .mint-cell:first-child .mint-cell-wrapper{
	background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
}
.cell >>> .mint-cell:last-child{
	background-image: linear-gradient(0deg, #fff, #fff 50%, transparent 50%); 
}
.btn {
	padding: 0 0.3rem;
	margin-top:0.5rem;
}

.btn>>>.mint-button--default {
	background: linear-gradient(#63B2FB, #5386E9);
	color: #fff;
	/*margin-top: 0.6rem;*/
}
.field>>>.mint-cell-wrapper{
	padding:0 0.3rem;
}
.retransmission{
	color:#428EF1;
	display: flex;
	flex-direction: row;
}
.checkbox{
	padding:0.5rem 0.3rem;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
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
	color:#999999;
}
</style>