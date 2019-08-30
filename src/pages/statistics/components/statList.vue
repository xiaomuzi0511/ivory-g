<template>
	<div>
		
		<van-collapse v-model="activeName" accordion v-for="(item,index) in data" :key='index'>
		  <van-collapse-item :title="item.clockinDate" :name="index+1">
	  		<ul>
				<li v-for="(i,ind) in item.masterClockRecordList" :key="ind">
					<div class="clock-time">打卡时间：{{i.clockInsTime}} <span v-if="ind%2 == 0">(上班打卡)</span><span v-if="ind%2 != 0">(下班打卡)</span> <div class="place"><van-icon name="location-o" />{{i.place}}</div></div>
				</li>
			</ul>
		  </van-collapse-item>
		</van-collapse>

	</div>
</template>

<script>
export default {
	name: 'statList',
	props:['eomday'],
	data() {
		return {
			activeName: '1',
			data:[]
		}
	},
	watch:{
		eomday(val){
			this.data = val
		}
	}
}
</script>

<style scoped>
ul{
  margin-top:0;
  margin-bottom:0;
  transition: all ease 1s;
}
li{
	/*height:0.88rem;*/
	/*line-height: 0.88rem;*/
	background:#f5f5f5;
	padding:0.2rem 0.3rem;
	border-bottom:1px solid #eee;
}
.title{
	height:0.88rem;
	line-height: 0.88rem;
	background:#fff;
	padding:0 0.3rem;
	display: flex;
	justify-content: space-between;
	border-bottom:1px solid #eee;
}
.title > i{
	color:#999;
	font-size:0.28rem;
}
.clock-time{
	font-weight: 600;
}
.place{
	margin-top:0.2rem;
}
.place > i{
	margin-right:0.1rem;
	font-weight: 600;
}
</style>