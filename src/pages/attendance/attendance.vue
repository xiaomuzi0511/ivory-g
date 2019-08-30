<template>
	<div class="attendance">
		<att-header :state='state'></att-header>
		<div class="user-info">
			<img src="../../assets/image/default.png" alt="" />
			<div class="info">
				<span>{{name}}</span>
				<span class="department">考勤组：工程1部</span>
			</div>
			<div class="date">
				{{currentdate}}
			</div>
		</div>
		<div v-if="scheduling">
			<div class="attendance-content">
				<van-steps direction="vertical" :active="active" active-color="#5AB0F2">
					<van-step v-for="(item,index) in record" :key="index">
						<h3 class="clockTime">打卡时间：{{item.clockInsTime}} <span style="color:#5A9CF2;font-size:0.28rem;">({{item.upandDown}})</span></h3>
						<p>{{item.place}}</p>
					</van-step>
				</van-steps>
			</div>
			<div style="padding-bottom: 1rem;">
				<!--打卡按钮  圆-->
				<div class="attendance-button" v-if="Input_show">
					<div class="roundness">
						<input class="uplod_input" type="file" name="cover" accept="image/*" capture="user" multiple @change="upload($event,1)" />
						<div class="clock-in">{{clock_in}}</div>
						<div class="time">{{nowTime}}</div>
					</div>
					<div class="site">
						<i class="iconfont icondizhi"></i>
						<location ref="headerChild" @onaddr='onaddr'></location>
					</div>
					
				</div>
				<!--打卡按钮  圆-->
				
				<div class="photograph-cpm" v-if="isshow">
					<div class="bg_uo_img" :style="'backgroundImage:url('+home_url+')'"></div>
					<div class="begin" @click="duty">
						<button>确认</button>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<p class="no-layout">暂无排班</p>
		</div>
		<!--<div class="lodinShow" v-if="lodShow">
			<van-loading color="#fff" />
		</div>-->
		<attendance-footer></attendance-footer>
	</div>
</template>

