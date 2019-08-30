<template>
	<div>
		<div class="head-comp">
			<mt-header fixed title="常见问题">
				<router-link to="/my/settingUp" slot="left">
				    <mt-button icon="back" ></mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="content">
			<van-collapse v-model="activeNames">
			  <van-collapse-item title="怎么打不了卡？" name="1">
			  	<div>内容</div>
			  </van-collapse-item>
			  <van-collapse-item title="怎么体现？" name="2">
			  	<div>
			  		当您的钱包金额大于可提现的金额时 ，才能点击提现
			  	</div>
			  </van-collapse-item>
			</van-collapse>
		</div>
	</div>
</template>

<script>
export default{
	name:'familiarIssue',
	data(){
		return{
			activeNames:[]
		}
	},
	methods:{

	}
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
	border-bottom: 0.02rem solid #F5F5F5;
}
.content{
	margin-top:1.08rem;
}
</style>