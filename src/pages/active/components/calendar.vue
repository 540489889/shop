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
        nowTime: '',
      }
    },
    props:{
      timeList:Array
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
      this.calendar(this.timeList)
      this.nowTime = new Date()
      let _this = this;
      var upMonthBtn = document.getElementById('upMonth');
      function upMonth() {
        this.children[0].classList.add("arrowActive");
        nextMonthBtn.children[0].classList.remove("arrowActive");
        _this.ac.upMonth();
        let thisTime = _this.formatDate2(_this.ac.getCurrentDate())
        let dataList = []
        for(let i=0;i<_this.timeList.length;i++){
          if(thisTime==_this.formatDate2(_this.timeList[i].datetime)){
            dataList.push(_this.timeList[i])
          }
        }
        _this.ac.setAttendance(dataList);
      }
      upMonthBtn.addEventListener('click',upMonth);
      var nextMonthBtn = document.getElementById('nextMonth');
      function nextMonth() {
        this.children[0].classList.add("arrowActive");
        upMonthBtn.children[0].classList.remove("arrowActive");
        _this.ac.nextMonth();
        console.log(_this.formatDate2(_this.ac.getCurrentDate()))
        let thisTime = _this.formatDate2(_this.ac.getCurrentDate())
        let dataList = []
        for(let i=0;i<_this.timeList.length;i++){
          if(thisTime==_this.formatDate2(_this.timeList[i].datetime)){
            dataList.push(_this.timeList[i])
          }
        }
        _this.ac.setAttendance(dataList);
      }
      nextMonthBtn.addEventListener('click',nextMonth);
    },
    methods:{
      formatDate2(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM');
      },
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      },
      //日历初始化
      calendar(data){
        let _this = this
        this.ac = new AttendanceCalendar("calendar_div", null, "current_date_label");
        this.ac.init();
        this.ac.setGetDataType(1);
        let model = {
          dValue: 'datetime',
          status: 'status',
          absense: 0,
          normal: 1
        };
        this.ac.setModel(model);
        this.timeDate = _this.ac.getDateTime()
        this.ac.setClickFn(function (val) {
          console.log(_this.formatDate(new Date()),_this.formatDate(val))
          if(_this.formatDate(new Date())>_this.formatDate(val)){
            _this.$notify({
              title: '消息',
              message: '预约时间已过',
              showClose: false,
              duration: 1000,
              onClose: function () {
              }
            });
          }else{
            _this.$emit('changeTimeName',_this.formatDate(val))
          }
        });
        if(this.timeList.length){
          let thisTime = _this.formatDate2(_this.ac.getCurrentDate())
          let dataList = []
          for(let i=0;i<_this.timeList.length;i++){
            if(thisTime==_this.formatDate2(_this.timeList[i].datetime)){
              dataList.push(_this.timeList[i])
            }
          }
//          _this.ac.setAttendance(dataList);
//          this.ac.setAttendance(data);
        }
//        this.nowTime = _this.ac.getDateTimeTwo()
//        console.log(this.timeDate,999)
      },
      //领取积分
      inReceive () {
        this.answerShow = true
      },
      closeChange (val){
        this.answerShow = val
      }
    },
    watch: {
      // 监听数据的变化
      timeList() {
        this.$nextTick(() => {
          this.calendar(this.timeList)
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
    background:white;
    /*background:#000\9;!*CSS Hack,只能对ie9以下浏览器ie6,ie7,ie8有效，否侧ie10,FF,Cherome会失去透明效果*!*/
    /*filter:Alpha(opacity=60);!*只对ie7,ie8有效*!*/
  }
</style>
