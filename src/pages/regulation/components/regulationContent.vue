<template>
	<div class="regulation">
		<div class="question-one">
			<div class="question-title">
				<i class="iconfont iconlingxing"></i>
				<p>什么是经验值</p>
				<i class="iconfont iconlingxing"></i>
			</div>
			<div class="question-text">
				经验值由技能点决定，技能点的提升由工作时长和活跃加成决定，经验值越高工人等级越高，享受到的接单量也就越多.当工人达到一定的经验值，系统会自动的升级
			</div>
		</div>
		<div class="question-two">
			<div class="question-title">
				<i class="iconfont iconlingxing"></i>
				<p>如何获得经验值</p>
				<i class="iconfont iconlingxing"></i>
			</div>
			<div class="question-table">
				<table border="" cellspacing="" cellpadding="">
					<!--<tr><th>Header</th></tr>-->
					<tr>
						<td>8个小时</td>
						<td>=1个技能点</td>
					</tr>
					<tr>
						<td>60个技能点</td>
						<td>= 1个经验值</td>
					</tr>
					<tr>
						<td>月评分达到4.5星</td>
						<td>=10%加成</td>
					</tr>
					<tr>
						<td>10%加成</td>
						<td>=10%X个小时</td>
					</tr>
				</table>
				
			</div>
			
		</div>
		
		<div class="question-three">
			<div class="question-title">
				<i class="iconfont iconlingxing"></i>
				<p>管理晋升说明</p>
				<i class="iconfont iconlingxing"></i>
			</div>
			<div class="question-text">
				<p>工时的原则上每300个小时晋升一次需要通过各级评定</p>
				<p>原则上工时最高不得超过56元每小时，可选择晋升职位获取管理工时，工时满3000小时可以开始评定职位</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name :'regulationContent'
}
</script>

<style scoped>
.regulation{
	margin-top:1.08rem;
}
.question-one, .question-two, .question-three{
	background:#fff;
	margin-top:0.2rem;
	padding:0.4rem 0.3rem;
}
.question-title{
	display: flex;
	justify-content: center;
	flex-direction: row;
}
.question-title p{
	font-size:0.36rem;
	font-weight: 600;
	margin:0 0.3rem;
}
.question-text{
	color:#999;
	margin-top:0.6rem;
	line-height: 0.4rem;
	font-size:0.32rem;
}
.question-table{
	display: flex;
	justify-content: center;
	margin-top:0.4rem;
}
.question-table table tr td{
	padding:0.3rem 0.36rem;
	font-size:0.28rem;
}
.question-table table tr td:first-child{
	background:#eee;
	color:#666;
}
.question-table table tr td:last-child{
	color:#666;
}
.question-table table{
	border:1px solid #ccc;

}
</style>