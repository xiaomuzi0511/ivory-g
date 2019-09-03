<template>
  <div id='releaseToolList'>
    <van-nav-bar class="head-comp" title="发放列表" left-text="" left-arrow>
      <van-icon name="arrow-left" class="back" @click="this.$router.go(-1)"/>
    </van-nav-bar>
    <div class="selA" v-if="isTool">
      <div v-for="(item, index) in list" class="project">
        <div class="all">
          {{item.projectname}}({{item.num}})
        </div>
        <div class="toolbar">
          <van-cell-group>
            <van-cell>
              <van-row>
                <van-col span="1"></van-col>
                <van-col span="4">
                  <img v-if="headshow" :src="item.project[index].img"/>
                  <img v-else src="../../assets/image/moren-touxiang.png"/></van-col>
                <van-col span="6">
                  <div class="numChoose">
                    <van-row>
                      <span class="worker">{{item.project[index].worker}}</span>
                    </van-row>
                  </div>
                </van-col>
                <van-col span="5"></van-col>
                <van-col span="5" class="take" @click="">
                  <span :style="'待领取'=='待领取'?'color:#428EF1':'color:#999999'">待领取</span>
                  <van-icon class="take-icon" name="arrow" size="0.3rem"/>
                </van-col>
              </van-row>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </div>
    <div v-else class='empty'><img src="../../assets/image/fafang_blank.png"/>
    </div>
    <span class="tips" v-if="!isTool">发放工具列表已清空</span>
  </div>

</template>
<script>
  export default {
    name: 'releaseToolList',
    data () {
      return {
        headshow: false,
        list: [] ,  //初始数据
        isTool: true,
        num: []   //
      }
    },
    created () {
      this.list = [
        {
          projectname: '批灰墙身', project: [
            {img: '../../assets/image/moren-touxiang.png', worker: '张扬', k: 21}], num: 2
        },
        {
          worker: '张扬', projectname: '批灰墙身', project: [
            {img: '../../assets/image/moren-touxiang.png', worker: '张扬', k: 23},
            {img: '../../assets/image/moren-touxiang.png', worker: '张扬', k: 34}], num: 2
        }]


    },
    methods: {
      toggle (index) {
        this.$refs.checkboxes[index].toggle()
      },
      nums: function () {
        let nums = this.num
        for (let i = 0; i < list.length; i++) {
          this.list.num[i] = nums[i]
        }
      },
      sel_check (index) {

      }
    },
    mounted () {

    }
  }
</script>

<style scoped>
  #releaseToolList {
    height: 100%;
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

  .all {
    width: 100%;
    padding: 0.1rem 0.2rem 0.2rem 0.2rem;
    background-color: #f5f5f5;
  }

  .selA {
    margin-top: 0rem;
    background-color: #f5f5f5;
    height: 10rem;
    overflow: auto;
  }

  .selA img {
    height: 0.86rem;
    width: 0.86rem;
    /*margin-left: 0.1rem;*/
    padding-left: 0rem;
    margin-top: 0.3rem;
    margin: 0.2rem 0 0.2rem 0;
    border-radius: 50%;
  }


  .project {
    margin: 0.2rem;
    background-color: #FFFFFF;

  }
  .toolbar{
    height: 1.6rem;
    margin: 0;
    padding: 0;
  }
  .toolbar>>>.van-cell{
    height: 1.6rem;
  }
  .numChoose {
    float: left;
    margin: 0.4rem 0rem 0rem 0rem;
    text-align: center;
  }

  .numChoose .worker {
    margin: 0;
    padding: 0;
    color: #000000;
    font-size: 0.28rem;
  }

  .take {
    line-height: 0.3rem;
    text-align: right;
    margin: 0.4rem;
  }

  .take >>> .van-icon {
    color: #CCCCCC;
  }

  .take span {
    border: none;
    padding: 0;
    margin-right: 0.1rem;
  }

  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2.48rem;
  }

  .tips {
    font-size: 0.28rem;
    text-align: center;
    width: 100%;
    display: block;
    margin-top: 0.3rem;
    color: #666666;
  }

  .empty > img {
    width: auto;
    height: 2.68rem;
  }

</style>
