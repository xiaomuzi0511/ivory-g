<template>
	<div class="homeHeader">
		<div class="header">
			<mt-header title="个人资料">
				<router-link to='/my' slot='left'>
					 <mt-button icon="back" ></mt-button>
				</router-link>
			</mt-header>
		</div>
	</div>
</template>

<script>
export default {
	name :'hHeader'
}
</script>

<style scoped="scoped">
.homeHeader{
	width:100%;
	position: fixed;
	top:0;
	left:0;
	z-index: 100;
}
.homeHeader >>> .mint-header{
	background:#fff;
	color:#000;
	font-size:0.36rem;
	height:0.88rem;
}
.homeHeader >>>.iconxitongxiaoxi{
	font-size:0.44rem;
}
.info{
	color:#fff;
	background:#f00;
	font-size:0.24rem;
	width:0.3rem;
	height:0.3rem;
	line-height: 0.3rem;
	display: inline-block;
	border-radius: 50%;
	text-align: center;
	position:absolute;
	right:-25%;
	top:-40%;
}
.header >>> a{
	position:relative;
}
</style>