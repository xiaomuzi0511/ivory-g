<template>
	<div class="header">
		<mt-header title="考勤统计">
		  	<router-link to="/details/attendance?state= 4" slot='left'>
				<mt-button icon='back'></mt-button>
			</router-link>
		    
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
	</div>
</template>
<script>
import { Header } from 'mint-ui';	
export default {
	name :'satHeader',
	data(){
		return{
			third:'',
		}
	},
	components :{
		Header
	}
}
</script>
<style>
.header{
	width:100%;
	position: fixed;
	top:0;
	left:0;
	height:0.88rem;
}
.header>>> .mint-header{
	background:#fff;
	color:#000;
	font-size:0.36rem;
	height:0.88rem;
}
</style>