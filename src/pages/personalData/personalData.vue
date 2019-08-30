<template>
	<div>
		<h-header></h-header>
		<div class="complete-info">
			<ul class="info-ul">
				<li class="info-li">
					<div class="portrait">
						<img v-if="headshow"  :src="headerImage"/>
						<img v-else src="../../assets/image/default.png" />
						<div class="change">
							更换头像
							<van-icon name="arrow" />
							<input class="uplod_input" type="file" name="cover" capture="user" accept="image/*" @change="upload($event)" />
						</div>
					</div>
				</li>
				<li class="info-li" style="margin-top:0.2rem;">
					<div class="portrait">
						<p class="portrait-title">身份验证</p>
						<div class="change">
							<p v-if="data.realnameCheck == 0" @click="goskip('/my/personalData/authentication','身份验证')">未认证</p>
							<p v-if="data.realnameCheck == 1">已认证</p>
							<p v-if="data.realnameCheck == 2" style="color:#f00;">认证中</p>
							<p v-if="data.realnameCheck == 3" style="color:#f00;" @click="goskip('/my/personalData/authentication','身份验证')">认证失败</p>
							<van-icon name="arrow" />
						</div>
					</div>
				</li>
				<li class="info-li" style="margin-top:0.2rem;" @click="goskip('/my/personalData/fill_In_infon','用户名')">
					<div class="portrait">
						<p class="portrait-title">用户名</p>
						<div class="change">
							{{data.name}}
							<van-icon name="arrow" />
						</div>
					</div>
				</li>
				<li class="info-li" @click="showPicker = true">
					<div class="portrait">
						<p class="portrait-title">性别</p>
						<div class="change">
							<!--<p v-if="data.sex != ''">{{data.sex}}</p>-->
							<p v-if="data.sex == 1">女</p>
							<p v-else-if="data.sex == 2">男</p>
							<p v-else>{{sexVale}}</p>
							<van-icon name="arrow" />
						</div>
					</div>
				</li>
				<li class="info-li" @click="goviewInformation('/my/personalData/viewInformation')">
					<div class="portrait">
						<p class="portrait-title">我的技能</p>
						<div class="change">
							<p>{{skillName}}</p>
							<van-icon name="arrow" />
						</div>
					</div>
				</li>
				<li class="info-li" @click="openPicker">
					<div class="portrait">
						<p class="portrait-title">入行年限</p>
						<div class="change">
							<p v-if="pickerVul == ''">待完善</p>
							<p v-else>{{pickerVul}}年</p>
							<van-icon name="arrow" />
						</div>
					</div>
				</li>
				<li class="info-li" @click="gocertificate('/my/personalData/certificate')">
					<div class="portrait">
						<p class="portrait-title">证件上传</p>
						<div class="change">
							<p v-if="data.certififcates!=''">已上传</p>
							<p v-else>未上传</p>
							<van-icon name="arrow" />
						</div>
					</div>
				</li>
				<li class="info-li" style="margin-top:0.2rem;" @click="goskip('/my/personalData/fill_In_infon','我的地址')">
					<div class="portrait">
						<p class="portrait-title">我的地址</p>
						<div class="change">
							<p v-if="data.address != null">{{data.address}}</p>
							<p v-else>待完善</p>
							<van-icon name="arrow" />
						</div>
					</div>
				</li>
				<li class="info-li" >
					<div class="portrait">
						<p class="portrait-title">推荐人</p>
						<div class="change">
							<p v-if="data.refereeName != ''">data.refereeName</p>
							<p v-else>无推荐人</p>
							<van-icon name="arrow" />
						</div>
					</div>
				</li>
				<li class="info-li" >
					<div class="portrait">
						<p class="portrait-title">推荐人手机号码</p>
						<div class="change">
							<p v-if="data.refereePhone != ''">data.refereePhone</p>
							<p v-else>无手机号码</p>
							<van-icon name="arrow" />
						</div>
					</div>
				</li>
				
			</ul>
			<van-popup v-model="showPicker" position="bottom">
				<van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
			</van-popup>

			<!--入行年限弹窗-->
			<div @touchmove.prevent>
				<van-action-sheet v-model="actionshow" :actions="actions" @select="onSelect" />
			</div>
			<!--入行年限弹窗-->
		
			
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	import hHeader from './components/header'
	import Exif from 'exif-js' 
	export default {
		name: 'personalData',
		components: {
			hHeader
		},
		data() {
			return {
				skillName:'',
				masterSkillList:[],
				data:'',
				id:'',              //工人ID
				headerImage:'',
				headshow:false,
				showPicker: false,
				columns: ['男', '女'],
				sexVale: '待完善',
				actionshow: false,
				actions: [],
				pickerVul: '', //年限值
				cameraShow: false, //是否打开相机弹窗
				cameraActions: [{
						name: '拍照',
						
					},
					{
						name: '从手机相册选择'
					},
				]
			}
		},
		mounted(){
			var userData = this.$cookies.get("userData");
			this.id = userData.id;
			this.findByMasterOne(this.id)
		},
		methods: {
			//性别
			onConfirm(value) {
				this.sexVale = value;
				this.showPicker = false;
				this.iSsexplace = false;
				var pickerVul='';
				var number = 3;
				if(this.sexVale == '女'){
					var sexVale = 1;
				}
				if(this.sexVale == '男'){
					var sexVale = 2;
				}
				this.updateMasterInfo(number,this.id,this.headerImage,sexVale,pickerVul,2)
			},
			//选择入行年限
			openPicker() {
				this.actionshow = true;
				for(var i = 1; i <= 30; i++) {
					var obj = {};
					obj['name'] = i + '年';
					this.actions.push(obj);
				};
			},
			//入行年限选择时间
			onSelect(item) {
				this.actionshow = false;
				var pickerVul = item.name.substring(0,item.name.length-1);
				var number = 4;
				var sexVale='';
				this.updateMasterInfo(number,this.id,this.headerImage,sexVale,pickerVul,3)
			},

			getVideoStream(stream) {
				buffer = stream;
				if(oCapture.mozSrcObject !== undefined) {
					oCapture.mozSrcObject = buffer;
				} else {
					oCapture.src = window.URL && window.URL.createObjectURL(buffer);
				}
				oCapture.play();
			},
			goskip(path,name){
				this.$router.push({path:path,query:{name:name}});
			},
			//我的技能
			goviewInformation(path){
				this.$router.push({path:path,query:{skill:this.masterSkillList}})
			},
			//上传头像
			upload(e) {
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				this.picValue = files[0];
				this.imgPreview(this.picValue);
			},
			imgPreview(file) {
				let self = this;
				let Orientation;
				//去获取拍照时的信息，解决拍出来的照片旋转问题  
			      Exif.getData(file, function(){  
			          Orientation = Exif.getTag(this, 'Orientation');  
			      });
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
						var number = 0;
						var pickerVul = null;
						img.src = result;
						//判断图片是否大于100K,是就直接上传，反之压缩图片
						if(this.result.length <= (100 * 1024)) {
									self.isheaderImage = false;
									self.headerImage = this.result;
									var headerImage = self.headerImage.split(',')[1];
									self.updateMasterInfo(number,self.id,headerImage,this.sexVale,pickerVul,1)
						} else {
							img.onload = function() {
								let data = self.compress(img, Orientation);
								self.isheaderImage = false;
								self.headerImage = data;
								var headerImage = self.headerImage.split(',')[1];
								self.updateMasterInfo(number,self.id,headerImage,this.sexVale,pickerVul,1)
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
			gocertificate(){
				this.$router.push('/my/personalData/certificate');
			},
			//上传个人资料接口
			updateMasterInfo(number,id,headerImage,sexVale,pickerVul,num){
				var url = domain.updateMasterInfo;
				var obj= {};
				obj['number']=number;
				obj['id']=id;
				//num =1 上传头像
				if(num == 1){
					obj['headPic'] = headerImage;
				}
				if(num == 2){
					obj['sex'] = sexVale;
				}
				if(num == 3){
					obj['entryTime'] = pickerVul;
				}
				console.log(obj)
				obj = this.$qs.stringify(obj);
				this.$axios({
					url:url,
					method:'post',
					data:obj
				}).then((res)=>{
					console.log(res)
					if(res.data.code == 1126){
						var _this = this;
						Toast(res.data.msg)
//						setTimeout(function(){
//							_this.$route.push('/my/personalData');
//						},5000);
					}
					if(res.data.code == 1124){
						this.findByMasterOne(this.id)	
					}
				})
			},
			//根据工人ID查询工人信息
			findByMasterOne(id){
				var url = domain.findByMasterOne +'?masterId='+id;
				this.$axios.get(url).then((res)=>{
					console.log(res)
					this.data = res.data.data;
					this.headerImage = res.data.data.headPic;
					this.pickerVul = res.data.data.entryTime;
					this.masterSkillList = res.data.data.masterSkillList;
					for(var i=0;i < this.masterSkillList.length;i++){
						this.skillName = this.masterSkillList[i].skillName;
					};
					if(!this.headerImage == null || !this.headerImage == ""){
						this.headshow = true;
					}else{
						this.headshow = false;
					}
					
						
						
						
				})
				
			}
		}
	}
</script>

<style scoped="scoped">
	.complete-info {
		margin-top: 0.88rem;
		width:100%;
		overflow: hidden;
	}
	
	.info-li {
		background: #fff;
		padding: 0.3rem;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.portrait {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.32rem;
	}
	
	.portrait>img {
		width: 0.9rem;
		height: 0.9rem;
		border-radius: 50%;
	}
	
	.change {
		color: #999;
		display: flex;
		align-items: center;
		position: relative;
	}
	
	.change>>>.van-icon {
		margin-left: 0.2rem;
	}
	
	.uplod_input {
		position: absolute;
		/*top: 0;*/
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		z-index: 100;
	}
	
	.complete-info>>>.van-action-sheet {
		max-height: 30% !important;
	}
</style>