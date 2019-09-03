<template>
  <div id='returnToolRemarks'>
    <van-nav-bar  title="备注"   class="head-comp" left-text="" left-arrow>
      <van-icon name="arrow-left"  class="back" @click="back()"/>
    </van-nav-bar>
    <div class="worker">
      <van-row>
        <van-col span="1"></van-col>
        <van-col span="4">
          <img v-if="headshow" src="../../assets/image/moren-touxiang.png"/>
          <img v-else src="../../assets/image/moren-touxiang.png"/></van-col>
        <van-col span="13">
          <div class="name">
            <van-row>
              <span class="worker-name">张扬</span>
            </van-row>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="projects">
      <div class="project" v-for="item in projects">
        <img src="../../assets/photo/toolManger_03.png"  class="img"/>
        <div class="detail">
          <div>{{item.projectType}}</div>
        </div>
      </div>
    </div>
    <div class="requirement">
      <textarea placeholder="请输入你的需求" v-if="isCommit" v-model="req"></textarea>
      <textarea v-if="!isCommit" readonly :placeholder=req></textarea>
    </div>
    <div class="bott" v-if="isCommit">
      <van-button type="info"  @click="remarkShow" style="">提交</van-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'returnToolRemarks',
    data () {
      return {
        projects: [],
        headshow:true,
        isCommit:true,
        req:''

      }
    },
    created () {
      this.projects = [
       {
          img: '../assets/photo/toolManger_03.png', projectType: '批灰墙身', joinMember: 20
        }
      ]
    },
    methods: {
      toggle (index) {
        this.$refs.checkboxes[index].toggle()
      },
      addClass (v) {
        // debugger
        this.current = v
      },
      nums: function () {
        let nums = this.num
        for (let i = 0; i < list.length; i++) {
          this.list.num[i] = nums[i]
        }
      },
      back () {
        this.$router.go(-1)
      },
      remarkShow(){
        this.isCommit=false
        this.req
        debugger
      }

    }
  }
</script>

<style scoped>

  #returnToolRemarks {
    /*height: 100%;*/
    width: 100%;
    background-color: #F5F5F5;
  }
  .head-comp {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .head-comp >>> .mint-header {
    background: #ffffff;
    color: #000;
    font-size: 0.36rem;
    height: 0.88rem;
  }

  .back {
    padding: 0.3rem 0.3rem 0rem 0.3rem;
    float: left;
  }
  .van-icon{
    color: #000000;
  }
  .worker {
    height: 1.3rem;
    margin-top: 1.1rem;
    background-color: #ffffff;
    margin-bottom: 0.2rem;
    border-radius: 0.1rem;
  }
  .worker img{
    height: 0.86rem;
    width: 0.86rem;
    /*margin-left: 0.1rem;*/
    padding-left: 0rem;
    margin-top: 0.3rem;
    margin: 0.2rem 0 0.2rem 0;
    border-radius: 50%;
  }
  .name {
    float: left;
    margin: 0.5rem 0rem 0rem 0rem;
    text-align: center;
  }
  .worker-name {
    color: #000000;
    font-size: 0.32rem;
  }
  .projects {
    margin-top: 0.2rem;
    background-color: #ffffff;
    margin-bottom: 0.2rem;
    border-radius: 0.1rem;
  }

  .project {
    height: 1.1rem;
  }

  .img {
    width: 0.66rem;
    height: 0.66rem;
    float: left;
    padding: 0.22rem 0.3rem 0rem 0.3rem;
  }

  .detail {
    line-height: 0.66rem;
    height: 1.1rem;
    margin-right: 20pt;
    text-align: left;
    padding: 0.15rem 0.2rem 0rem 0.2rem;
    color: #282C2F;
    font-size: 0.28rem;
    font-weight: Bold;
    font-family: PingFang-SC-Medium;
  }

  .bott {
    position: fixed;
    margin: 0;
    padding: 0;
    bottom: 0px;
    width: 100%;
    height: 0.98rem;
    z-index: 9999;
    color: #ffffff;
    /*border-top:1px solid  #969799;*/
    /*box-shadow: #969799 1px 0 0 0 ;*/
  }
  .bott >>> .van-button {
    width: 100%;
    height: 0.98rem;
    line-height: 0.98rem;
    font-size: 0.36rem;
    /*font-family: PingFang-SC-Medium;*/
    /*font-weight: Medium;*/
  }
  .requirement {
    height: 7.18rem;
    width: 100%;
    background-color: #ffffff;
  }
  .requirement textarea{
    margin-top: 0.3rem;
    margin-left: 0.4rem;
    padding: 0rem 0rem 0rem 0.rem;
    height: 6.5rem;
    width: 90%;
  }
</style>

