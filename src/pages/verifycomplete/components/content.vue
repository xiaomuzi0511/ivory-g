<template>
	<div class="verifycontent">
		<img src="../../../assets/image/await.png" class="awaitImg" />
		<div class="hint">提交成功，请等待管理员审核</div>
		<div class="tooltip">请耐心等待，1-3个工作日完成审核，审核结果会短信通知到您的注册手机上</div>
	</div>
</template>

<script>
export default {
	name: 'verifyContent'
}
</script>

<style scoped>
	.verifycontent{
		display:flex;
		/*justify-content: center;*/
		flex-direction: column;
		align-items: center;
		height: 100vh;
	}
	.awaitImg{
		margin-top:1.28rem;
		width:3.96rem;
	}
	.hint{
		color:#333;
		font-size:0.32rem;
		font-weight: 600;
	}
	.tooltip{
		color:#999;
		font-size:0.28rem;
		margin-top:0.3rem;
		/*width:6.1rem;*/
		padding:0 0.7rem;
		line-height: 0.5rem;
	}
</style>