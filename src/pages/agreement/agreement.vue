<template>
	<div>
		<agreement-header></agreement-header>
		<agreement-content></agreement-content>
	</div>
</template>

<script>
import agreementHeader from './components/header'
import agreementContent from './components/agreementcontent'
export default{
	name:'agreement',
	components:{
		agreementHeader,
		agreementContent
	}
}
</script>

<style>
</style>