<template>
  <div class="" :data="timeData" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="minHight">
      <transition  name="el-fade-in">
        <home-answer @closeChange="closeChange" v-show="answerShow" :listAnswer="listAnswer"></home-answer>
      </transition>
      <div class="homeSignIn wrapper">
        <div class="home-title">
          <div class="setBtn-box flex-box">
            <router-link tag="div" to="/integralDetails"><i class="mx-ico"></i>明细</router-link>
            <div  @click="ruleClick"><i class="set-ico"></i>规则</div>
          </div>
          <div class="h-left-tx">
            <div class="lqBox">
              <div class="lqBtn" v-if="intergral">
                <!--<span>{{intergral}}</span>-->
                <v-countup :start-value="start" :end-value="intergral"></v-countup>
              </div>
              <div class="lqBtn" @click="inReceive" v-else>
                <span>领取积分</span>
              </div>
                <em  v-show="trueInter" class="intergral animated fadeOutUp">+{{inte}}</em>
            </div>
          </div>
        </div>
        <div class="thisTime flex-box">
          <i class="el-icon-time"></i> 当前时间：{{nowTime | formatDate}}
        </div>
        <div class="signIn-calendar">
          <div class="div_changeMonth flex-box">
            <span id="upMonth" ><i class="el-icon-caret-left Arrow"></i></span>
            <div id="current_date_label" class="div_target_label"></div>
            <span id="nextMonth"><i class="el-icon-caret-right Arrow"></i></span>
          </div>
          <div class="div_calendar_title hide"><h1>自定义日历</h1></div>
          <div id="calendar_div" class="div_calendar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import './../../assets/style/animate.min.css'
  import './../../assets/style/integral.css'
  import Scroll from './../components/scroll.vue'
  import AttendanceCalendar from './../../assets/js/attendanceCalendar'
  import homeAnswer from './components/answer.vue'
  import './../../assets/style/calendar.css'
  import './../../assets/js/date'
  import {formatDate} from '../../assets/js/formTime.js';
  import axios from 'axios'
  export default {
    name: 'homeSignIn',
    data () {
      return {
        answerShow:false,
        fullscreenLoading: false,
        nowTime: '',
        timeData: [],
        listAnswer:{},
        ac: null,
        intergral: null,
        start: 1,
        trueInter:false,
        inte: 0,
      }
    },
    components:{
      homeAnswer,
      Scroll
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy年MM月dd日');
      }
    },
    mounted () {
      this.calendar()
      this.getSignIn()
      let _this = this
      /**** click事件绑定  *****/
      var upMonthBtn = document.getElementById('upMonth');
      function upMonth() {
        let attendances = []
        this.children[0].classList.add("arrowActive");
        nextMonthBtn.children[0].classList.remove("arrowActive");
        _this.ac.upMonth();
        _this.getTimeDate();
      }
      upMonthBtn.addEventListener('click',upMonth);
      var nextMonthBtn = document.getElementById('nextMonth');
      function nextMonth() {
        this.children[0].classList.add("arrowActive");
        upMonthBtn.children[0].classList.remove("arrowActive");
        _this.ac.nextMonth();
        _this.getTimeDate();
      }
      nextMonthBtn.addEventListener('click',nextMonth);
    },
    methods:{
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      },
      //规则
      ruleClick(){
        this.$alert('<div class="alertContent">' +
          '<h2>注册登录</h2>' +
          '<ul>' +
          '<li>20分/新会员注册</li>' +
          '<li>20分/老会员首次登陆并绑定</li>' +
          '</ul>' +
          '<h2>签到答题</h2>' +
          '<ul>' +
          '<li>5分/签到，且答题正确</li>' +
          '<li>2分/签到，答题错误</li>' +
          '</ul>' +
          '<h2>科普活动</h2>' +
          '<ul>' +
          '<li>5分/成功预约科普活动</li>' +
          '<li>1分/为科普活动点赞</li>' +
          '<li>1分/收藏科普活动</li>' +
          '<li>2分/评论科普活动</li>' +
          '<li>5分/参与微信问卷调查</li>' +
          '<li>5分/参与微信投票</li>' +
          '</ul>' +
          '<h2>科普电影</h2>' +
          '<ul>' +
          '<li>5分/在重庆科技馆微信公众号上购买电影票</li>' +
          '</ul>' +
          '<h2>志愿者</h2>' +
          '<ul>' +
          '<li>5分/志愿者申请通过</li>' +
          '<li>10分/志愿者申领任务通过</li>' +
          '</ul>' +
          '<p class="notes">注：微信积分试行期间，积分规则将会适时调整，如带来不便敬请谅解。</p>'+
          '</div>', '积分规则', {
          dangerouslyUseHTMLString: true,
          showConfirmButton: false
        });
      },
      //积分动画
      intergralAnimate(){
        let options = {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
        };
        let demo = new CountUp('box', 0, this.intergral, 0, 2, options);
        if (!demo.error) {
          demo.start();
        } else {
          console.error(demo.error);
        }
      },
      //日历初始化
      calendar (){
        this.ac = new AttendanceCalendar("calendar_div", null, "current_date_label");
        this.ac.init();
        this.ac.setGetDataType(1);
        let model = {
          dValue: 'datetime',
          status: 'status',
          absense: 0,
          normal: 1,
          intergral: null
        };
        this.ac.setModel(model);
        this.nowTime = this.ac.getDateTime()

        this.ac.setClickFn(function () {
          return false
        });
      },
      //根据日期查询签到
      getTimeDate (){
        let _this = this
        let params = new URLSearchParams()
        let time = this.formatDate(this.ac.getDateTime())
        console.log(time)
        params.append('time',time);
        axios({
          method: 'post',
          url: '/Home/Person/signtime',
          data: params
        }).then(function (res) {
          const data = res.data
          _this.timeData = []
          if( data.msg.length){
            for (let i = 0; i < data.msg.length; i++) {
              _this.timeData.push({datetime:new Date(data.msg[i].addtime*1000).valueOf(),status:0})
            }
          }else{
            _this.timeData = []
            _this.$notify({
              title: '消息',
              message: '该月没有数据哦！',
              showClose: false,
              duration: 2000,
              onClose: function () {
              }
            });
          }
          _this.ac.setAttendance(_this.timeData);
        })
      },
      //初始化日历数据
      getSignIn () {
        let _this = this
        this.fullscreenLoading = true
        axios({
          method: 'post',
          url: '/Home/Person/sign',
        })
          .then(function (res) {
            console.log(res)
            if(res){
              const data = res.data
              _this.intergral = data.intergral
//              _this.timeData = data.msg
              if( data.msg.length){
                for (let i = 0; i < data.msg.length; i++) {
                  _this.timeData.push({datetime:new Date(data.msg[i].addtime*1000).valueOf(),status:0})
                }
                _this.ac.setAttendance(_this.timeData);
              }
              _this.fullscreenLoading = false
            }
          })
      },
      //领取积分
      inReceive () {
        let _this = this
        axios.get('/Home/Person/problem')
          .then(function (res) {
            const data = res.data
            if(!data.sta){
              _this.$notify({
                title: '消息',
                message: data.msg,
                showClose: false,
                duration: 2000,
                onClose: function () {
                }
              });
            }else{
              _this.listAnswer = res.data.msg
              console.log(_this.listAnswer)
              _this.answerShow = true

            }
//            console.log(_this.listAnswer)
          })
      },
      closeChange (val,val2){
        console.log(val,val2)
        if(val){
          this.inte = val2
          this.intergral = val
          this.trueInter = true
        }
        this.answerShow = false

      },
    },
