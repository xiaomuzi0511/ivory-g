<template>
  <div id='searchTool'>
    <div class="head">
      <span class="cancel">取消</span>
      <van-search type="text" class="searchInput" placeholder="搜索项目所需工具" v-model="search"/>
      <!--        <em><input v-model="searchTool" type="text" placeholder="搜索项目所需工具"/></em>-->
    </div>
    <div class="his-info">
      <div class="his-head">
        <span class="his-title">历史搜索</span>
        <span class="his-clear" @click="clear">清除</span>
      </div>
      <div class="his-record">
        <van-tag text-color="#333333" color="#F5F5F5" v-for="(item,index) in data">{{data[index]}}</van-tag>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'searchTool',
    data () {
      return {
        search: '',
        data: []
      }
    },
    created () {
      this.data = ['石膏板项目', '石膏板项目', '墙身', '墙身', '石膏板项目', '石膏板项目', '石膏板项目']
    },
    methods: {
      clear: function () {
        this.data = []
      }
    }
  }
</script>

<style scoped>
  #searchTool {
    height: 100%;
    width: 100%;
    text-align: left;
    background-color: #ffffff;
  }

  .head /*头部*/
  {
    width: 100%;
    height: 0.88rem;
    font-weight: bold; /*字体加粗*/
    /*padding: 0.3rem;*/
    font-size: 0.36rem;
    line-height: 0.3rem;
    background-color: #ffffff;
  }

  .cancel {
    padding: 0.4rem 0.3rem 0rem 0.3rem;
    float: right;
    display: inline;
    height: 0.6rem;
    font-size: 0.32rem;
    color: #333333;
    font-family: PingFang-SC-Medium;
    font-weight: Medium;
    filter: alpha(opacity:70);
    opacity: 0.7;
    -moz-opacity: 0.7;
    -khtml-opacity: 0.7
  }

  .his-info {
    width: 100%;
    height: 12.04rem;
    margin-top: 1px;
  }

  .searchInput {
    width: 6.2rem;
    float: left;
  }

  .searchInput >>> .van-search__content--square {
    border-radius: 0.6rem;
  }

  .his-head {
    width: 100%;
    height: 1.16rem;
    line-height: 1.16rem;
  }

  .his-title {
    line-height: 1.16rem;
    font-size: 0.32rem;
    padding-left: 0.3rem;
    float: left;
  }

  .his-clear {
    height: 1.16rem;
    background-color: #fffffff;
    line-height: 1.16rem;
    font-size: 0.28rem;
    color: #FC3203;
    background-color: #ffffff;
    float: right;
    margin-right: 0.5rem;
    padding: 0;
  }

  .his-record {
    padding: 0.2rem 0.3rem 0rem 0.3rem;
    margin: 0;
  }

  .his-record >>> .van-tag {
    margin: 0 0.2rem 0.3rem 0;
    height: 0.45rem;
    line-height: 0.45rem;
  }

  .his-record >>> .van-tag span {
    filter: alpha(opacity:30);
    opacity: 0.3;
    -moz-opacity: 0.3;
    -khtml-opacity: 0.3;
  }
</style>


