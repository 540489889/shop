<template>
  <div class="homeHall wrapper" :scrollY="scrollY" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="minHight">
      <div v-if="bgImg!=''">
        <div class="home-title" :style="'background:url(http://gfwx.cqkjg.cn/'+bgImg+') no-repeat center;background-size:cover'">
          <h4 class="setBtn-box text-right"><router-link tag="span" to="/setUp"><i class="set-ico"></i>设置</router-link></h4>
          <div class="h-left-tx">
            <router-link tag="div" to="/home" class="tx-box">
              <img :src="userInfo.headimgurl" alt="">
            </router-link>
            <div class="h-left-text">
              <h2>{{userInfo.nickname}}</h2>
            </div>
          </div>
          <div class="h-right-qd">
            <router-link to="/signIn">签到</router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="home-title">
          <h4 class="setBtn-box text-right"><router-link tag="span" to="/setUp"><i class="set-ico"></i>设置</router-link></h4>
          <div class="h-left-tx">
            <router-link tag="div" to="/home" class="tx-box">
              <img :src="userInfo.headimgurl" alt="">
            </router-link>
            <div class="h-left-text">
              <h2>{{userInfo.nickname}}</h2>
            </div>
          </div>
          <div class="h-right-qd">
            <router-link to="/signIn">签到</router-link>
          </div>
        </div>
      </div>

      <div class="hall-list-bd">
        <h2>快捷功能</h2>
        <ul class="flex-box">
          <router-link tag="li" to="/venue"><i class="hall-ico-1"></i><h4>场馆简介</h4></router-link>
          <router-link tag="li" to="./../active/index"><i class="hall-ico-2"></i><h4>活动预约</h4></router-link>
          <router-link tag="li" to="./../movie/index"><i class="hall-ico-3"></i><h4>科普影片</h4></router-link>
          <!--<li @click="moveIng"><i class="hall-ico-3"></i><h4>热门影片</h4></li>-->
          <router-link tag="li" to="./tourist"><i class="hall-ico-4"></i><h4>游客服务</h4></router-link>
          <router-link tag="li" to="/mall/index"><i class="hall-ico-8"></i><h4>积分商城</h4></router-link>
          <router-link tag="li" to="/home"><i class="hall-ico-7"></i><h4>个人中心</h4></router-link>
          <router-link tag="li" to="/volunteer/home"><i class="hall-ico-9"></i><h4>志愿者</h4></router-link>
          <li @click="tcHref"><i class="hall-ico-5"></i><h4>停车缴费</h4></li>
        </ul>
      </div>
    </div>
    <transition  name="el-fade-in">
      <div class="hallMask mask" v-if="maskShow" v-show="$store.state.adShow">
        <div class="hallMask-box">
          <!--<i class="xr-ico"></i>-->
          <!--<h1>志愿者专享福利</h1>-->
          <!--<h2><span>+2000</span><sub>积分</sub></h2>-->
          <!--<img src="./../../assets/ico/xr-ct.png" alt="">-->
          <!--<p>完成一次任务即可领取</p>-->
          <!--<button class="btnUi" @click="">立即领取</button>-->
          <a :href="adInfo.href">
            <img :src="'http://gfwx.cqkjg.cn/Public/Uploads/'+adInfo.img" alt="">
          </a>
          <i @click="closeMask" class="close-ico el-icon-circle-close-outline"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Scroll from './../components/scroll.vue'
  import axios from 'axios'
  import { mapMutations } from 'vuex'
  export default {
    name: 'homeServiceHall',
    data () {
      return {
        scrollY: true,
        name: null,
        portrait: null,
        score:null,
        sex:null,
        fullscreenLoading: false,
        maskShow: false,
        adInfo: {},
        adShow: false,
        userInfo:{},
        bgImg: ''
      }
    },
    components:{
      Scroll
    },
    mounted () {
//      this.getUserIndex()
      this.getAd()
      this.getUserInfo()
    },
    methods:{
      ...mapMutations(['changeAd']),
      //场馆简介
//      cgHref(){
//        window.location.href = 'https://mp.weixin.qq.com/mp/homepage?__biz=MzA5NTQ3MjczNw==&hid=1&sn=2905c8f22bf5606ee1d979387a8cb478'
//      },
      //游客服务
      ykHref(){
//        this.$router.replace({ path: '/tourist' });
      },
      //停车缴费
      tcHref (){
        window.location.href = 'http://dsf.etcp.cn/currencyWechat/login'
      },
      //WIFI认证
      wfHref (){
        window.location.href ='http://192.168.80.254:8088/login?gwAddr=192.168.80.254&gwPort=9001&gwId=default&ip=192.168.87.9&mac=38:a4:ed:be:17:ca'
      },
      //电影
      moveIng(){
        alert('正在开发中，敬请期待!')
      },
      //设置
      setUp(){
        alert('正在开发中，敬请期待!')
      },
      //关闭广告
      closeMask:function () {
        this.maskShow = false
        this.changeAd(false);
      },
      //获取用户信息
      getUserInfo(){
        axios.get('/Home/Index/info')
          .then(this.getUserInfoSucc)
      },
      getUserInfoSucc(res){
        const data = res.data
        console.log(data.img)
        if(data.img){
          this.bgImg = data.img
        }
        this.userInfo = data.msg
      },
      //获取广告信息
      getAd(){
        axios.get('/Home/Index/ad')
          .then(this.getAdSucc)
      },
      getAdSucc(res){
        console.log(res)
        const data = res.data
        this.adInfo = data.msg
        if(Object.keys(this.adInfo).length==0){
          this.maskShow = false
        }else{
          this.maskShow = true

        }
      },
      getUserIndex () {
        this.fullscreenLoading = true;
        axios.get('/Home/Person/index')
          .then(this.getUserIndexSucc)
      },
      getUserIndexSucc (res) {
        if(res){
          const data = res.data.msg.result
          this.portrait = data.portrait
          this.score = data.score
          this.sex = data.sex
          this.name = data.loginName
          this.fullscreenLoading = false
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .hallMask{
    .hallMask-box{
      max-width:7rem;
      max-height:8rem;
      /*background-color:white;*/
      border-radius: 8px;
      position:relative;
      top:40%;
      left:50%;
      transform: translate(-50%,-50%);
      padding-top:0.5rem;
      /*overflow: hidden;*/
      color:#506187;
      text-align: center;
      a{
        display: block;
        text-align: center;
        img{
          width:6rem;
          height:8rem;
          border-radius: 8px;
        }
      }
      .close-ico{
        position:absolute;
        bottom: -1.5rem;
        left: 50%;
        transform: translateX(-50%);
        color:white;
        font-size:25px;
      }
      .xr-ico{
        width:0.72rem;
        height:1rem;
        background:url(./../../assets/ico/xr-ico.png) no-repeat center;
        background-size:100%;
        position:absolute;
        left:15px;
        top:-2px;
      }
      h1{
        font-size:18px;
        font-weight: bold;
        margin-bottom:0.4rem;
      }
      h2{
        color:#f96368;
        font-size:26px;
        font-weight: bold;
        sub{
          font-size:14px;
          font-weight: 500;
        }
      }
      /*img{*/
        /*width:2.8rem;*/
        /*height:2rem;*/
      /*}*/
      p{
        margin:0.3rem auto;
      }
      .btnUi{
        display: block;
        width:2.2rem;
        line-height:0.7rem;
        color:white;
        border:none;
        margin:0 auto;
        border-radius: 0.35rem;
        background: -webkit-linear-gradient(left, #3cc6fb , #12b1ee); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #3cc6fb , #12b1ee); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #3cc6fb , #12b1ee); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #3cc6fb , #12b1ee); /* 标准的语法 */
      }
    }
  }
  .homeHall{
    background-color:#f5f5f5;
    .home-title{
      width:7.5rem;
      height:3.99rem;
      background:url(./../../assets/img/h-title-bg-0.png) no-repeat center;
      background-size:100%;
      justify-content: space-between;
      .setBtn-box{
        padding:15px;
        color:white;
        padding-bottom:5px;
        .set-ico{
          display: inline-block;
          width:0.3rem;
          height:0.3rem;
          background:url(./../../assets/ico/set-ico.png) no-repeat center;
          background-size:100%;
          margin-right:5px;
          position:relative;
          top:0.04rem;
        }
      }
      .h-left-tx{
        text-align: center;
        .tx-box{
          width:1.28rem;
          height:1.28rem;
          border-radius: 50%;
          margin:0 auto;
          img{
            width:100%;
            height:100%;
            border-radius: 50%;
          }
        }
        .h-left-text{
          color:white;
          margin-top:10px;
          h2{
            font-size:15px;
          }
        }
      }
      .h-right-qd{
        margin-top:10px;
        text-align: center;
        a{
          display: inline-block;
          background-color:white;
          line-height:30px;
          border-radius: 15px;
          padding:0 30px;
        }
      }
    }
    .hall-list-bd{
      margin-top:10px;
      background-color:white;
      h2{
        padding:15px;
        color:#506187;
        font-size:16px;
        /*border-bottom:1px solid #eee;*/
      }
      ul{
        flex-wrap: wrap;
        li{
          width:50%;
          text-align: center;
          padding:20px 10px;
          border-top:1px solid #eee;
          i{
            display: inline-block;
            width:0.9rem;
            height:0.9rem;
            margin:0 auto;
          }
          .hall-ico-1{
            background:url(./../../assets/ico/hall-ico-1.png) no-repeat center;
            background-size:100%;
          }
          .hall-ico-2{
            background:url(./../../assets/ico/hall-ico-2.png) no-repeat center;
            background-size:100%;
          }
          .hall-ico-3{
            background:url(./../../assets/ico/hall-ico-3.png) no-repeat center;
            background-size:100%;
          }
          .hall-ico-4{
            background:url(./../../assets/ico/hall-ico-4.png) no-repeat center;
            background-size:100%;
          }
          .hall-ico-5{
            background:url(./../../assets/ico/hall-ico-5.png) no-repeat center;
            background-size:100%;
          }
          .hall-ico-6{
            background:url(./../../assets/ico/hall-ico-6.png) no-repeat center;
            background-size:100%;
          }
          .hall-ico-7{
            background:url(./../../assets/ico/hall-ico-7.png) no-repeat center;
            background-size:100%;
          }
          .hall-ico-8{
            background:url(./../../assets/ico/hall-ico-8.png) no-repeat center;
            background-size:100%;
          }
          .hall-ico-9{
            background:url(./../../assets/ico/hall-ico-9.png) no-repeat center;
            background-size:100%;
          }
        }
        li:nth-child(odd){
          border-right:1px solid #eee;
        }
      }
    }
  }
</style>
