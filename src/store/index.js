import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


const state={  //要设置的全局访问的state对象
	
}

const getters = { //实时监听state值的变化(最新状态)
	
}

const mutations = { //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数（变量或对象）
	
}
const store = new Vuex.Store({
	state
});

export default store;
