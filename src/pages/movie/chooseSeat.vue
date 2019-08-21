<template>
  <scroll class="recommend-content chooseSeat">
    <div class="whole">
      <div class="seat_head">
        <h3>{{info.title}}</h3>
        <span>
        	<a v-if="time.start_time">{{time.start_time.substring(5,16)}}</a>
            <!--<a>(国语 3D)</a>-->
        </span>
      </div>

      <div class="seat_show">
        <ul>
          <li>
            <i></i>
            <span>可选</span>
          </li>
          <li>
            <i></i>
            <span>已售</span>
          </li>
          <li>
            <i></i>
            <span>已选</span>
          </li>
          <!--<li>-->
            <!--<i></i>-->
            <!--<span>最佳区域</span>-->
          <!--</li>-->
        </ul>
      </div>
      <div class="screen">大厅屏幕</div>

      <div class="seat_choose">
        <!--<div class="number" id="num">-->
          <!--<ul class="numUl">-->
            <!--<li v-for="(item,index) in seat.length">-->
              <!--{{index+1}}-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
        <div class="seats" id="seats">
          <ul class="touchs" id="touchs">
            <div :class="'x-seat x-seat-'+index" v-for="(item,index) in seat">
              <li class="selected" v-for="x in seat[index]">
                <input type="checkbox" ref="inputCheck"  :x="x" :y="index+1" :name="'seat-'+x" :id="index +'-seat-'+x" />
                <label :for="index+'-seat-'+x"></label>
              </li>
            </div>
            <div class="seatY">
              <ol v-for="(item,index) in seat.length">
                <li>{{index+1}}</li>
              </ol>
            </div>
            <div class="seatX">
              <ol v-for="i in seat[4]">
                <li>{{i}}</li>
              </ol>
            </div>
            <!--<div class="the_best"></div><div class="crossnum" id="crossnum"></div>-->
          </ul>
        </div>

      </div>
      <div class="seat_text">
        <ol id="seatText">
          <!--<li>5排4座</li>-->
        </ol>
      </div>
      <div class="bgColor">
        <div class="buttons" @click="commitSeat()">确认选择</div>

      </div>

    </div>
  </scroll>
