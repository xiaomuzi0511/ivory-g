<template>
	<div>
		<div class="homeHeader">
			<div class="header">
				<mt-header title="我的技能">
					<router-link to='/my/personalData' slot='left'>
						 <mt-button icon="back" ></mt-button>
					</router-link>
				</mt-header>
			</div>
		</div>
		<div class="content">
			<div class="skill-btn-content">
				<div class="btn-fiex">
					<ul class="btn-ul" ref="ulCon">
						<li class="btn-li" v-for="items in masterSkillList">
							<div>
								<p class="circle" v-if="items.skillRank ==3" >{{items.Rank}}</p>
								<p class="rank" v-else >{{items.Rank}}</p>
								
								<p class="work-type">{{items.skillName}}</p>
							</div>
						</li>
					</ul>
					<div class="open" @click="open()">
						<div ref='slogan' class="open-btn">展开</div>
					</div>
				</div>
			</div>
		</div>
		<div class="skill-value">
			<ul class="skill-value-ul">
				<li class="skill-value-li">
					<div>技能</div>
					<div>工时</div>
					<div>成长值</div>
					<div>职称</div>
				</li>
				<li class="skill-value-li" v-for="item in masterSkillList">
					<div>{{item.skillName}}</div>
					<div>{{item.workHours}}</div>
					<div>{{item.growUpTime}}</div>
					<div >{{item.Rank}}</div>
				</li>
			</ul>
				
		</div>
	</div>
</template>

<script>
export default{
	name:'viewInformation',
	data(){
		return{
			skill:[],
			skillTitle:'',
			liConHeight:2,
			masterSkillList:[]
		}
	},
	methods:{
		open(){
			const ulCon = this.$refs.ulCon;
			var height = ulCon.offsetHeight;
			var innerText = this.$refs.slogan.innerText;
			if(innerText =='展开'){
				this.$refs.slogan.innerText ='收起';
				ulCon.style.height = 'auto'
			}else{
				this.$refs.slogan.innerText ='展开';
				ulCon.style.height = 2+'rem';
			}
		}
	},
	mounted(){
		this.masterSkillList = this.$route.query.skill;
		for(var i = 0; i<this.masterSkillList.length; i++){
			this.masterSkillList[i].skillRank;
			if(this.masterSkillList[i].skillRank == 1){
				this.masterSkillList[i]['Rank'] = '学徒';
				if(this.masterSkillList[i]['growUpTime'] == null){
					this.masterSkillList[i]['growUpTime'] =0;
				}
				
			}
			
		}
		console.log(this.masterSkillList)
	}
}
</script>

<style scoped="scoped">
	
.homeHeader{
	width:100%;
	position: fixed;
	top:0;
	left:0;
	z-index: 100;
}
.homeHeader >>> .mint-header{
	background:#fff;
	color:#000;
	font-size:0.36rem;
	height:0.88rem;
	background: #2A3946;
	color:#fff;
}
.homeHeader >>>.iconxitongxiaoxi{
	font-size:0.44rem;
}
.info{
	color:#fff;
	background:#f00;
	font-size:0.24rem;
	width:0.3rem;
	height:0.3rem;
	line-height: 0.3rem;
	display: inline-block;
	border-radius: 50%;
	text-align: center;
	position:absolute;
	right:-25%;
	top:-40%;
}
.header >>> a{
	position:relative;
}
.content{
	margin-top:0.88rem;
}
.content-li{
	background:#fff;
	/*padding:0.2rem 0.3rem;*/
}
.content-li >p{
	padding:0.3rem 0.3rem;
	font-size:0.36rem;
	border-bottom: 1px solid #f5f5f5;
}
.skill-btn-content{
	height:2.42rem;
	background:#2A3946;
	position:relative;
}
.btn-fiex{
	position:absolute;
	width:90%;
	top:50%;
	left:5%;
	
	border-radius: 0.1rem;
}
.btn-ul{
	display: flex;
	justify-content:flex-start;
	flex-wrap: wrap;
	height: 2rem;
	overflow: hidden;
	background:#fff;
	border-radius: 0.2rem;
	transition: height 0.3s;
	-moz-transition: height 0.3s;	/* Firefox 4 */
	-webkit-transition: height 0.3s;	/* Safari 和 Chrome */
	-o-transition: height 0.3s;
	box-shadow: 2px 1px 10px #ccc;
}
.btn-li{
	width:20%;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	margin:0.2rem 0;
}
.circle{
	width:0.8rem;
	height:0.8rem;
	line-height: 0.8rem;
	border-radius:50%;
	border:5px solid #CCE8FF;
	background:#1DAEE4;
	color:#fff;
	margin-bottom:0.2rem;
}
.rank{
	width:0.8rem;
	height:0.8rem;
	line-height: 0.8rem;
	border-radius:50%;
	border:5px solid #CCE8FF;
	margin-bottom:0.2rem;
	background:#94A3AF;
	color:#fff;
}

.open{
	text-align: center;
}
.open-btn{
	background: #333E47;
	color:#fff;
	display: inline-block;
	padding:0.12rem 0.3rem;
	border-radius: 0 0 0.2rem 0.2rem;
}
.skill-value{
	margin-top:2rem;
	background:#fff;
}

.skill-value-li{
	display: flex;
	justify-content: space-around;
	padding:0.24rem 0.3rem;
	border:1px solid #f5f5f5;
	font-size:0.32rem;
}
.skill-value-li > div{
	width:25%;
	text-align: center;
}
.skill-value-li > div:not(:first-child){
	color:#2D5372;
}
</style>
