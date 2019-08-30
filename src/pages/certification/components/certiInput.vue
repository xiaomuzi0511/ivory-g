<template>
	<div class="certi">
		<div class="certi-input">
			<div>
				<van-cell-group>
					<van-field v-model="username" required clearable label="用户名" placeholder="请输入用户名" />
				</van-cell-group>
				<van-cell-group>
					<van-field v-model="identity"  clearable label="身份证" placeholder="请填写身份证" />
				</van-cell-group>
				<!--性别-->
				<div class="mint-field mint-cell" @click="showPicker = true" :value="sex">
					<div class="mint-cell-wrapper">
						<span class="mint-cell-title">性别</span>
						<span v-if="iSsexplace" class="placeholder">请选择性别</span>
						<span class="val">{{sex}}</span>
						<i class="van-icon van-icon-arrow van-cell__right-icon"></i>
					</div>
				</div>
				<van-popup v-model="showPicker" position="bottom">
					<van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
				</van-popup>
				<!--性别-->
				<!--入行年限-->
				<div class="mint-field mint-cell" @click="openPicker()">
					<div class="mint-cell-wrapper ">
						<span class="mint-cell-title">入行年限</span>
						<span v-if="term" class="placeholder">请选择入行年限</span>
						<span v-model="pickerVul" class="val">{{pickerVul}}</span>
						<i class="van-icon van-icon-arrow van-cell__right-icon"></i>
					</div>
				</div>
				<!--入行年限弹窗-->
				<div @touchmove.prevent>
					<van-action-sheet
					  v-model="actionshow"
					  :actions="actions"
					  @select="onSelect"
					/>
				</div>
				<!--入行年限弹窗-->
				<!--入行年限-->
				<!--选择技能-->
				<div class="mint-field mint-cell">
					<router-link :to="{path:'/certification/worktype',query:{name:third}}" class="mint-cell-wrapper van-cell--required">
						<span class="mint-cell-title">选择技能</span>
						<span v-if="parentMag.work" class="val">{{parentMag.work}}</span>
						<span v-else class="placeholder">请选择技能</span>
						<i class="van-icon van-icon-arrow van-cell__right-icon"></i>
					</router-link>
				</div>
				<!--选择技能-->
				<!--联系地址-->

				<van-cell-group @touchmove.prevent>
					<van-field type='text' required is-link label="所在地区" :value='district' placeholder="选择省/市/区" @click="showPickers" />
				</van-cell-group>
				
				<van-cell-group>
					<van-field type="text" v-model="message" label="详细地址"  placeholder="街道门牌、楼层房间号等信息" rows="1" autosize />
				</van-cell-group>
								
				<van-popup v-model="show" position="bottom">
					<van-area :area-list="areaList" @confirm="addconfirm" @cancel='addcancel' />
				</van-popup>
				<!--联系地址-->
			</div>
			<!--推荐人信息-->
			<div class="marginT-10">
				<van-cell-group>
					<van-field v-model="referrername" clearable label="推荐人" placeholder="请填写推荐人姓名" @click-right-icon="$toast('question')" />
				</van-cell-group>
				<van-cell-group>
					<van-field v-model="refereephone" type="tel" label="手机号" placeholder="请填写推荐人手机号" clearable />
				</van-cell-group>
			</div>
			<!--身份证上传-->
			<div class="marginT-10 uploading ">
				<div class="idcard ">身份证照片</div>
				<div class="idcardImg">
					<div class="divImg">
						<div class="idcard_img">
							<div class="showidCard" :style="'backgroundImage:url('+headerImage+')'">
							</div>
							<div class="upinput">
								<input class="uplod_input" type="file" name="cover" accept="image/*" capture="camera" multiple @change="upload($event,1)"/>
								<span class="upload" v-show="isheaderImage == true">+</span>
							</div>
						</div>
						<div class="idcard_img">
							<div class="showidCard" :style="'backgroundImage:url('+headerImagetwo+')'">
							</div>
							<div class="upinput">
								<input class="uplod_input" type="file" name="cover" accept="image/*" capture="camera" multiple @change="upload($event,2)"/>
								<span class="upload" v-show="isheaderImagetwo == true">+</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--证件上传-->
			<div class="marginT-10">
				<div class="idcard">证书上传</div>
				<div class="divImg">
					<div class="idcard_img">
						<div class="showidCard" :style="'backgroundImage:url('+headerImagethree+')'">
						</div>
						<div class="upinput">
							<input class="uplod_input" type="file" name="cover" accept="image/*" capture="camera" multiple @change="upload($event,3)"/>
							<span class="upload" v-show="isheaderImagethree == true">+</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="button">
			<mt-button type="primary" size="large" @click="goCertification">申请认证</mt-button>
		</div>
	</div>

