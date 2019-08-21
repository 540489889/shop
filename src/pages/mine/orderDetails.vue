<template>
  <scroll class="movieSuccess wrapper recommend-content">
    <div  v-if="type==1">
      <div class="success-content">
        <ul style="border:none;padding-top:20px;">
          <li class="flex-box"><span>订单编号：</span><p class="box-1">{{list.order_sn}}</p></li>
          <li class="flex-box"><span>商品名称：</span><p>{{list.goods_name}}</p></li>
          <li class="flex-box"><span>商品数量：</span><p>{{list.number}}</p></li>
          <li class="flex-box"><span>积分数量：</span><p>{{list.intergral}}</p></li>
          <li class="flex-box"><span>下单时间：</span><p class="box-1">{{list.addtime}}</p></li>
          <li class="flex-box" v-if="list.status==1"><span>订单状态：</span><p class="box-1">未领取</p></li>
          <li class="flex-box" v-else-if="list.status==2"><span>订单状态：</span><p class="box-1">已领取</p></li>
        </ul>
        <!--<ul class="hide">-->
          <!--<li class="flex-box"><span>订单编号：</span><p class="box-1">{{list.order_sn}}</p></li>-->
          <!--<li class="flex-box"><span>预约姓名：</span><p>{{list.name}}</p></li>-->
          <!--<li class="flex-box"><span>观影时间：</span><p>{{list.time}}</p></li>-->
          <!--<li class="flex-box"><span>观影地址：</span><p>重庆科技馆{{list.address}}</p></li>-->
          <!--<li class="flex-box"><span>观影座位：</span><p class="box-1"><span>{{list.seat}}</span></p></li>-->
          <!--<li class="flex-box"><span>订单状态：</span><p class="box-1"><span>{{list.seat}}</span></p></li>-->
          <!--<li class="flex-box"><span>核销时间：</span><p class="box-1"><span>{{list.seat}}</span></p></li>-->
        <!--</ul>-->
      </div>
      <router-link tag="button" :to="'/mine/codeOrder?id='+list.id" class="return-mall lookBtn">订单二维码</router-link>
      <router-link tag="button" to="/mine/order" class="return-mall">返回</router-link>
    </div>
    <div  v-else-if="type==2">
      <div class="success-content">
        <ul>
        <li class="flex-box"><span>订单编号：</span><p class="box-1">{{list.order_sn}}</p></li>
        <li class="flex-box"><span>预约姓名：</span><p>{{list.uname}}</p></li>
        <li class="flex-box"><span>观影时间：</span><p>{{list.view_time}}</p></li>
        <li class="flex-box"><span>观影地址：</span><p>重庆科技馆{{list.address}}</p></li>
        <li class="flex-box"><span>观影座位：</span><p class="box-1">{{list.seat}}</p></li>
        <li class="flex-box" v-if="list.status==2"><span>订单状态：</span><p class="box-1">未核销</p></li>
        <li class="flex-box" v-if="list.status==3"><span>订单状态：</span><p class="box-1">已核销</p></li>
        <li class="flex-box" v-if="list.comtime"><span>核销时间：</span><p class="box-1">{{list.comtime}}</p></li>
        </ul>
      </div>
      <router-link tag="button" :to="'/movie/code?order='+list.order_sn" class="return-mall lookBtn">入场二维码</router-link>
      <router-link tag="button" to="/mine/order" class="return-mall">返回</router-link>
    </div>
  </scroll>
</template>
<script>
  import axios from 'axios'
  import Scroll from './../components/scroll.vue'
export default {
  name: 'orderDetails',
  data (){
    return {
      list: [],
      type: ''
    }
  },
  components: {
    Scroll
  },
  methods: {
    orderDetail () {
      let params = new URLSearchParams()
      let id = this.$route.query.id
      let type = this.$route.query.type
      let _this = this
      this.type = type
      params.append('id',id)
      params.append('type',type)
      this.fullscreenLoading = true;
      axios({
        url:'/Home/Person/detail?id='+id+'&type='+type,
        method: "get",
//        data: params
      })
        .then(function (res) {
          const data = res.data
          _this.list = data.msg
          console.log(data)
        })
    },
  },
  mounted(){
    this.orderDetail()
  }
}
</script>
<style lang="less" scoped>
  .movieSuccess{
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
      margin-top:0.3rem;
    }
    .lookBtn{
      background:none;
      border:1px solid #666;
      color:#333;
      margin-top:1rem;
    }
    .success-content{
      text-align: center;
      color:#506187;
      padding:0 10px;
      background-color:white;
      padding-bottom:0.5rem;
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
    ul:last-child{
      border:none;
    }
  }
</style>
