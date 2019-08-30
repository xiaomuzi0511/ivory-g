<template>
	<div class="stat-content">
		<div class="time-total">
			<p>累计施工时间：{{average}} 小时</p>
		</div>
	</div>
</template>
<script>
export default{
	name:'stat',
	props:['average']
}
</script>

<style scoped>
.stat-content{
	height:1.5rem;
	margin-top:0.88rem;
	background:#fff;
	line-height: 1.5rem;
	padding: 0 0.3rem;
	margin-bottom: 0.2rem;
}
.time-total{
	font-size:0.36rem;
	font-weight: 600;
}
</style>