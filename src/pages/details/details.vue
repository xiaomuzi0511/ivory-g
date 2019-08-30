<template>
	<div>
		<detault-header></detault-header>
		<div class="content">
			<ul class="details-content">
				<li class="details-title">项目信息</li>
				<li class="details-li">
					<span class="details-type">项目信息：</span>
					<span class="details-right">{{masterOrderVo.name}}</span>
				</li>
				<li class="details-li">
					<span class="details-type">项目描述：</span>
					<span class="details-right">{{projectOrderVo.remark}}</span>
				</li>
				<li class="details-li">
					<span class="details-type">项目类型：</span>
					<span class="details-right" v-if="projectOrderItemVo != null">{{projectOrderItemVo.schemeName}}</span>
				</li>
				<li class="details-li">
					<span class="details-type">项目规格：</span>
					<span class="details-right" v-if="projectOrderItemVo != null">{{projectOrderItemVo.quantity}}{{projectOrderItemVo.unit}}</span>

				</li>
				<li class="details-li">
					<span class="details-type">项目时间：</span>
					<span class="details-right">{{masterOrderVo.startTime}}至{{masterOrderVo.completionTime}}</span>
				</li>
				<li class="details-li">
					<span class="details-type">项目地址：</span>
					<span class="details-right">{{projectOrderVo.address}}</span>
				</li>
				<li class="details-lastli">
					<span class="details-type">上传图片：</span>
					<div>
						<img class="user-uploading" v-for="(itemImg,index) in remarksImage" :src="itemImg" :key='index' @click="openImgPre(index,remarksImage)" />
					</div>
				</li>

			</ul>
			<!--信息-->
			<ul class="details-content">
				<li class="details-title">运营信息</li>
				<li class="details-li">
					<span class="details-type">名称：</span>
					<span class="details-right">{{operatingName}}</span>
				</li>
				<li class="details-li">
					<span class="details-type">手机号：</span>
					<span class="details-right">{{operatingPhone}}</span>
				</li>
			</ul>
			<!--信息-->
			<!--订单信息-->
			<ul class="details-content">
				<li class="details-title">订单信息</li>
				<li class="details-li">
					<span class="details-type">订单编号：</span>
					<span class="details-right">{{projectOrderVo.outTradeNo}}</span>
				</li>
			</ul>
			<!--订单信息-->
			<!--地址-->
			<!--<ul class="details-content" v-if="masterOrderVo.orderStatus == 1">
				<li class="hint">
					<span class="details-type">提示：</span>
					<span class="details-right">请于{{masterOrderVo.startTime}}到{{this.site}}</span>
				</li>
				<li>
					<router-link to='/details/tencentmap' class="map">
						<div id="container"></div>
					</router-link>
				</li>
			</ul>-->
			
			<!--地址-->
			<ul class="details-content check-list" v-if="masterOrderVo.orderStatus == 3" @click='goattendance'>
				<mt-cell title="考勤打卡" is-link></mt-cell>
			</ul>
			<!--上传图片-->
			<div class="uploading" v-if="masterOrderVo.orderStatus == 4 ||masterOrderVo.orderStatus == 3">
				<div class="details-title">竣工图片
					<div class="img-hint">（完工后的图片，最少2张，最多5张）</div>
				</div>
				<div class="up_img">
					<div class="idcard_img" v-if="bg_show" v-for="(items,ind) in headerImage">
						<div class="showidCard"  :style="'backgroundImage:url('+items+')'" @click="openImgPre3(ind,headerImage)"></div>
					</div>
					<div class="upinput" v-if="input_show">
						<input class="uplod_input" type="file" name="cover" accept="image/*" capture="camera" multiple @change="upload($event,1)" />
						<!--<input type="file" id="upload" accept="image/jpg" @change="upload($event,1)">-->
						<span class="upload" v-show="isheaderImage == true">+</span>
					</div>
				</div>
				
			</div>
			<!--上传图片-->

			<!--展示图片-->
			<div class="uploading" v-if="masterOrderVo.orderStatus == 5">
				<div class="details-title">竣工图片
					<div class="img-hint">（完工后的图片，最少2张，最多5张）</div>
				</div>
				<div class="working-plan">
					<img :src="it" alt="" v-for="(it,ind) in drawing_img" @click="openImgPre2(ind,drawing_img)" />
				</div>
			</div>
			<!--展示图片-->
		</div>
		<div class="btn-div" v-if="masterOrderVo.orderStatus == 1 || masterOrderVo.orderStatus == 4 || masterOrderVo.orderStatus == 3">
			<button class="vie-for" type="button" v-if="masterOrderVo.orderStatus == 1" @click="onorder">接单</button>
			<button class="vie-for" type="button" v-if="masterOrderVo.orderStatus == 3 " @click='notarizeAccept'>确认完成</button>
			<button class="vie-for" type="button" v-if="masterOrderVo.orderStatus == 4 " @click='notarizeAccept'>确认完成</button>
		</div>
	</div>
