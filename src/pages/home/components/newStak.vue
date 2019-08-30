<template>
	<div>
		<div class="loding" v-if="lodingShow" >
		 	<van-loading type="spinner" />
		</div>
		<div v-else>
			<div v-if="taskList.length != 0">
				<div class="content" v-for='(item,index) in taskList' :key="item.id">
					<div class="task-content" @click="switchPage('/details',item.id,index)">
						<div class="typeofwork">
							<div>
								<div class="people-num" v-show="item.level != null">
									<span>{{item.level}}</span>元/小时
								</div>
							</div>
							<div class="state">
								<span v-if="item.orderStatus == 1">待接单</span>
								<span v-else-if='item.orderStatus == 2'>待施工</span>
								<span v-else-if='item.orderStatus == 3'>施工中</span>
								<span v-else-if=' item.orderStatus ==4'>待验收</span>
								<span v-else-if='item.orderStatus == 5'>已完成</span>
								<span v-else-if='item.orderStatus == 6'>已过期</span>
							</div>
						</div>
						<div class="itemdescription">
							<ul class="itemdescription-ul">
								<li class="itemdescription-li">
									<div>
										<span class="itemtitle">订单编号：</span>
										<span class="item-unit">{{item.projectOrderNo}}</span>
									</div>
								</li>
								<li class="itemdescription-li">
									<span class="itemtitle">工作类型：</span>
									<span class="item-unit">{{item.name}}</span>
								</li>
								<li class="itemdescription-li">
									<span class="itemtitle">开始施工时间：</span>
									<span class="item-unit">{{item.startTime}}</span>
								</li>
								<li class="itemdescription-li">
									<span class="itemtitle">结束施工时间：</span>
									<span class="item-unit">{{item.completionTime}}</span>
								</li>
								<!--<li class="remark">备注：施工时阿斯顿发顺丰安徽省的发髻是否健康</li>-->
							</ul>
						</div>
					</div>
					<div class="btn-div" v-if='item.orderStatus ==1'>
						<button class="vie-for" type="button"  @click='onorder'>接单</button>
					</div>
					<div class="btn-div" v-else-if='item.orderStatus ==3'>
						<button class="vie-for-card" type="button" @click="goattendance('/details/attendance',item.id,index)">打卡</button>
						<button class="vie-for" type="button" @click="switchPage('/details',item.id,index)" >验收</button>
					</div>
					<div class="btn-div" v-else-if='item.orderStatus ==4'>
						<button class="vie-for" type="button" @click="switchPage('/details',item.id,index)" >验收</button>
					</div>
					
				</div>
				<div v-if="hasMore">加载中...</div>
				<div v-else>我是有底线哒</div>
			</div>
			<div class="notask" v-else>
				<img src="../../../assets/image/notask.png" alt="" />
				<p>暂无订单</p>
			</div>
		</div>
	</div>
</template>

<script>
	
export default {
	name: 'newStak',
	props:['taskList','lodingShow'],
	data(){
		return{
			hasMore:false,
			//项目开始时间
			startTime:'', 
			//项目结束时间
			completionTime:'',
			//施工周期
			period:'',
			//订单号
			projectOrderNo:[],
			//列表ID
			id:[],
			//运营ID
			operatingId:[],
			//工人ID
			masterId:''
		}
	},
	mounted(){
		this.bus.$emit('hasMore',this.hasMore);
	},
	methods: {
		//点击跳转到详情页面
		switchPage(path,id,index) {
			domain.masterOrderTakingId = id;   //列表ID
			domain.projectOrderNo = this.projectOrderNo[index]; //订单号
			domain.masterId = this.masterId; //工人ID
			domain.operatingId = this.operatingId[index];//运营ID
			domain.projectOrderItemId = this.projectOrderItemId;
			this.$router.push({path:path,query:{projectOrderNo:this.projectOrderNo[index],id:id,operatingId:this.operatingId[index],masterId:this.masterId,projectOrderItemId:this.projectOrderItemId}});
		},
		//点击接单像父组件传递事件
		onorder(){
			this.$emit('onorder')	
		},
		//点击考勤打卡
		goattendance(path,id,index){
			domain.masterOrderTakingId = id;
			domain.projectOrderNo = this.projectOrderNo[index];
			domain.masterId = this.masterId;
			this.$router.push({path:path,query:{state:1,projectOrderNo:this.projectOrderNo[index],masterOrderTakingId:id}});
		},
		
	},
	watch:{
		taskList(val){
//			console.log(val);
			if(val.length != 0){
				//获取项目开始时间
				var oDate1 , oDate2 
				for (var i of val){
					//获取项目开始时间
					this.startTime = i.startTime;
					//获取项目结束时间
					this.completionTime = i.completionTime;
					//订单ID
					this.projectOrderNo.push(i.projectOrderNo);
					//列表id
					this.id.push(i.id);
					//运营ID
					this.operatingId.push(i.operatingId) 
					//工人id
					this.masterId = i.masterId
					//订单中项目ID
					this.projectOrderItemId = i.projectOrderItemId;
				}
				this.loading = false;
			}else{
				 this.finished = true;
			}
		}
	}
}
</script>

<style scoped>
	.loding{
		position:fixed;
		top:50%;
		left:50%;
		margin-left:-15px;
		margin-top:-15px;
	}
	.notask{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top:2rem;
		color:#666;
		font-size:0.28rem;
	}
	 .notask>img{
	 	width:2.74rem;
	 	height:2.74rem;
	 	margin-bottom: 0.2rem;
	 }
	.content{
		margin-top:0.2rem;
	}
	.task-content {
		background: #fff;
	}
	
	.typeofwork {
		padding: 0 0.3rem;
		height: 0.9rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 0.02rem solid #f5f5f5;
	}
	
	.people-num {
		color: #EE2727;
		font-size:0.28rem;
	}
	
	.people-num>span {
		font-size:0.44rem;
	}
	.state{
		color: #EE2727;
		font-size:0.36rem;
	}
	.itemdescription {
		padding: 0 0.3rem;
	}
	
	.itemdescription-li {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		/*height:0.7rem;*/
		padding: 0.18rem 0;
	}
	.itemtitle{
		font-size:0.36rem;
	}
	
	.item-unit {
		font-size:0.36rem;
	}
	
	.remark {
		display: block;
		background: #F2F2F2;
		padding: 0.16rem 0;
		line-height: 0.54rem;
		padding-left: 0.3rem;
		color: #666;
	}
	
	.btn-div {
		padding: 0.3rem;
		background: #fff;
		display: flex;
		justify-content: flex-end;
	}
	
	.vie-for {
		width: 1.9rem;
		height: 0.88rem;
		line-height: 0.88rem;
		background: linear-gradient(#63B2FB, #5386E9);
		color: #fff;
		border-radius: 0.1rem;
		font-size:0.36rem;
		border-width:0;
	}
	.vie-for-card{
		width: 1.9rem;
		height: 0.88rem;
		line-height: 0.88rem;
		background: linear-gradient(#fff, #fff);
		color: #000;
		border-radius: 0.1rem;
		border:1px solid #ccc;
		margin-right:0.2rem;
	}
	
</style>