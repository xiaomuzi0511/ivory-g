<template>
<div class="bar">
	<div>您还没有去填写个人信息，完成信息后才可接到系统指派的订单</div>
	<button @click="goCertification">填写信息</button>
</div>
</template>

<script>
import { Dialog } from 'vant';
export default {
	name :'hintBar',
	methods:{
		goCertification(){
			if(this.$cookies.get('userData') == 'null'){
				Dialog.confirm({
				  title: '提示',
				  message: '您还没有注册登陆，请注册登陆后再去实名认证'
				}).then(() => {
				  this.$router.replace('/login')
				}).catch(() => {
					
				});
			}else{
				this.$router.replace({path:'/essentialInfo',query:{state:2}});
			}
		}
	}
}
</script>

<style scoped>
	.bar{
		height:53px;
		background:#FFF7D8;
		padding:0 0.3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		user-select: none;
	}
	.bar >div{
		width:80%;
		line-height: 0.5rem;
	}
	.bar >button{
		width:20%;
		background:#5A9CF2;
		color:#fff;
		padding:0.16rem 0;
		border-radius: 0.05rem;
	}
</style>