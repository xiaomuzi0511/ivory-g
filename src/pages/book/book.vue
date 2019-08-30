<template>
	<div>
		<div class="homeHeader">
			<van-search placeholder="请输入搜索关键词" v-model="search_terms" />
		</div>
		<div class="content">
			<div>
				<van-cell title="上级管理员(20)" is-link @click="gobookList('/book/bookList',1)" />
				<van-cell title="下级管理员(20)" is-link @click="gobookList('/book/bookList',2)" />
				<van-cell title="我的团队" is-link @click="gobookList('/book/bookmyteam',3)" />
			</div>
			<div class="lately">
				<ul class="lately-ul">
					<li class="lately-title">最近联系</li>
					<li>
						<div class="rank">工人</div>
						<div class="lately-li">
							<img src="../../assets/image/await-time.png" alt="" />
							<div class="name-phone">
								<span>杨晓</span>
								<i class="iconfont icondianhua"></i>
							</div>
						</div>
						<div class="lately-li">
							<img src="../../assets/image/await-time.png" alt="" />
							<div class="name-phone">
								<span>杨晓</span>
								<i class="iconfont icondianhua"></i>
							</div>
						</div>
						<div class="lately-li">
							<img src="../../assets/image/await-time.png" alt="" />
							<div class="name-phone">
								<span>杨晓</span>
								<i class="iconfont icondianhua"></i>
							</div>
						</div>
					</li>
					
					<li style="margin-top:0.2rem;">
						<div class="rank">上级</div>
						<div class="lately-li">
							<img src="../../assets/image/await-time.png" alt="" />
							<div class="name-phone">
								<span>杨晓</span>
								<i class="iconfont icondianhua"></i>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<tabbar></tabbar>
	</div>
</template>

<script>
	import tabbar from '../public/tabbar'
	export default{
		name:'book',
		components:{
			tabbar
		},
		data(){
			return{
				search_terms:''
			}
		},
		methods:{
			gobookList(path,num){
				this.$router.push({path:path,query:{num:num}});
			}
		}
	}
</script>

<style scoped="scoped">
	.homeHeader{
		width:100%;
		position: fixed;
		top:0;
		left:0;
		z-index: 100;
	}
	.homeHeader >>> .van-search__content{
		border-radius: 1rem;
	}
	.content{
		margin-top:1.28rem;
	}
	.lately{
		margin-top:0.2rem;
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
	.lately-title{
		background:#fff;
		padding:0.2rem 0.3rem;
		font-size:0.36rem;
	}
	.rank{
		color:#666;
		padding:0.12rem 0.3rem;
		background:#fff;
	}
	.content >>>.van-cell__title{
		font-size:0.32rem;
	}
</style>