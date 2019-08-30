<template>
	<div>
		<income-header></income-header>
		<option-date></option-date>
		<nav-bar></nav-bar>
	</div>
</template>

<script>
import incomeHeader from './components/header'
import optionDate from './components/optionDate'
import navBar from './components/navBar'
export default {
	name: 'income',
	components:{
		incomeHeader,
		optionDate,
		navBar
	},
}
</script>

<style scoped>


</style>