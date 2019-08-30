<template>
	<div class="address">
		<van-field
		  type='textarea'
		  readonly
		  clickable
		  label="所在地区"
		  :value='value'
		  placeholder="选择省/市/区"
		  @click="showPicker"
		/>
		<van-cell-group>
		  <van-field
		    v-model="message"
		    label="详细地址"
		    type="textarea"
		    placeholder="街道门牌、楼层房间号等信息"
		    rows="1"
		    autosize
		    @change="getaddr"
		  />
		</van-cell-group>
		<van-popup v-model="show"  position="bottom">
			<van-area :area-list="areaList"  @confirm="addconfirm" @cancel='addcancel' />
		</van-popup>

	</div>
</template>

<script>
	import addressInfo from '../../../../static/area/area'
	export default {
		name: "siteList",
		data() {
			return {
				value: '',  //地区值
				show: false,
				message:'',  //详细地址值
				areaList: addressInfo,
				}
		},
		methods:{
			showPicker() {
		      this.show = true;
		   	},
		   	//确认
		   	addconfirm(e){
		   		if(this.value != 0){
		   			this.value = ''
			   		for(let i of e){
			   			this.value += i.name+' '
			   		};
//			   		this.$emit('funOne',this.value)
		   		}else{
		   			for(let f of e){
		   				this.value += f.name+' '
		   			}
		   			this.$emit('funOne',this.value)
		   		}
		   		this.show = false;
		   },
		   //取消
			addcancel(){
			   	this.show = false;
			},
			getaddr(){
				this.$emit('funOne',this.message)
			}
		},
		
		}
	
</script>

<style scoped="scoped">
	.address {
		margin-top: 0.88rem;
	}
	.address>>>.van-picker{
		position:fixed;
		bottom:0;
		width:100%;
	}
	.address>>>.van-field--min-height .van-field__control{
		min-height: 0;
		height:24px;
	}
	.address>>>.van-popup--bottom{
		height:264px;
	}
	
</style>