<template>
	<div class="contents">
		<sat-header></sat-header>
		<stat :average='average'></stat>
		<datetime @oneomday="oneomday" @onaverage="onaverage"></datetime>
		<stat-list :eomday='eomday'></stat-list>
		<statistics-footer :eomday='eomday'></statistics-footer>
	</div>
</template>

<script>
import SatHeader from './components/header'
import datetime from './components/datetime'
import stat from './components/stat'
import statList from './components/statList'
import statisticsFooter from './components/footer'
export default {
	name :'statistics',
	components :{
		SatHeader,
		datetime,
		stat,
		statList,
		statisticsFooter
	},
	data(){
		return{
			eomday:'',
			average:''
		}
	},
	mounted(){
		var url = "/masterClockinRecord/getMonthTotalHour"
		var userData = this.$cookies.get('userData');
		
	},
	methods:{
		oneomday(val){
			this.eomday = val
		},
		onaverage(val){
			this.average = val
			
		}
	}
}
</script>

<style scoped>
	.contents{
		padding-bottom: 2rem;
	}
	.contents >>> .mint-header{
		background-color:#fff;
		color:#000;
		font-size:0.36rem;
	}
</style>