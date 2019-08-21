<template>
  <scroll class="mineCollection wrapper recommend-content" v-loading.fullscreen.lock="fullscreenLoading">
    <div>
      <div class="mine-header">
        <ul class="flex-box">
          <li class="box-1"><span :class="{active:active1}" @click="toggleTab('goodsTemp')" >商品收藏</span></li>
          <li class="box-1"><span :class="{active:active2}" @click="toggleTab('activeTemp')">活动收藏</span></li>
        </ul>
      </div>
      <!--<transition name="el-fade-in">-->
      <goods-temp  :is="currentTab" :list="list"></goods-temp>
      <!--</transition>-->
    </div>
  </scroll>
</template>
<script>
  import Scroll from './../components/scroll.vue'
  import axios from 'axios'
  import activeTemp from './components/activeTemp.vue'
  import goodsTemp from './components/goodsTemp.vue'
  export default {
    name: 'mineCollection',
    data () {
      return {
        currentTab: 'goodsTemp',
        isActive: true,
        active1:true,
        active2:false,
        list:[],
        fullscreenLoading: false,
      }
    },
    components: {
      goodsTemp,
      activeTemp,
      Scroll
    },
    methods: {
      getCollection () {
        this.fullscreenLoading = true;
        axios.get('/Home/Person/collect')
          .then(this.getCollectionSucc)
      },
      getCollectionSucc (res) {
        if(res){
          const data = res.data
          this.list = data.data
          this.fullscreenLoading = false
          console.log(data)
        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      toggleTab: function(tab) {
        this.currentTab = tab; // tab 为当前触发标签页的组件名
        switch (tab){
          case 'goodsTemp':
            this.active1 = true
            this.active2 = false
                break
          case 'activeTemp':
            this.active1 = false
            this.active2 = true
                break
        }
      }
    },
    mounted (){
      this.getCollection()
    }
  }
</script>
<style lang="less" scoped>
  .mineCollection{
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
            left:50%;
            bottom:2px;
            transform: translateX(-50%);
            background-color:white;
            border-radius: 2px;
          }
        }
        li:nth-child(2):before{
          content: "";
          display: inline-block;
          width:1px;
          height:14px;
          left:-1px;
          opacity: 0.7;
          background-color:white;
          position:absolute;
          top:50%;
          transform: translateY(-50%);
        }
      }
    }
  }
</style>
