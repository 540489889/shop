<template>
  <div class="homeIndex wrapper" :scrollY="scrollY" :dataObj="result" v-loading.fullscreen.lock="fullscreenLoading">
    <div>
      <div class="home-title flex-box">
        <div class="h-left-tx flex-box">
          <div class="tx-box">
            <img v-if="userInfo.headimgurl" :src="userInfo.headimgurl" alt="">
            <!--<img :src="'http://www.scicity.cn:5506/cqkjg'+result.portrait" alt="">-->
          </div>
          <div class="h-left-text">
            <h2>{{userInfo.nickname}}</h2>
            <!--<h6><span>LV2</span></h6>-->
          </div>
        </div>
        <router-link tag="div" to="/signIn" class="h-right-qd">
          <i></i>每日签到
        </router-link>
      </div>
      <div class="home-list-tp">
        <ul class="flex-box">
          <router-link tag="li" to="/signIndex" class="box-1">
            <h4>{{result.score}} <span>明细</span></h4>
            <h6>我的积分</h6>
          </router-link>
          <router-link tag="li" to="/coupon/index" class="box-1">
            <h4> {{card}}<span>兑换</span></h4>
            <h6>优惠卡券</h6>
          </router-link>
          <router-link tag="li" to="/mine/order" class="box-1">
            <h4>{{order}}</h4>
            <h6>我的订单</h6>
          </router-link>
        </ul>
      </div>
      <div class="home-list-bt">
        <ul class="h-list-1 h-list-ui">
          <router-link tag="li" to="/mall/index" class="flex-box">
            <div class="list-left">
              <i class="home-ico-1"></i>积分商城
            </div>
            <div class="list-right">积分商城兑换好礼 <i class="el-icon-arrow-right"></i></div>
          </router-link>
        </ul>
        <ul class="h-list-2 h-list-ui">
          <router-link tag="li" to="/mine/bespeak" class="flex-box">
            <div class="list-left">
              <i class="home-ico-2"></i>我的预约
            </div>
            <div class="list-right">活动预约详情 <i class="el-icon-arrow-right"></i></div>
          </router-link>
          <router-link tag="li" to="/mine/collection" class="flex-box">
            <div class="list-left">
              <i class="home-ico-3"></i>我的收藏
            </div>
            <div class="list-right">商品/活动收藏 <i class="el-icon-arrow-right"></i></div>
          </router-link>
          <router-link tag="li" to="mine/news" class="flex-box">
            <div class="list-left">
              <i class="home-ico-4"></i>互动通知
            </div>
            <div class="list-right">系统消息 <i class="el-icon-arrow-right"></i></div>
          </router-link>
        </ul>
        <ul class="h-list-1 h-list-ui">
          <router-link tag="li" to="/mine/address" class="flex-box">
            <div class="list-left">
              <i class="home-ico-5"></i>收货地址
            </div>
            <div class="list-right">管理我的收货地址 <i class="el-icon-arrow-right"></i></div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroll from './../components/scroll.vue'
  import axios from 'axios'
  export default {
    name: 'Home',
    data () {
      return {
        scrollY: true,
        order:0,
        card:0,
        name: '一条鱼',
        result: {},
        portrait: null,
        score:0,
        sex:1,
        fullscreenLoading: false,
        userInfo: {}
      }
    },
    components:{
      Scroll
    },
    mounted () {
      this.getUserIndex()
      this.getUserInfo()
    },
    methods:{
      //获取用户信息
      getUserInfo(){
        axios.get('/Home/Index/info')
          .then(this.getUserInfoSucc)
      },
      getUserInfoSucc(res){
        const data = res.data
        this.userInfo = data.msg
      },
      getUserIndex () {
        this.fullscreenLoading = true;
        axios.get('/Home/Person/index')
          .then(this.getUserIndexSucc)
      },
      getUserIndexSucc (res) {
        if(res){
          const data = res.data

//          this.result = data.result
          this.result = data.msg.result
          this.order = data.order
          if(data.card){
            this.card = data.card
          }
          this.fullscreenLoading = false
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .homeIndex{
    background-color:#f5f5f5;
    .home-title{
      width:7.5rem;
      height:3rem;
      background:url(./../../assets/img/h-title-bg.png) no-repeat center;
      background-size:100%;
      justify-content: space-between;
      .h-left-tx{
        padding-left:0.25rem;
        .tx-box{
          margin-right:0.2rem;
          width:1.28rem;
          height:1.28rem;
          border-radius: 50%;
          img{
            width:100%;
            height:100%;
            border-radius: 50%;
          }
        }
        .h-left-text{
          color:white;
          h2{
            font-size:15px;
          }
          h6{
            span{
              min-width:0.8rem;
              line-height:20px;
              text-align: center;
              font-size:12px;
              padding:0 5px;
              border-radius: 10px;
              display: inline-block;
              background: -webkit-linear-gradient(left, #ee886d , #f56f74); /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(right, #ee886d , #f56f74); /* Opera 11.1 - 12.0 */
              background: -moz-linear-gradient(right, #ee886d , #f56f74); /* Firefox 3.6 - 15 */
              background: linear-gradient(to right, #ee886d , #f56f74); /* 标准的语法 */
            }
          }
        }
      }
      .h-right-qd{
        background-color:rgba(90,202,245,0.6);
        padding:8px 15px;
        min-width:2.5rem;
        text-align: center;
        color:white;
        border:1px solid white;
        border-top-left-radius:0.4rem ;
        border-bottom-left-radius:0.4rem ;
        border-right:0;
        i{
          display: inline-block;
          width:0.36rem;
          height:0.34rem;
          background:url(./../../assets/ico/qd-ico-1.png) no-repeat center;
          background-size:100%;
          margin-right:5px;
          position:relative;
          top:3px;
        }
      }
    }
    .home-list-tp{
      background-color:white;
      text-align: center;
      ul{
        padding:20px 0;
        li{
          border-right:1px solid #eee;
          >h4{
            display: inline-block;
            margin:0 auto;
            font-size:15px;
            font-weight: bold;
            position:relative;
            span{
              display: inline-block;
              font-size:10px;
              font-weight: 500;
              position:absolute;
              right:-20px;
              top:-10px;
              background: -webkit-linear-gradient(left, #ee886d , #f56f74); /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(right, #ee886d , #f56f74); /* Opera 11.1 - 12.0 */
              background: -moz-linear-gradient(right, #ee886d , #f56f74); /* Firefox 3.6 - 15 */
              background: linear-gradient(to right, #ee886d , #f56f74); /* 标准的语法 */
              border-radius: 8px;
              color:white;
              padding:0 3px;
            }
          }
          >h6{
            color:#506187;
          }
        }
        li:last-child{
          border:none;
        }
      }
    }
    .home-list-bt{
      .h-list-ui{
        background-color:white;
        margin-top:10px;
        li{
          justify-content: space-between;
          padding:15px;
          border-bottom:1px solid #eee;
          .list-left{
            color:#506187;
            font-size:14px;
            position:relative;
            padding-left:0.6rem;
            i{
              position:absolute;
              left:0;
              top:50%;
              transform: translateY(-50%);
              display: inline-block;
              width:0.5rem;
              height:0.5rem;
            }
            .home-ico-1{
              background:url(./../../assets/ico/home-ico-1.png) no-repeat center;
              background-size:100%;
            }
            .home-ico-2{
              background:url(./../../assets/ico/home-ico-2.png) no-repeat center;
              background-size:100%;
            }
            .home-ico-3{
              background:url(./../../assets/ico/home-ico-3.png) no-repeat center;
              background-size:100%;
            }
            .home-ico-4{
              background:url(./../../assets/ico/home-ico-4.png) no-repeat center;
              background-size:100%;
            }
            .home-ico-5{
              background:url(./../../assets/ico/home-ico-5.png) no-repeat center;
              background-size:100%;
            }
          }
          .list-right{
            color:#506187;
            font-size:13px;
            opacity: 0.7;
          }
        }
        li:last-child{
          border:none;
        }
      }
    }
  }
</style>