</template>

<script>
	import { ImagePreview } from 'vant'
	import { Toast } from 'vant'
	import { Dialog } from 'vant';
	import detaultHeader from './components/header'
	import Exif from 'exif-js'  
	export default {
		name: "orderDetailss",
		components: {
			detaultHeader
		},
		data() {
			return {
				iDays:'',
				input_show:true,
				bg_show:false,
				cardImage: [],
				headerImage: [],
				isheaderImage: true,
				drawing_img: [],
				dataimg: '', //要上传的图片路径
				site: '',
				//订单信息
				masterOrderVo: {},
				//项目订单
				projectOrderVo: {},
				projectOrderItemVo: {},
				//备注图片
				remarksImage: [],
				fileList: [],
				operatingName: '',
				operatingPhone: '',
				id: '', //列表ID
				projectOrderNo: '', //订单号
				operatingId: '', //运营ID
				masterId: '', //工人ID
				projectOrderItemId: '' //订单中项目ID
			}
		},
		methods: {
			//地图
			init() {

				if(this.masterOrderVo.orderStatus == 1) {
					var geocoder = null;
					var center = new qq.maps.LatLng(39.916527, 116.397128);
					var map = new qq.maps.Map(document.getElementById('container'), {
						center: center,
						zoom: 20,
						draggable: false
					});

					geocoder = new qq.maps.Geocoder({
						complete: function(result) {
							map.setCenter(result.detail.location);
							var marker = new qq.maps.Marker({
								map: map,
								position: result.detail.location
							});
						}
					});
					this.site = this.projectOrderVo.address;
				}
			},
			//客户上传的图片放大事件
			openImgPre(index, urls) {
				ImagePreview({
					images: this.remarksImage
				});
			},
			//工人上传的图片放大事件
			openImgPre2(index, urls) {
				ImagePreview({
					images: this.drawing_img
				});
			},
			//竣工上传的图片放大事件
			openImgPre3(index,urls){
				ImagePreview({
					images: this.headerImage
				});
			},
			//订单详情接口
			masterOrderDetail(id, projectOrderNo, operatingId, masterId, projectOrderItemId){
			
				var url = domain.masterOrderDetail + "?id=" + id + "&projectOrderNo=" + projectOrderNo + "&operatingId=" + operatingId + "&masterId=" + masterId + "&projectOrderItemId=" + projectOrderItemId
				this.$axios.get(url,{
					timeout:6000
				}).then((res) => {
						console.log(res)
						if(res.data.code == 1132){
			  				this.$router.push('/login')
			  			}
						if(res.data.code == 1119) {
							//订单信息
							this.masterOrderVo = res.data.data.masterOrderVo;
							//项目订单
							this.projectOrderVo = res.data.data.projectOrderVo;

							this.projectOrderItemVo = res.data.data.projectOrderVo.projectOrderItemVo
							if(res.data.data.projectOrderVo.remarksImage != null){
								this.remarksImage = res.data.data.projectOrderVo.remarksImage.split(',')
							}
							//运营姓名
							this.operatingName = res.data.data.operatingName;
							//运营电话
							this.operatingPhone = res.data.data.operatingPhone;

							//工人上传的图片
							this.drawing_img = this.masterOrderVo.images;
							if(this.drawing_img != null) {
								this.drawing_img = this.drawing_img.split(',')
							}
							
							var date = new Date();
							var Year = date.getFullYear();
							var month = date .getMonth()+1;
							var dateto = date .getDate();
							var hour = date.getHours();
							var minute = date.getMinutes();
							var second = date.getSeconds();
							if(month.toString().length == 1){
								month = '0'+month
							};
							if(minute.toString().length == 1){
								minute='0'+minute
							}
							if(second.toString().length == 1){
								second='0'+second
							}
							var currentTime = Year+'/'+month+'/'+dateto+' '+ hour +':'+minute+':'+second; //当天时间
							var completionTime = this.masterOrderVo.completionTime;   //结束时间
							completionTime = completionTime.replace(/-/g,"/");
//							var data1 =  new  Date(currentTime.substring(4,6)  +  '-'  + currentTime.substring(6));	
							
//							var data2 =  new  Date(completionTime.substring(4,6)  +  '-'  + completionTime.substring(6)  +  '-'  +  completionTime.substring(0,4));
							var data1 = new Date(currentTime).getTime();
							var data2 = new Date(completionTime).getTime();
							this.iDays  =  parseInt(Math.abs(data2 - data1) / 1000 / 60 / 60 /24);

//								  				this.init();
						}
					})
			},
			//点击接单接口
			onorder() {
				var url = domain.masterAcceptance + "?id=" + this.id + "&projectOrderNo=" + this.projectOrderNo + "&operatingId=" + this.operatingId + "&masterId=" + this.masterId + "&projectOrderItemId=" + this.projectOrderItemId

				this.$axios.get(url)
					.then((res) => {
						console.log(res)
						if(res.data.code == 1132){
			  				this.$router.push('/login')
			  			};
						if(res.data.ret == true){
							this.masterOrderDetail(this.id, this.projectOrderNo, this.operatingId, this.masterId, this.projectOrderItemId)
						};
					})
			},
			//点击去考勤打卡
			goattendance() {
				var masterOrderTakingId = this.masterOrderVo.id; //工人订单列表ID
				var projectOrderNo = this.projectOrderVo.outTradeNo; //列表号
				var masterId = this.masterOrderVo.masterId;
				domain.masterOrderTakingId = masterOrderTakingId;
				domain.projectOrderNo = projectOrderNo;
				domain.masterId = masterId;
				//工人ID
				this.$router.push({path:'/details/attendance',query:{state:2,masterOrderTakingId:masterOrderTakingId,projectOrderNo:projectOrderNo}});

			},
			//点击验收接口
			notarizeAccept() {
				var _this = this;
				var obj ={};
				obj['id'] = _this.id;
				obj['projectOrderNo'] = _this.projectOrderNo;
				obj['operatingId'] = _this.operatingId;
				obj['masterId'] = _this.masterId;
				obj['images']=_this.cardImage.join(',');
				
//				console.log(this.iDays)
				if(this.iDays == 0){
					Dialog.confirm({
					  message: '该订单到今天结束，确认打卡之后将不能再打卡'
					}).then(() => {
						if(_this.cardImage.length >= 2) {
							var url = domain.masterOrderCheckTheAcceptance;
							_this.$axios({
								method: 'post',
								url: url,
								data: _this.$qs.stringify(obj),
								timeout:6000
							}).then(function(res) {
								console.log(res)
								if(res.data.code == 1132){
					  				_this.$router.push('/login')
					  			}
								if(res.data.code == 1124){
									_this.masterOrderDetail(_this.id, _this.projectOrderNo, _this.operatingId, _this.masterId, _this.projectOrderItemId);
								}
						})
					} else {
						Toast('请上传2张以上的图片');
					}
					
					}).catch(() => {
					  // on cancel
					});
				}else{
					Dialog.confirm({
					  message: '距离施工结束还有'+this.iDays+'天，确定要验收之后将不能再打卡'
					}).then(() => {
					
						if(_this.cardImage.length >= 2) {
							var url = domain.masterOrderCheckTheAcceptance;
							_this.$axios({
								method: 'post',
								url: url,
								data: _this.$qs.stringify(obj),
								timeout:6000
							}).then(function(res) {
								console.log(res)
								if(res.data.code == 1132){
					  				_this.$router.push('/login')
					  			}
								if(res.data.code == 1124){
									_this.masterOrderDetail(_this.id, _this.projectOrderNo, _this.operatingId, _this.masterId, _this.projectOrderItemId);
								}
						})
					} else {
						Toast('请上传2张以上的图片');
					}
					
					}).catch(() => {
					  // on cancel
					});
				
				}

			},
			after_read() {
				var _this = this;
				var images = _this.fileList
				var base64code = " "
				for(var i = 0; i < images.length; i++) {
					base64code += images[i].content.replace(/^data:image\/\w+;base64,/, '') + ',';
				}
				base64code = base64code.split(",");
				base64code = base64code.toString(base64code);
				base64code = base64code.substring(0, base64code.length - 1);
				var obj = {}
				obj['image'] = base64code;
				obj = this.$qs.stringify(obj)
				var url = domain.acceptanceUploadImage

			},
			upload(e, one) {
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				this.picValue = files[0];
				this.imgPreview(this.picValue, one);
			},

			imgPreview(file, distinction) {
			
				let self = this;
				let Orientation;
			//去获取拍照时的信息，解决拍出来的照片旋转问题  
			      Exif.getData(file, function(){  
			          Orientation = Exif.getTag(this, 'Orientation');  
			      });  
				if(!file || !window.FileReader) return;
				if(/^image/.test(file.type)) {
					// 创建一个reader
					let reader = new FileReader();
					// 将图片2将转成 base64 格式
					reader.readAsDataURL(file);
					// 读取成功后的回调
					reader.onloadend = function() {
						let result = this.result;
						let img = new Image();
						img.src = result;
						//判断图片是否大于100K,是就直接上传，反之压缩图片
						if(this.result.length <= (100 * 1024)) {
							if(distinction == 1) {
//								self.isheaderImage = false;
								self.bg_show = true;
								self.headerImage.push(this.result);
								var strImg =  this.result.split(',')[1];
								self.cardImage.push(strImg);
								if(self.headerImage.length >4){
									self.input_show = false;
								}

							}

						} else {
							img.onload = function() {
								let data = self.compress(img, Orientation);
								if(distinction == 1) {
//									self.isheaderImage = false;
									self.bg_show = true;
									var strImg =  data.split(',')[1];
									self.cardImage.push(strImg);
									self.headerImage.push(data);
									if(self.headerImage.length >4){
										
										self.input_show = false;
									}
								}

							}
						}
					}
				}
			},
			rotateImg(img, direction, canvas) {
				//最小与最大旋转方向，图片旋转4次后回到原方向
				const min_step = 0;
				const max_step = 3;
				if(img == null) return;
				//img的高度和宽度不能在img元素隐藏后获取，否则会出错
				let height = img.height;
				let width = img.width;
				let step = 2;
				if(step == null) {
					step = min_step;
				}
				if(direction == 'right') {
					step++;
					//旋转到原位置，即超过最大值
					step > max_step && (step = min_step);
				} else {
					step--;
					step < min_step && (step = max_step);
				}
				//旋转角度以弧度值为参数
				let degree = step * 90 * Math.PI / 180;
				let ctx = canvas.getContext('2d');
				switch(step) {
					case 0:
						canvas.width = width;
						canvas.height = height;
						ctx.drawImage(img, 0, 0);
						break;
					case 1:
						canvas.width = height;
						canvas.height = width;
						ctx.rotate(degree);
						ctx.drawImage(img, 0, -height);
						break;
					case 2:
						canvas.width = width;
						canvas.height = height;
						ctx.rotate(degree);
						ctx.drawImage(img, -width, -height);
						break;
					case 3:
						canvas.width = height;
						canvas.height = width;
						ctx.rotate(degree);
						ctx.drawImage(img, -width, 0);
						break;
				}
			},
			compress(img, Orientation) {
				let canvas = document.createElement("canvas");
				let ctx = canvas.getContext('2d');
				//瓦片canvas
				let tCanvas = document.createElement("canvas");
				let tctx = tCanvas.getContext("2d");
				let initSize = img.src.length;
				let width = img.width;
				let height = img.height;
				//如果图片大于四百万像素，计算压缩比并将大小压至400万以下
				let ratio;
				if((ratio = width * height / 4000000) > 1) {
					console.log("大于400万像素")
					ratio = Math.sqrt(ratio);
					width /= ratio;
					height /= ratio;
				} else {
					ratio = 1;
				}
				canvas.width = width;
				canvas.height = height;
				//    铺底色
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				//如果图片像素大于100万则使用瓦片绘制
				let count;
				if((count = width * height / 1000000) > 1) {
					console.log("超过100W像素");
					count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
					//      计算每块瓦片的宽和高
					let nw = ~~(width / count);
					let nh = ~~(height / count);
					tCanvas.width = nw;
					tCanvas.height = nh;
					for(let i = 0; i < count; i++) {
						for(let j = 0; j < count; j++) {
							tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
							ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
						}
					}
				} else {
					ctx.drawImage(img, 0, 0, width, height);
				}
				//修复ios上传图片的时候 被旋转的问题
				if(Orientation != "" && Orientation != 1) {
					switch(Orientation) {
						case 6: //需要顺时针（向左）90度旋转
							this.rotateImg(img, 'left', canvas);
							break;
						case 8: //需要逆时针（向右）90度旋转
							this.rotateImg(img, 'right', canvas);
							break;
						case 3: //需要180度旋转
							this.rotateImg(img, 'right', canvas); //转两次
							this.rotateImg(img, 'right', canvas);
							break;
					}
				}
				//进行最小压缩
				let ndata = canvas.toDataURL('image/jpeg', 0.1);
//				console.log('压缩前：' + initSize);
//				console.log('压缩后：' + ndata.length);
//				console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
				tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
				return ndata;
			},

		},
		mounted() {
			this.id=domain.masterOrderTakingId;  //列表ID
			this.projectOrderNo = domain.projectOrderNo;//订单号
			this.operatingId = domain.operatingId; //运营ID
			this.masterId = domain.masterId; //工人ID
			this.projectOrderItemId = domain.projectOrderItemId;//订单中项目ID
//			this.iDays = this.$route.query.iDays;
			//订单详情接口
			this.masterOrderDetail(this.id, this.projectOrderNo, this.operatingId, this.masterId, this.projectOrderItemId)
		},
	}
