<template>
  <scroll class="recommend-content" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="mineNews wrapper">
      <div class="mine-header">
        <ul class="flex-box">
          <li class="box-1"><span >系统消息</span></li>
        </ul>
      </div>
      <div class="newsList">
        <ul>
          <li v-for="item in list" v-bind:key="item.id">
            <h4 class="state-1 flex-box">{{item.title}}<span>{{parseInt(item.add_time)*1000 | formatDate}}</span></h4>
            <p>{{item.info}}</p>
          </li>
          <!--<li>-->
            <!--<h4 class="state-2 flex-box">志愿者审批成功 <span>2018-12-06</span></h4>-->
            <!--<p>亲爱的用户，系统已收到你的申请，工作人员会尽快审核，请注意及时查收消息。</p>-->
          <!--</li>-->
        </ul>
      </div>
    </div>
  </scroll>
</template>
<script>
  import './../../assets/js/date'
  import {formatDate} from './../../assets/js/formTime.js';
  import Scroll from './../components/scroll.vue'
  import axios from 'axios'
  export default {
    name: 'mineNews',
    data () {
      return {
        fullscreenLoading: false,
        list: []
      }
    },
    components: {
      Scroll
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {

      getNews () {
        this.fullscreenLoading = true;
        axios.get('/Home/Person/information')
          .then(this.getNewsSucc)
      },
      getNewsSucc (res) {
        if(res){
          const data = res.data
          console.log(data)
          this.list = data.msg
          this.fullscreenLoading = false
        }
      }
    },
    mounted (){
      this.getNews()
    }
  }
</script>
<style lang="less" scoped>
  .mineNews{
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
            width:10px;
            height:2px;
            left:50%;
            bottom:2px;
            transform: translateX(-50%);
            background-color:white;
          }
        }
        li:nth-child(2):before{
          content: "";
          display: inline-block;
          width:2px;
          height:10px;
          left:-1px;
          background-color:white;
          position:absolute;
          top:50%;
          transform: translateY(-50%);
        }
      }
    }
    .newsList{
      ul{
        li{
          background-color:white;
          padding:10px;
          margin-bottom:10px;
          h4{
            padding-bottom:10px;
            border-bottom:1px solid #eee;
            justify-content: space-between;
            span{
              color:#999;
            }
          }
          p{
            color:#506187;
            margin-top:10px;
          }
          .state-1{
            color:#11b1ee;
          }
          .state-2{
            color:#ee886d;
          }
        }
      }
    }
  }
</style>
