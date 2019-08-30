<template>
	<div class="content">
		<login-header></login-header>
		<div class="register-logo">
			<img  src="../../assets/image/logo.png" class="logo" />
		</div>
		<verify class="verify"></verify>
	</div>
</template>

<script>
import verify from './components/verify'
import loginHeader from './components/header'
export default {
	name :'passlogin',
	components:{
		verify,
		loginHeader
	}
}
</script>
<style scoped="scoped">
.logo{
	width:3.38rem;
	height:0.86rem;
	text-align: center;
}
.content{
	width:100%;
	height:100vh;
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
	/*height:70%;*/
	margin-top:0.6rem;
	padding:0 0.78rem;
}
</style>