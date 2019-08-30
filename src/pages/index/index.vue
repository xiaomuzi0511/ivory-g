<template>

	<div class="newslist" @click="open">
		点击
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {

			}
		},

		methods: {
			getQueryString(name) {
			 	  var name,value;
				   var str=location.href; //取得整个地址栏
				   var num=str.indexOf("?")
				   str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
				
				   var arr=str.split("&"); //各个参数放到数组里
				    console.log(arr)
				   for(var i=0;i < arr.length;i++){
				        num=arr[i].indexOf("=");
				        if(num>0){
				             name=arr[i].substring(0,num);
				             value=arr[i].substr(num+1);
				             this[name]=value;
				             alert(value)
				        }
				   } 
			},
			
			open() {
//				const AppId = 'wxcddc63cbdae7e64a';
//				const code = this.getUrlParam('code');
//				const redirect_uri = "https%3a%2f%2fm.ivory-x.com%2fgetCode";
//
//				const local = window.location.href
//				if(code == null || code === '') {
//					window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + AppId + '&redirect_uri=' + redirect_uri + '&response_type=' + code + '&scope=snsapi_base' + '&state=STATE#wechat_redirect'
//
//				} else {
//					this.getOpenId(code) //把code传给后台获取用户信息
//				}
				
				
				
			},

			getOpenId(code) { // 通过code获取 openId等用户信息，/api/user/wechat/login 为后台接口
				alert(code)
				let _this = this
				this.$http.post('/api/user/wechat/login', {
					code: code
				}).then((res) => {
					let datas = res.data
					if(datas.code === 0) {
						console.log('成功')
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			getUrlParam(name) { //封装方法
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
				var r = window.location.search.substr(1).match(reg); //匹配目标参数
				if(r != null) return unescape(r[2]);

				return null; //返回参数值
			},
		},
		mounted(){
			const code = this.getQueryString('code');
			
		}


	}
</script>

<style scoped="scoped">
	.newslist ul li p {
		font-size: 14px;
		color: #555;
		line-height: 25px;
		height: 50px;
		overflow: hidden;
		transition: height .3s;
		width: 50px;
		background: #F0C78A;
	}
</style>