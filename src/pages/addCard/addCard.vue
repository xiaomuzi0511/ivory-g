<template>
	<div>
		<addcard-header></addcard-header>
		<addcard-content></addcard-content>
	</div>
</template>

<script>
import addcardHeader from './components/header'
import addcardContent from './components/addcardcontent'
export default {
	name:'addCard',
	components:{
		addcardHeader,
		addcardContent
	}
}
</script>

<style>
</style>