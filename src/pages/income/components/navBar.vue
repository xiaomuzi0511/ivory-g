<template>
	<div class="navbar">
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">全部</mt-tab-item>
		  <mt-tab-item id="2">待审核</mt-tab-item>
		  <mt-tab-item id="3">已通过</mt-tab-item>
		  <mt-tab-item id="4">已拒绝</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		    <!--<mt-cell v-for="n in 10" :title="'内容 ' + n" />-->
		    <ul class="detail-list">
		    	<li class="detail-li">
		    		<div class="detail-id">
		    			<p>ID:0124</p>
		    			<p>-3000</p>
		    		</div>
		    		<div class="detail-content">
		    			<div class="content-text">
		    				<p>提现-工商银行</p>
		    				<p>收款人:王麻子</p>
		    			</div>
		    			<div>
		    				<p class="date">2019-10 15:30:30</p>
		    				<p class="state">提现成功</p>
		    			</div>
		    		</div>
		    	</li>
		    	<li class="detail-li">
		    		<div class="detail-id">
		    			<p>ID:0124</p>
		    			<p>-3000</p>
		    		</div>
		    		<div class="detail-content">
		    			<div class="content-text">
		    				<p>提现-工商银行</p>
		    				<p>收款人:王麻子</p>
		    			</div>
		    			<div>
		    				<p class="date">2019-10 15:30:30</p>
		    				<p class="state">提现成功</p>
		    			</div>
		    		</div>
		    	</li>
		    </ul>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		    <!--<mt-cell v-for="n in 4" :title="'测试 ' + n" />-->
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		    <!--<mt-cell v-for="n in 6" :title="'选项 ' + n" />-->
		  </mt-tab-container-item>
		</mt-tab-container>
		<mt-tab-container-item id="4">
		    <!--<mt-cell v-for="n in 6" :title="'选项 ' + n" />-->
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
export default{
	name:'navBar',
	data(){
		return{
			selected:'1'
		}
	}
}
</script>

<style scoped="scoped">
	.navbar >>> .mint-navbar .mint-tab-item.is-selected{
		margin-bottom:0;
	}
	.detail-li{
		display: flex;
		flex-direction: column;
		margin-bottom: 0.1rem;
		background:#fff;
	}
	.detail-id{
		display: flex;
		justify-content: space-between;
		border-bottom:0.02rem solid #f5f5f5;
		padding:0.2rem 0.3rem;
	}
	.detail-id> p:first-child{
		color:#428EF1;
		font-size:0.32rem;
	}
	.detail-id> p:last-child{
		font-weight: 600;
		font-size:0.32rem;
	}
	.detail-content{
		display: flex;
		justify-content:space-between;
		padding:0.2rem 0.3rem;
	}
	.content-text{
		
		font-size:0.32rem;
	}
	.content-text > p:first-child{
		margin-bottom: 0.2rem;
	}
	.date{
		color:#999;
		font-size:0.24rem;
		margin-bottom: 0.2rem;
	}
	.state{
		color:#428EF1;
		text-align: right;
		font-size:0.28rem;
		
	}
</style>