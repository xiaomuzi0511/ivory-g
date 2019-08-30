<template>
	<div>
		<v-header></v-header>
		<div class="upload-content">
			<p class="content-title">点击上传您的身份证</p>
			<div class="photograph">
				<img v-if="headerImage != ''" class="front" :src="headerImage"  />
				<div v-else>
					<img class="front"  src="../../assets/image/front.png" />
					<div class="camera" >
						<img class="camera-icon" src="../../assets/image/camera-icon.png" />
						<p>点击拍摄/上传</p>
					</div>
				</div>
				<input class="uplod_input" type="file" name="cover" accept="image/*" capture="camera" multiple @change="upload($event,1)" />
			</div>

			<div class="photograph">
				<img v-if="headerImagetwo != ''" class="front"  :src="headerImagetwo" />
				<div v-else>
					<img class="front" src="../../assets/image/front.png" />
					<div class="camera" >
						<img class="camera-icon" src="../../assets/image/camera-icon.png"  />
						<p>点击拍摄/上传</p>
					</div>
				</div>
				<input class="uplod_input" type="file" name="cover" accept="image/*" capture="camera" multiple @change="uploadside($event,2)" />
			</div>
			<div class="idCard">
				 <van-field v-model="idCard" clearable label="身份证" placeholder="请输入身份证号" />
			</div>
		</div>
		<div class="btn">
			<van-button type="primary"  size="large" @click="onsubmit">提交</van-button>
			<p class="hint">仅用于身份验证，不会泄漏您的个人信息请放心上传</p>
		</div>
	</div>
</template>

<script>
import { Toast } from 'vant';
import vHeader from './components/header'
	export default {
		name: 'authentication',
		components: {
			vHeader
		},
		data() {
			return {
				idCard:'',
				headerImage: '',
				headerImagetwo: '',
				image:''
			}
		},
		methods: {
			//正面图片
			upload(e, one) {
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				this.picValue = files[0];
				this.imgPreview(this.picValue, one);
			},
			//反面图片
			uploadside(e, two) {
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				this.picValue = files[0];
				this.imgPreview(this.picValue, two);
			},
			imgPreview(file, distinction) {
				let self = this;
				let Orientation;
				//去获取拍照时的信息，解决拍出来的照片旋转问题
				//				EXIF.getData(file, function() {
				//					Orientation = EXIF.getTag(this, 'Orientation');
				//				});
				// 看支持不支持FileReader 
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
								self.isheaderImage = false;
								self.headerImage = this.result;
							};
							if(distinction == 2) {
								self.isheaderImagetwo = false;
								self.headerImagetwo = this.result;
							};
						} else {
							img.onload = function() {
								let data = self.compress(img, Orientation);
								if(distinction == 1) {
									self.isheaderImage = false;
									self.headerImage = data;
									
								};
								if(distinction == 2) {
									self.isheaderImagetwo = false;
									self.headerImagetwo = data;
								};
							}
						}
					}
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
				console.log('压缩前：' + initSize);
				console.log('压缩后：' + ndata.length);
				console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
				tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
				return ndata;
			},
			
			//点击提交接口
			onsubmit(){
				var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				
				if(this.idCard == ''){
					Toast('请输入身份证')
				}else if(this.headerImage ==''){
					Toast('请上传身份证正面照')
				}else if(this.headerImagetwo == ''){
					Toast('请上传身份证反面照')
				}else if(!idcardReg.test(this.idCard)){
					Toast('您输入的身份证号不正确！')
				}else{
					
					var userData = this.$cookies.get('userData');
					var id = userData.id;
					var number = 1;
					var url = domain.updateMasterInfo;
					var headerImage = this.headerImage.split(',')[1];
					var headerImagetwo = this.headerImagetwo.split(',')[1];
//					this.image.push(headerImage);
//					this.image.push(headerImagetwo);
					this.image = headerImage +','+headerImagetwo;
					console.log
					var obj= {};
					obj['number']=number;
					obj['id']=id;
					obj['idCard']=this.idCard;
					obj['cardImage'] = this.image;
					console.log(this.image)
					obj = this.$qs.stringify(obj);
					console.log(obj)
					this.$axios({
						url:url,
						method:'post',
						data:obj
					}).then((res)=>{
						console.log(res)
						if(res.data.code == 1132){
			  				this.$router.push('/login')
			  			};
						if(res.data.code == 1126){
							Toast('已认证，不能重新认证');
						};
						if(res.data.code == 1124){
							Toast('操作成功');
							setTimeout(function(){
								this.$router.push('/my/personalData');
							},1500)
							
						};
					})
					
				}

				
			}
		}
	}
</script>

<style scoped="scoped">
	.idCard{
		margin-top:0.6rem;
	}
	.homeHeader {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}
	
	.homeHeader>>>.mint-header {
		background: #fff;
		color: #000;
		font-size: 0.36rem;
		height: 0.88rem;
		border-bottom: 0.02rem solid #F5F5F5;
	}
	
	.upload-content {
		margin-top: 0.88rem;
	}
	
	.content-title {
		text-align: center;
		font-size: 0.36rem;
		padding-top: 0.8rem;
	}
	
	.photograph {
		width: 4.1rem;
		height: 2.56rem;
		margin: 0 auto;
		margin-top: 0.4rem;
		position: relative;
	}
	
	.front {
		width: 100%;
		height: 100%;
	}
	
	.camera {
		width: 100%;
		height: 100%;
		text-align: center;
		margin-top: -50%;
	}
	
	.camera-icon {
		width: 1rem;
		height: 1rem;
	}
	
	.uplod_input {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
	}
	
	.btn {
		text-align: center;
		position: fixed;
		bottom: 1rem;
		width: 100%;
	}
	
	.btn >>>.van-button--primary {
		background-color: #428EF1;
		border: 1px solid #428EF1;
		width: 90%;
		margin: 0 auto;
	}
	
	.hint {
		color: #999;
		margin-top: 0.4rem;
	}
</style>