<template>
  <scroll class="mallSuccess wrapper recommend-content">
    <div>
      <div class="success-content">
        <i class="el-icon-circle-check s-c-ico"></i>
        <h6>{{list.message}}</h6>
        <ul>
          <li><span>订单编号：</span>{{list.orderNumber}}</li>
          <li><span>实付金额：</span><a>{{list.ActualPay}}积分</a></li>
          <li><span>支付方式：</span>{{list.payMode}}</li>
        </ul>
        <ul>
          <li><span>收货人：</span>{{list.username}}</li>
          <li v-show="list.address"><span>收货地址：</span>{{list.address}}</li>
        </ul>
      </div>
      <router-link tag="button" to="/mall/index" class="return-mall">返回商城</router-link>
    </div>
  </scroll>
</template>
<script>
//  import { mapState } from 'vuex'
//  import bus from './../../store/bus'
  import Scroll from './../components/scroll.vue'
export default {
  name: 'mallSuccess',
  data (){
    return {
      list: {}
    }
  },
  components: {
    Scroll
  },
  computed:{
  },
  mounted () {
//    let _this = this
//    bus.$on("userOrderInfo",function (msg) {
//      this.list = msg
//      console.log(msg)
//    })

      this.getData()
  },
  methods:{
    getData () {
      let list = JSON.parse(this.$route.query.list)
      this.list = list
    }
  }
}
</script>
<style lang="less" scoped>
  .mallSuccess{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background-color:#f5f5f5;
    .return-mall{
      display: block;
      border:none;
      background: -webkit-linear-gradient(left, #3cc6fb , #12b2ee); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #3cc6fb , #12b2ee); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #3cc6fb , #12b2ee); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #3cc6fb , #12b2ee); /* 标准的语法 */
      width:6rem;
      height:0.9rem;
      line-height:0.9rem;
      border-radius: 0.45rem;
      color:white;
      margin:0 auto;
      margin-top:1rem;
    }
    .success-content{
      text-align: center;
      color:#506187;
      padding:0 10px;
      background-color:white;
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
    ul{
      padding:10px 0;
      text-align: left;
      border-bottom:1px solid #eee;
      li{
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
    ul:last-child{
      border:none;
    }
  }
</style>
