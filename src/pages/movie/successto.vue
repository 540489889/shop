<template>
  <scroll class="movieSuccess wrapper recommend-content">
    <div class="success-content">
      <i class="el-icon-circle-check s-c-ico"></i>
      <h6>恭喜你！购票成功</h6>
      <ul>
        <li class="flex-box"><span>订单编号：</span><p class="box-1">{{list.order_sn}}</p></li>
        <li class="flex-box"><span>预约姓名：</span><p>{{list.name}}</p></li>
        <li class="flex-box"><span>观影时间：</span><p>{{list.time}}</p></li>
        <li class="flex-box"><span>观影地址：</span><p>重庆科技馆{{list.address}}</p></li>
        <li class="flex-box"><span>观影座位：</span><p class="box-1"><span>{{list.seat}}</span></p></li>
      </ul>
    </div>
    <router-link tag="button" :to="'/movie/code?order='+list.order_sn" class="return-mall lookBtn">观影入场二维码</router-link>
    <router-link tag="button" to="/movie/index" class="return-mall">返回首页</router-link>
  </scroll>
</template>
<script>
  import axios from 'axios'
  import Scroll from './../components/scroll.vue'
export default {
  name: 'movieSuccess',
  data (){
    return {
      list: {}
    }
  },
  components: {
    Scroll
  },
  methods: {
    //获取用户信息
    getData(){
      let _this = this
      let id = this.$route.query.id
      axios.get('/Home/Film/success?id='+id)
        .then(this.getDataSucc)
    },
    getDataSucc(res){
      const data = res.data
      this.list = data
    },
  },
  mounted(){
    this.getData()
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