</template>

<script>
	import { Toast } from 'vant';
	import addressInfo from '../../../../static/area/area'
	export default {
		name: 'certiInput',
		props: ['parentMag'],
		data() {
			return {
				actionshow:false,
				actions:[],
				headerImage: '',
				headerImagetwo: '',
				headerImagethree:'',
				picValue: '',
				isheaderImage: true, //是否显示上传图片
				isheaderImagetwo: true,
				isheaderImagethree:true,
				certificate: '/upload/image', //证书接口
				hideUpload: false,
				hideUpload_to: false,
				limit: 2, //element上传身份证几张图片
				limit_to: 1, //element上传证件照几张图片
				multiple: false, //是否支持多选文件
				dialogImageUrl: '',
				dialogVisible: false,
				district: '', //地区
				show: false,
				areaList: addressInfo,
				message: '', //详细地址
				city: '',
				sex: '', //性别
				showPicker: false,
				columns: ['男', '女'],
				iSsexplace: true,
				fileList1: [], //身份证正面上传
				fileList2: [], //身份证反面上传
				fileList3: [], //证件上传
				third: '选择技能',
				username: '', //姓名
				refereephone: '', //双向绑定手机号码
				identity: '', //双向绑定身份证号
				pickerVul: '', //入行年限中的年份值
				referrername: '', //推荐人姓名
				endDate: new Date(), //结束时间
				startDate: new Date('1970'), //开始时间
				term: true,
				cardImage: [], //身份证图片
				certififcates: '' //技能证书
			}
		},
		mounted(){
			
//			for(var i = 1;  i <= 30;i++){
//				var obj = {};
//				obj['name'] = i + '年';
//				this.actions.push(obj);
//			}
			
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
									self.postImg(this.result);
								}
								if(distinction == 2) {
									console.log(distinction)
									self.isheaderImagetwo = false;
									self.headerImagetwo = this.result;
									self.postImg(this.result);
								}
								if(distinction == 3) {
									self.isheaderImagethree = false;
									self.headerImagethree = this.result;
									self.postImg(this.result);
								}


						} else {
							img.onload = function() {
								let data = self.compress(img, Orientation);
								if(distinction == 1) {
									self.isheaderImage = false;
									self.headerImage = data;
									self.postImg(data);
								}
								if(distinction == 2) {
									console.log(distinction)
									self.isheaderImagetwo = false;
									self.headerImagetwo = data;
									self.postImg(data);
								}
								if(distinction == 3) {
									self.isheaderImagethree = false;
									self.headerImagethree = data;
									self.postImg(data);
								}

							}
						}
					}
				}
			},
			
			//上传图片接口
			postImg(uploadFile) {
				var image = uploadFile;
				var _this = this
				image = image.split(',')[1];
				var url = domain.acceptanceUploadImage
				var obj = {}
				obj['image'] = image;
				this.$axios({
						method: 'post',
						url: url,
						data: this.$qs.stringify(obj)

				})
				.then(function(res) {
					console.log(res)
					if(res.data.code == 1132){
		  				this.$router.push('/login')
		  			}
					
					_this.cardImage.push(res.data.data)
				})
				//这里写接口
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
				console.log('压缩前：' + initSize);
				console.log('压缩后：' + ndata.length);
				console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
				tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
				return ndata;
			},

			//切换状态返回
			handlechange_to(file, fileList) {
				this.hideUpload_to = fileList.length >= this.limit_to;
			},


			//选择入行年限
			openPicker() {
				this.actionshow = true;
				for(var i = 1;  i <= 30;i++){
					var obj = {};
					obj['name'] = i + '年';
					this.actions.push(obj);
				};
			},
			//入行年限选择时间
			onSelect(item){
				this.term = false;
				this.actionshow = false;
				this.pickerVul = item.name;
			},
			//性别
			onConfirm(value) {
				console.log(value)
				this.sex = value;
				this.showPicker = false;
				this.iSsexplace = false
			},
			//点击申请认证
			goCertification() {
				//身份证
				var cardNo = this.identity;
				var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				
				var stringImg = '';
				for (var i of this.cardImage){
					stringImg += i+','
				}
				stringImg = stringImg.substring(0,stringImg.length -1 );
				if(stringImg == ''){
					stringImg = null;
				};
				//获取用户信息
				var userData = this.$cookies.get('userData')
				if(userData == undefined) {
					Toast('请先登录再实名认证')
				}
				//工人ID
				var id = userData.id;
				id = id + '';
				//联系地址
				var address = this.district + this.message;
				//用户手机号码
				var phone = userData.phone
				phone = phone + '';
				var reg = /^1[3456789]\d{9}$/;

				//技能ID
				var skillId = this.parentMag.skillid + ''; 
				
				if(this.pickerVul == ''){
					this.pickerVul = null;
				}
				//选择性别
				var sexNum = '';
				if(this.sex != ''){
					this.sex == '男' ? sexNum= '2' : sexNum= '1';
				}else{
					sexNum= null;
				}
				//身份证如果为空
				if(cardNo == ''){
					cardNo = null;
				}else if(!idcardReg.test(this.cardNo)){
					Toast('您输入的身份证号不正确！')
				};
				if(this.username == '' || this.username == null) {
					Toast('请填写真实姓名')
				}else if(skillId == '' || skillId == null || skillId == 'undefined'){
					Toast('请选择技能')
				}else if(this.district == '' || this.district == null) {
					Toast('请选择省/市/区')
				}else {
					this.refereephone == '' ? this.refereephone = null : this.refereephone = this.refereephone;
					this.certififcates == '' ? this.certififcates = null : this.certififcates = this.certififcates;
					this.referrername == '' ? this.referrername = null : this.referrername = this.referrername;
					
					var obj = {};
					obj['id'] = id;
					obj['name'] = this.username;
					obj['phone'] = phone;
					obj['sex'] = sexNum;
					obj['idCard'] = cardNo;
					obj['region'] = this.city;
					obj['address'] = address;
					obj['entryTime'] = this.pickerVul;
					obj['refereeName'] = this.referrername;
					obj['refereePhone'] = this.refereephone;
					obj['skillId'] = skillId;
					obj['cardImage'] = stringImg;
					obj['certififcates'] = this.certififcates;
//					console.log(obj)
					this.$axios({
						method: 'post',
						url: domain.realnameCheck,
						data: this.$qs.stringify(obj)
					}).then((res) => {
						if(res.data.code == 1132){
			  				this.$router.push('/login')
			  			}
						if(res.data.ret == true) {
							console.log(res)
							Toast.success({
							message:'认证中...',
							duration:1500,
							})
							var _this = this;
							setTimeout(function(){
								_this.$router.push('/')
							},1500);
						}
					}).catch((error) => {
						console.log(error)
					});
				};
			},

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

		},

		beforeUpdate() {
			this.img = this.front_url
		},

	}
