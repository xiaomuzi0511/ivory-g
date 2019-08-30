<template>
	<div>
		<site-header @mag-child="getMagChild"></site-header>
		<site-list @funOne='getsite'></site-list>
	</div>
</template>

<script>
	import siteHeader from './components/siteHeader'
	import siteList from './components/siteList'
	export default {
		name: 'site',
		components: {
			siteHeader,
			siteList,
		},
		data(){
			return{
				detailAddr:''
			}
		},
		methods:{
			//父组件获取子组件传递的值
			getsite(val){
				this.detailAddr += val;
				
			},
			//父组件监听子组件的事件
			getMagChild(){
				this.$router.push({
					name:'certification',
					path:'/home/certification',
					params:{detailAddr:this.detailAddr}
				})
			}
		}

	}
</script>

<style>

</style>