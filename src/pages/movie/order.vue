<template>
  <div class="orderWrapper recommend-content">
    <div class="sheetBox">
      <div class="flex-box topInfo">
        <div class="imgDiv">
          <img :src="$store.state.URL_PATH+info.poster" alt="">
        </div>
        <div class="movieInfo box-1">
          <h4 class="media_title">{{info.title}}</h4>
          <!--<p class="media_title">主演：杰森.郭达 苏菲玛索玛雅小蜜蜂历险记苏菲玛索玛雅小蜜蜂历险记</p>-->
          <!--<p class="media_title">导演：希区柯克</p>-->
          <!--<p class="media_title" v-if="list.uptime">{{list.uptime}} 上映</p>-->
          <!--<h6><span>￥40</span> <em>5980人</em>想看</h6>-->
          <h6><span>￥{{info.price}}</span></h6>
        </div>
      </div>
    </div>
    <div class="malTab">
      <ul>
        <!--<li class="flex-box"><span>订单编号：</span><p class="box-1">YX790063</p></li>-->
        <!--<li class="flex-box"><span>预约姓名：</span><p>帕丁顿熊</p></li>-->
        <li class="flex-box"><span>观影时间：</span><p style="color:#ee886d;" v-if="time.start_time">{{time.start_time.substring(0,16)}}-{{time.end_time.substring(11,16)}}</p></li>
        <li class="flex-box"><span>观影地址：</span><p>重庆科技馆{{info.filmhall}}</p></li>
        <li class="flex-box"><span>观影座位：</span><p><b style="margin-right:5px;" v-for="item in seat">{{item.y}}排{{item.x}}座</b></p></li>
        <li>
          <el-select  @change="changeSelect" v-model="value5" multiple collapse-tags placeholder="优惠券请选择">
            <el-option
              :disabled="index<seat.length ? false : true"
              v-for="(item,index) in card"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span class="flex-box" style="width:200px;height:80px;display: inline-block">
            <img style="width:80px;height:80px;margin-right:10px;" :src="'http://gfwx.cqkjg.cn/Public/Uploads/goods/'+item.pic" alt="">
            {{item.name}}
              </span>
            </el-option>
          </el-select>
        </li>
        <li class="flex-box">
          <span>小计</span>
          <b>￥ <en style="font-size:18px;color:#ee886d;font-weight: bold">{{(info.price*seat.length-reducePrice).toFixed(2)}}</en></b>
        </li>
      </ul>

    </div>
    <div v-if="!allCond">
      <div class="buyNow 1111" @click="buyNows">确认支付</div>
    </div>
    <div v-else>
      <div class="buyNow" @click="buyNowb">确认支付</div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import './../../assets/style/ordern.css'
  import wxApi from './../../assets/js/wxPay'
  export default {
    name: 'movieOrder',
    data() {
      return {
        value5: [],
        info: {},
        card: [],
        time: {},
        seat: [],
        reducePrice: 0,
        cardId:[],
        allCond: 1
      }
    },
    methods: {

      changeSelect (val){
        this.reducePrice = val.length*this.info.price
//        if(this.reducePrice>this.info.price*this.seat.length){
//          alert('已经不能使用优惠券了')
//          return false
//        }
        this.cardId = val
        this.allCond = this.info.price*this.seat.length-this.reducePrice
      },
      //获取列表数据
      getMovieOrder() {
        let params = new URLSearchParams()
        let id = this.$route.query.id
        let time_id = this.$route.query.time_id
        let seat = this.$route.query.seat
        console.log(seat)
//        params.append('id',id);
//        params.append('time_id',time_id);
//        params.append('time_id',seat);
        this.fullscreenLoading = true;
        axios.get('/Home/Film/order?id=' + id + '&time_id=' + time_id + '&seat=' + seat)
          .then(this.getMovieDetailSucc)
      },
      getMovieDetailSucc(res) {
        if (res) {
          this.fullscreenLoading = false
          const data = res.data
          this.info = data.info
          this.card = data.card
          this.time = data.time
          this.seat = JSON.parse(data.seat)
          console.log(data)
        }
      },
      //支付
      buyNows(){
        let _this = this
        let params = new URLSearchParams()
        let id = this.$route.query.id
        let time_id = this.$route.query.time_id
        let seat = this.$route.query.seat
        params.append('seat',seat)
        params.append('card',[this.cardId])
        params.append('film_id',this.info.id)
        params.append('time_id',time_id)
        this.fullscreenLoading = true
        axios({
          method: "post",
          url: '/Home/Film/buys',
          data: params
        }).then(function (res) {
          const data = res.data
          console.log(data)
          if(data.status){
            _this.$router.push({ path: '/movie/success', query: { list: JSON.stringify(data)}});
          }else{
            _this.$notify({
              title: '消息',
              message: data.msg,
              showClose: false,
              duration: 1000,
              onClose: function () {
              }
            });
          }
        })
      },
      buyNowb(){
        let _this = this
        let params = new URLSearchParams()
        let id = this.$route.query.id
        let time_id = this.$route.query.time_id
        let seat = this.$route.query.seat
        params.append('seat',seat)
        params.append('card',[this.cardId])
        params.append('film_id',this.info.id)
        params.append('time_id',time_id)
        this.fullscreenLoading = true
        axios({
          method: "post",
          url: '/Home/Film/buy',
          data: params
        }).then(function (res) {
          const data = res.data
          let id = data.id
          console.log(data)
          if(data.status){
            wxApi.weixinPay(data.orderJson,id,_this)
//            wxApi.onBridgeReady(data.orderJson,id,_this)
            //微信支付
//            wxApi(data.orderJson,function (res) {
//              if(res){
//                // 使用以上方式判断前端返回,微信团队郑重提示：
//                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
//              }
//            })
          }else{
            _this.$notify({
              title: '消息',
              message: data.msg,
              showClose: false,
              duration: 1000,
              onClose: function () {
              }
            });
          }
        })
      }
    },
    mounted (){
      this.getMovieOrder()
    }
  }
