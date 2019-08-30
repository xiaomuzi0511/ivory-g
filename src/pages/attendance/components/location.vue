<template>
	<div>
		<div id="container">{{procityaddr}}</div>

	</div>
	
</template>

<script>
import { Dialog } from 'vant';
export default {
	name :"location",
	inject:['reload'],
	data (){
		return {
			longitude :0,
			latitude :0,
			procityaddr:''
		}
	},
	methods:{
	    //定位获得当前位置信息
        getMyLocation() {
        
            var geolocation = new qq.maps.Geolocation("CJPBZ-ZXACD-RXD4Z-PTDCM-I5QRK-S2FLF", "定位-城市");
            var options = {timeout: 1000};
            geolocation.getIpLocation(this.showPosition, this.showErr,options);
	
        },
        showPosition(position) {
            var province = position.province;
            var city = position.city;
            var addr =position.addr;
            this.procityaddr = province +' '+city +' '+addr;
            this.$emit('onaddr',this.procityaddr)
        },
        showErr() {
            this.getMyLocation();//定位失败再请求定位，测试使用
        },
        change(){
        	
        	this.getMyLocation();
        }
	},
	mounted(){
		this.getMyLocation();
	       var _this = this;
	       var timer ;
	       var second = 5000;
	       timer= setTimeout(function(){
	        	if(_this.procityaddr == null || _this.procityaddr == ''){
	        		Dialog.alert({
					  message: '获取定位失败，请重新获取！'
					}).then(() => {
					 window.location.reload();
					});
	        	};
	        },second);
	       if(window.name==""){ 
				window.name = "0"; 
			}else{ 
			window.name = eval(window.name) + 1; 
				second = 150000;
				if(window.name ==2){
					clearTimeout(timer);
					window.name = "0"; 
				}
			};
	   		
  	}
}
</script>

<style>
	
</style>