<template>
	<div>
		<certi-header></certi-header>
		<certi-input v-bind:parentMag="skill" ></certi-input>
		<!--<upload_img :imgList='imgList' :maxPic='"6"' @pickPic='pickPic($event)' @deletePic='deletePic' :zipTo = 'zipTo'></upload_img>-->
	</div>
</template>

<script>
import certiHeader from './components/header'
import certiInput from './components/certiInput'
// import upload_img from './components/uploadImg'
export default {
	name: 'certification',
	components:{
		certiHeader,
		certiInput
	},
	data(){
		return{
			skill:{
				work:'',
				skillid:''
			},
			 imgList: [],
          	 zipTo: 1024 // KB
			
		}
	},

	activated(){
		this.skill.work = this.$route.params.workText;
		this.skill.skillid=this.$route.params.skillid;
	},
	


}
</script>

<style>
</style>