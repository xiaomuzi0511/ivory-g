<template>
	<div class="header">
		<mt-header title="服务协议">
			<router-link to="" slot="left">
		    	<mt-button icon="back" @click="this.$router.go(-1)"></mt-button>
		 	</router-link>
		</mt-header>
	</div>
</template>
<script>
import { Header } from 'mint-ui';
export default {
	name: 'agreementHeader'
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
}
</style>