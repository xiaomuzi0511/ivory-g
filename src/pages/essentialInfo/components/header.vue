<template>
	<div class="header">
		<mt-header fixed title="基本信息">
			<router-link :to="state == 1?'/my':'/'" slot="left">
			    <mt-button icon="back" ></mt-button>
			</router-link>
		</mt-header>
	</div>
</template>

<script>
export default{
	name:'infoHeader',
	props:['state']
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
.header>>> .mint-header{
	background:#fff;
	color:#000;
	font-size:0.36rem;
	height:0.88rem;
}
</style>