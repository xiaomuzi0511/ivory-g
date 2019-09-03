<template>
  <div id='toolList'>
    <van-nav-bar class="head-comp" title="工具清单" left-text="" left-arrow>
      <van-icon name="arrow-left" class="back" @click="this.$router.go(-1)"/>
    </van-nav-bar>
    <div class="selA" v-if="isTool">
      <div  class="project">
          <van-cell-group>
            <van-cell title="批灰(3)" value="待领取"  :value-class="'待领取'=='待领取'?'value':''"/>

          </van-cell-group>
<!--         <span class="proType">批灰（2）</span> <span :style="'待领取'=='待领取'?'color:#428EF1':'color:#999999'">待领取</span>-->
      </div>
      <div class="toolbar">
        <van-cell-group>
          <van-cell :key=""
                    @click=""
          >
            <van-row>
              <van-col span="6">
                <img src="../../assets/photo/toolManger_03.png"
                />
              </van-col>
              <van-col span="6">
                <div class="numChoose">
                  <van-row>
                    <span class="typeName">水平仪</span>
                  </van-row>
                  <van-row>
                    <span class="size">规格：大</span>
                  </van-row>
                </div>
              </van-col>
              <van-col span="10"></van-col>
              <van-col span="2">
                <div class="num">x1</div>
              </van-col>
            </van-row>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
    <div v-else class='empty'><img src="../../assets/image/fafang_blank.png"/>
    </div>
    <span class="tips" v-if="!isTool">空空如也</span>
    <div class="bott">
        <van-row>
          <van-col span="1"></van-col>
          <van-col span="4">
            <img v-if="headshow" src="../../assets/image/moren-touxiang.png"/>
            <img v-else src="../../assets/image/moren-touxiang.png"/></van-col>
          <van-col span="13">
            <div class="name">
              <van-row>
                <span class="worker">张扬</span>
                <span class="t" style="color: #999999;font-size: 0.28rem">领取人</span>
              </van-row>
            </div>
          </van-col>
          <van-col span="5">
            <span v-if="show" style="color:#999999;font-size: 0.28rem;float: right;margin-top: 0.5rem">2019-05-01</span>
          </van-col>

        </van-row>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'toolList',
    data () {
      return {
        search: '',
        num: [1, 2, 3],
        result: [],
        list: [],
        current: 0,
        isTool: true,
        headshow:false
      }
    },
    created () {
      this.list = [
        {toolType: '水平仪', size: '大', img: '../../assets/photo/conf_img_small_04.png'},
        {toolType: '水平仪', size: '小', img: '../../assets/photo/conf_img_small_04.png'},
        {toolType: '水平仪', size: '小', img: '../../assets/photo/toolManger_03.png'}]
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
        let list = this.list
        let nums = []
        for (let i = 0; i < list.length; i++) {
          nums.push(1)
        }
        this.num = nums
      }
    }
  }
</script>

<style scoped>
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
  .selA {
    margin-top: 0.8rem;
    background-color: #f5f5f5;
    height: 10rem;
    overflow: auto;
  }
  .project {
    margin-top: 0.3rem;
    background-color: #FFFFFF;
  }
  .proType{

  }
  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2.48rem;
  }

  .empty > img {
    width: auto;
    height: 2.68rem;
  }

  .tips {
    font-size: 0.28rem;
    text-align: center;
    width: 100%;
    display: block;
    margin: 0.3rem 0 0 0.2rem;
    color: #666666;
  }

  .toolbar {
  }

  .toolbar >>> .van-row {
    height: 0.5rem;
  }

  /*无法加载http图片是取用本地*/
  .toolbar img {
    padding: 0rem 0rem 0rem 0rem;
    /*margin:0.3rem 0 0.1rem 0;*/
    width: 1.6rem;
    height: 1.6rem;
    border: none;
    background-color: #ffffff;
  }

  .numChoose {
    float: left;
    margin: 0.3rem 0 0rem 0.3rem;
    text-align: center;
  }

  .numChoose .typeName {
    color: #000000;
    font-size: 0.28rem;
  }

  .numChoose .size {
    color: #999999;
    font-size: 0.24rem;
  }
  .num {
    margin: 0.3rem 0 0rem 0rem;
  }


  .bott {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 1.1rem;
    z-index: 9999;
    color: #ffffff;
    background-color: #FFFFFF;
    border-top: 0.01rem #f5f5f5 solid;
  }
  .bott img{
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
  .worker {
    color: #000000;
    font-size: 0.32rem;
  }
  .value{
    color:#428EF1
  }

</style>