</script>

<style scoped="scoped">
	[class*=van-hairline]::after {
		border: none;
	}
	.mint-field .mint-cell-title {
		width: 90px;
		margin-left: 0.12rem;
		font-size:0.32rem;
	}
	
	.mint-field {
		align-items: center;
	}
	
	.certi-input>>>.hide .el-upload--picture-card {
		display: none;
	}
	
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	/*
	 
	 * 
	 * */
	
	.divImg>>>.el-dialog {
		width: 100%;
	}
	/*
	 
	 * */
	
	.certi>>>.mint-cell-wrapper {
		background: #fff;
	}
	
	.certi>>>.mint-main-button {
		color: #fff;
		background-color: #dadada;
		font-size: 1rem;
	}
	
	.certi>>>.mint-palette-button {
		width: 1.04rem;
		height: 1.04rem;
	}
	
	.certi>>>.mint-button {
		height: 1rem;
	}
	
	.certi>>>.mint-field-core::placeholder {
		color: #999;
	}
	
	.certi {
		margin-top: 0.88rem;
	}
	
	.certi-input {
		padding-bottom: 2rem;
	}
	
	.certi-input>>>.mint-field,
	.mint-cell {
		width: 100%;
		align-items: center;
		border-bottom: 1px solid #d9d9d9;
		min-height: 0.96rem;
	}
	
	.addrAll {
		width: 4.36rem;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.external {
		padding: 0 10px;
		background: #fff;
		min-height: 48px;
		line-height: 48px;
	}
	
	a {
		color: #333;
	}
	
	.placeholder {
		color: #999;
		/*flex: 2;*/
		width:100%;
	}
	
	.val {
		flex: 2;
	}
	
	.iconxiangyou-copy {
		margin-right: 0.3rem;
	}
	
	.not-null {
		position: absolute;
		left: 0;
	}
	
	.marginT-10 {
		margin-top: 0.2rem;
		background:#fff;
		padding-bottom: 0.2rem;
	}
	
	.idcard {
		padding: 0.2rem 0.3rem;
		background: #fff;
		font-size: 16px;
	}
	
	.idcard img {
		width: 50%;
		height: 100%;
	}
	
	.idcardImg {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		/*padding: 0 0.3rem;*/
		background: #fff;
		padding-bottom: 0.64rem;
		position: relative;
	}
	
	.divImg {
		/*width: 100%;*/
		/*height: 2.38rem;*/
		display: block;
		overflow: hidden;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:0 0.3rem;
	}
	
	.idcard_img {
		width: 172px;
		overflow: hidden;
		border: 1px dashed #c0ccda;
		height: 119px;
		border-radius: 6px;
		position: relative;
		text-align: center;
		/*padding:0 0.3rem;*/
		/*margin-left:0.3rem;*/
	}
	
	.idcard_img img {
		width: 100%;
		height: 100%;
	}
	
	.upinput {
		height: 119px;
		line-height: 119px;
		position: absolute;
		width: 100%;
		top: 0;
	}
	
	.showidCard {
		background-size: 100% 100%;
		height: 100%;
	}
	
	.upinput input {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
	}
	
	.upload {
		font-size: 1rem;
		color: #8c939d;
	}
	
	.divImg>>>.van-uploader__upload {
		width: 100%;
		height: 2.38rem;
		margin: 0;
	}
	
	.divImg>>>.van-uploader {
		display: block;
	}
	
	.divImg>>>.van-uploader__preview-image {
		width: 100%;
		height: 100%;
	}
	
	.divImg>>>.van-uploader__preview-delete {
		color: #fff;
		top: 0;
	}
	
	.divImg>>>.shoot-tip {}
	
	.divImg>>>.van-uploader__input-wrapper {
		position: relative;
	}
	
	.divImg>>>.van-uploader__preview {
		margin: 0;
	}
	
	.front {
		width: 100%;
		height: 100%;
	}
	
	.shoot-tip {
		position: absolute;
		left: 0%;
		top: 0%;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.circle {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: #DADADA;
		color: #fff;
		font-weight: 500;
		font-size: 1rem;
		text-align: center;
		margin-bottom: 0.2rem;
	}
	
	.certi-input>>>.van-picker {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	
	.certi-input>>>.van-field--min-height .van-field__control {
		min-height: 0;
		height: 24px;
	}
	
	.certi-input>>>.van-popup--bottom {
		height: 264px;
	}
	
	.certi-input>>>.van-cell {
		padding: 10px;
		font-size: 0.32rem;
	}
	
	.certi-input>>>.van-field__label {
		/*width: 105px;*/
		padding-left: 0.12rem;
	}
	
	.certi-input>>>[class*=van-hairline]::after {
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		transform: scale(1);
		border-bottom: 1px solid #d9d9d9;
	}
	
	.certi-input>>>.van-cell:not(:last-child)::after {
		border-bottom: 0px solid #fff;
	}
	
	.certi-input>>>.van-field__control::placeholder {
		font-size: 16px;
	}
	
	.uploading {
		position: relative;
	}
	
	.one {
		position: absolute;
		top: 0.51rem;
		left: 25.5%;
		margin-left: -0.38rem;
		width: 1.04rem;
		height: 1.04rem;
		line-height: 1.04rem;
		color: #fff;
		background-color: #dadada;
		font-size: 1rem;
		border-radius: 50%;
		text-align: center;
	}
	
	.two {
		position: absolute;
		top: 0.51rem;
		right: 25.5%;
		margin-right: -0.38rem;
		width: 1.04rem;
		height: 1.04rem;
		line-height: 1.04rem;
		color: #fff;
		background-color: #dadada;
		font-size: 1rem;
		border-radius: 50%;
		text-align: center;
	}
	
	.three {
		position: absolute;
		top: 0.51rem;
		left: 25.5%;
		margin-left: -0.38rem;
		width: 1.04rem;
		height: 1.04rem;
		line-height: 1.04rem;
		color: #fff;
		background-color: #dadada;
		font-size: 1rem;
		border-radius: 50%;
		text-align: center;
	}
	
	.open-camera {
		width: 1.04rem;
		font-size: 0.18rem;
		position: absolute;
		left: 0;
		top: 40%;
		opacity: 0;
	}
	
	.button {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>