</script>
<style scoped>

	.up_img{
		display: flex;
		justify-content: flex-start;
		padding:0 0.3rem;
	}
	.idcard_img {
		width: 20%;
		overflow: hidden;
		/*border: 1px dashed #c0ccda;*/
		height: 119px;
		border-radius: 6px;
		position: relative;
		text-align: center;
	}
	.showidCard {
		width:100%;
		background-size: 100% 100%;
		height: 100%;
	}
	
	.idcard_img{
		width: 0.9rem;
	    height: 0.9rem;
	    padding: 0.12rem;
		display: flex;
		justify-content: flex-start;
		
	}
	.upinput {
		text-align: center;
		position:relative;
		overflow: hidden;
		border:1px dashed #ccc;
		width: 0.9rem;
	    height: 0.9rem;
	    line-height: 0.9rem;
	    margin: 0.12rem;
	}
	
	.upinput input {
		width:100%;
		height:100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
	}
	.upload {
		font-size: 1rem;
		color: #8c939d;
	}
	.working-plan:after {
		display: block;
		clear: both;
		content: '';
	}
	
	.working-plan {
		padding: 0 0.3rem;
	}
	
	.working-plan>img {
		width: 0.9rem;
		height: 0.9rem;
		padding: 0.12rem;
		float: left;
	}
	
	.img-hint {
		font-size: 0.24rem;
		display: inline;
	}
	
	.head-comp>>>.mint-header {
		background-color: #fff;
		color: #000;
		font-size: 0.36rem;
		height: 0.88rem;
	}
	
	.head-comp>>>.mint-header-title {
		font-size: 0.36rem;
	}
	
	.content {
		padding-top: 0.88rem;
		padding-bottom: 2rem;
	}
	
	.details-content {
		background: #fff;
		margin-top: 0.2rem;
	}
	
	.hint {
		background: #f5f5f5;
		padding: 0.38rem 0.3rem 0.2rem;
		text-align: center;
	}
	
	.details-title {
		padding: 0.24rem 0.3rem;
		font-size: 0.36rem;
		color: #000;
	}
	
	.details-li {
		padding: 0.15rem 0.3rem !important;
		display: flex;
		justify-content: flex-start;
		font-size: 0.32rem;
	}
	
	.details-lastli {
		padding: 0.15rem 0.3rem !important;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		font-size: 0.32rem;
	}
	
	.details-type {
		color: #666;
		font-size: 0.28rem;
		width: 25%;
	}
	
	.details-right {
		width: 78%;
		line-height: 0.4rem;
	}
	
	.project {
		height: 0.86rem;
		line-height: 0.86rem;
		font-size: 0.36rem;
		color: #000;
	}
	
	.project-content {
		display: flex;
		justify-content: space-between;
		padding-bottom: 0.42rem !important;
	}
	
	.porject-name {
		line-height: 0.38rem;
		color: #666;
		width: 70%;
	}
	
	.porject-money {
		margin-left: 0.5rem;
		display: flex;
		flex-direction: column;
		text-align: right;
	}
	
	.money {
		padding-top: 0.2rem;
		display: inline-block;
	}
	
	.userimg-li:after {
		display: block;
		content: '';
		clear: both;
	}
	
	.user-uploading {
		width: 0.9rem;
		height: 0.9rem;
		padding: 0.12rem;
		float: left;
	}
	
	.details-title {}
	
	.message {
		height: 0.88rem;
		line-height: 0.88rem;
		color: #666;
	}
	
	.btn-div {
		padding: 0.3rem;
		background: #fff;
		width: 100%;
		position: fixed;
		bottom: 0;
	}
	
	.vie-for {
		width: 90%;
		height: 0.88rem;
		line-height: 0.88rem;
		background: linear-gradient(#63B2FB, #5386E9);
		color: #fff;
		border-radius: 0.1rem;
	}
	
	#container {
		height: 3rem;
	}
	
	.map {
		width: 100%;
		height: 100%;
	}
	
	.check-list>>>.mint-cell:last-child {
		background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
	}
	
	.check-list>>>.mint-cell-wrapper {
		background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%);
	}
	
	.uploading {
		background: #fff;
		margin-top: 0.2rem;
		padding-bottom: 0.3rem;
	}
	
	.uploading>>>.van-uploader__upload {
		margin: 0;
		width: 61px;
		height: 61px;
	}
	
	.uploading>>>.van-uploader__preview:nth-of-type(5) {
		margin: 0 0 10px 0;
	}
	
	.uploading>>>.van-uploader__preview-image {
		width: 61px;
		height: 61px;
	}
	
	.uploading>>>.van-uploader {
		padding: 0 0.3rem;
	}

</style>