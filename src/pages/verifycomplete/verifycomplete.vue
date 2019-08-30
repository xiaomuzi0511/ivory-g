<template>
	<div>
		<verify-header></verify-header>
		<verify-content></verify-content>
	</div>
</template>

<script>
import verifyHeader from './components/header'
import verifyContent from './components/content'
export default{
	name: 'verifycomplete',
	components:{
		verifyHeader,
		verifyContent
	}
}
</script>

<style>
</style>