<script>
	import location from './components/location'
	import attHeader from './components/header'
	import attendanceFooter from './components/footer'
	import { Toast } from 'vant';
	import Exif from 'exif-js' 
	export default {
		name: "attendance",
		inject:['reload'],
		components: {
			location,
			attHeader,
			attendanceFooter
		},
		data() {
			return {
				Input_show:false,
				clock_in:'上班打卡',
//				lodShow:false,
				upandDown:'',
				scheduling:true,   //是否有排版记录
				state: '',   //从哪个页面进入的
				name: '',
				cardImage: '',
				rest: '',
				procityaddr: '', //打卡地址
				clockInsTime: '', // 打卡时间
				record: [], //后台返回的打卡记录
				wifi: '',
				srcValue: '', //上传图片的本地地址
				clock_address: '', //打卡地址
				masterId: '', //工人ID
				projectOrderNo: '', //列表号
				masterOrderTakingId: '', //工人订单列表
				nowTime: '',
				nowDate: '',
				title: '',
				active: 0,
//				time: '',
				home_url: '', //打卡上班获取的图片
				isshow: false,
				ishidden: true,
				currentdate: ''
			}
		},
		methods: {
			//点击打卡调用相机拍照
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
//					self.lodShow = true;
					// 读取成功后的回调
					reader.addEventListener('load',function(){
						let result = this.result;
						let img = new Image();
						img.src = result;
						//判断图片是否大于100K,是就直接上传，反之压缩图片
						
						if(this.result.length <= (100 * 1024)) {
							if(distinction == 1) {
								self.home_url = this.result;
								self.isshow = true;
//								self.lodShow = false;
//								self.postImg(this.result);
							}
						} else {
							img.onload = function() {
								let data = self.compress(img, Orientation);
								if(distinction == 1) {
									self.home_url = data;
//									self.postImg(data);
								self.isshow = true;
//								self.lodShow = false;
								}

							}
						}
						
					});
				}
			},
			//打卡上传图片接口
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

				}).then(function(res) {
						console.log(res)
						if(res.data.code == 1132) {
							this.$router.push('/login')
						};
						if(res.data.code = 1108){
							_this.cardImage = res.data.data;
							_this.isshow = true;
//							_this.lodShow = false;
						};
				});
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
			//获取时间
			timeFormate() {
				setInterval(() => {
					var myDate = new Date(); //获取系统当前时间
					var Hours = myDate.getHours(); //获取当前小时数(0-23)
					var Minutes = myDate.getMinutes(); //获取当前分钟数(0-59)
					if(Minutes.toString().length == 1) {
						Minutes = "0" + myDate.getMinutes();
					} else {
						Minutes = myDate.getMinutes();
					}

					var Seconds = myDate.getSeconds(); //秒
					if(Seconds.toString().length == 1) {
						Seconds = "0" + myDate.getSeconds();
					} else {
						Seconds = myDate.getSeconds();
					}

					this.nowTime = Hours + ":" + Minutes + ":" + Seconds;
					//					this.nowDate = Year+"/"+ Month+'/'+date

				}, 1000);

			},

			//点击开始上班调用接口
			duty() {
				var _this = this;
				_this.isshow = false;
				_this.ishidden = false;
				for(var j of _this.record) {
					_this.clockInsTime = j.clockInsTime;
					_this.clockInsTime=j.clockInsTime.substring(0,_this.clockInsTime.length-3);
				
					_this.procityaddr = j.place;
				}
				_this.active = _this.record.length - 1;
				var obj = {};
				_this.home_url = _this.home_url.split(',')[1];
				obj['projectOrderNo'] = domain.projectOrderNo;
				obj['masterOrderTakingId'] = domain.masterOrderTakingId;
				obj['masterId'] = domain.masterId;
				obj['image'] = _this.home_url;
				obj['wifi'] = _this.wifi;
				obj['place'] = _this.clock_address;
				obj = _this.$qs.stringify(obj);
				
				//打卡接口调用
				var url = domain.masterClockin;
				_this.$axios({
					url:url,
					data:obj,
					method:'post',
					timeout: 6000
				}).then((res)=>{
					console.log(res)
					if(res.data.code == 1132) {
						_this.$router.push('/login');
					};
					if(res.data.code == 1126) {
						Toast(res.data.msg);
					} else if(res.data.code == 1124) {
						Toast(res.data.msg);
						//获取当天的日期
						var date = new Date();
						var seperator1 = "-";
						var year = date.getFullYear();
						var month = date.getMonth() + 1
						var strDate = date.getDate();
						if(month >= 1 && month <= 9) {
							month = "0" + month;
						};
						if(strDate >= 0 && strDate <= 9) {
							strDate = "0" + strDate;
						};
						var currentdate = year + seperator1 + month + seperator1 + strDate;
						//打卡成功后调用查询打卡记录接口
						_this.findByDateClockinRecord(domain.projectOrderNo, domain.masterOrderTakingId,domain.masterId, currentdate)
					};
					
				}).catch(function(err){
			        Toast('打卡失败，网络超时！');
			    });
			},
			onaddr(val) {
				//打卡地址
				this.clock_address = val;
			},
			//根据日期返回打卡记录接口
			findByDateClockinRecord(projectOrderNo, masterOrderTakingId, masterId, nowDate) {
				Toast.loading({
				  mask: true,
				  message: '加载中...',
				  mask:false,
				  duration:0
				});
				var url = domain.findByDateClockinRecord + "?projectOrderNo=" + projectOrderNo + "&masterOrderTakingId=" + masterOrderTakingId + "&masterId=" + masterId + "&date=" + nowDate
				this.$axios.get(url,{
					timeout:6000
				}).then((res) => {
						console.log(res)
						Toast.clear(); //清除加载
						if(res.data.code == 1132) {
							this.$router.push('/login');
						};
						if(res.data.code == 1119) {
							this.Input_show = true;
							this.record = res.data.data;
							this.active = this.record.length -1;
							for(var i =0;i< this.record.length;i++){
								if(i%2 === 0){
									this.record[i]['upandDown'] = '上班卡';
									this.clock_in= '下班打卡';
								}else{
									this.record[i]['upandDown'] = '下班卡';
									this.clock_in= '上班打卡';
								}
							}
						};
						if(res.data.code == 1120) {  // 没有排班表
							this.scheduling = false;
							this.Input_show = false;
						}
					}).catch(function(error){
						Toast.clear();
	                     Toast({
			                  message: "网络繁忙！请重新再试",
			                  position: "center",
			                  duration: 3000
			            });
			    	});
			},
			//个人中心进入返回打卡记录接口
			selectByDateClockIns(masterId){
				Toast.loading({
				  mask: true,
				  message: '加载中...',
				  mask:false,
				  duration:0
				});
				var url = domain.selectByDateClockIns + "?masterId=" + masterId;
				this.$axios.get(url,{
					timeout:6000
				}).then((res) => {
						console.log(res)
						Toast.clear(); //清除加载
						if(res.data.code == 1132) {
							this.$router.push('/login');
						};
						if(res.data.code == 1119) {
							console.log()
							this.Input_show = true;
							this.record = res.data.data.masterClockinRecordList;
							var masterOrderTaking = res.data.data.masterOrderTaking;
							domain.projectOrderNo = masterOrderTaking.projectOrderNo;
							domain.masterOrderTakingId = masterOrderTaking.id;
							this.active = this.record.length -1;
							for(var i =0;i< this.record.length;i++){
								
								this.clockInsTime = this.record[i].clockInsTime.substring(0,this.record[i].clockInsTime.length-3);
								if(i%2 === 0){
									this.record[i]['upandDown'] = '上班卡';
									this.clock_in= '下班打卡';
								}else{
									this.record[i]['upandDown'] = '下班卡';
									this.clock_in= '上班打卡';
								};
							}
							
						};
						if(res.data.code == 1120) {  // 没有排班表
							this.scheduling = false;
							this.Input_show = false;
						};
					})
					.catch(function(err){
						//清除加载
			        	Toast.clear();
	                     Toast({
			                  message: "网络繁忙！请重新再试",
			                  position: "center",
			                  duration: 3000
			            });
			    	});
			}
		},
		created(){
			var userData = this.$cookies.get('userData');
				//获取当天的日期
			var date = new Date()
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1
			var strDate = date.getDate()
			if(month >= 1 && month <= 9) {
				month = "0" + month;
			};
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			};
			this.currentdate = year + seperator1 + month + seperator1 + strDate;
			
			if(userData == null){
				this.$router.push('/login')
			}else{
				domain.masterId = userData.id;
				this.name = userData.name;
				this.state = this.$route.query.state;
				domain.projectOrderNo = this.$route.query.projectOrderNo;
				domain.masterOrderTakingId = this.$route.query.masterOrderTakingId;
				this.timeFormate();
				//调用打卡数据接口
				if(this.state == 3 || this.state == 4 || this.state == 5) {
					//从个人中心进打卡接口
					this.selectByDateClockIns(domain.masterId);
				} else if(this.state == 1 || this.state == 2) {
					//打卡接口
					this.findByDateClockinRecord(domain.projectOrderNo, domain.masterOrderTakingId, domain.masterId, this.currentdate);
				}
				
			}
			
		
			
		}
}
</script>