// 创建完成时
    created() {
    },
//    监听数据
    watch:{
      intergral(){
        setTimeout(() => {

        }, 100)
      }
    }
  }
</script>

<style scoped lang="less">
  .homeSignIn{
    background-color:#f5f5f5;
    .home-title{
      width:7.5rem;
      height:3.5rem;
      background:url(./../../assets/img/h-title-bg-1.png) no-repeat center;
      background-size:100%;
      justify-content: space-between;
      .setBtn-box{
        padding:15px;
        color:white;
        padding-bottom:0;
        justify-content: space-between;
        i{
          display: inline-block;
          width:0.3rem;
          height:0.3rem;
        }
        .set-ico{
          background:url(./../../assets/ico/why-ico-1.png) no-repeat center;
          background-size:100%;
          margin-right:5px;
          position:relative;
          top:0.04rem;
        }
        .mx-ico{
          background:url(./../../assets/ico/mx-ico-1.png) no-repeat center;
          background-size:100%;
          margin-right:5px;
          position:relative;
          top:0.04rem;
        }
      }
      .h-left-tx{
        text-align: center;
        .lqBox{
          border-radius: 50%;
          padding:8px;
          background:rgba(203,240,253,0.8);
          display: inline-block;
          position:relative;
          .intergral{
            position:absolute;
            right:-50px;
            top:50%;
            background:rgba(0,0,0,0.4);
            display: inline-block;
            width:35px;
            height:35px;
            line-height:35px;
            border-radius: 50%;
            color:white;
            text-align: center;
            animation-delay:2s;
            -webkit-animation-delay:2s;
            animation-duration:4s;
            -webkit-animation-duration:4s;
          }
          .lqBtn{
            width:1.6rem;
            height:1.6rem;
            border-radius: 50%;
            background-color:white;
            color:#00baf7;
            text-align: center;
            font-size:0.36rem;
            font-weight: bold;
            position:relative;
            span{
              display: block;
              /*width:0.72rem;*/
              margin:0 auto;
              position:absolute;
              top:50%;
              left:50%;
              transform: translate(-50%,-50%);
            }
          }
        }
      }
    }
    .thisTime{
      padding:10px;
      margin:10px 0;
      background-color:white;
      color:#506187;
      .el-icon-time{
        font-size:18px;
        margin-right:5px;
      }
    }
    .signIn-calendar{
      background-color:white;
      overflow: hidden;
      padding-bottom:15px;
    }
  }
</style>
