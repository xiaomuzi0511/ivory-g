<template>
		<div class="header">
			<mt-header title="技能规则">
				<router-link to="" slot="left">
			    	<mt-button icon="back" @click="this.$router.go(-1)"></mt-button>
			  </router-link>
			</mt-header>
		</div>
</template>

<script>
import { Header } from 'mint-ui';	
export default {
	name: 'regulationHeader'
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
}
</style>