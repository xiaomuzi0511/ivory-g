<template>
  <div id='releaseTool'>
    <van-nav-bar class="head-comp" title="发放工具列表" left-text="" left-arrow>
      <van-icon name="arrow-left" class="back" @click="this.$router.go(-1)"/>
    </van-nav-bar>
    <div class="selA" v-if="isTool">
      <div v-for="(item, index) in list" class="project">
        <div class="all">
          <van-checkbox @click="sel_check(item.project)" v-model="sel2">{{item.projectname}}({{item.num}})
          </van-checkbox>
        </div>
        <div class="toolbar">
          <van-checkbox-group v-model="result" class="sel">
            <van-cell-group>
              <van-cell clickable :key="item2" v-for="(item2,index2) in item.project"
                        @click="toggle(index2)"
              >
                <van-row>
                  <van-col span="2">
                    <van-checkbox
                      :name="item"
                      ref="checkboxes"
                      label-position="left"
                      class="checkIcon"
                    />
                  </van-col>
                  <van-col span="5">
                    <img v-if="headshow" :src="item2.img"/>
                    <img v-else src="../../assets/image/moren-touxiang.png"/></van-col>
                  <van-col span="6">
                    <div class="numChoose">
                      <van-row>
                        <span class="worker">{{item2.worker}}</span>
                      </van-row>
                    </div>
                  </van-col>
                </van-row>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </div>
    </div>
    <div v-else class='empty'><img src="../../assets/image/fafang_blank.png"/>
    </div>
    <span class="tips" v-if="!isTool">发放工具列表已清空</span>
    <div class="bott" v-if="isTool">
      <van-row type="flex" justify="space-between">
        <van-col span="" style="" class="ff">
          <div class="selAll">
            <van-checkbox @click="sel_check(-1)" v-model="sel">{{selectAll}}</van-checkbox>
          </div>
        </van-col>
        <van-col span="" class="bb" style="">
          <van-button type="info" style="" @click="showPopup">发放工具</van-button>
        </van-col>
      </van-row>
    </div>
    <van-popup
      v-model="show"
      position="bottom"
      class="popup-div"
    >
      <div class="p-toolbar">
        <van-checkbox-group v-model="chooseresult" >
          <van-cell-group>
            <van-cell v-for="(item, index) in list" clickable :key="index"
                      @click="toggle(index)"
            >
              <van-row>
                <van-col span="2"><van-checkbox
                  :name="item"
                  ref="toolCheckboxes"
                  label-position="left"
                  class="p-checkIcon"
                /></van-col>
                <van-col span="6"><img src="../../assets/photo/toolManger_03.png"/>
                </van-image></van-col>
                <van-col span="8">
                  <div class="p-numChoose">
                    <van-row>
                      <span class="p-typeName">批灰墙身</span>
                    </van-row>
                    <van-row>
                      <span class="p-size">规格：大</span>
                    </van-row>
                  </div>
                </van-col>
                <van-col span="8">
                  <van-stepper v-model="value" />
                </van-col>
              </van-row>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
    </van-popup>
    <div class="bott" v-if="show">
      <van-row type="flex" justify="space-between">
        <van-col span="" style="" class="ff">
          <div class="selAll">
            <van-checkbox @click="sel_tool(-1)" v-model="sel">{{selectAll}}</van-checkbox>
          </div>
        </van-col>
        <van-col span="" class="bb" style="">
          <van-button type="info" style="" @click="showPopup">确定</van-button>
        </van-col>
      </van-row>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'releaseTool',
    data () {
      return {
        headshow: false,
        selectAll: '全选',
        sel2: false,
        sel: false,
        search: '',
        result: [],
        chooseresult: [],
        list: [],
        current: 0,
        isTool: true,
        show: false,
        value:1
      }
    },
    created () {
      this.list = [
        {
          projectname: '批灰墙身', project: [{img: '../../assets/image/moren-touxiang.png', worker: '张扬', k: 21},
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
      sel_check (index) {
        if (index == -1) {  //全选
          if (!sel) {
            this.result = this.arr
            this.sel = true
            this.selectAll = '取消'
          } else {
            this.result = []
            this.selectAll = '全选'
          }

        } else {  //局部全选
          this.result.push(list[index])
        }
      },
      sel_tool(toolindex){

      },
      showPopup () {
        this.show = true
      }
    }
  }
</script>

<style scoped>
  #releaseTool {
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
    padding-top: 0.2rem;
    margin: 0.2rem;
  }

  .selA {
    margin-top: 0.2rem;
    /*background-color: #ffffff;*/
    height: 10rem;
    overflow: auto;
  }

  .selA >>> .van-checkbox {
    margin-left: 0.15rem;
    color: #000000;
    font-size: 0.28rem;
    border: none;
  }

  .selA img {
    height: 0.86rem;
    width: 0.86rem;
    /*margin-left: 0.1rem;*/
    padding-left: 0.3rem;
    margin-top: 0.3rem;
    border-radius: 50%;
  }


  .selA >>> .van-checkbox span {
    padding: 0 0 0 0.2rem;
  }

  .project {
    margin: 0.2rem;
    background-color: #FFFFFF;
  }

  .toolbar {
    /*height: 10rem;*/
    /*overflow: auto;*/
  }

  .toolbar >>> .van-cell {
    border: none;
  }

  .toolbar >>> .van-cell--clickable {
    padding: 0 0 0rem 0.2rem;
    height: 1.3rem;
  }

  .toolbar >>> .van-row {
    height: 0.5rem;
  }

  .checkIcon {
    margin: 0.5rem 0 0rem 0rem;
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

  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2.48rem;
  }
  .tips{
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

  .bott >>> .van-button {
    height: 0.8rem;
    line-height: 0.8rem;
  }

  .bott .ff {
    color: #428EF1;
    font-size: 0.28rem;
    padding: 0.2rem 0rem 0 0.3rem;
    line-height: 1.1rem
  }

  .bott .bb {
    padding: 0.1rem 0.3rem 0rem 0rem;
    line-height: 0.8rem;
  }

</style>
<style scoped>
  .popup-div{
    max-height: 60%;
    min-height: 20%;
    padding-bottom: 1rem;
    overflow: auto;
  }
  .p-toolbar>>>.van-cell--clickable{
    padding: 0 0  0 0.32rem;
  }
  .p-toolbar>>>.van-row{
    height: 0.5rem;
  }
  .p-toolbar>>>.van-image{
    padding:;
    margin-t: 0;
    height: 1.5rem;
    width: 1.5rem;
  }
  .p-toolbar >>> .van-image__img {
    padding: 0.2rem 0 0.2rem 0;
    /*margin-top: 0.3rem;*/
    height: 1.5rem;
    width: 1.5rem;
  }
  /*无法加载http图片是取用本地*/
  .p-toolbar img,.p-toolbar>>>.van-image__error {
    padding: 0.3rem 0rem 0rem 0.2rem;
    /*margin:0.3rem 0 0.1rem 0;*/
    width: 1.6rem;
    height: 1.6rem;
    border: none;
    background-color: #ffffff;
  }

  .p-checkIcon{
    margin: 0.82rem 0 0rem  0rem;
  }
  .p-numChoose {
    float: left;
    margin: 0.8rem 0 0rem  0.3rem;
    text-align: center;
  }
  .p-numChoose .typeName {
    color: #000000;
    font-size: 0.28rem;
  }
  .p-numChoose .p-size {
    color: #999999;
    font-size: 0.24rem;
  }
  .p-toolbar>>> .van-stepper{
    padding: 1rem 0 0rem 0;
  }
</style>

