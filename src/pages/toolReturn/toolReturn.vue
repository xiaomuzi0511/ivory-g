<template>
  <div id='toolReturn'>
    <van-nav-bar class="head-comp" title="归还工具列表" left-text="" left-arrow>
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
              <van-row class="user">
                <van-col span="1"></van-col>
                <van-col span="4">
                  <img v-if="headshow" :src="item.project[index].img"/>
                  <img v-else src="../../assets/image/moren-touxiang.png"/></van-col>
                <van-col span="10">
                  <div class="numChoose">
                    <van-row>
                      <span class="worker">{{item.project[index].worker}}</span>
                    </van-row>
                  </div>
                </van-col>
                <van-col span="">
                  <span class="take"><van-button type="info" is-link @click="getReturnList('/toolReturnList/toolReturnList',1)">回收工具</van-button></span>
                </van-col>
              </van-row>
              <van-row class="chart">
                <van-col span="8">
                  <span>06</span><br>
                  <span style="color:#999999">全部(件)</span>
                </van-col>
                <van-col span="8" class="return">
                  <span>06</span><br>
                  <span style="color:#999999">归还(件)</span>
                </van-col>
                <van-col span="8">
                  <span>06</span><br>
                  <span style="color:#999999">未归还(件)</span>
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
    name: 'toolReturn',
    data () {
      return {
        headshow: false,
        list: [],   //初始数据
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
      getReturnList (path,id) {
        this.$router.push({path:path,query:{num:id}});
      }
    }
  }
</script>

<style scoped>
  #toolReturn {
    height: 100%;
    width: 100%;
    background-color: #F5F5F5;
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
    margin: 0rem 0 0rem 0;
    border-radius: 50%;
  }
  .project {
    margin: 0rem;
    background-color: #FFFFFF;

  }
  .toolbar{
    margin: 0;
    padding: 0;
  }
  .user{
    margin: 0;
    height: 1rem;
    border-bottom: #cacaca 0.001rem solid;
  }
  .return{
    border-left: #cacaca 0.001rem solid;
    border-right: #cacaca 0.001rem solid;
  }
  .toolbar>>>.van-cell{
    padding: 0.1rem 0 0 0;margin: 0;
  }
  .chart{
    margin: 0;
    text-align: center;
  }
  .chart>>>.van-col{
    height: 1.5rem;
  }

  .numChoose {
    float: left;
    margin: 0.2rem 0rem 0rem 0rem;
    text-align: center;
  }

  .numChoose .worker {
    margin: 0;
    padding: 0;
    color: #000000;
    font-size: 0.28rem;
  }

  .take {
    margin-top: 0.1rem;
    margin-left: 0.5rem;
    text-align: right;
    float: right;
    border: none;
    padding: 0;
  }
  .take>>> .van-button{
    line-height: 0.6rem;
    font-size: 0.28rem;
    width: 1.8rem;
    height: 0.6rem;
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

