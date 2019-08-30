<template>
	<div>
		<my-header :dot='dot'></my-header>
		<user-info :information='information'></user-info>
		<data-statistics @logout='logout' :balance='balance'></data-statistics>
		<tabbar></tabbar>
	</div>
</template>
<script>
	import tabbar from '../public/tabbar'
	import myHeader from './components/myHeader'
	import userInfo from './components/userInfo'
	import dataStatistics from './components/dataStatistics'
	import { Toast } from 'vant';
	export default {
		name: 'my',
		components: {
			tabbar,
			myHeader,
			userInfo,
			dataStatistics
		},
		data() {
			return {
				masterId: '',
				userData: '',
				information: '', //实名信息
				balance: {},
				dot: ''
			}
		},
		mounted() {
			this.realnameStatus();
			this.selectIsNotNewAnnouncement()
		},
		methods: {
			realnameStatus() {
				Toast.loading({
					mask: true,
					message: '加载中...',
					mask:false,
					duration:0
				});
				this.userData = this.$cookies.get('userData');
				if(this.userData != undefined || this.userData != null) {
					this.masterId = this.userData.id;
					domain.masterId = this.userData.id;
					var url = domain.realnameStatus + "?masterId=" + this.userData.id;
					this.$axios.get(url)
						.then((res) => {
							console.log(res);
							Toast.clear();
							if(res.data.code == 1132) {
								this.$router.push('/login');
							};
							if(res.data.code == 1119) {
								//实名认证状态
								this.$cookies.set('userData', res.data.data);
								this.information = res.data.data;
								this.getWorkingHoursBalance(this.masterId);

							};
						}).catch((res) => {
							console.log(res)
							Toast.clear();
							Toast({
								message: "网络繁忙！请重新再试",
								position: "center",
								duration: 3000
							});
						})
				}
			},
			//点击退出
			logout() {
				var userData = this.$cookies.get('userData');

				if(userData == null || userData == 'undefined') {
					this.$router.push('/login');
				} else {
					var id = userData.id;
					var url = domain.logout + "?masterId=" + id;
					this.$axios.get(url)
						.then((res) => {
							console.log(res)
							if(res.data.ret = true) {
								this.$cookies.remove('userData');
								this.$cookies.remove('ivory_token');
								this.$router.push('/login');
							}
						});
				}

			},
			getWorkingHoursBalance(masterId) {
				var url = domain.getWorkingHoursBalance + "?masterId=" + masterId;
				this.$axios.get(url).then((res) => {
					console.log(res)
					this.balance = res.data.data;

				})

			},
			//个人中心 - 根据返回状态展示消息图标上的红点接口
			selectIsNotNewAnnouncement() {
				var url = domain.selectIsNotNewAnnouncement + '?masterId=' + this.masterId;
				this.$axios.get(url).then((res) => {
					console.log(res)
					this.dot = res.data.data;
				})
			}
		}
	}
</script>

<style>

</style>