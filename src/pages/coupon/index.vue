<template>
  <scroll class="couponIndex wrapper recommend-content"  v-loading.fullscreen.lock="fullscreenLoading">
    <div>
      <div class="mine-header">
        <ul class="flex-box">
          <li class="box-1"><span :class="{active:active1}" @click="toggleTab('peakAll')" >全部</span></li>
          <li class="box-1"><span :class="{active:active2}" @click="toggleTab('peakNoin')">可使用</span></li>
          <li class="box-1"><span :class="{active:active3}" @click="toggleTab('peakBein')">不可使用</span></li>
        </ul>
      </div>
      <!--<transition name="el-fade-in">-->
      <peak-all :is="currentTab" :list="list" keep-alive></peak-all>
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
    name: 'couponIndex',
    data () {
      return {
        currentTab: 'peakAll',
        isActive: true,
        active1:true,
        active2:false,
        active3:false,
        list: [],
        fullscreenLoading: false
      }
    },
    components: {
      peakAll,
      peakNoin,
      peakBein,
      Scroll
    },
    mounted (){
      this.getCoupon()
    },
    methods: {
      getCoupon () {
        this.fullscreenLoading = true;
        axios.get('/Home/Person/card')
          .then(this.getCouponSucc)
      },
      getCouponSucc (res) {
        if(res){
          const data = res.data
          console.log(data)
          this.list = data.msg
          this.fullscreenLoading = false
        }
      },
      handleClick(tab, event) {
        console.log(tab, event);

      },
      toggleTab: function(tab) {
        this.currentTab = tab; // tab 为当前触发标签页的组件名
        switch (tab){
          case 'peakAll':
            this.active1 = true
            this.active2 = false
            this.active3 = false
            break
          case 'peakNoin':
            this.active1 = false
            this.active2 = true
            this.active3 = false
            break
          case 'peakBein':
            this.active1 = false
            this.active2 = false
            this.active3 = true
            break
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .couponIndex{
    background-color:#f5f5f5;
    position:absolute;
    width:100%;
    height:100%;
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
            border-radius: 2px;
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
          opacity: 0.7;
          right:-1px;
          background-color:white;
          position:absolute;
          top:50%;
          transform: translateY(-50%);
        }
      }
    }

  }
</style>