</template>
<script>
  import axios from 'axios'
  import $ from 'jquery'
  import Scroll from './../components/scroll.vue'
  import pinchZoom from "./../../assets/js/pinchzoom"
  export default {
    name:'movieChooseSeat',
    components:{
      Scroll
    },
    data (){
      return {
        seat: [
          [19,17,15,13,11,9,7,5,3,1,2,4,6,8,10,12,14,16,18,20],
          [21,19,17,15,13,11,9,7,5,3,1,2,4,6,8,10,12,14,16,18,20,22],
          [23,21,19,17,15,13,11,9,7,5,3,1,2,4,6,8,10,12,14,16,18,20,22,24],
          [25,23,21,19,17,15,13,11,9,7,5,3,1,2,4,6,8,10,12,14,16,18,20,22,24],
          [27,25,23,21,19,17,15,13,11,9,7,5,3,1,2,4,6,8,10,12,14,16,18,20,22,24,26],
          [27,25,23,21,19,17,15,13,11,9,7,5,3,1,2,4,6,8,10,12,14,16,18,20,22,24,26],
          [27,25,23,21,19,17,15,13,11,9,7,5,3,1,2,4,6,8,10,12,14,16,18,20,22,24,26],
          [27,25,23,21,19,17,15,13,11,9,7,5,3,1,2,4,6,8,10,12,14,16,18,20,22,24,26],
          [27,25,23,21,19,17,15,13,11,9,7,5,3,1,2,4,6,8,10,12,14,16,18,20,22,24,26],
          [27,25,23,21,19,17,15,13,11,9,7,5,3,1,2,4,6,8,10,12,14,16,18,20,22,24,26],
          [23,21,19,17,15,13,11,9,7,5,3,1,2,4,6,8,10,12,14,16,18,20,22,24],
        ],
        selected: [],
        checkSeat: [],
        info: {},
        time:[],
      }
    },
    computed: {
      seatY: function () {
        return seat.length
      }
    },
    methods:{
      //提交
      commitSeat:function () {
        let params = new URLSearchParams()
        let id = this.$route.query.id
        let time_id = this.$route.query.time_id
        params.append('id',id);
        params.append('time_id',time_id);
        this.checkSeat = []
        let _this = this
        let data = $('.selected').not('.selectLi').children('input:checked')
        if(data.length){
          for(let i=0;i<data.length;i++ ) {
            let obj = {};
            let x = $(data[i]).attr('x')
            let y = $(data[i]).attr('y')
            obj.x = x
            obj.y = y
            _this.checkSeat.push(obj)
          }
          this.$router.push({ path: '/movie/order', query: { id: id,time_id:time_id,seat: JSON.stringify(this.checkSeat)}});
//          this.$router.push({path:"/movie/order"})
        }else{
          _this.$notify({
            title: '消息',
            message: '请选择座位',
            showClose: false,
            duration: 2000,
            onClose: function () {
            }
          });
        }
      },
      //获取选择的坐标
      initSeat: function () {
        let inputCheck = this.$refs.inputCheck
        let _this = this
          for(let a=0;a<inputCheck.length;a++){
            for(let i=0;i<this.selected.length;i++){
              let x = inputCheck[a].getAttribute("x")
              let y = inputCheck[a].getAttribute("y")
              if(this.selected[i].x==y && this.selected[i].y==x){
                inputCheck[a].setAttribute("disabled",true)
                inputCheck[a].setAttribute("checked",true)
                $(inputCheck[a]).parent('li').addClass('selectLi')
              }
          }
        }
      },
      getChooseSeat () {
        let params = new URLSearchParams()
        let id = this.$route.query.id
        let time_id = this.$route.query.time_id
        params.append('id',id);
        params.append('time_id',time_id);
        this.fullscreenLoading = true;
        axios.get('/Home/Film/chooseSeat?id='+id+'&time_id='+time_id)
          .then(this.getChooseSeatSucc)
      },
      getChooseSeatSucc (res) {
        if(res){
          this.fullscreenLoading = false
          const data = res.data
          this.selected = data.seat
          this.info = data.info
          this.time = data.time
          this.initSeat()
//          this.msg = data.seat
//          this.timeList = data.time
          console.log(data)
        }
      },
    },

    mounted() {
      let _this = this
      $('.seats').each(function () {
        new pinchZoom($(this), {});
      });
      this.getChooseSeat()
//      $('. li').each(function () {
//        new pinchZoom($(this), {});
//      });

      $('.selected input').on('click',function(){
        let obj = {}
        let checklen = $('.selected').not('.selectLi').children('input:checked').length;
        let inputSelected = $('.selected').not('.selectLi').children('input:checked');
        let str = '';
        if(inputSelected.length){
          for(var i=0;i<inputSelected.length;i++){
            if(i==5){
              _this.$notify({
                title: '消息',
                message: '最多只能选择五个座位！',
                showClose: false,
                duration: 2000,
                onClose: function () {
                }
              });
              return false
            }
            let x = $(inputSelected[i]).attr("x")
            let y = $(inputSelected[i]).attr("y")
            let obj = {x:x,y:y}
            str += '<li style="float:left;padding:10px;border:1px solid #eee;margin:15px;margin-right:0;margin-top:0;">'+y+"排"+x+"座"+'<li/>'
          }
        }

        $("#seatText").html(str)
        if(checklen>5){
//          alert('最多只能选择两个座位');
          return false;
        }
      });
      let flag = false;
      let cur = {
        x:0,
        y:0
      }
      let nx,ny,dx,dy,x,y ;
      function down(){
        flag = true;
        let touch ;
        if(event.touches){
          touch = event.touches[0];
        }else {
          touch = event;
        }
        cur.x = touch.clientX;
        cur.y = touch.clientY;
        dx = div2.offsetLeft;
        dy = div2.offsetTop;
      }
      function move(){
        if(flag){
          let touch ;
          if(event.touches){
            touch = event.touches[0];
          }else {
            touch = event;
          }
          nx = touch.clientX - cur.x;
          ny = touch.clientY - cur.y;
          x = dx+nx;
          y = dy+ny;
          div2.style.left = x+"px";
          //div2.style.top = y +"px";


          //阻止页面的滑动默认事件
          document.addEventListener("touchmove",function(){
            //event.preventDefault();
          },false);
        }
      }
      //鼠标释放时候的函数
      function end(){
        flag = false;
      }
      let div2 = document.getElementById("touchs");
      div2.addEventListener("mousedown",function(){
        down();
      },false);
      div2.addEventListener("touchstart",function(){
        down();
      },false)
      div2.addEventListener("mousemove",function(){
        move();
      },false);
      div2.addEventListener("touchmove",function(){
        move();
      },false)
      document.body.addEventListener("mouseup",function(){
        end();
      },false);
      div2.addEventListener("touchend",function(){
        end();
      },false)
    }
  }
