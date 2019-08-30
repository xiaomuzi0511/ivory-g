<template>
	<div class="homeHeader">
		<div class="header">
			<mt-header title="任务">
			</mt-header>
		</div>
	</div>
</template>

<script>

export default {
	name:'homeHeader'
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
		border-bottom: 0.02rem solid #F5F5F5;
	}
	
</style>