<template>
	<div>
		<work-header :message='parentMsg'></work-header>
		<work-list></work-list>
	</div>
</template>

<script>
import workHeader  from './components/header'
import workList from './components/worklist'
export default{
	name :'worktype',
	components:{
		workHeader,
		workList
	},
	data(){
		return{
			parentMsg:''
		}
	},
	mounted(e){
		this.parentMsg = this.$route.query.name;
	}
}
</script>

<style>
</style>