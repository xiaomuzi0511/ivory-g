<template>
	<div class="time-contents">
		<div class="datetiem" @click="getallTime(time)">
			{{time}}
			<i class="iconfont iconxiangxiajiantou1"></i>
		</div>
		
	  <mt-datetime-picker
	    ref="picker"
	    lockScroll="true"
	    type="date"
	    :end-date="endDate"
	    v-model="dateVal"
  		month-format="{value} 月"
  		@confirm="handleConfirm">
	  </mt-datetime-picker>
	</div>
</template>

<script>
import { DatetimePicker } from 'mint-ui';
import { Toast } from 'vant';
export default {
	name :'datetime',
	data(){
		return{
			time:'',
			dateVal:'',
			endDate:new Date(),
			eomday:[],
			average:''
		}
	},
	methods:{
		getTime(){
			let date = new Date;
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			month = month+''
			if(month.length <= 1){
				month='0'+ month
	  		}
			
			this.time = year +'-'+ month;
			this.getMonthTotalHour(this.time)
			
		},
		getallTime(time){
			
			if(this.time){
				this.detaVal = this.time
			}else{
				this.dateVal = new Date()
			}
			this.$refs.picker.open()
			this.$data.endDate = new Date;
			let a = document.getElementsByClassName('picker-slot');
			for(let i = 0; a &&i < a.length;i++){
				if(i == 2){
					a[i].style.display = 'none'
				}
			}
			
		},
		handleConfirm(value){
			let year = value.getFullYear();
	  		let month = value.getMonth() + 1;
	  		
	  		month = month+''
	  		if(month.length <= 1){
	  			month='0'+ month
	  		}
	  		this.time = year +'-'+ month;
	  		this.getMonthTotalHour(this.time)
	  		
		},
		changeDate(dateA) {
			var dateJSON = new Date(dateA).toJSON();
			var date = new Date(+new Date(dateJSON)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
			return date.substr(0,16);
		},
		
		//工人本月累计工时接口
		getMonthTotalHour(time){
			var userData = this.$cookies.get('userData')
			var id = userData.id+''
			var url = domain.getMonthTotalHour+"?clockinDate="+time +"&masterId="+id
			this.$axios.get(url)
			.then((res)=>{
				console.log(res)
				if(res.data.code == 1132){
			  		this.$router.push('/login')
			  	}
				if(res.data.code == 1119){
					this.average = res.data.data;
					
					this.$emit("onaverage",res.data.data)
					
					this.findByMonthClockinRecord(id,time)
				}
			})
			
		},
		//选择月份，根据月份查询当月打卡记录接口
		findByMonthClockinRecord(masterId,clockinDate){
			var url =domain.findByMonthClockinRecord+ "?masterId="+masterId+"&clockinDate="+clockinDate
			this.$axios.get(url)
			.then((res)=>{
				console.log(res)
				if(res.data.code == 1132){
			  		this.$router.push('/login')
			  	}
				this.eomday = res.data.data;
				this.$emit("oneomday" , this.eomday)
			})

		}
		
	},
	mounted(){
		this.getTime();
		
	}
}
</script>

<style>
.time-contents{
	/*margin-top:40px;*/
	/*padding-bottom: 1rem;*/
	background:#fff;
	margin-bottom:0.2rem;
}
.datetiem{
	height:1rem;
	line-height: 1rem;
	padding:0 0.3rem;
	color:#333;
}
.datetiem >.iconxiangxiajiantou1{
	font-size:0.28rem;
	color:#ccc;
	margin-left:0.2rem ;
}
</style>