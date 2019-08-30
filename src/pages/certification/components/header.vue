<template>
	<div class="header">
		<mt-header title="实名认证">
			<router-link to="/" slot="left">
		    	<mt-button icon="back" ></mt-button>
		  </router-link>
		</mt-header>
	</div>
</template>

<script>
import { Header } from 'mint-ui';	
export default {
	name: 'certiHeader'
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