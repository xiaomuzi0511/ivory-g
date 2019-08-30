<template>
	<div class="tabberWarp">
		<ul class="tabber">
			<div class="tab-a" @click="switchTab('/')">
				<div class="ico">
					<!--<i class="iconfont icontubiaozhizuomoban"></i>-->
					<img class="icon-img" :src=" '/' === $route.path?tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="" />
				</div>
				<div>任务</div>
			</div>
			<!--<div class="tab-a" @click="switchTab('/book')">
				<div class="ico" >
					<img class="icon-img" :src=" '/book' === $route.path?tabBarImgArr[1].selected : tabBarImgArr[1].normal" alt="" />
				</div>
				<div>通讯录</div>
			</div>-->
			<div class="tab-a" @click="switchTab('/my')">
				<div class="ico" >
					<img class="icon-img" :src=" '/my' === $route.path?tabBarImgArr[1].selected : tabBarImgArr[1].normal" alt="" />
				</div>
				<div>我的</div>
			</div>
		</ul>
	</div>
</template>
<script>
export default {
	name:'tabbar',
	data(){
		return{
			tabBarImgArr:[  
		        {normal: require('../../assets/image/dingdan.png'), selected: require('../../assets/image/dingdan-active.png')},

//		        {normal: require('../../assets/image/tongxunlu.png'), selected: require('../../assets/image/tongxunluactive.png')},
		        
		        {normal: require('../../assets/image/me.png'), selected: require('../../assets/image/mechecked.png')}
		      ]
		}
	},
	methods:{
		
		switchTab(path){
			this.$router.replace(path); // 替换路由
		}
	}
	
}
</script>

<style  scoped>
.tabberWarp{
	position:fixed;
	bottom:0;
	left:0;
	width:100%;
	height:1rem;
	background:#fff;
}
.tabber{
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	height: 1rem;
}
.tab-a{
	flex: 1;
	text-align: center;
	display:flex;
	flex-direction: row;
	
	align-items: center;
	justify-content: center;
	height:100%;
	line-height: 100%;
	color:#666;
	font-size:0.32rem;
}
.icon-img{
	width:0.48rem;
	height:0.48rem;
	margin-bottom: 0.07rem;
	margin-right:0.2rem;
}
</style>