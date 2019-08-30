<template>
	<div class="user-info">
		<img v-if="headshow" class="user-touxiang" :src="headPic" />
		<img v-else class="user-touxiang" src="../../../assets/image/moren-touxiang.png"  />
		<div class="info" v-show="isShow" @click="goEssentialInfo" >
			<div class="user-name">
				<div class="name">{{name}}</div>
				<div class="level">
					<img src="../../../assets/image/xingxing.png" alt="" />
					<p>LV{{level}}</p>
				</div>
			</div>
			<i class="iconfont icondaohanglanzhongdefanhuijianpx"></i>
		</div>
		<div class="essential"  v-show="certification_isShow" @click="goCertification" >
			<p class="name">{{name}}</p>
			<p class="certification">基本信息</p>
		</div>
	</div>
</template>
<script>
import { Toast } from 'vant';
export default {
	name: 'userInfo',
	props:['information'],
	data(){
		return{
			name:'',
			headPic:'',
			headshow:false,
			level:'',
			isShow:false,
			certification_isShow:false
		}
	},
	methods:{
		//点击去基本信息页
		goCertification(){
			this.$router.push({path:'/essentialInfo',query:{state:1}});
			
		},
		//点击去个人资料页
		goEssentialInfo(){
			this.$router.push('/my/personalData');
		}
	},
	watch:{
		information(val){
			//用户姓名
			if(!val.headPic == null || !val.headPic == ""){
				this.headshow = true;
			}else{
				this.headshow = false;
			}
			
			this.headPic = val.headPic;
			this.name = val.name;
			this.region = val.region;
			if(!this.region == "" || !this.region == null){
				this.isShow = true;
				this.certification_isShow = false;
				this.level = val.level;
			}else{
				this.isShow = false;
				this.certification_isShow = true;
			}

		}
	}
}
</script>

<style scoped>
.level{
	display: flex;
	justify-content:flex-start;
	align-items: center;
	background:#EDEFF2;
	border-radius: 0.2rem;
	width:1.2rem;
	color:#666666;
	margin-top:0.2rem;
}
.level > img{
	width:0.36rem;
	height:0.36rem;
}
.user-info{
	height:2.76rem;
	background:#fff;
	display:flex;
	justify-content: flex-start;
	flex-direction: row;
	align-items: center;
	padding:0 0.3rem;
	margin-top:0.88rem;
	
}
.user-touxiang{
	width:1.84rem;
	height:1.84rem;
	border-radius: 50%;
}
.name{
	font-size:0.4rem;
}
.info{
	display: flex;
	align-items: center;
	flex:1;
}
.user-name{
	flex:1;
	margin-left:0.3rem;
	display: flex;
	flex-direction: column;
}
.certification{
	background:#24B3EE;
	box-shadow: 0 0 0.1rem #24B3EE;
	width:1.7rem;
	text-align: center;
	color:#fff;
	height:0.6rem;
	line-height: 0.6rem;
	border-radius: 0.1rem;
	margin-top:0.2rem;
	
}
.user-info >>> .icondaohanglanzhongdefanhuijianpx{
	color:#B3B3B3;
}
.essential{
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	margin-left: 0.3rem;
}
</style>