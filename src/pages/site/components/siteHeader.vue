<template>
	<div class="homeHeader">
		<div class="header">
			<mt-header title="联系地址">
				<router-link to="" slot="left">
					<mt-button icon="back" @click="this.$router.go(-1)"></mt-button>
				</router-link>
			</mt-header>
			<!--<router-link to="">-->
				<div class="save" @click="onSave">保存</div>
			<!--</router-link>-->
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'siteHeader',
		methods: {
			onSave() {
				this.$emit('mag-child')
			}
		}
	}
</script>

<style scoped>
	.homeHeader{
		width:100%;
		position: fixed;
		top:0;
		left:0;
		z-index: 100;
	}
	.homeHeader>>>.mint-header {
		background: #fff;
		color: #000;
		font-size: 0.36rem;
		height:0.88rem;
	}
	
	.header {
		position: relative;
	}
	
	.save {
		position: absolute;
		top: 15px;
		right: 0.3rem;
		color: #5A9CF2;
	}
</style>