</script>
<style lang="less" scoped>

  .malTab{
    ul{
      padding:10px 20px;
      text-align: left;
      border-bottom:1px solid #eee;
      li{
        align-items: stretch;
        padding-bottom:10px;
        span{
          margin-right:15px;
          display: inline-block;
          width:80px;
        }
        a{
          color:#ee886d;
        }
      }
      li:last-child{
        padding:0;
      }
    }
  }
  .el-select{
    display: block;
  }
  .el-input__inner{
    border:none;
  }
  .el-select-dropdown__item{
    height:initial;
    line-height:initial;
    margin-bottom:10px;
  }
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
    top:40%;
  }
  .orderWrapper{
    .buyNow{
      line-height:0.9rem;
      background-color:#35c3f9;
      color:white;
      text-align: center;
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
    }
    .sheetBox{
      background-color:white;
      .topInfo{
        background-color:#35c3f9;
        padding: 20px 10px;
        color:white;
        .imgDiv{
          width:1.5rem;
          height:2.2rem;
          margin-right:10px;
          img{
            width:100%;
            height:100%;
          }
        }
        .movieInfo{
          margin-right:10px;
          h4{
            /*font-size:16px;*/
            font-weight: bold;
            margin-bottom:5px;
          }
          h6{
            margin-top:5px;
            span{
              font-weight: bold;
              color:#ee886d;
              margin-right: 10px;
            }
            em{
              color:#ee886d;
              font-weight: 400;
            }
          }
        }
        .buyDiv{
          button{
            border:none;
            background: -webkit-linear-gradient(left, #53cdfb , #11b1ee); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #53cdfb , #11b1ee); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #53cdfb , #11b1ee); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right,  #53cdfb , #11b1ee); /* 标准的语法 */
            height:0.6rem;
            width:1.2rem;
            border-radius: 0.3rem;
            color:white;
          }
        }
      }
    }
  }
</style>
