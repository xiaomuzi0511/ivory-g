<template>
	<div class="head-comp">
		<mt-header fixed title="订单详情">
			<router-link to="/" slot="left">
			    <mt-button icon="back" ></mt-button>
			</router-link>
		</mt-header>
	</div>
</template>

<script>
export default{
	name:'detaultHeader'
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
</style>