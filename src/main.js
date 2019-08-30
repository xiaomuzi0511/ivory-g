// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/styles/iconfont.css'
import './assets/js/fontSize'


import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import axios from 'axios'
Vue.prototype.$axios = axios 

import qs from 'qs';
Vue.prototype.$qs=qs

import domain from './domain'
global.domain = domain

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import store from './store'

Vue.config.productionTip = false


Vue.prototype.bus = new Vue()

import EXIF from "exif-js";
//Vue.use(EXIF);    //全局申明
Vue.prototype.EXIF = EXIF

 import AMap from 'vue-amap';
 Vue.use(AMap);

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)


//在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);
    
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
    
    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    
    // Increase the retry count
    config.__retryCount += 1;
    
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});


AMap.initAMapApiLoader({
  key: 'your amap key',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
		 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 
		'AMap.CircleEditor','AMap.Geolocation']
});




new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
