<template>
	<div>
		<regulation-header></regulation-header>
		<regulation-content></regulation-content>
	</div>
</template>

<script>
import regulationHeader from "./components/header"
import regulationContent from "./components/regulationContent"
export default{
	name :'regulation',
	components:{
		regulationHeader,
		regulationContent
	}
}
</script>

<style>
</style>