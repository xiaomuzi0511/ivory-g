<template>
	<div>
		<!--<mt-progress :value="60">
		  <div slot="start">0%</div>
		  <div slot="end">100%</div>
		</mt-progress>-->
		<skill-header></skill-header>
		<gradelinellae></gradelinellae>
	</div>
</template>

<script>
import skillHeader from './components/header'
import gradelinellae from './components/gradelinellae'
export default {
	name :'skillDetails',
	components:{
		skillHeader,
		gradelinellae
	}
}
</script>

<style>
</style>