<template>
	<div class="header">
		<mt-header fixed title="身份验证">
			<router-link to="/my/personalData" slot="left">
			    <mt-button icon="back" ></mt-button>
			</router-link>
		</mt-header>
	</div>
</template>

<script>
export default{
	name:'vHeader'
}
</script>

<style scoped="scoped">
	.header{
		width:100%;
		position: fixed;
		top:0;
		left:0;
		z-index: 100;
	}
	.header >>> .mint-header{
		background:#fff;
		color:#000;
		font-size:0.36rem;
		height:0.88rem;
		border-bottom: 0.02rem solid #F5F5F5;
	}
</style>