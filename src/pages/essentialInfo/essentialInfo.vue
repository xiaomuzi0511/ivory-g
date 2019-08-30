<template>
	<div>
		<info-header :state='state'></info-header>
		<div class="input-info">
			<van-cell-group>
				<van-field v-model="username" clearable label="用户名" placeholder="请输入用户名" />
			</van-cell-group>
			<!--选择技能-->
			<div class="mint-field mint-cell">
				<router-link :to="{path:'/certification/worktype',query:{name:third}}" class="mint-cell-wrapper">
					<span class="mint-cell-title">选择技能</span>
					<span v-if="parentMag" class="val">{{parentMag}}</span>
					<span v-else class="placeholder">请选择技能</span>
					<i class="van-icon van-icon-arrow van-cell__right-icon"></i>
				</router-link>
			</div>
			<!--选择技能-->
			<van-cell-group @touchmove.prevent>
				<van-field type='text' is-link label="所在地区" :value='district' placeholder="选择省/市/区" @click="showPickers" />
			</van-cell-group>
			<van-popup v-model="show" position="bottom">
				<van-area :area-list="areaList" @confirm="addconfirm" @cancel='addcancel' />
			</van-popup>
			<!--推荐人-->
			<div style="margin-top:0.2rem;">
				<van-cell-group>
					<van-field v-model="referrername" clearable label="推荐人" placeholder="请填写推荐人姓名" @click-right-icon="$toast('question')" />
				</van-cell-group>
				<van-cell-group>
					<van-field v-model="refereephone" type="tel" label="手机号" placeholder="请填写推荐人手机号" clearable />
				</van-cell-group>
			</div>
			<!--推荐人-->
		</div>	
		<div class="button">
			<mt-button type="primary" size="large" @click="goCertification">提交</mt-button>
		</div>
	</div>
</template>

<script>
import infoHeader from './components/header'
import addressInfo from '../../../static/area/area'
import { Toast } from 'vant';
export default{
	name:'essentialInfo',
	components:{
		infoHeader
	},
	data(){
		return{
			state:'',
			username:'',             //用户姓名
			third: '选择技能',       
			parentMag:'',           //技能值
			district:'',
			actionshow:false,
			show:false,
			areaList: addressInfo,
			referrername: '',        //推荐人姓名
			refereephone: '',        //双向绑定手机号码
		}
	},
	activated(){
		this.parentMag = this.$route.params.workText;
		this.skillid = this.$route.params.skillid;
		this.state = this.$route.query.state;
	},
	methods:{
		showPickers() {
			document.activeElement.blur()
			this.show = true;
		},
		
		//选择地址确认
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
				};
				

				this.show = false;
			},
		//选择地址确认
		addcancel() {
			this.show = false;
		},
		//点击提交按钮
		goCertification() {
			var id = this.$cookies.get('userData').id;
			var reg = /^1[3456789]\d{9}$/;
			if(!reg.test(this.refereephone) && this.district == ''){
				Toast('请填写正确的手机号码');
			};
			if(this.username == ''|| this.username == null){
				Toast('请填写真实姓名');
			}else if(this.parentMag == ''|| this.parentMag == null){
				Toast('请选择技能');
			}else if(this.district == '' ||this.district == null){
				Toast('请选择省/市/区');
			}else{
				if(this.referrername == ''){
					this.referrername = null
				};
				if(this.refereephone == ''){
					this.refereephone = null
				};
				var address = this.district.split(' ')[0] + this.district.split(' ')[1];

				var obj = {};
				obj['id'] = id;
				obj['name'] = this.username;   		           //用户姓名
				obj['skillId'] = this.skillid;                 //技能ID
				obj['address'] = this.district;      		   //省/市/区
				obj['refereeName'] = this.referrername;        //推荐人
				obj['refereePhone'] = this.refereephone;       //手机号码
				obj['region'] = address;                 	   //省、市
				console.log(obj)
				this.$axios({
					method: 'post',
					url: domain.realnameCheck,
					data: this.$qs.stringify(obj)
				}).then((res) => {
					console.log(res)
					if(res.data.code == 1132){
		  				this.$router.push('/login')
		  		};
					if(res.data.code == 1119) {
						console.log(res)
						Toast.success({
						message:'提交成功...',
						duration:1500,
						})
						var _this = this;
						setTimeout(function(){
							_this.$router.push('/')
						},1500);
					};
				})
				
			}
			
			
			
			
		},
		
	}
}
</script>

<style scoped="scoped">
	.input-info{
		margin-top:0.88rem;
	}
	.placeholder {
		color: #999;
		width:90%;
	}
	.val{
		width:100%;
	}
	.mint-field .mint-cell-title{
		width:90px;
	}
	.input-info >>>.mint-cell-wrapper{
		padding: 0 15px;
		font-size:0.32rem;
		background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
	}
	.input-info >>>.van-cell{
		font-size:0.32rem;
	}
	.button {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #fff;
		padding:0.12rem 0;
	}
	.button >>>.mint-button--large{
		width:90%;
		margin: 0 auto;
	}
</style>