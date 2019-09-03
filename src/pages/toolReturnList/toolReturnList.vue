<template>
  <div id='confirmTake'>
    <div class="head">
      <van-icon name="arrow-left" class="back"/>
      <van-search class="searchInput" placeholder="请输入搜索关键词" v-model="value"/>
      <!--        <em><input v-model="searchTool" type="text" placeholder="搜索项目所需工具"/></em>-->
    </div>
    <van-cell-group>
      <div is-link @click="getRemarks('/returnToolRemarks/returnToolRemarks',1)">
        <van-cell title="备注" icon="edit" value="改这一行的">
          <van-icon
            center="false"
            slot="right-icon"
            name="arrow"
            style="line-height: inherit;"
          />
        </van-cell>
      </div>
    </van-cell-group>
    <div class="toolType">
      <div class="toolType-types">
        <van-tabs>
          <van-tab v-for="(item,index) in toolTypelist">
            <div slot="title" v-on:click="addClass(index)" :class="{ selected:index==current}">
              {{item.name}}
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="toolbar">
      <van-cell-group>
        <van-cell v-for="(item, index) in list"  :key="index"
                  @click="toggle(index)"
        >
          <van-row>
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
            <van-col span="2"></van-col>
            <van-col span="8">
              <div class="num">x{{num[index]}}</div>
            </van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="bott">
        <van-button type="info" style="">回收工具</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'confirmTake',
    data () {
      return {
        num: [1, 1, 1, 1, 1],
        result: [],
        searchTool: '',
        list: [],
        projectList: [],
        toolTypelist: [{name: '已归还工具(10)'}, {name: '未归还工具(2)'}],
        current: 0,
        value:''
      }
    },
    mounted(){
      this.num = this.$route.query.num;
    },
    created () {
      this.list = [
        {toolType: '水平仪', size: '大', img: '../../assets/photo/toolManger_03.png'},
        {toolType: '水平仪', size: '大', img: '../../assets/photo/toolManger_03.png'},
        {toolType: '锯子', size: '小', img: '../../assets/photo/toolManger_03.png'},
        {toolType: '水平仪', size: '小', img: '../../assets/photo/toolManger_03.png'},
        {toolType: '水平仪', size: '小', img: '../../assets/photo/toolManger_03.png'}]
      //
      this.projectList = [
        {title: '批灰墙身', img: '../../assets/photo/toolManger_03.png', num: 3},
        {title: '批灰墙身', img: '../../assets/photo/toolManger_03.png', num: 10}]
    },
    methods: {
      toggle (index) {
        this.$refs.checkboxes[index].toggle()
      },
      addClass (v) {
        // debugger
        this.current = v
      },
      back () {
        this.$router.go(-1)
      },
      getRemarks(path,id){
        this.$router.push({path:path,query:{num:id}});
      }
    }
  }
</script>

<style scoped>
  #confirmTake {
    /*display: contents;*/
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    /*background-color: #F5F5F5;*/
    /*border: 1px solid #000000;*/
  }

  .head /*头部*/
  {
    width: 7.5rem;
    height: 0.88rem;
    font-weight: bold; /*字体加粗*/
    /*padding: 0.3rem;*/
    font-size: 0.36rem;
    line-height: 0.3rem;
    background-color: #ffffff;
    display: inline;
  }

  .back {
    padding: 0.35rem 0.3rem 0.35rem 0.3rem;
    float: left;
  }

  .searchInput {
    width: 6.2rem;
  }

  .searchInput >>> .van-search__content--square {
    border-radius: 0.6rem;
  }

  .toolType {
    width: auto;
    height: 1.2rem;
    background-color: #F5F5F5;
    padding-left: 0.28rem;
  }

  .toolType-types >>> .van-tabs {
    color: #333333;
    height: 0.6rem;
    line-height: 0.6rem;
    /*background-color:#4D7EBE;*/
    background-color: #F5F5F5;
    padding: 0.3rem 0.1rem 0.3rem 0;
    margin-right: 0.2rem;
  }

  .toolType-types >>> .van-tabs__line {
    background-color: #F5F5F5;
    width: auto;
  }

  .toolType-types >>> .van-tab {
    width: auto;
    background-color: #F5F5F5;
    padding-left: 0rem;
    border: none;
    color: #f7f8fa;
    line-height: 0.6rem;
    display: block;
  }

  .toolType-types >>> .van-ellipsis {
    height: 0.6rem;
    width: auto;
    background-color: #ffffff;
    color: #333333;
  }

  .selected {
    height: 0.6rem;
    width: auto;
    background-color: #4D7EBE;
    color: #ffffff;
  }
  .toolbar{
    height: 9rem;
    overflow: auto;
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
    padding: 0rem 0rem 0rem 0rem;
    /*margin:0.3rem 0 0.1rem 0;*/
    width: 1.6rem;
    height: 1.6rem;
    border: none;
    background-color: #ffffff;
  }
  .numChoose {
    float: left;
    margin: 0.3rem 0 0rem  0.3rem;
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
    float: right;
    margin: 0.5rem 0 0rem 1.5rem;
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
</style>