</script>
<style lang="less" scoped>
  .chooseSeat{
    #seatText{
      background-color:white;
      padding-top:20px;
      /*padding:20px;*/
      li{
        float:left;
        padding:10px;
        border:1px solid #eee;
      }
    }
    background-color:#f7f7f8;
    .x-seat-0{
      margin-left:160px;
    }
    .x-seat-1{
      margin-left:120px;
    }
    .x-seat-2{
      margin-left:80px;
    }
    .x-seat-3{
      margin-left:40px;
    }
    .x-seat-10{
      margin-left:80px;
    }
    .x-seat-10 li{
      margin-bottom:0 !important;
    }
    .whole{
      overflow:hidden;
    }
    .seatX{
      display: block;
      clear:both;
      overflow: hidden;
      background-color:#0CF;
      height:25px;
      ol{
        li{
          text-align: center;
          transform:scale(1) !important;
          color:white;
          font-size:12px;
          line-height:25px;
          height:25px;
        }
      }
    }
    .x-seat{
      float:left;
      overflow: hidden;
    }
    .seat_head{
      overflow:hidden;
      margin:0 auto;
      width:100%;
      border-bottom:1px solid #ededed;
      padding:10px 29px;
      background-color:#fff;
    }
    .seat_head h3{
      font-weight:100;
      font-size:16px;
      padding:5px 0;
    }
    .seat_head span{
      display:inline-block;
      padding: 10px 0;
    }
    .seat_head span a{
      float:left;
      color:#bcbcbc;
    }

    .seat_show{
      overflow:hidden;
      margin:0 auto;
      width:100%;
      border-bottom:1px solid #f2f2f1;
      background-color:#fff;
    }
    .seat_show ul{
      overflow:hidden;
      padding:15px 0;
    }
    .seat_show ul .x-seat li{
      float:left;
      width:25%;
      text-align:center;
    }
    .seat_show ul li span{
      float:left;
      padding-left: 0;
      line-height: 45px;
    }
    .seat_show ul li i{
      float:left;
      width:45px;
      height:45px;
      transform: scale(0.5);
      overflow:hidden;
      background-image:url(./../../assets/ico/seats1.png);
      background-size:100% auto;
    }
    .seat_show ul li + li i{
      background-position:0 -90px;
    }
    .seat_show ul li + li + li i{
      background-position:0 -45px;
    }
    .seat_show ul li + li + li + li i{
      background-image:none;
      border:1px dashed #ee7a7d;
    }

    .screen{
      /*position: absolute;*/
      /*top: -68px;*/
      /*left: 350px;*/
      /*width: 500px;*/
      height: 70px;
      /*border: 1px solid #c1c1c1;*/
      /*border-top: none;*/
      font-size:16px;
      margin: 0 auto;
      text-align: center;
      line-height: 70px;
      font-weight: bold;
    }

    .seat_choose{
      position:relative;
      overflow:hidden;
      top:0;
      height:400px;
    }
    .number{
      /*position:absolute;
        left:0;
        top:0;
        width:40px;*/
      float:left;
      width:4%;
      background-color:#0CF;
      /*border-radius:4px;*/
      margin: 80px auto 30px auto;
    }
    .number ul{
      overflow:hidden;
    }
    .number ul li{
      float:left;
      width:100%;
      text-align:center;
      line-height: 49px;
      /*padding: 8px 0;*/
      color:#fff;
    }
    .number ul li:nth-child(3){
      position:relative;
      top:-2px;
    }
    .number ul li:nth-child(4){
      position:relative;
      top:-5px;
    }
    .number ul li:nth-child(5){
      position:relative;
      top:-8px;
    }
    .number ul li:nth-child(6){
      position:relative;
      top:-12px;
    }
    .number ul li:nth-child(7){
      position:relative;
      top:-14px;
    }
    .number ul li:nth-child(8){
      position:relative;
      top:-18px;
    }
    .number ul li:nth-child(9){
      position:relative;
      top:-24px;
    }
    .number ul li:nth-child(10){
      position:relative;
      top:-26px;
    }
    .number ul li:nth-child(11){
      position:relative;
      top:-30px;
    }
    .crossnum{
      float:left;
      width:100%;
      background-color:#0CF;
      border-radius:4px;
      margin:3px auto;
    }
    .crossnum ul{
      overflow:hidden;
    }
    .crossnum ul li{
      float:left;
      width:60px;
      padding: 3px 5px;
      text-align:center;
      color:#fff;
    }

    .seats{
      /*padding:80px 0;*/
      float: left;
      width: 96%;
      height: 620px;
      position: relative;
      overflow:hidden;
    }
    .seats >ul{
      width:1120px;
      position: absolute;
      top:-60px;
      left:-100%;
      border: 2px dashed #32abc5;
      -webkit-transform: scale(0.5, 0.5);
      transform: scale(0.5, 0.5);
      padding-left:10px;
    }
    .seats >ul li{
      float: left;
      width: 60px;
      height: 60px;
      /*overflow: hidden;*/
      /*padding: 8px 5px;*/
      margin-right:-20px;
      margin-bottom:-15px;
      transform: scale(0.5);
    }
    .x-seat li:last-child{
      margin-right:-10px;
    }
    .seats ul li label{
      display:inline-block;
      width:60px;
      height:60px;
      background-image:url(./../../assets/ico/seats1.png);
      background-size:100% auto;
    }
    .seats ul li input:checked ~ label{
      background-position:0 -60px;
    }
    .seats ul li input{
      display: none;
    }
    .seats ul li input:checked:disabled ~ label{
      background-position:0 -120px;
    }
    .the_best{
      position:absolute;
      top: 377px;
      left: 418px;
      width: 420px;
      height: 380px;
      border:2px dashed #ee7a7d;
      border-radius:4px;
      z-index: -1;
    }
    .bgColor{
      padding-top: 40px;
      padding-bottom:60px;
      background-color:white;
      .buttons{
        width:94%;
        margin-left:3%;
        overflow:hidden;
        height:1rem;
        background-color:#0CF;
        border-radius:4px;
        text-align:center;
        line-height:1rem;
        color: #fff;
        font-size: 16px;
        letter-spacing: 2px;

      }

    }
    .seatY{
      position:absolute;
      background-color:#0CF;
      left:0;
      top:-1px;
      width:20px;
      text-align: center;
      li{
        /*padding:10px;*/
        float: left;
        width: 20px !important;
        height:initial !important;
        /* overflow: hidden; */
        /* padding: 8px 5px; */
        margin-right:initial !important;
        margin-bottom:initial !important;
        color:white !important;
        line-height:49px !important;
        position:relative;
      }
      ol:nth-child(2) li{
        top:0px;
      }
      ol:nth-child(3) li{
        top:-5px;
      }
      ol:nth-child(4) li{
        top:-10px;
      }
      ol:nth-child(5) li{
        top:-10px;
      }
      ol:nth-child(6) li{
        top:-10px;
      }
      ol:nth-child(7) li{
        top:-15px;
      }
      ol:nth-child(8) li{
        top:-20px;
      }
      ol:nth-child(9) li{
        top:-20px;
      }
      ol:nth-child(10) li{
        top:-30px;
      }
      ol:nth-child(11) li{
        top:-30px;
      }
    }
  }
</style>
