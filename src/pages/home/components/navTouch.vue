<template>
	 <div class="tabZujian">
		    <van-tabs v-model="active" sticky @click='checktab'>
			  <van-tab v-for="index in navList" :title="index.text" :key='index.id'>
		         	<hint-bar v-if="realnameCheck == '0'"></hint-bar>
		         	<new-stak :lodingShow='lodingShow' v-else-if='realnameCheck == 1 || realnameCheck == 2' :taskList='taskList' @onorder='onorder'></new-stak>
			 		
			  </van-tab>
			</van-tabs>
	</div>
</template>
<script>
import newStak from '@/pages/home/components/newStak'
import hintBar from '@/pages/home/components/hintBar'
export default{
	name:'navTouch',
	props:['realnameCheck','taskList','tabActive','lodingShow'],
	components:{
        newStak,
        hintBar
    },
    data() {
        return {
        	userData:'',
        	userinfo:'',
        	page:'1',
        	size:'10',                         
            //默认第一个选项卡
            activeName: "first",
            show:false,
            active:Number(domain.tabactive),	// tab状态
			navList:[{
				id:0,
				text:'待接单'
			},
			{	
				id:1,
				text:'待施工'
			},
			{	
				id:2,
				text:'施工中'
			},
			{
				id:3,
				text:'已完成'
			}]
        }
    },
	created (){ 
		if(this.$route.query.name == "third"){
			this.activeName = this.$route.query.name;
		}
		this.userData = this.$cookies.get('userData')
	},
	methods:{

	  	checktab(){
	  		this.$emit('checkTab',this.active);
	  		
	  	},
	  	onorder(){
	  		this.$emit('onorderchange')
	  	},
	},
	watch:{
		tabActive(val){
			this.active = Number(domain.tabactive)
			
		}
		
		
	}
}
</script>
<style scoped>

 .tabZujian{
 	margin-top:1rem;
 	padding-bottom: 2rem;
 }
 .tabZujian >>>.van-tabs__line{
 	background-color:#428EF1;
 }
 .tabZujian >>>.van-tab--active{
 	color:#428EF1;
 }
 .tabZujian >>>.van-tab{
 	font-size:0.32rem;
 }
  .tabZujian >>>[class*=van-hairline]::after{
  	border: 0 solid #fff;
  }

</style>