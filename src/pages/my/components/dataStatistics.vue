<template>
	<div>
		<div class="data-content">
			<div class="accumulate-time">
				<span>{{balance.totalHousr}}</span>
				<div class="time-data">累计工时</div>
			</div>
			<div class="accumulate-time">
				<span>{{balance.monWorkHours}}</span>
				<div class="time-data">本月工时</div>
			</div>
			<div class="accumulate-time">
				<span>{{balance.money}}</span>
				<div class="time-data">余额</div>
			</div>
		</div>
		<!---->
		<div class="data-list">
			<mt-cell title="打卡" is-link to="/details/attendance?state=3" >
				 <img slot="icon" src="../../../assets/image/daka.png">
			</mt-cell>
			<mt-cell title="工作类型" is-link >
				<img slot="icon" src="../../../assets/image/gzlx.png" />
			</mt-cell>
			<mt-cell title="提现" is-link >
				<img slot="icon" src="../../../assets/image/tixian.png" alt="" />
			</mt-cell>
			<!--<div class="btn">
				<van-button type="primary" size="large" @click='logout'>退出</van-button>
			</div>-->
		</div>
	</div>
</template>

<script>
export default{
	name:'dataStatistics',
	props:['balance'],
	methods:{
		logout(){
			this.$emit('logout')
		},
		goPunch(){
			this.$emit('goPunch')
		}
	}
}
</script>

<style scoped>
.btn{
	margin-top:1rem;
	padding:0.5rem;
}
.data-content{
	background:#fff;
	height:1.2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top:1px solid #eee;
	margin-bottom: 0.2rem;
}
.accumulate-time{
	display: flex;
	flex-direction: column;
	width:100%;
	text-align: center;
	align-items: stretch;
	border-right:1px solid #eee;
	/*height:0.64rem;*/
	/*line-height: 0.64rem;*/
}
.accumulate-time > span{
	font-size:0.4rem;
	color:#F6363A;
	padding-bottom: 0.24rem;
}
.time-data{
	font-size:0.32rem;
	color:#5D5D5D;
}
.time-data > span{
	color:#F6363A;
}
.data-list{
	padding-bottom: 2rem;
}
.data-list>>> .mint-cell-wrapper{
	background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
}
.data-list>>>.mint-cell img{
	width:0.5rem;
	height:0.5rem;
}
.data-list>>>.van-button--primary{
	background-color: #428EF1;
    border: 1px solid #428EF1;
}
</style>