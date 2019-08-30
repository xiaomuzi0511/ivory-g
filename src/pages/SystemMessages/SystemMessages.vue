<template>
	<div>
		<system-header></system-header>
		<system-content :records='records'></system-content>
		
	</div>
</template>

<script>
import systemHeader from './components/header'
import systemContent from './components/systemContent'
export default{
	name:'SystemMessages',
	components:{
		systemHeader,
		systemContent
	},
	data(){
		return{
			masterId:'',
			records:[]
		}
	},
	mounted(){
		var userData = this.$cookies.get('userData');
		this.masterId = userData.id;
		this.getAnnouncementListByMasterId(this.masterId)
		
		this.updateNoticeReadTimeByMasterId(this.masterId)
	},
	methods:{
		getAnnouncementListByMasterId(masterId){
			var url = domain.getAnnouncementListByMasterId +'?masterId='+masterId;
			this.$axios.get(url).then((res)=>{
				console.log(res)
				this.records = res.data.data.records;
				
			})
		},
		updateNoticeReadTimeByMasterId(masterId){
			var url = domain.updateNoticeReadTimeByMasterId +'?masterId='+masterId;
			this.$axios.get(url).then((res)=>{
				console.log(res)
			})
			
		}
	}
}
</script>

<style>
</style>