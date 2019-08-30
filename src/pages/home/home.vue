<template>
	<div>
		<home-header></home-header>
		<div class="tabZujian">
			<van-tabs v-model="active" @click='checkTab'>
				<van-tab v-for="index in navList" :title="index.text" :key='index.id'>
					<hint-bar v-if="region"></hint-bar>
					<div v-else>
						<div>
							<div v-show="isListShow">
								<div class="content" v-for='(item,index) in taskList' :key="item.id">
									<div class="task-content" @click="switchPage('/details',item.id,index,item.iDays)">
										<div class="typeofwork">
											<div>
												<div class="people-num" v-show="item.level != null">
													<span>{{item.level}}</span>元/小时
												</div>
											</div>
											<div class="state">
												<span v-if="item.orderStatus == 1">待接单</span>
												<span v-else-if='item.orderStatus == 2'>待施工</span>
												<span v-else-if='item.orderStatus == 3'>施工中</span>
												<span v-else-if=' item.orderStatus ==4'>待验收</span>
												<span v-else-if='item.orderStatus == 5'>已完成</span>
												<span v-else-if='item.orderStatus == 6'>已过期</span>
											</div>
										</div>
										<div class="itemdescription">
											<ul class="itemdescription-ul">
												<li class="itemdescription-li">
													<div>
														<span class="itemtitle">订单编号：</span>
														<span class="item-unit">{{item.projectOrderNo}}</span>
													</div>
												</li>
												<li class="itemdescription-li">
													<span class="itemtitle">工作类型：</span>
													<span class="item-unit">{{item.name}}</span>
												</li>
												<li class="itemdescription-li">
													<span class="itemtitle">开始施工时间：</span>
													<span class="item-unit">{{item.startTime}}</span>
												</li>
												<li class="itemdescription-li">
													<span class="itemtitle">结束施工时间：</span>
													<span class="item-unit">{{item.completionTime}}</span>
												</li>
												<li class="itemdescription-li">
													<span class="itemtitle">施工周期：</span>
													<span class="item-unit">{{item.iDays}}天</span>
												</li>
												<!--<li class="remark">备注：施工时阿斯顿发顺丰安徽省的发髻是否健康</li>-->
											</ul>
										</div>
									</div>
									<div class="btn-div" v-if='item.orderStatus ==1'>
										<button class="vie-for" type="button" @click='onorder(index)'>接单</button>
									</div>
									<div class="btn-div" v-else-if='item.orderStatus ==3'>
										<button class="vie-for-card" type="button" @click="goattendance('/details/attendance',item.id,index)">打卡</button>
										<button class="vie-for" type="button" @click="switchPage('/details',item.id,index,item.iDays)">验收</button>
									</div>
									<div class="btn-div" v-else-if='item.orderStatus ==4'>
										<button class="vie-for" type="button" @click="switchPage('/details',item.id,index,item.iDays)">验收</button>
									</div>

								</div>
								<!--<div class="loaded-tip" v-if="hasMore">加载中...</div>-->
								<div class="loaded-tip" v-if="underscore">我是有底线哒</div>
							</div>
							<div class="notask" v-show="isnotask">
								<img src="../../assets/image/notask.png" alt="" />
								<p>暂无订单</p>
							</div>
						</div>
					</div>
				</van-tab>
			</van-tabs>
		</div>		
		<tabbar></tabbar>
	</div>
</template>

