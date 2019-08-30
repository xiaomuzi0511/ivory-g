<template>
<div class="withdrad">
	<div class="amount-content">
		<p class="detail-btn">
			<!--<router-link to="/my/withdraw/income">提现明细</router-link></p>-->
			<router-link to="">提现明细</router-link></p>
		
		<img src="../../../assets/image/dingdan-active.png" alt="" />
		<p class="amount">0</p>
		<ul class="user-notes">
			<li class="notes-title">用户须知</li>
			<li class="notes-content">请仔细填写账号信息，如果由于您填写错误导致资金流失，平台概不负责。提现申请提交以后1-7个工作日即能到账，请注意查收。
				<p>注：提现金额不能少于100元。</p>
			</li>
		</ul>
	</div>
	<ul>
		<li class="way">选择提现方式</li>
		<li class="way-list" @click="changCheck">
			<img class="card-logo" src="../../../assets/image/yinghangka.png" />
			<div class="way-title">
				<p>银行卡</p>
				<p>银行卡提现</p>
			</div>
			<div class="check-icon" v-if="isHide"></div>
			<div class="check-icon-active" v-else>
				<i class="iconfont iconiconfontcheck" ></i>
			</div>
		</li>
		<li class="marginT-10">
			<mt-field label="收款人" placeholder="输入姓名" v-model="username"></mt-field>
		</li>
		<li class="marginT-10">
			<mt-field label="提现金额" type="number" placeholder="输入金额" v-model="tXjine"></mt-field>
			<!--<input placeholder="输入金额" type="number" @keydown="preventNotNumber($event)" />-->
		</li>
	</ul>
	<div class="btn">
		<mt-button size="large" @click="goTopUp(2)">提现</mt-button>
	</div>
</div>
</template>

<script>
export default {
	name :'withdradContent',
	data(){
		return {
			value:['银行卡'],
			isHide:false,
			username:'',
			tXjine:''
		}
	},
	methods:{
		changCheck(){
			this.isHide = !this.isHide
		},
		goTopUp(topUp){
			if(topUp == 1){
				this.$router.push('/my/withdraw/topUp')
			}else{
				this.$router.push('/my/withdraw/addCard')
			}	
		},
		isBackspace(keyValue) {
	         return keyValue === 'Backspace';
	    },
	    isDot(keyValue) {
	         return keyValue === '.';
	    },
	    isNumber(keyValue) {
	         return (keyValue >= 0 && keyValue <= 9);
	    },
	    preventNotNumber(event) {
	         var keyValue = event.key;
	         if (!calculator.isBackspace(keyValue) && !calculator.isDot(keyValue) && !calculator.isNumber(keyValue)) {
	              // 其他按键
	              event.preventDefault();
	              event.stopPropagation();
	              return false;
	         }
	     }
	}
}
</script>

<style scoped="scoped">
.withdrad{
	
	margin-top:0.88rem;
	margin-bottom:1.2rem;
}
.amount-content{
	background:#fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	/*align-items: center;*/
	text-align: center;
	padding: 0 0.3rem;
}
.amount-content > img{
	width:0.88rem;
	margin-top:0.52rem;
	margin:0 auto;
}
.user-notes{
	text-align:left;
}
.notes-title{
	font-size:0.32rem;
	color:#000;
}
.notes-content{
	color:#999;
	line-height: 0.4rem;
	margin-top:0.16rem;
}
.amount{
	margin-top:0.48rem;
	color:#F45349;
	font-size:0.78rem;
}
.detail-btn{
	color:#428EF1;
	font-size:0.28rem;
	margin-top:0.24rem;
	margin-bottom: 0.48rem;
	text-align: right;
}
.way{
	padding:0.3rem;
}
.way-list{
	background:#fff;
	display: flex;
	justify-content:space-between;
	align-items: center;
	padding:0.28rem 0.3rem;
}
.way-title{
	flex: 1;
}
.card-logo{
	width:0.7rem;
	height:0.7rem;
	margin-right:0.3rem;
}
.check-icon{
	width:0.44rem;
	height:0.44rem;
	line-height: 0.44rem;
	border:0.02rem solid #ccc;
	border-radius: 50%;
	text-align: center;
}
.check-icon-active{
	width:0.48rem;
	height:0.48rem;
	line-height: 0.44rem;
	background:#61ADF9;
	border-radius: 50%;
	text-align: center;
	color:#fff;
}
.way-title p:first-child{
	font-size:0.36rem;
	color:#000;
}
.way-title p:last-child{
	font-size:0.28rem;
	color:#999;
	margin-top:0.14rem;
}
.btn{
	width:100%;
	position:fixed;
	left:0;
	bottom: 0;
	background:#fff;
	padding:0.16rem 0;
}
.btn >>> .mint-button--large{
	width:90%;
	margin:0 auto;
}
.btn >>>.mint-button--default{
	background:#428EF1;
	color:#fff;
}
.marginT-10{
	margin-top:0.2rem;
}
.marginT-10>>>.mint-cell-wrapper{
	background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
	
}
.marginT-10>>>.mint-cell:last-child{
	background-image: linear-gradient(0deg, #fff, #fff 50%, transparent 50%);
}
</style>