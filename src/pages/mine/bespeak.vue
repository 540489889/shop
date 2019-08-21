<template>
  <scroll class="minePeak wrapper recommend-content" >
    <div>
      <div class="mine-header">
        <ul class="flex-box">
          <li class="box-1"><span :class="{active:active1}" @click="toggleTab('peakAll')" >全部</span></li>
          <li class="box-1"><span :class="{active:active2}" @click="toggleTab('peakNoin')">未参与</span></li>
          <li class="box-1"><span :class="{active:active3}" @click="toggleTab('peakBein')">已参与</span></li>
        </ul>
      </div>
      <!--<transition name="el-fade-in">-->
      <peak-all
        :is="currentTab"
        @changeCancleClick="cancleClick"
        :list="list" keep-alive></peak-all>
      <!--</transition>-->
    </div>
  </scroll>
</template>
<script>
  import Scroll from './../components/scroll.vue'
  import peakAll from './components/peakAll.vue'
  import peakNoin from './components/peakNoIn.vue'
  import peakBein from './components/peakBeIn.vue'
  import axios from 'axios'
  export default {
    name: 'mineBespeak',
    data () {
      return {
        list: [],
        currentTab: 'peakAll',
        isActive: true,
        active1:true,
        active2:false,
        active3:false,
      }
    },
    components: {
      peakAll,
      peakNoin,
      peakBein,
      Scroll
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //取消订单
      cancleClick(id){
        let _this = this
        axios.get('/Home/Person/Cancleappoint?id='+id)
          .then(function (res) {
            console.log(res)
            let data = res.data
            if(data.status){
              _this.$notify({
                title: '成功',
                type: 'success',
                message: data.msg,
                showClose: false,
                duration: 1000,
                onClose: function () {
                  _this.getBespeak('all')
                }
              });
            }else{
              _this.$notify({
                title: '错误',
                type: 'error',
                message: data.msg,
                showClose: false,
                duration: 1000,
                onClose: function () {
                }
              });
            }
          })
      },
      toggleTab: function(tab,status) {
        this.currentTab = tab; // tab 为当前触发标签页的组件名
        switch (tab){
          //全部
          case 'peakAll':
            this.active1 = true
            this.active2 = false
            this.active3 = false
            this.getBespeak('all')
            break
          //未参与
          case 'peakNoin':
            this.active1 = false
            this.active2 = true
            this.active3 = false
            this.getBespeak(1)
            break
          //已参与
          case 'peakBein':
            this.active1 = false
            this.active2 = false
            this.active3 = true
            this.getBespeak(2)
            break
        }
      },
      getBespeak (status) {
        this.fullscreenLoading = true;
        axios.get('/Home/Person/Myappoint?status='+status)
          .then(this.getBespeakSucc)
      },
      getBespeakSucc (res) {
        if(res){
          const data = res.data
          this.list = data.msg
          this.fullscreenLoading = false
          console.log(this.list)
        }
      },
    },
    mounted (){
      this.getBespeak('all')
    }
  }
</script>
<style lang="less" scoped>
  .minePeak{
    position:absolute;
    width:100%;
    height:100%;
    background-color:#f5f5f5;
    .mine-header{
      background-color:#3ac5fa;
      color:white;
      ul{
        li{
          line-height:0.9rem;
          text-align: center;
          position:relative;
          span{
            position:relative;
            padding:10px 0;
          }
          .active:before{
            content: "";
            position:absolute;
            width:18px;
            height:4px;
            border-radius:2px;
            left:50%;
            bottom:2px;
            transform: translateX(-50%);
            background-color:white;
          }
        }
        li:nth-child(2):before{
          content: "";
          display: inline-block;
          width:1px;
          height:14px;
          left:-1px;
          background-color:white;
          position:absolute;
          top:50%;
          transform: translateY(-50%);
          opacity: 0.7;
        }
        li:nth-child(2):after{
          content: "";
          display: inline-block;
          width:1px;
          height:14px;
          right:-1px;
          background-color:white;
          position:absolute;
          top:50%;
          opacity: 0.7;
          transform: translateY(-50%);
        }
      }
    }

  }
</style>
