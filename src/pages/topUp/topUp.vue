<template>
	<div>
		<topup-header></topup-header>
		<topup-content ></topup-content>
	</div>
</template>

<script>
import topupHeader from './components/header'
import topupContent from './components/topupContent'
export default {
	name :'topUp',
	data(){
		return {
			dif_num:'',
			title:'',
		}
	},
	components:{
		topupHeader,
		topupContent
	},

}
</script>

<style>
</style>