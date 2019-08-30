<template>
	<div class="worklist">
		<ul class="work-ul">
			<li class="work-li" @click="cheackWork(item)" v-for="(item,index) in list">
				<span>{{item.name}}</span>
				<!--<i v-if="isActive" class="iconfont iconiconfontcheck"></i>-->
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name :'workList',
	data(){
		return{
			list:[],
			isActive:true
		}
	},
	methods:{
		cheackWork(item){
			this.$nextTick(function(){
				this.list.forEach(item => {
					this.$set(item,'isActive',false)
				})
				this.$set(item,'isActive',true)
				this.$router.replace({
					name:'essentialInfo',
					path:'/essentialInfo',
					params:{workText:item.name,skillid:item.id}
				})
			})
		}
	},
	mounted(){
		this.$axios.get(domain.findBySkillList).then((res)=>{
			console.log(res)
			if(res.data.code == 1132){
			  	this.$router.push('/login')
			}
			if(res.data.ret == true){
				var data = res.data.data;
				this.list = data;
			}
		})
	}
}
</script>

<style>
.worklist{
	margin-top:40px;
}
.work-ul{
	padding:0 0.3rem;
	background:#fff;
}
.work-li{
	height:0.94rem;
	line-height: 0.94rem;
	display:flex;
	flex-direction: row;
	justify-content: space-between;
	border-bottom: 1px solid #eee;
}
.work-li > i{
	color:#5A9CF2;
}
</style>