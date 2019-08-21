<template>
  <div class="calendarMask mask">
    <div class="thisTime">
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
</template>
<script>
  import AttendanceCalendar from './../../../assets/js/attendanceCalendara'
  import './../../../assets/style/calendar.css'
  import './../../../assets/style/cprivate.css'
  import './../../../assets/js/date'
  import {formatDate} from '../../../assets/js/formTime.js';
  import axios from 'axios'
  export default {
    name: 'activeCalendar',
    data () {
      return {
        answerShow: false,
        checkTime: null,
        ac: null,
        timeDate: null,
        nowTime: ''
      }
    },
    props:{
      valShow: Number
    },
    components:{

    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy年MM月dd日');
      }
    },
    mounted () {
      this.nowTime = new Date()
      var _this = this;
      this.calendar()
      /**** 此为测试js部分 测试日历start  *****/
//      var ac = new AttendanceCalendar("calendar_div", null, "current_date_label");
//      ac.init();
//      ac.setGetDataType(1);
//      var model = {
//        dValue: 'datetime',
//        status: 'status',
//        absense: 0,
//        normal: 1
//      };
//      ac.setModel(model);
//      ac.setAttendance(getData2());
      var upMonthBtn = document.getElementById('upMonth');
      function upMonth() {
        this.children[0].classList.add("arrowActive");
        nextMonthBtn.children[0].classList.remove("arrowActive");
        _this.ac.upMonth();
//        ac.setAttendance(getData2());
      }
      upMonthBtn.addEventListener('click',upMonth);
      var nextMonthBtn = document.getElementById('nextMonth');
      function nextMonth() {
        this.children[0].classList.add("arrowActive");
        upMonthBtn.children[0].classList.remove("arrowActive");
        _this.ac.nextMonth();
//        ac.setAttendance(getData2());
      }
      nextMonthBtn.addEventListener('click',nextMonth);
    },
    methods:{
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      },
      //日历初始化
      calendar(){
        let _this = this
        this.ac = new AttendanceCalendar("calendar_div", null, "current_date_label");
        this.ac.init();
        this.timeDate = _this.ac.getDateTime()
        this.ac.setClickFn(function (val) {
          console.log(111,_this.formatDate(val))
          _this.$emit('changeTimeName',_this.formatDate(val))
        });
//        this.ac.setGetDataType(1);
//        let model = {
//          dValue: 'datetime',
//          status: 'status',
//          absense: 0,
//          normal: 1,
//          intergral: null
//        };
//        this.ac.setModel(model);
//        this.ac.setAttendance([]);
      },
      //领取积分
      inReceive () {
        this.answerShow = true
      },
      closeChange (val){
        this.answerShow = val
      },
      getHeaderImg () {
        axios.get('/imgs.json')
          .then(this.getHeaderImgSucc)
      },
      getHeaderImgSucc (res) {
        if(res){
          const data = res.data
          this.headerImg  = data.src
        }
      }
    },
    watch: {
      // 监听数据的变化
      valShow() {
        this.$nextTick(() => {
          this.calendar()
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .thisTime{
    padding:10px;
    margin:10px 0;
    margin-bottom:0;
    background-color:white;
    text-align:left;
    color: #506187;
  }
  .div_changeMonth{
    padding-top:5px;
    padding-bottom:10px;
  }
  .signIn-calendar{
    background-color:white;
    overflow: hidden;
  }
  .calendarMask{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background:none
    /*background:#000\9;!*CSS Hack,只能对ie9以下浏览器ie6,ie7,ie8有效，否侧ie10,FF,Cherome会失去透明效果*!*/
    /*filter:Alpha(opacity=60);!*只对ie7,ie8有效*!*/
  }
</style>