<script>
	import homeHeader from './components/homeHeader'
	import tabbar from '../public/tabbar'
	import hintBar from '@/pages/home/components/hintBar'
	import { Toast } from 'vant';
	import { Dialog } from 'vant';
	export default {
		name: 'home',
		components: {
			homeHeader,
			tabbar,
			hintBar
		},
		data(){
			return {
				openid:'',
				isListShow: false, //任务列表是否展示
				isnotask: false, //没有任务是否展示
				num: 10,
				region: false,
				lsLoading: false,
				underscore: false, //底线
				taskList: [],
				page: 1,
				size: 10,
				userData: '', // 登陆时的数据
				//           ---------
				userinfo: '',
				page: 1,
				size: 10,
				//默认第一个选项卡
				activeName: "first",
				show: false,
				active: Number(domain.tabactive), // tab状态
				navList: [{
						id: 0,
						text: '待接单'
					},
					{
						id: 1,
						text: '待施工'
					},
					{
						id: 2,
						text: '施工中'
					},
					{
						id: 3,
						text: '已完成'
					}
				],

			}
		},
		created() {
			this.realnameStatus();
		},
		mounted() {
			//实名认证接口调用
			this.active = domain.tabactive;
		},
		destroyed() {
			window.removeEventListener('scroll', this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
		},
		methods: {

			//订单列表 根据订单状态拉取订单列表接口
			findByMasterOrderList(active) {
				Toast.loading({
					mask: true,
					message: '加载中...',
					mask:false,
					duration:0
				});
				//获取cookie中的用户信息
				//判断tab点击修改---订单状态
				if(active == 0) {
					var orderStatus = "1";
				} else if(active == 1) {
					var orderStatus = "2";
				} else if(active == 2) {
					var orderStatus = "3";
				} else {
					var orderStatus = "4";
				};
				var page = this.page;
				var size = this.size;
				this.userData = this.$cookies.get('userData');
				this.ivory_token = this.$cookies.get('ivory_token');
				
				if(this.userData != null || this.userData != undefined) {
					//工人ID
					var masterId = this.userData.id;
					var url = domain.findByMasterOrderList + "?page=" + page + '&size=' + size + '&masterId=' + masterId + '&orderStatus=' + orderStatus
					this.$axios.get(url, {
						timeout: 6000
					}).then((res) => {
						console.log(res)
						Toast.clear();
						var _this = this;
						if(res.data.code == 1132) {
							_this.$router.push('/login')
						};
						if(res.data.code == 1119) {
							if(res.data.data.records.length > 0) {
								_this.lsLoading =false;
								_this.period = [];
								for(var i = 0; i < res.data.data.records.length; i++) {
									_this.taskList.push(res.data.data.records[i]);
									var startTime = res.data.data.records[i].startTime;
									startTime = startTime.replace(/-/g, "/");
									var completionTime = res.data.data.records[i].completionTime;
									completionTime = completionTime.replace(/-/g, "/");
									var data1 = new Date(startTime).getTime();
									var data2 = new Date(completionTime).getTime();
									var iDays = Number(parseInt(Math.abs(data1 - data2) / 1000 / 60 / 60 / 24));
									if(iDays == 0){
										iDays = 1;
									}
									res.data.data.records[i]['iDays'] = iDays;
								};
								_this.isListShow = true; //展示列表
								_this.isnotask = false; //隐藏空图标
								if(res.data.data.records.length <10){
									_this.lsLoading = true;
									_this.underscore = true;
								}
								//监听（绑定）滚轮滚动事件
								window.addEventListener('scroll', this.handleScroll);
								
							} else { //任务列表为空的时候
//								_this.hasMore = false;
								_this.underscore = true;
								_this.lsLoading = true;
								_this.isListShow = false; //隐私列表
								_this.isnotask = true; //展示空图标
							}

						};
					}).catch(function(err) {
						Toast.clear();
						Toast({
							message: "网络繁忙！请重新再试",
							position: "center",
							duration: 3000
						});
					});
				}
			},
			//实名认证接口
			realnameStatus(){
				var _this = this;
				_this.userData = _this.$cookies.get('userData');
				if( _this.userData == null || _this.userData == 'null' || JSON.stringify(_this.userData) == "{}"){
					
					//如果是微信浏览器就去获取code，如果不是就退出
					if (/MicroMessenger/.test(window.navigator.userAgent)){ 
					    _this.getCode();
					}else{
						_this.$router.replace('/login');
					}
				} else {
					var masterId = _this.userData.id;
					var url = domain.realnameStatus + "?masterId=" + masterId;
					_this.$axios.get(url, {
						timeout: 6000
					}).then((res) => {
						console.log(res)
						if(res.data.code == 1132) {
							_this.$router.push('/login');
						};
						if(res.data.code == 1119) {
							//实名认证状态
							_this.$cookies.set('userData', res.data.data);
							if(res.data.data.region != null) {
								_this.region = false;
								_this.findByMasterOrderList(_this.active);
							} else {
								_this.region = true;
							}
						};
					}).catch(function(err) {
						Toast({
							message: "网络繁忙！请重新再试",
							position: "center",
							duration: 3000
						});
					});
				}
			},
			getCode(){
	           	const AppId = 'wxcddc63cbdae7e64a';
				var code = this.getUrlParam('code');
				var redirect_uri = window.location.origin + window.location.pathname;
//				var redirect_uri = 'http://xymo.natapp1.cc';
				var wx_link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + AppId + '&redirect_uri=' + encodeURIComponent(redirect_uri)+ '&response_type=' + code + '&scope=snsapi_base' + '&state=STATE#wechat_redirect'; 	
	           if (code == null || code === ''){
	           		window.location.href = wx_link;
	           		code = this.getUrlParam('code');
	           } else {
	                this.getOpenId(code) //把code传给后台获取用户信息
	           }
	           
			},
			//通过code获取 openId等用户信息，/api/user/wechat/login 为后台接口
			getOpenId(code){
				let _this = this;
				var url = domain.authCode;
				var code = _this.$qs.stringify({
					code:code,
					state:'1'
				});
				_this.$axios({
					method:'post',
					url:url,
					data:code
				})
				.then((res)=>{
					console.log(res)
					if(res.data.code == 1124){
						_this.$cookies.set('openid',res.data.data);
						_this.$router.push('/login');
					};
					if(res.data.code == 1119){
						localStorage.setItem("ivory_token", res.data.data[1])
						_this.$cookies.set("userData", res.data.data[2]);
						_this.$cookies.set('ivory_token', res.data.data[1]);
						if(res.data.data[2].region != null) {
							_this.region = false;
							_this.findByMasterOrderList(_this.active);
						} else {
							_this.region = true;
						}
						
//						this.realnameStatus();
					};
				});
			},
			
			getUrlParam(name){ //封装方法
					var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
					var r = window.location.search.substr(1).match(reg); //匹配目标参数
					if(r != null) return unescape(r[2]);
					return null; //返回参数值
			},
			
			//父组件监听点击tab事件传值
			checkTab(val) {
				//订单列表 根据订单状态拉取订单列表接口
				this.taskList = [];
				this.lsLoading = false;
				this.underscore = false;
				this.page = 1;
				//已认证才能调用列表接口

				if(this.region == false) {
					domain.tabactive = this.active;
					this.findByMasterOrderList(this.active);
				}
			},

			//变量scrollTop是滚动条滚动时，距离顶部的距离
			handleScroll() {
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;   //变量windowHeight是可视区的高度

				var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;   //变量scrollHeight是滚动条的总高度
				  
				var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
				//如果底线为false则可以继续调用接口
				console.log(this.underscore)
				console.log(this.lsLoading)
				if(this.underscore == false && this.lsLoading == false) {         //滚动条到底部的条件
					if(scrollTop + windowHeight == scrollHeight) {         //写后台加载数据的函数 
						this.page++;
						//请求数据接口
						this.findByMasterOrderList(this.active);
					}
				}     
			},
			
			//点击进入考勤打卡
			goattendance(path, id, index) {
				for(var i = 0; i < this.taskList.length; i++) {
					domain.projectOrderNo = this.taskList[index].projectOrderNo;
					domain.masterOrderTakingId = this.taskList[index].id;
				};
				this.$router.push({
					path: path,
					query: {
						state: 1,
						projectOrderNo: domain.projectOrderNo,
						masterOrderTakingId: domain.masterOrderTakingId
					}
				});
			},

			//点击跳转到详情页面
			switchPage(path, id, index, iDays) {
				for(var i = 0; i < this.taskList.length; i++) {
					domain.masterOrderTakingId = this.taskList[index].id;
					domain.projectOrderNo = this.taskList[index].projectOrderNo;
					domain.masterId = this.taskList[index].masterId;
					domain.operatingId = this.taskList[index].operatingId;
					domain.projectOrderItemId = this.taskList[index].projectOrderItemId;
				};
				//				this.$router.push({path:path,query:{projectOrderNo:domain.projectOrderNo,id:domain.masterOrderTakingId,operatingId:domain.operatingId,masterId:domain.masterId,projectOrderItemId:domain.projectOrderItemId}});
				this.$router.push({
					path: path,
					query: {
						iDays: iDays
					}
				})
			},
			
			//点击接单接口
			onorder(index) {
				for(var i = 0; i < this.taskList.length; i++) {
					domain.masterOrderTakingId = this.taskList[index].id;
					domain.projectOrderNo = this.taskList[index].projectOrderNo;
					domain.masterId = this.taskList[index].masterId;
					domain.operatingId = this.taskList[index].operatingId;
					domain.projectOrderItemId = this.taskList[index].projectOrderItemId;
				};
				var url = domain.masterAcceptance + "?id=" + domain.masterOrderTakingId + "&projectOrderNo=" + domain.projectOrderNo + "&operatingId=" + domain.operatingId + "&masterId=" + domain.masterId + "&projectOrderItemId=" + domain.projectOrderItemId

				this.$axios.get(url)
					.then((res) => {
						console.log(res)
						if(res.data.code == 1132) {
							this.$router.push('/login')
						};
						if(res.data.code == 1124) {
							this.findByMasterOrderList(this.active);
						};
					})
			},
			
			getUrlParam(name) { //封装方法
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
				var r = window.location.search.substr(1).match(reg); //匹配目标参数
				if(r != null) return unescape(r[2]);
				return null; //返回参数值
			},
		}

	}
</script>

<style scoped="scoped">
	.loaded-tip {
		text-align: center;
		margin-top: 0.2rem;
		color: #666;
	}
	
	.tabZujian {
		margin-top: 0.88rem;
		padding-bottom: 2rem;
	}
	
	.tabZujian>>>.van-tabs__wrap {
		position: fixed;
		top: 0.88rem;
		left: 0;
	}
	
	.tabZujian>>>.van-tabs__line {
		background-color: #428EF1;
	}
	
	.tabZujian>>>.van-tab--active {
		color: #428EF1;
	}
	
	.tabZujian>>>.van-tab {
		font-size: 0.36rem;
	}
	
	.tabZujian>>>[class*=van-hairline]::after {
		border: 0 solid #fff;
	}
	
	.loding {
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -50px;
		margin-top: -50px;
		z-index: 100;
		width: 100px;
		height: 100px;
		background: rgba(0, 0, 0, 0.5);
	}
	
	.notask {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 2rem;
		color: #666;
		font-size: 0.28rem;
	}
	
	.notask>img {
		width: 2.74rem;
		height: 2.74rem;
		margin-bottom: 0.2rem;
	}
	
	.content {
		margin-top: 0.2rem;
	}
	
	.task-content {
		background: #fff;
	}
	
	.typeofwork {
		padding: 0 0.3rem;
		height: 0.9rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 0.02rem solid #f5f5f5;
	}
	
	.people-num {
		color: #EE2727;
		font-size: 0.28rem;
	}
	
	.people-num>span {
		font-size: 0.44rem;
	}
	
	.state {
		color: #EE2727;
		font-size: 0.36rem;
	}
	
	.itemdescription {
		padding: 0 0.3rem;
	}
	
	.itemdescription-li {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		/*height:0.7rem;*/
		padding: 0.18rem 0;
	}
	
	.itemtitle {
		font-size: 0.36rem;
	}
	
	.item-unit {
		font-size: 0.36rem;
	}
	
	.remark {
		display: block;
		background: #F2F2F2;
		padding: 0.16rem 0;
		line-height: 0.54rem;
		padding-left: 0.3rem;
		color: #666;
	}
	
	.btn-div {
		padding: 0.3rem;
		background: #fff;
		display: flex;
		justify-content: flex-end;
	}
	
	.vie-for {
		width: 1.9rem;
		height: 0.88rem;
		line-height: 0.88rem;
		background: linear-gradient(#63B2FB, #5386E9);
		color: #fff;
		border-radius: 0.1rem;
		font-size: 0.36rem;
		border-width: 0;
	}
	
	.vie-for-card {
		width: 1.9rem;
		height: 0.88rem;
		line-height: 0.88rem;
		background: linear-gradient(#fff, #fff);
		color: #000;
		border-radius: 0.1rem;
		border: 1px solid #ccc;
		margin-right: 0.2rem;
	}
	
	.tabZujian>>>.van-loading {
		height: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	
	.tabZujian>>>.van-loading__text {
		color: #fff;
		margin-top: 0.2rem;
	}
</style>