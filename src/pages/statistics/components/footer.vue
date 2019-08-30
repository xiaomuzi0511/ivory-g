<template>
	<div class="footer">
		<div class="footer-cont">
			<div class="halt " @click="switchpath('/details/attendance')">
				<i class="iconfont icondingwei"></i>
				<p>打卡</p>
			</div>
			<div class="halt active" @click="switchpath('/details/statistics')">
				<i class="iconfont icontongji"></i>
				<p>统计</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:'statisticsFooter',
	props:['eomday'],
	data(){
		return{
			masterOrderTakingId:'',
			projectOrderNo:''
		}
	},
	methods:{
		switchpath(path){
			this.$router.push({path:path,query:{state:5,masterOrderTakingId:this.masterOrderTakingId,projectOrderNo:this.projectOrderNo}})
		}
	},
	watch:{
		eomday(val){
			console.log(val)
			for (var i of val){
				i.masterClockRecordList
				for(var j of i.masterClockRecordList){
					this.masterOrderTakingId = j.masterOrderTakingId;
					this.projectOrderNo = j.projectOrderNo;
				}
			}
		}
	}
}

</script>

<style scoped="scoped">
	.footer{
		position:fixed;
		width:100%;
		bottom:0;
		height:1rem;
		border-top:1px solid #eee;
		background:#fff;
	}
	.footer-cont{
		height:1rem;
		display: flex;
		justify-content: space-between;
		;
	}
	.halt{
		width:50%;
		height:1rem;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color:#999;
	}
	.active{
		color:#5A9CF2;
	}
</style>