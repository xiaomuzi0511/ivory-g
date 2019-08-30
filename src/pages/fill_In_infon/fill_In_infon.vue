<template>
	<div>
		<div class="homeHeader">
			<div class="header">
				<mt-header :title="title">
					<router-link to='/my/personalData' slot='left'>
						 <mt-button icon="back" ></mt-button>
						 
					</router-link>
					<p slot='right' @click="onsubmit(title)">提交</p>
				</mt-header>
			</div>
		</div>
		
		
		<div class="content">
			<div v-if="title == '用户名'">
				<van-cell-group>
					<van-field v-model="username" clearable label="" placeholder="请输入用户名" />
				</van-cell-group>
			</div>

			<div class="site" v-else-if="title == '我的地址'" >
				<van-cell-group @touchmove.prevent>
					<van-field type='text' label="所在地区" :value='district' placeholder="选择省/市/区" @click="showPickers" />
				</van-cell-group>
				
				<van-cell-group>
					<van-field type="text" v-model="message" label="详细地址"  placeholder="街道门牌、楼层房间号等信息" rows="1" autosize />
				</van-cell-group>
				
				<van-popup v-model="show" position="bottom">
					<van-area :area-list="areaList" @confirm="addconfirm" @cancel='addcancel' />
				</van-popup>
			</div>
		</div>
	</div>
</template>

<script>
import { Toast } from 'vant';
import addressInfo from '../../../static/area/area'
export default{
	name:'fill_In_infon',
	components:{
//		vheader
	},
	data(){
		return{
			title:'',
			username:'',
			referrername:'',
			refereephone:'',
			district:'',
			show: false,
			message:'',
			areaList:addressInfo
		}
	},
	methods:{
		showPickers() {
				document.activeElement.blur()
				this.show = true;
		},
				//确认
		addconfirm(e) {

			if(this.district != 0) {
				this.district = ''
				for(let i of e) {
					this.district += i.name + ' '
				};
				this.city = e[0].name + e[1].name;

			} else {
				for(let f of e) {
					this.district += f.name + ' '
				}
				this.city = e[0].name + e[1].name;
			}

			this.show = false;
		},
		//取消
		addcancel() {
			this.show = false;
		},
		//点击提交事件
		onsubmit(title){
			var userData = this.$cookies.get('userData');
			var id = userData.id;     //ID
			
			if(title == '用户名'){
				var name = this.username;   //姓名
				var number = 2;
				//调用提交接口
				this.updateMasterInfo(number,id,name,site);
			}else if(title == '我的地址'){
				var number = 6;
				var district = this.district;
				var message = this.message;
				//地区+详细地址
				var site = ''; 
				if(district == '' ){
					Toast('您还没有填写地址')
				}else{
					if(message != ''){
						site = district +','+message;
					}else{
						site = district
					}
				}
				this.updateMasterInfo(number,id,name,site);
				
			}
		},
		//调用提交接口
		updateMasterInfo(number,id,name,site){
//			if(name == undefined){
//				name = null
//			}
//			if(site == undefined){
//				site = null
//			}
			var obj= {};
			obj['number']=number;
			obj['id']=id;
			if(name != undefined){
				obj['name']=name;
			};
			if(site != undefined){
				obj['address'] = site;
			};
			obj = this.$qs.stringify(obj);
			console.log(obj)
			var url = domain.updateMasterInfo;
			
			this.$axios({
				url:url,
				method:'post',
				data:obj
			}).then((res)=>{
				console.log(res)
				if(res.data.code == 1132){
	  				this.$router.push('/login')
	  			};
	  			if(res.data.code == 1124){
	  				var _this = this;
	  				Toast('操作成功');
					setTimeout(function(){
						_this.$router.push('/my/personalData');
					},1000)
	  			}
				
			});
			
		}
		
		
		
		
		
	},
	mounted(){
		this.title = this.$route.query.name;
		
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
.homeHeader >>> .mint-header{
	background:#fff;
	color:#000;
	font-size:0.36rem;
	height:0.88rem;
}
.homeHeader >>>.iconxitongxiaoxi{
	font-size:0.44rem;
}
.info{
	color:#fff;
	background:#f00;
	font-size:0.24rem;
	width:0.3rem;
	height:0.3rem;
	line-height: 0.3rem;
	display: inline-block;
	border-radius: 50%;
	text-align: center;
	position:absolute;
	right:-25%;
	top:-40%;
}
.header >>> a{
	position:relative;
}
.content{
	margin-top:0.88rem;
}
.content>>>.van-field__label{
	width:0px;
}
.site >>> .van-field__label{
	width:90px;
}
	
</style>