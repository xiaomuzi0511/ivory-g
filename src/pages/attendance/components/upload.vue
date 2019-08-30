<template>
	<div>
		<div style="padding:20px;">
			<div class="show">
				<img :src="headerImage" class="headerImage" />
				<!--<div class="picture" :style="'backgroundImage:url('+headerImage+')'"></div>-->
			</div>
			<div style="margin-top:20px;">
				<input type="file" id="upload" accept="image/jpg" @change="upload">
				<label for="upload"></label>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'upload',
		data() {
			return {
				headerImage: '',
				picValue: '',
				headerImage:null,
				imgFile:''
			}
		},
		methods: {
			upload(e) {
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				this.picValue = files[0];
				this.imgPreview(this.picValue);
				console.log(this.picValue)
			},

			imgPreview(file) {
				let self = this;
				let Orientation;
				//去获取拍照时的信息，解决拍出来的照片旋转问题
//				Exif.getData(file, function() {
//					console.log(file)
//					Orientation = self.Exif.getTag(this, 'Orientation');
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
							self.headerImage = this.result;
//							self.postImg();
							console.log(this.result)
							self.acceptanceUploadImage(this.result)
						} else {
							img.onload = function(){
								let data = self.compress(img, Orientation);
								var imgFile = self.dataURLtoFile(data);
								self.acceptanceUploadImage(imgFile);
								
							}
							
							
						}
					}
				}
			},
			
			acceptanceUploadImage(image){
				console.log(image)
				var url = "/masterOrderTaking/acceptanceUploadImage"
				this.$axios.post(url,image)
				.then((res)=>{
					console.log(res)
					if(res.data.code == 1132){
			  			this.$router.push('/login')
			  		}
				})
			},
			dataURLtoFile(dataurl) {//将base64转换为文件
				var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		        while(n--){
		            u8arr[n] = bstr.charCodeAt(n);
		        }
		        return new File([u8arr], {type:mime});
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
				//        铺底色
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				//如果图片像素大于100万则使用瓦片绘制
				let count;
				if((count = width * height / 1000000) > 1) {
					console.log("超过100W像素");
					count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
					// 计算每块瓦片的宽和高
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

		},

	}
</script>

<style scoped="scoped">
	* {
		padding: 0;
		margin: 0;
	}
	.wrapper {
		width: 320px;
		height: 50px;
		margin: 20px auto;
		position: relative;
		border: 1px solid #f0f0f0;
	}
	input {
		width: 100px;
		height: 30px;
	}
	
	button {
		position: absolute;
		cursor: pointer;
		pointer-events: none;
		width: 100px;
		height: 30px;
		left: 0;
		top: 0;
	}
	
	a {
		pointer-events: none;
	}
	
	.img {
		border: 1px solid #ccc;
		padding: 10px;
	}
	.headerImage{
		width:100%;
		height:3rem;
	}
</style>