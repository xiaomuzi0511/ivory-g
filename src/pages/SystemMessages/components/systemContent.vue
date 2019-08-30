<template>
	<div class='sys-cont'>
		<ul>
			<li class="sys-li" v-for="item in records">  
				<p class="headline">{{item.title}}</p>
				<p class="messageblob">{{item.content}}</p>
				<div class="bottom">
					<span class="typeName">{{item.typeName}} </span>
					<span class="publishTime">{{item.publishTime}}</span>
				</div>
			</li>

		</ul>
	</div>
</template>

<script>
export default {
	name:'systemContent',
	props:['records'],
	
}
</script>

<style scoped="scoped">
.sys-cont{
	margin-top:1.08rem;
	padding:0 0.3rem;
}
.sys-li{
	background:#fff;
	margin:0.2rem 0;
	padding:0 0.2rem;
}
.headline{
	font-size:0.32rem;
	padding:0.3rem 0;
}
.messageblob{
	border-bottom: 1px solid #e5e5e5;
	padding-bottom: 0.6rem;
	color:#999;
	line-height: 0.4rem;
}
.bottom{
	padding:0.24rem 0;
	display: flex;
	justify-content: space-between;
}
.typeName{
	color:#5EA9F5;
}
</style>