<template>
	<div>
		<div class="head-comp">
			<mt-header fixed :title="title">
				<router-link to="/book" slot="left">
				    <mt-button icon="back" ></mt-button>
				</router-link>
			</mt-header>
		</div>
		
		<div>
			<div class="lately" v-if="isContent">
				<ul class="lately-ul">
					<li @click="goPersonal">
						<div class="lately-li">
							<img src="../../assets/image/await-time.png" alt="" />
							<div class="name-phone">
								<!--<span>杨晓</span>-->
								<div>
									<span class="lately-name">杨晓</span>
									<span class="lately-rank">一星班长</span>
								</div>
								<i class="iconfont icondianhua"></i>
							</div>
						</div>
					</li>
					<li>
						<div class="lately-li">
							<img src="../../assets/image/await-time.png" alt="" />
							<div class="name-phone">
								<!--<span>杨晓</span>-->
								<div>
									<span class="lately-name">杨晓</span>
									<span class="lately-rank">一星班长</span>
								</div>
								<i class="iconfont icondianhua"></i>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div v-else class='empty'>
				<img src="../../assets/image/await.png" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:'bookList',
	data(){
		return{
			num:'',
			title:'',
			isContent:true      
		}
	},
	mounted(){
		this.num = this.$route.query.num;
		if(this.num == 1){
			this.title = '上级管理员'
		}else if(this.num == 2){
			this.title = '下级管理员'
		}else if(this.num == 3){
			this.title = '我的团队'
		}
		
	},
	methods:{
		goPersonal(){
			this.$router.push({path:'/book/bookList/bookPersonal'})
		}
	}
}
</script>

<style scoped>
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
.empty {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top:2.48rem;
}
.empty > img{
	width:2.68rem;
	height:2.68rem;
}
.lately{
	margin-top:1.08rem;
}
.lately-li{
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	align-items: center;
	background:#fff;
	padding:0 0.3rem;
	height:1.3rem;
}
.name-phone{
	flex:1;
	display: flex;
	justify-content: space-between;
	margin-left:0.3rem;
	font-size:0.36rem;
	height:1.3rem;
	line-height: 1.3rem;
	border-bottom:1px solid #f5f5f5;
}
.name-phone >i{
	color:#428EF1;
}
.lately-name{
	font-size:0.36rem;
}
.lately-rank{
	border:1px solid #428EF1;
	color:#428EF1;
	padding:0.05rem;
	border-radius: 0.1rem;
	font-size: 0.24rem;
}
</style>