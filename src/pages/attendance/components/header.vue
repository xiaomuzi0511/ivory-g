<template>
	<div class="header">
		<mt-header v-if="state==1" title="考勤打卡">
		  <router-link to="/" slot="left">
		    <mt-button icon="back" ></mt-button>
		  </router-link>
		</mt-header>
		<mt-header v-if="state==2" title="考勤打卡">
		  <router-link to="/details" slot="left">
		    <mt-button icon="back" ></mt-button>
		  </router-link>
		</mt-header>
		<mt-header v-if="state==3 " title="考勤打卡">
		  <router-link to="/my" slot="left">
		    <mt-button icon="back" ></mt-button>
		  </router-link>
		</mt-header>
		<mt-header v-if="state== 4" title="考勤打卡">
		  <router-link to="/my" slot="left">
		    <mt-button icon="back" ></mt-button>
		  </router-link>
		</mt-header>
		<mt-header v-if="state== 5" title="考勤打卡">
		  <router-link to="/my" slot="left">
		    <mt-button icon="back" ></mt-button>
		  </router-link>
		</mt-header>
		
	</div>
</template>

<script>
import { Header } from 'mint-ui';	
export default {
	name :'attHeader',
	props:['state'],
	data(){
		return{
			third:'',
		}
	}
}
</script>

<style scoped>
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
		border-bottom: 0.02rem solid #F5F5F5;
	}
</style>