<template>
	<div class="gradelinellae">
		<div class="linellae">
	
			<!--<div class="progressContainer">
				
				
			</div>-->
			<div class="linellae-div">
				<div v-for="(item,index) in num" :key="index" ref='percentage'>{{item}}</div>
			</div>
			
			<ul class="linellae-ul">
				<!--<li v-for="{num}"></li>-->
				
				<li v-for="item in num" class="linellae-li" ref="linellaeLi" ></li>
				<ul class="cover-ul">
					<li class="ul-li" ref="coverLi"  v-model="modelNum">
						<!--<div class="cover-div" v-for="(item,index) in num" ref="widthInherit"></div>-->
						<!--<div class="cover-div" ref="widthInherit"></div>-->
						<!--<div class="cover-div" ref="widthInherit"></div>
						<div class="cover-div" ref="widthInherit"></div>
						<div class="cover-div" ref="widthInherit"></div>
						<div class="cover-div" ref="widthInherit"></div>
						<div class="cover-div" ref="widthInherit"></div>
						<div class="cover-div" ref="widthInherit"></div>
						<div class="cover-div" ref="widthInherit"></div>
						<div class="cover-div" ref="widthInherit"></div>-->
					</li>
				</ul>
			</ul>
			
			<div class="linellae-text">电工技能值</div>
		</div>
		<div class="know">
			<router-link to="/my/skillDetails/regulation">了解技能规则？</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name:'gradelinellae',
	data(){
		return{
			num:[0,10,20,30,40,50,60,70,80,90,100],
			modelNum:20
		}
	},
	methods:{
		setprogressBar(){
			for(let i in this.$refs.linellaeLi){
//				console.log(i)
				if(this.modelNum >= i){
//					this.$refs.widthInherit.width = this.$refs.linellaeLi[0].offsetWidth+"px"
//					console.log(this.$refs.linellaeLi[0].offsetWidth)
//					console.log(this.$refs.widthInherit[0].style)
					this.$refs.coverLi.style.width=this.modelNum+'%'
				}
			};
		
			for(let j in this.$refs.percentage){
//				console.log(j)
				if((this.modelNum/10) == j){
					console.log(j)
					this.$refs.percentage[j].style.background="#4B98F6";
					this.$refs.percentage[j].style.color="#fff";
				}
			}
		}
	},
	mounted(){
		this.setprogressBar()
	}
}
</script>

<style scoped="scoped">
.gradelinellae{
	
	background:#FFF;
	/*padding:0.6rem 0;*/
	height:100vh;
	padding:0 0.56rem;
}
.linellae{
	padding-top:1.68rem;
	padding-bottom:0.3rem;
	border-bottom: 1px solid #E5E5E5;
}
.progressContainer{
	width:100%;
	height:0.2rem;
	background:#eee;
	border-radius: 10px;
}
.linellae-div{
	width:100%;
	display:flex;
	justify-content: flex-start;
}
.linellae-div> div{
	width:10%;
	height:0.5rem;
	line-height: 0.5rem;
	border-radius: 50%;

	text-align: center;
}
.linellae-ul{
	width:100%;
	display:flex;
	justify-content: flex-start;
	width:100%;
	height:0.2rem;
	background:#eee;
	border-radius: 10px;
	margin-top:0.2rem;
	position:relative;
}
.linellae-li{
	width:10%;
	/*border-right:0.02rem solid #fff;*/
	/*background:#f00;*/
	color:#3191FC;
	/*flex:1;*/
	
}
.linellae-li::after{
	
}
.cover-ul{
	position:absolute;
	top:0;
	left:0;
	bottom: 0;
	right:0;
	width:100%;
	height:0.2rem;
}
.ul-li{
	width:0%;
	background:#4B98F6;
	/*border-right:1px solid #fff;*/
	height:0.2rem;
	display: flex;
	justify-content: flex-start;
	overflow: hidden;
	flex-wrap: wrap;
}
.cover-div{
	/*width:0.638rem;*/
	border-right:1px solid #fff;
}
.cover-div:before{
	
	border-right:1px solid #fff;
}
.ul-li:last-child{
	border-radius:0 0.2rem 0.2rem  0; 
}
.ul-li:first-child{
	border-radius: 0.2rem 0 0 0.2rem;
}

.linellae-li:first-child{
	border-radius: 0.2rem 0 0 0.2rem;
}
.linellae-li:nth-of-type(11){
	border-radius:0 0.2rem 0.2rem  0; 
	width:0px;
	background:#FFF7D8;
	/*display: none;*/
}
.linellae-text{
	color:#999;
	margin-top:0.2rem;
}
.know{
	text-align: right;
	
	height:1rem;
	margin-top:0.4rem;
}
.know a{
	color:#3191FC;
}
</style>