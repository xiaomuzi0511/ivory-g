<template>
		<div class="header">
			<mt-header title="实名验证">
				<router-link to="" slot="left">
			    	<mt-button icon="back" @click="this.$router.go(-1)"></mt-button>
			  </router-link>
			  <router-link to="/my" slot="right">
			    	完成
			  </router-link>
			</mt-header>
		</div>
</template>

<script>
import { Header } from 'mint-ui';	
export default {
	name: 'verifyHeader'
}
</script>

<style scoped >

.header{
	width:100%;
	position: fixed;
	top:0;
	left:0;
	z-index: 100;
	height:0.88rem;
}
.header>>> .mint-header{
	background:#fff;
	color:#000;
	font-size:0.36rem;
	height:0.88rem;
	border-bottom: 0.02rem solid #F5F5F5;
}
.header>>>.mint-header-button > a{
	color:#5A9CF2;
}
</style>