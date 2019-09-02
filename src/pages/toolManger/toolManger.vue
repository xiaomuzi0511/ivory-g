<template>
  <div id='toolManger' class="toolManger">
    <van-nav-bar
      title="工具管理"
      left-arrow
      @click-left="this.$router.go(-1)">

    </van-nav-bar>
    <div class="column">
      <table>
        <tr>
          <td rel="external nofollow" v-for="(item,index) in nav"><a href="#"  v-on:click="addClass(item.navname)"
                                                                     v-bind:class="{ selected:item.navname==current}">{{item.navname}}</a></td>
          <!--          <td><a href="#" >全部</a></td>-->
          <!--          <td><a href="#" >待领取</a></td>-->
          <!--          <td><a href="#" >已领取</a></td>-->
          <!--          <td><a href="#" >待发放</a></td>-->
          <!--          <td><a href="#" >已发放</a></td>-->
        </tr>
      </table>
      <hr style="padding-top: 0rem;margin-top: 0.32rem">
    </div>
    <div class="Customer">
      <table class="data" v-for="(item,index) in memberList" @click="memberDetail(index)">
        <div class="userinfo">
          <div class="name">
            客户名称： {{item.custName}}
          </div>
          <div class="state">
            {{item.state}}
          </div>
        </div>
        <hr style="margin:0 0.3rem 0 0.3rem;width:6.9rem;size: 1px">
        <div class="project" v-for="item2 in item.project">
          <img src="../../assets/photo/toolManger_03.png" class=".img"/>
          <div class="detail">
            <div>{{item2.projectType}}</div>
            <div>参与人数：{{item2.joinMember}}人</div>
          </div>
        </div>
        <div class="button" v-if="buttonshow(item.state)">
          <button class="" >{{ buttonshow(item.state) }}</button>
        </div>
      </table>
    </div>

  </div>
</template>
<script>
  export default {
    name:'toolManger',
    created () {  //数据接口
      // 就当看作是ajax在初始化进入的时候从后台获取的用户列表数据
      this.list = [
        {custId: 1,
          custName: '张小姐',
          state: '待领取',
          project: [{
            img: '../../assets/photo/toolManger_03.png', projectType: '批灰', joinMember: 15
          }, {
            img: '../../assets/photo/toolManger_03.png', projectType: '墙身', joinMember: 4
          }, {
            img: '../../assets/photo/toolManger_03.png', projectType: '批灰', joinMember: 20
          }]},
        {custId: 2,
          custName: '李先生',
          state: '已领取',
          project: [{
            img: '../../assets/photo/toolManger_03.png', projectType: '批灰', joinMember: 20
          }, {
            img: '../../assets/photo/toolManger_03.png', projectType: '批灰墙身', joinMember: 20
          }]},
        {custId: 3,
          custName: '张小姐',
          state: '已发放',
          project: [{
            img: '../../assets/photo/toolManger_03.png', projectType: '批灰', joinMember: 20
          }]},
        {custId: 3,
          custName: '张小姐',
          state: '待发放',
          project: [{
            img: '../../assets/photo/toolManger_03.png', projectType: '批灰', joinMember: 20
          }]}
      ];
      this.memberList = this.list;
    },
    data () {
      return {
        memberList: [],
        nav: [{navname: '全部'}, {navname: '待领取'}, {navname: '已领取'}, {navname: '待发放'}, {navname: '已发放'}],
        current: '全部',
        list: []

      }
    },
    // mounted() { //初始化页面，操作dom
    //
    // },
    methods: {
      memberDetail (index) {
        sessionStorage.custId = this.memberList[index].custId
      },
      buttonshow (state) {
        switch (state) {
          case '待领取':
            return '领取工具'
            break
          case '已领取':
            return false
            break
          case '待发放':
            return '发放工具'
            break
          case '待归还':
            return '回收工具'
            break
          case '已归还':
            return false
            break
          default:
            return false
        }
      },
      addClass(v){
        this.current = v;
        //页面分类
        let s = this.list;
        let tempList = [];
        if(v=='全部'){
          this.memberList=this.list;
        }else{
          for(let i=0; i<s.length; i++){
            let state = s[i].state;
            if(state == v){ //这里的v是页面选中的state
              tempList.push(s[i]);
            }
          }
          if (tempList.length>0){
            this.memberList = tempList;
          }else{ //没有数据
            console.log("数据空");
          }
        }
      },
      sortState(state) { //根据状态获取数据

      },
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  #toolManger {
    width: 100%;
    background-color: #F5F5F5;
    /*border: 1px solid #000000;*/
  }

  .toolManger >>> .van-ico /*头部*/
  {
    color: #000000;
  }
  .back {
    height: 0.4rem;
    width: 0.4rem;
    padding: 0.2rem 0rem 0.2rem 0.3rem;
  }
  .column {
    background-color: #ffffff;
  }
  .column  table tr td {
    padding: 0.0rem 0.35rem;
    /*border-bottom: 1px solid #969799;*/
  }

  .column /*栏目*/ table tr td a {
    color: #333333;
    text-decoration: none;
    font-size: 0.28rem;
    padding:0.3rem 0  0.25rem 0;
  }

  .column /*栏目*/ table tr td a:active {
    color: #428EF1;
    text-decoration: none;
    border-bottom: #25a4bb;
  }
  .selected {
    color: #428EF1 !important;
    border-bottom:2px solid #428EF1;
  }
  .Customer {
    width: 100%;
    height: auto;
    position: absolute;
    background-color: #F5F5F5;
  }

  table.data {
    margin-bottom: 0.2rem;
    background-color: #ffffff;
    /*border-radius: 0.2rem;*/
  }
  /*.project {*/
  /*  background-color: #f7f8fa;*/
  /*  margin-bottom: 0.1rem;*/
  /*  border-radius: 0.1rem;*/
  /*}*/
  .userinfo {
    height: 0.9rem;
    width: 6.9rem;
    padding: 0.2rem 0.3rem 0 0.3rem;
    /*border-bottom: 1px #969799 solid;*/
  }
  .name {
    float: left;
    color: #000000;
    font-size: 0.28rem;
    padding: 0.2rem 0.2rem;
  }

  .state {
    float: right;
    color: #666666;
    padding: 0.2rem 0.2rem;
    font-weight: bold;
    font-size: 0.28rem;
    letter-spacing: 0.02rem;
    font-weight: Medium;
    /*font-family: PingFang-SC-Medium;*/
    filter:alpha(opacity:50); opacity:0.5;  -moz-opacity:0.5;-khtml-opacity: 0.5
  }

  img {
    width: 1.58rem;
    height: 1.58rem;
    float: left;
    padding: 0.22rem 0.3rem 0rem 0.3rem;
  }

  .project {
    height: 2rem;
  }
  .detail {
    line-height: 0.6rem;
    height: 2rem;
    margin-right: 20pt;
    text-align: left;
    padding: 0.42rem 0.2rem 0rem 0.2rem;
    color: #282C2F;
    font-size: 0.32rem;
    font-weight: Medium;
    font-family: PingFang-SC-Medium;
  }

  .button {
    margin-left: 2.4rem;
    font-size: 0.3rem;
    padding-bottom: 0.2rem
  }

  button {
    height: 0.7rem;
    width: 1.8rem;
    margin-left: 80pt;
    padding: 0.2rem 0.2rem 0.32rem 0.2rem;
    font-size: 0.3rem;
    background-color: #428EF1;
    color: #ffffff;
    border-radius: 0.05rem;
  }
</style>
