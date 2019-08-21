<template>
  <div class="codeBox">
    <div class="codeBg"></div>
    <div class="codeWrapper">
      <div class="codeTx"><img src="./../../assets/img/tx-ico.png" alt=""></div>
      <h1 class="text-center">我的订单二维码</h1>
      <div class="codeBorder">
        <img v-if="msg" :src="'http://gfwx.cqkjg.cn/'+msg.ewm" alt="">
      </div>
      <div class="codeBtn">
        <el-button round @click="returnBack">订单详情</el-button>
      </div>
    </div>
    <div class="success-content">
      <ul style="border:none;">
        <li class="flex-box"><span>订单编号：</span><p class="box-1">{{msg.order_sn}}</p></li>
        <li class="flex-box"><span>商品名称：</span><p class="box-1">{{msg.film_name}}</p></li>
        <li class="flex-box"><span>预约姓名：</span><p class="box-1">{{msg.uname}}</p></li>
        <li class="flex-box"><span>商品数量：</span><p class="box-1">{{msg.num}}</p></li>
        <li class="flex-box"><span>商品价格：</span><p class="box-1">{{msg.price}}</p></li>
        <li class="flex-box"><span>观影地址：</span><p class="box-1">{{msg.address}}</p></li>
        <li class="flex-box"><span>观影座位：</span><p class="box-1">{{msg.seat}}</p></li>
        <li class="flex-box"><span>观影时间：</span><p class="box-1">{{msg.view_time}}</p></li>
        <li class="flex-box" v-if="msg.status==1"><span>订单状态：</span><p class="box-1">未领取</p></li>
        <li class="flex-box" v-else-if="msg.status==2"><span>订单状态：</span><p class="box-1">已领取</p></li>
      </ul>
    </div>
    <p class="text-center codeInfo">入场时请向工作人员展示二维码</p>
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
    name: 'movieCode',
    data (){
      return {
        msg: ''
      }
    },
    methods:{
      returnBack: function () {
        this.$router.back(-1)
      },
      getCode(){
        let order = this.$route.query.order;
        let _this = this
        axios({
          method: "get",
          url: '/Home/Film/ewm?order_sn='+order,
        }).then(function (res) {
          console.log(res)
          const data = res.data
          if(data.status){
            _this.msg = data.msg
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
      this.getCode()
    }
  }
</script>
<style lang="less" scoped>
  .codeBox{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    min-height:100%;
    background-color:#f5f5f5;
    color:#506187;
    .success-content{
      text-align: center;
      color:#506187;
      padding:0 10px;
      background-color:white;
      padding-bottom:0.5rem;
      position:relative;
      top:-0.8rem;
      width:6.9rem;
      margin:0 auto;
      overflow: hidden;
      ul{
        li{
          padding:10px 0;
          span{
            min-width:80px;
            margin-right:15px;
          }
          p{
            text-align: left;
          }
        }
      }
      .s-c-ico{
        color:#33cc00;
        font-size:35px;
        margin-top:0.7rem;
        margin-bottom:5px;
      }
      h6{
        margin-bottom:20px;
      }
    }
    .codeBg{
      width:100%;
      height:2.6rem;
      background: -webkit-linear-gradient(left, #64d3fc , #12b1ee); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #64d3fc , #12b1ee); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #64d3fc , #12b1ee); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #64d3fc , #12b1ee); /* 标准的语法 */
    }
    .codeWrapper{
      width:6.9rem;
      height:9.2rem;
      border-radius: 10px;
      margin:0 auto;
      background-color:white;
      position:relative;
      top:-1.1rem;
      .codeTx{
        position:relative;
        left:2.85rem;
        top:-0.6rem;
        width:1.2rem;
        height:1.2rem;
        background-color:white;
        border-radius: 50%;
        padding:2px;
        img{
          width:100%;
          height:100%;
          border-radius: 50%;
        }
      }
      h1{
        font-size:15px;
      }
      .codeBorder{
        width:5.46rem;
        height:5.46rem;
        background:url(./../../assets/img/codeBorder.png) no-repeat center;
        background-size:100%;
        margin:0 auto;
        line-height:5.46rem;
        text-align: center;
        margin-top:10px;
        img{
          width:4.7rem;
        }
      }
      .codeBtn{
        text-align: center;
        margin-top:20px;
      }
    }
    .codeInfo{
      position:relative;
      top:-0.5rem;
      background-color:#f5f5f5;
      padding-bottom:0.2rem;
    }
  }
</style>
