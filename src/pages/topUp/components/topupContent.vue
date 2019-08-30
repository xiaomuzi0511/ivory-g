<template>
	<div class="topUp">
		<div class="topup-content">
			
			<ul>
				<li class="topup-li">
					<div class="topup-bank" @click="selectpopup">
						<div>储蓄卡</div>
						<div class="bank">
							<img src="../../../assets/image/agricultural.png" alt="" />
							<p>农业银行(2362)</p>
						</div>
						<i class="iconfont icondaohanglanzhongdefanhuijianpx"></i>
					</div>
					<p class="up-title">提现金额</p>
					<div class="topup-input">
						<label for="topup-sum">￥</label>
						<input type="tel" name="topup-sum" />
					</div>
					<div class="btn">
						<mt-button size="large" @click="popup">提现</mt-button>
					</div>
				</li>
			</ul>
		</div>
		<!--选择银行卡-->
		<div class="bank-card">
			<mt-popup v-model="popupselect" position="bottom" :closeOnClickModal="ClickModal">
				<div class="visible">
					<div class="visible-title">
						<i class="iconfont iconguanbi1" @click="selectbank"></i>
						<p>选择到账银行卡</p>
					</div>
					<ul>
						<li class="bank-list" @click="selectbank">
							<img src="../../../assets/image/agricultural.png" alt="" />
							<p>建设银行 储蓄卡(6627)</p>
						</li>
						<li class="bank-list">
							<img src="../../../assets/image/agricultural.png" alt="" />
							<p>建设银行 储蓄卡(6627)</p>
						</li>
						<li class="bank-list">
							<p>使用新卡提现)</p>
						</li>
					</ul>
				</div>
			</mt-popup>
		</div>
		<!--选择银行卡-->
		<!--密码弹出-->
		<div class="pass">
			<mt-popup v-model="popupVisible" position="top" :closeOnClickModal="ClickModal" popup-transition="popup-fade">
				<div class="visible">
					<div class="visible-title">
						<i class="iconfont iconguanbi1" @click="onshut"></i>
						<p>请输入支付密码</p>
					</div>
					<p class="withdraw-text">提现</p>
					<p class="sum-num">￥300.00</p>
					<div class="passInput">
						<div v-model="one">{{one}}</div>
						<div v-model="two">{{two}}</div>
						<div v-model="three">{{three}}</div>
						<div v-model="four">{{four}}</div>
						<div v-model="five">{{five}}</div>
						<div v-model="six">{{six}}</div>
					</div>
				</div>
			</mt-popup>
		</div>
		<!--密码弹出-->
		<input type="tel" v-model="model" style="opacity: 0;" ref="inputs" v-on:input='change' />
	</div>
</template>

<script>
	export default {
		name: 'topupContent',
//		props:['dif_num'],
		data() {
			return {
				popupselect:false, //选择银行卡
				popupVisible: false,  //是否展示密码输入弹窗
				model: '',   //密码框中输入的值
				one: '',
				two: '',
				three: '',
				four: '',
				five: '',
				six: '',
				ClickModal: false,  //是否点击蒙版关闭弹窗
				rechargeOrcash:''
			}
		},
		methods: {
//			//点击下一步
			popup(dif_num) {
				this.popupVisible = true;
				this.$refs['inputs'].focus();
			},	
			selectpopup(){
				this.popupselect = true;
			},
			selectbank(){
				this.popupselect = false;
			},
//			//input监听事件
			change() {
				let passNum = this.model;

				if(passNum.length <= 6) {

					switch(passNum.length) {
						case 0:
							this.one = ""
							break;
						case 1:
							this.one = passNum.charAt(0)
							this.one = "●"
							this.two = ''
							break;
						case 2:
							this.two = passNum.charAt(1)
							this.two = "●"
							this.three = ''
							break;
						case 3:
							this.three = passNum.charAt(2)
							this.three = "●"
							this.four = ''
							break;
						case 4:
							this.four = passNum.charAt(3)
							this.four = "●"
							this.five = ''
							break;
						case 5:
							this.five = passNum.charAt(4)
							this.five = "●"
							this.six = ''
							break;
						case 6:
							this.six = passNum.charAt(5)
							this.six = "●"
							this.$router.push('/my/widthdraw/topUp/withdrawfigure')
							break;
					}
				}
			},
//			//点击关闭
			onshut() {
				this.popupVisible = false;
			}
		}

	}
</script>
<style scoped>
	.topUp {
		margin-top: 1.08rem;
		padding: 0 0.3rem;
	}
	
	.topup-content {
		background: #fff;
	}
	
	.topup-li {
		padding-bottom: 0.5rem;
	}
	
	.topup-bank {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		/*padding: 0.4rem 0.6rem 0 0.6rem;*/
		height:0.8rem;
		line-height: 0.8rem;
		padding:0 0.4rem;
	}
	
	.bank {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.bank>img {
		width: 0.3rem;
		height: 0.3rem;
		margin-right: 0.18rem;
	}
	
	.up-title {
		margin-top: 1.26rem;
		padding: 0 0.6rem;
	}
	
	.up-sum {
		font-size: 0.6rem;
		color: #000;
		margin-top: 0.5rem;
		padding: 0 0.6rem 0.3rem 0.6rem;
		border-bottom: 1px solid #eee;
	}
	
	.btn {
		padding: 0 0.6rem;
	}
	
	.btn>>>.mint-button--default {
		background: linear-gradient(#63B2FB, #5386E9);
		color: #fff;
	}
	.bank-card >>> .mint-popup-bottom{
		width: 100%;
		min-height:5rem;
	}
	
	.pass>>>.mint-popup-top {
		top: 2.22rem;
		width: 5.76rem;
		height: 4.56rem;
		border-radius: 5px;
	}
	
	.visible {
		padding: 0.34rem 0.34rem 0 0.34rem;
	}
	
	.visible-title {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	
	.visible-title>i {
		margin-right: 0.96rem
	}
	
	.visible-title>p {
		font-size: 0.36rem;
		color: #000;
		font-weight: 700;
	}
	
	.withdraw-text {
		text-align: center;
		margin-top: 0.64rem;
		font-size: 0.32rem;
	}
	
	.sum-num {
		text-align: center;
		font-size: 0.72rem;
		font-weight: 700;
		margin-top: 0.4rem;
	}
	
	.passInput {
		width: 4.82rem;
		height: 0.80rem;
		border: 1px dashed #bfbfbf;
		margin: 0 auto;
		margin-top: 0.74rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 0.84rem;
	}
	
	.passInput>div {
		border-right: 1px solid #eee;
		flex: 1;
		width: 0.83rem;
		height: 0.84rem;
		text-align: center;
	}
	
	.passInput>div:last-child {
		border-right: 0px solid #eee;
	}
	.bank-list{
		padding:0.46rem 0 0.46rem 0.34rem;
		border-bottom: 1px solid #eee;
		display: flex;
		flex-direction: row;
		align-items: center;
		
	}
	.bank-list > img{
		margin-right:0.2rem;
		width:0.46rem;
		height:0.46rem;
	}
	.bank-list > p{
		font-size:0.32rem;
	}
	.topup-input{
		padding:0.3rem 0.6rem;
		display: flex;
		align-items: center;
		font-size:0.6rem;
	}
	.topup-input > input {
		width:80%;
	}
</style>