<style scoped>
	.lodinShow{
		position: fixed;
		top:50%;
		left:50%;
		margin-top:-50px;
		margin-left:-50px;
		width:100px;
		height:100px;
		background:rgba(0,0,0,0.45);
		text-align: center;
		line-height: 100px;
		border-radius: 0.2rem;
	}
	.attendance-content>>>.van-step--vertical{
		height: 60px;
		padding:10px 10px 20px 0;
	}
	.no-layout{
		text-align:center;
		font-size:0.32rem;
		margin-top:0.2rem;
		color:#999;
	}
	.clockTime {
		font-weight: 600;
		font-size: 0.4rem;
		color:#000;
	}
	
	.user-info {
		background: #fff;
		display: flex;
		justify-content: flex-start;
		padding: 0.2rem 0.3rem;
		border-bottom: 1px solid #f5f5f5;
		/*margin-top: 0.88rem;*/
		padding: 0.2rem 0.3rem;
		margin-top: 0.88rem;
		/*padding-bottom: 0.2rem;*/
	}
	
	.user-info>img {
		width: 0.72rem;
		height: 0.72rem;
		border-radius: 50%;
	}
	
	.info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 0.26rem;
	}
	
	.attendance {
		height: 100vh;
		background: #fff;
		/*padding-bottom:1rem;*/
	}
	
	.attendance>>>.mint-header {
		background-color: #fff;
		color: #000;
		font-size: 0.36rem;
	}
	
	.attendance-content {
		background: #fff;
		padding: 0.4rem 0.3rem;
	}
	
	.attendance-button {
		display: flex;
		justify-content: center;
		background: #fff;
		padding-top: 0.86rem;
		flex-direction: column;
		align-items: center;
	}
	
	.roundness {
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 50%;
		background: #5AB0F2;
		box-shadow: 0rem 0rem 0.3rem #5AB0F2;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #fff;
		font-size: 0.36rem;
		position: relative;
		overflow: hidden;
		
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
	
	.roundness>>>.van-uploader {
		position: absolute;
		opacity: 0;
	}
	
	.clock-in {
		margin-bottom: 0.2rem;
	}
	
	.site {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-top: 0.5rem;
		padding-bottom: 0.3rem;
		background: #fff;
	}
	
	.site>.icondizhi {
		color: #5A9CF2;
	}
	
	.posi {
		position: absolute;
		left: 1rem;
		top: 0;
		z-index: 100;
	}
	
	.open-camera {
		width: 2.4rem;
		height: 2.4rem;
		opacity: 0;
		position: absolute;
		top: 0%;
		left: 0%;
	}
	
	.photograph-cpm {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	
	.photograph-cpm>.bg_uo_img {
		width: 5rem;
		height: 50%;
		background:#fff;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	.begin {
		display: block;
		color: #5A9CF2;
		height: 1rem;
		width: 5rem;
		border: 1px solid #5A9CF2;
		background: #fff;
		/*text-align: center;*/
		display: flex;
		justify-content: center;
		align-items: center;
		
		
	}
	
	.begin>button {
		background: #fff;
		color: #5A9CF2;
		height: 1rem;
		font-size:0.4rem;
		width:50%;
	}
	
	.date {
		flex: 1;
		text-align: right;
	}
	
	.attendance-content>>>.van-step--finish .van-step__circle,
	.van-step--finish .van-step__line {
		background-color: #5AB0F2;
	}
	
	.attendance-content>>>.van-step--finish .van-step__line {
		background-color: #5AB0F2;
	}
	body >>>.van-toast--text .van-toast__text{
		font-size:0.6rem;
	}
</style>