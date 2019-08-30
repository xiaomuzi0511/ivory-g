<template>
	<div>
		<withdraw-header></withdraw-header>
		<withdrad-content></withdrad-content>
	</div>
</template>

<script>
import withdrawHeader from './components/header'
import withdradContent from './components/withdradContent'
export default{
	name:'withdraw',
	components:{
		withdrawHeader,
		withdradContent
	}
}
</script>

<style>
</style>