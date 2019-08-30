<template>
  <div id="app">
 	 	<keep-alive>
    	<router-view  v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view  v-if="!$route.meta.keepAlive" />
    <!--<router-view  v-if="isRouterAlive" />-->
  </div>
</template>

<script>
export default {
  name: 'App',
   provide (){
  	return{
  		reload:this.reload
  	}
  },
  data(){
  	return{
  		isRouterAlive:true
  	}
  },
  methods:{
  	// 刷新方法
    reload: function () {
        this.isRouterAlive = false
        this.$nextTick(function () { 
        	this.isRouterAlive = true
         })
    }
  }
}
</script>

<style>

</style>
