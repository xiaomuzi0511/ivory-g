<template>
  <div id='toolReturnDetail'>
    <van-nav-bar class="head-comp" title="张媛归还清单详情" left-text="" left-arrow>
      <van-icon name="arrow-left" class="back" @click="this.$router.go(-1)"/>
    </van-nav-bar>
    <div class="toolbar">
      <van-cell-group>
        <van-cell v-for="(item, index) in list"  :key="index"
                  @click="toggle(index)"
        >
          <van-row>
            <van-col span="2"></van-col>
            <van-col span="6">
              <img src="../../assets/photo/toolManger_03.png" />
            </van-col>
            <van-col span="8">
              <div class="numChoose">
                <van-row>
                  <span class="typeName">{{item.toolType}}</span>
                </van-row>
                <van-row>
                  <span class="size">规格：大</span>
                </van-row>
              </div>
            </van-col>
            <van-col span="8">
              <div class="num">x{{num[index]}}</div>
            </van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
    </div>
    <span class="remTitle">备注</span>
    <div class="remarks">
        <textarea placeholder="你没有备注哦" disabled>

        </textarea>
    </div>
    <div class="toolInfo">
      <span class="infTitle">工具信息</span>
      <div class="inf">
        <span>工具编号：20190803123</span><br>
        <span>领取时间：2019-05-01</span><br>
        <span>归还时间：2019-05-01</span><br>
        <span>回收时间：2019-05-01</span><br>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'toolReturnDetail',
    data () {
      return {
        search:'',
        num:[1,2,3],
        result: [],
        list: [],
        current: 0,
      }
    },
    created () {
      this.list = [
        {toolType: '水平仪', size: '大', img: '../../assets/photo/toolManger_03.png'},
        {toolType: '水平仪', size: '小', img: '../../assets/photo/toolManger_03.png'},
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
      nums:function(){
        let list=this.list;
        let nums=[];
        for(let i=0; i<list.length; i++){
          nums.push(1);
        }
        this.num=nums;
      }
    }
  }
</script>

<style scoped>
  #toolReturnDetail {
    height: 100%;
    width: 100%;
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
  .toolbar>>>.van-row{
    height: 0.5rem;
  }
  .toolbar>>>.van-image{
    margin-t: 0;
    height: 1.5rem;
    width: 1.5rem;
  }
  .toolbar >>> .van-image__img {
    padding: 0.2rem 0 0.2rem 0;
    /*margin-top: 0.3rem;*/
    height: 1.5rem;
    width: 1.5rem;
  }
  /*无法加载http图片是取用本地*/
  .toolbar img,.toolbar>>>.van-image__error {
    padding: 0.2rem 0rem 0rem 0rem;
    /*margin:0.3rem 0 0.1rem 0;*/
    width: 1.6rem;
    height: 1.6rem;
    border: none;
    background-color: #ffffff;
  }
  .numChoose {
    float: left;
    margin: 0.5rem 0 0rem  0.3rem;
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
  .num{
    margin: 0.65rem 0 0rem 1.5rem;
  }
  .toolbar>>> .van-stepper{
    padding: 1rem 0 0rem 0;
  }
  .remTitle{
    line-height: 0.5rem;
    font-size: 0.28rem;
    color: #666666;
    text-align: left;
    margin-left: 0.3rem;
  }
  .remarks{
    width: 100%;
    background-color: #ffffff;
    min-height: 1rem;
    max-height: 3rem;
    overflow: auto;
    padding: 0.3rem 0 0.3rem 0;
  }
  .remarks span{
    /*margin: 0 0.3rem 0 0.3rem;*/
    /*margin: 0.3rem;*/
    font-size: 0.28rem;
  }
  .toolInfo{
    height: auto;
    margin-top: 0.2rem;
    background-color: #ffffff;
    padding: 0.3rem 0.3rem 0.3rem 0.3rem;
  }
  .infTitle{
    font-size: 0.32rem;
  }
  .inf{
    /*height: 0.8rem;*/
    margin-top: 0.2rem;
    font-size: 0.28rem;
    line-height: 0.5rem;
  }
  .remarks{
    min-height: 1.3rem;
    width:100%;
    background-color: #ffffff;
  }
  .remarks textarea{
    margin: 0.2rem 0 0 0.5rem;
    padding:0 0rem 0rem 0rem;
    min-height: 1.3rem;
    height: auto;
    width:6.5rem;
    background-color: #ffffff;
  }
</style>
