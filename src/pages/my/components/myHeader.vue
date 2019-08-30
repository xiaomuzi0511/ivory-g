<template>
	<div class="homeHeader">
		<div class="header">
			<mt-header title="个人中心">
				<mt-button slot="right">
					<i class="iconfont iconshezhi" @click="gosettingUp"></i>
					<i class="iconfont iconxitongxiaoxi" @click="goSystemMessages"></i>
					<i class="info" v-if="dot==2"></i>
				</mt-button>
			</mt-header>
		</div>
	</div>
</template>

<script>
export default {
	name :'myHeader',
	props:['dot'],
	methods:{
		gosettingUp(){
			this.$router.push('/my/settingUp');
		},
		goSystemMessages(){
			this.$router.push('/my/SystemMessages');
		}
	}
}
</script>

<style scoped="scoped">
.homeHeader{
	width:100%;
	position: fixed;
	top:0;
	left:0;
	z-index: 100;
}
.homeHeader >>> .mint-header{
	background:#fff;
	color:#000;
	font-size:0.36rem;
	height:0.88rem;
}
.homeHeader >>>.iconxitongxiaoxi{
	font-size:0.44rem;
}
.info{
	color:#fff;
	background:#f00;
	font-size:0.24rem;
	width:0.15rem;
	height:0.15rem;
	line-height: 0.15rem;
	display: inline-block;
	border-radius: 50%;
	text-align: center;
	position:absolute;
	right:0%;
	top:-10%;
}
.header >>> a{
	position:relative;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.iconshezhi{
	margin-right:0.2rem;
	font-weight: 600;
}
.header >>>.mint-button-text{
	display: flex;
	align-items: center;
}
</style>