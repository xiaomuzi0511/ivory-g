<template>
	<div>
		<div class="head-comp">
			<mt-header fixed title="我的团队">
				<router-link to="/book" slot="left">
				    <mt-button icon="back" ></mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="content">
			<van-tabs v-model="active" swipeable>
			  <van-tab v-for="(item,index) in title" :title="item.cont" :key='index'>
			  	<!--我的团队-->
			  	<div v-show="isteam">
			  		<van-cell title="象牙一班" is-link  />
			  		<van-cell title="象牙二班" is-link  />
			  		<van-cell title="象牙三班" is-link  />
			  		<div class="directly">
			  			<van-cell title="直系班" is-link  />
			  		</div>
			  	</div>
				<!--我的团队-->
			  	
			  	<!--我的客户-->
			   	 <div v-show="isClient" class="tab-list">
			   	 	<div class="list">
			   	 		<img class="head-img" src="../../assets/image/camera-icon.png" alt="" />
			   	 		<div class="list-content">
			   	 			<div>
			   	 				<p>杨晓</p>
			   	 				<p class="time">2019-10-01</p>
			   	 			</div>
			   	 			<div>
			   	 				<p>已消费：￥100</p>
			   	 			</div>
			   	 		</div>
			   	 	</div>
			   	 	<div class="list">
			   	 		<img class="head-img" src="../../assets/image/camera-icon.png" alt="" />
			   	 		<div class="list-content">
			   	 			<div>
			   	 				<p class="name">杨晓</p>
			   	 				<p class="time">2019-10-01</p>
			   	 			</div>
			   	 			<div>
			   	 				<p>已消费：￥100</p>
			   	 			</div>
			   	 		</div>
			   	 	</div>
			   	 </div>
				<!--我的客户-->
				
			  </van-tab>
			</van-tabs>
			
		</div>
	</div>
</template>

<script>
export default{
	name:'bookmyteam',
	data(){
		return{
			active:0,
			title:[{
				cont:'我的团队'
			},
			{
				cont:'我的客户'
			}],
			isClient:false,
			isteam:true
		}
	}
}
</script>

<style scoped="scoped">
.head-comp{
	width:100%;
	position: fixed;
	top:0;
	left:0;
	z-index: 100;
}
.head-comp >>> .mint-header{
	background:#fff;
	color:#000;
	font-size:0.36rem;
	height:0.88rem;
}
.content{
	margin-top:0.88rem;
}
.content>>>.van-tabs__line{
	background-color:#428EF1;
}
.tab-list{
	margin-top:0.2rem;
	background:#fff;
	padding:0 0.3rem;
	
}
.list{
	display: flex;
	justify-content:flex-start;
	
}
.head-img{
	width:1rem;
	height:1rem;
	border-radius: 50%;
	padding:0.36rem 0;
}
.list-content{
	margin-left:0.3rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex:1;
	/*padding:0.36rem 0;*/
	border-bottom:1px solid #e5e5e5;
}
.name{
	font-size:0.36rem;
	
}
.time{
	margin-top:0.2rem;
	font-size:0.24rem;
	color:#999;
}
.content >>> .van-tab span{
	font-size:0.32rem;
}
.directly{
	margin-top:0.2rem;
}
</style>