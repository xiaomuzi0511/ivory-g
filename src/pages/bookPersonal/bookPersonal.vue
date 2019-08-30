<template>
	<div>
		<div class="head-comp">
			<mt-header fixed title="姓名">
				<router-link to="/book/bookList" slot="left">
				    <mt-button icon="back" ></mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="content">
			<div class="basics">
				<img class="head-portrait" src="../../assets/image/default.png" />
				<p class="basics-name">姓名</p>
				<div class="work-type">
					<span>批灰</span>
					<span>电工</span>
					<span>批灰</span>
					<span>批灰</span>
				</div>
			</div>
			<div class="basics-info">
				<ul class="info-ul">
					<li class="info-li">
						<span class="info-title">职位：</span>
						<span class="info-content">张媛</span>
					</li>
					<li class="info-li">
						<span class="info-title">工号：</span>
						<span class="info-content">张媛</span>
					</li>
					<li class="info-li">
						<span class="info-title">手机：</span>
						<div class="cell-phone">
							<span class="info-content">张媛</span>
							<i class="iconfont icondianhua"></i>
						</div>
					
					</li>
					<li class="info-li">
						<span class="info-title">部门：</span>
						<span class="info-content">张媛</span>
					</li>
					<li class="info-li">
						<span class="info-title">入职：</span>
						<span class="info-content">张媛</span>
					</li>
				</ul>
			</div>
			<div class="basics-info-two">
				<ul class="info-ul">
					<li class="info">
						团队信息
					</li>
					<li class="info-li">
						<span class="info-title">团队：</span>
						<span class="info-content">张媛</span>
					</li>
					<li class="info-li">
						<span class="info-title">累计团队的总工时：</span>
						<div class="cell-phone">
							<span class="info-content">600小时</span>
							<i class="iconfont icondianhua"></i>
						</div>
					
					</li>

				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:'bookPersonal'
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
.basics{
	padding:0.48rem 0.3rem;
	/*margin:0 0.3rem;*/
	background:#fff;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	border-bottom:1px solid #f5f5f5;
}
.head-portrait{
	width:1.9rem;
	height:1.9rem;
	border-radius: 50%;
	
}
.basics-name{
	font-size:0.4rem;
	font-weight:600;
	padding:0.2rem 0;
}
.work-type{
	margin-top:0.2rem;
}
.work-type > span{
	padding:0.12rem 0.24rem;
	border-radius: 0.05rem;
}
.work-type > span:nth-of-type(1){
	background:#F6ECDB;
	margin-right:0.14rem;
}
.work-type > span:nth-of-type(2){
	background:#F7E9F3;
	margin-right:0.14rem;
}
.work-type > span:nth-of-type(3){
	background:#E4F4F7;
	margin-right:0.14rem;
}
.work-type > span:nth-of-type(4){
	background:#F7E9F3;
}
.basics-info{
	padding:0 0.3rem;
	background:#fff;
}
.basics-info-two{
	padding:0 0.3rem;
	background:#fff;
	margin-top:0.2rem;
	padding-bottom: 1rem;
}
.info{
	padding-top:0.44rem;
	font-size:0.36rem;
	color:#181616;
	font-weight: 600;
}
.info-li{
	border-bottom: 1px solid #f5f5f5;
	padding:0.66rem 0 0.24rem 0;
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
}
.cell-phone{
	flex:1;
	display: flex;
	justify-content: space-between;
}
.cell-phone>i{
	color:#428EF1;
}
.info-title{
	color:#666;
	font-size:0.32rem;
}
.info-content{
	font-size:0.36rem;
}

</style>