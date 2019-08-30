<template>
	<div>
		<div class="head-comp">
			<mt-header fixed title="设置">
				<router-link to="/my" slot="left">
				    <mt-button icon="back" ></mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="content">
			<van-cell title="意见反馈" is-link to='/my/settingUp/feedback' />
			<div class="content-list">
				<van-cell title="设置提醒" is-link @click="goToast" />
				<van-cell title="常见问题" is-link to="/my/settingUp/familiarIssue" />
				<van-cell title="版本" is-link value="当前版本0.12" />
			</div>
		</div>
		<div class="btn">
			<van-button type="primary" size="large" @click='logout'>退出登录</van-button>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	export default{
		name:'settingUp',
		methods:{
			//点击退出
			logout() {
				var userData = this.$cookies.get('userData');
				if(userData == null || userData == 'undefined') {
					this.$router.push('/login');
				}else{
					var id = userData.id;
					var url = domain.logout + "?masterId=" + id;
					this.$axios.get(url)
						.then((res) => {
							console.log(res)
							if(res.data.ret = true) {
								
								this.$cookies.remove('userData');
								this.$cookies.remove('ivory_token');
								this.$router.push('/login');
							}
						});
				}

			},
			goToast(){
				Toast('待开发')
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
	margin-top:0.88rem;
}
.content-list{
	margin-top:0.2rem;
}
.btn{
	position:fixed;
	bottom: 0;
	left:0;
	width:100%;
	padding:0.12rem 0rem;
	display: flex;
	justify-content: center;
	background:#fff;
}
.btn>>>.van-button--large{
	height:44px;
	line-height: 44px;
	width:90%;
}
.btn>>>.van-button--primary{
	background:#4497F5;
	border:1px solid #4497F5;
}
.content>>>.van-cell{
	font-size:0.36rem;
}
</style>