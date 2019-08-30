<template>
	<div class="content">
		<div class="register-logo">
			<img  src="../../assets/image/logo.png" class="logo" />
		</div>
		
		<verify class="verify"></verify>
	</div>
</template>

<script>

import verify from './components/verify'
export default {
	name: 'register',
	components:{
		verify
	}
}
</script>

<style scoped>
.logo{
	width:3.38rem;
	height:0.86rem;
	text-align: center;
}
.content{
	width:100%;
	height:100vh;
	 /*min-height: 768px;*/
	background:#fff;
	position:static;
}
.register-logo{
	width:100%;
	height:15%;
	display: flex;
	justify-content: center;
	align-items: flex-end;
}
.verify{
	height:70%;
	margin-top:1.08rem;
	padding:0 0.78rem;
	
}
.verify >>> .mint-field-core::placeholder{
	color:#ccc;
	font-size:0.28rem;
}
</style>