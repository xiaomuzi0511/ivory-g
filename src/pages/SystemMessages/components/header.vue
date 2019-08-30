<template>
	<div class="header">
		<mt-header title="系统消息">
			<router-link to="/my" slot="left">
		    	<mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
	</div>
</template>

<script>
import { Header } from 'mint-ui';	
export default {
	name: 'systemHeader'
}
</script>

<style scoped >

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
	border-bottom: 1px solid #f5f5f5;
}
</style>