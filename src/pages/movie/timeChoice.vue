<template>
  <scroll class="timeChoiceWrapper recommend-content" :scrollY="scrollY">
    <div class="whole">
      <header class="header text-center">
        <h4 class="names">{{msg.title}}</h4>
        <!--<p>{{msg.duration}}分钟</p>-->
      </header>

      <div class="film-length">
        <span>片长：{{msg.duration}}分钟</span>
        <span class="imax">{{msg.filmhall}}</span>
      </div>

      <div class="tips">温馨提示：电影开场前30分钟关闭在线售票</div>

      <div class="tab date">
        <!---tab日期标签滑动--->
        <scroll id="J_MenuX" :scrollX="scrollX" :listenScroll="listenScroll">
          <ul class="xs-content nav nav-pills nav-justified" id="menus_xx" _xx="0">
            <li v-if="item.start_time" :class="[index==indexTime? 'cur':'']" v-for="(item,index) in timeList" v-bind:key="item.id" @click="checkTime(index)">{{item.start_time.substring(5,10)}}</li>
          </ul>
        </scroll>
        <!---tab标签滑动END--->
      </div>
      <div class="tickets-list">
        <ul>
          <li class="flex-box" v-for="item in childTime" v-bind:key="item.id">
            <div class="ticket-info">
              <span class="start" v-if="item.start_time">{{item.start_time.substring(11,16)}}</span>
              <span class="styles">{{msg.filmhall}}</span>
              <span v-if="item.end_time">{{item.end_time.substring(11,16)}}(结束)</span>
              <span>科技馆</span>
            </div>
            <div class="buy-btn box-1 flex-box">
              <span class="box-1">￥{{msg.price}}</span>
              <button tag="button" @click="chooseSeatTo(msg.id,item.id,msg.cid)" type="button" >购票</button>
            </div>
          </li>

        </ul>
      </div>

    </div>
  </scroll>
</template>
<script>
  import {formatDate} from '../../assets/js/formTime.js';
  import axios from 'axios'
//  import menuX from  "./../../assets/js/menu_x"
  import Scroll from './../components/scroll.vue'
  export default{
    name: 'MovieTimeChoice',
    data (){
      return {
        scrollX: true,
        scrollY: true,
        listenScroll: true,
        list: [1,2],
        msg:{},
        timeList:[],
        childTime:[],
        indexTime:0,
      }
    },
    components: {
      Scroll,
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy年MM月dd日');
      }
    },
    methods: {
      //时间选择
      checkTime(index){
        this.indexTime = index
        this.childTime = this.timeList[index].time
      },
      chooseSeatTo(id,time_id,cid){
        console.log(cid)
        if(cid==1){
          this.$router.push({ path: '/movie/chooseSeat', query: { id: id,time_id:time_id }});
        }
        if(cid==2){
          this.$router.push({ path: '/movie/chooseSeat4D', query: { id: id,time_id:time_id }});
        }
        if(cid==3){
          this.$router.push({ path: '/movie/chooseSeatXd', query: { id: id,time_id:time_id }});
        }
      },
      getTimeChoice () {
        let params = new URLSearchParams()
        let id = this.$route.query.id
        params.append('id',id);
        this.fullscreenLoading = true;
        axios.get('/Home/Film/chooseTime?id='+id)
          .then(this.getTimeChoiceSucc)
      },
      getTimeChoiceSucc (res) {
        if(res){
          this.fullscreenLoading = false
          const data = res.data
          this.msg = data.msg
          this.timeList = data.time
          this.checkTime(0)//初始化
          console.log(data)
        }
      },
    },
    mounted (){
      this.getTimeChoice()
    }
  }
</script>
<style lang="less" scoped>
  .timeChoiceWrapper{
    color:#506187;
    .whole{
      overflow:hidden;
    }
    header{
      overflow:hidden;
      width:100%;
      background-color:#fff;
      border-bottom:1px solid #e2e2e2;
      padding:10px;
    }
    header h4{
      text-align:center;
      font-size:18px;
      margin-bottom:8px;
    }
    .film-length{
      float:left;
      overflow:hidden;
      width:100%;
      height:50px;
      color:#ccc;
      line-height:50px;
      background-color:#fff;
    }
    .film-length >span{
      padding-left:36px;
    }
    .film-length span.imax{
      padding: 4px 10px;
      border-radius:3px;
      background-color:#4ad3fe;
      color:#fff;
      margin-left:10px;
    }
    .tips{
      float: left;
      width:100%;
      line-height:70px;
      background-color:#fff0ad;
      color:#ee886d;
      text-indent: 36px;
    }

    .tab{
      float:left;
      position:relative;
      width:100%;
      height:50px;
      background-color:#fff;
    }


    #J_MenuX {
      left: 0;
      right: 0;
      top: 0;
      box-sizing: border-box;
      position: absolute;
      height: 50px;
      overflow: hidden;
      width:100%;
    }

    #J_MenuX ul {
      white-space: nowrap;
      position: absolute;
      height: 100%;
    }

    #J_MenuX ul li {
      display: inline-block;
      width:100px;
      text-align: center;
      line-height: 50px;
      height: 50px;
    }

    #J_MenuX ul li.cur {
      color: #4ad3fe;
      border-bottom: 1px solid #4ad3fe;
      box-sizing: border-box;
    }

    .xs-container {
      width: 100%;
      height: 100%;
    }

    /*******tickets-list css*****/
    .tickets-list{
      width: 100%;
      overflow:hidden;
    }
    .tickets-list ul{
      overflow:hidden;
      margin:0 auto;
      border-top:1px solid #e2e2e2;
      background-color:#fff;
    }
    .tickets-list ul li{
      width:100%;
      overflow:hidden;
      padding: 15px;
      box-sizing:border-box;
      border-bottom: 1px solid #eee;
    }
    .tickets-list ul li .ticket-info{
      height:auto;
      overflow:hidden;
    }
    .ticket-info span{
      float:left;
      width:50%;
      /*padding: 15px 10px 7.5px 10px;*/
      line-height: 30px;
      box-sizing:border-box;
    }
    .start{
      font-size:18px;
      font-weight: bold;
    }
    .styles{
    }
    .buy-btn{
      overflow:hidden;
      /*margin-top: 30px;*/
    }
    .buy-btn span{
      font-size:18px;
      color:#ee886d;
      margin-right:10px;
      font-weight: bold;
    }
    .buy-btn span b{
      font-weight:100;
      font-size:14px;
    }
    .buy-btn button{
      display: inline-block;
      color:white;
      min-width:1.2rem;
      font-size:12px;
      height:0.5rem;
      line-height:0.5rem;
      border-radius:0.3rem;
      border:none;
      background: -webkit-linear-gradient(left, #3cc6fb , #12b2ee); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #3cc6fb , #12b2ee); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #3cc6fb , #12b2ee); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #3cc6fb , #12b2ee); /* 标准的语法 */
    }
  }
</style>
