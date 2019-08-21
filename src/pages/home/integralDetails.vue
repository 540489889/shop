<template>
  <scroll class="homeIntegral wrapper recommend-content" :data="record" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="minHight">
      <div class="home-title">
        <h4 class="setBtn-box text-right"><span @click="ruleClick"><i class="set-ico"></i>规则</span></h4>
        <div class="h-left-tx">
          <div class="h-left-text">
            <h2>{{count}}</h2>
            <h6>当前总积分</h6>
          </div>
        </div>
        <div class="h-right-qd">
          <router-link to="/mall/index">去积分商城</router-link>
        </div>
      </div>
      <div class="hall-list-bd">
        <h2>积分明细</h2>
        <div v-if="record.length">
          <ul>
            <li class="flex-box" v-for="item in record" v-bind:key="item.id">
              <div class="left-text box-1">
                <h4>{{item.remark}}</h4>
                <p>{{item.addtime}}</p>
              </div>
              <span>{{item.intergral}}</span>
            </li>
          </ul>
        </div>
        <div v-else>
          <ul>
            <li class="flex-box text-center">
              <p>你还未获得积分哦</p>！
            </li>
          </ul>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from './../components/scroll.vue'
  import './../../assets/style/integral.css'
  import axios from 'axios'
  export default {
    name: 'homeIntegral',
    data () {
      return {
        fullscreenLoading:false,
        count: null,
        record: []
      }
    },
    components:{
      Scroll
    },
    mounted () {
      this.getInterecord()
    },
    methods:{
      ruleClick(){
        this.$alert('<div class="alertContent">' +
          '<h2>注册登录</h2>' +
          '<ul>' +
          '<li>20分/新会员注册</li>' +
          '<li>20分/老会员首次登陆并绑定</li>' +
          '</ul>' +
          '<h2>签到答题</h2>' +
          '<ul>' +
          '<li>5分/签到，且答题正确</li>' +
          '<li>2分/签到，答题错误</li>' +
          '</ul>' +
          '<h2>科普活动</h2>' +
          '<ul>' +
          '<li>5分/成功预约科普活动</li>' +
          '<li>1分/为科普活动点赞</li>' +
          '<li>1分/收藏科普活动</li>' +
          '<li>2分/评论科普活动</li>' +
          '<li>5分/参与微信问卷调查</li>' +
          '<li>5分/参与微信投票</li>' +
          '</ul>' +
          '<h2>科普电影</h2>' +
          '<ul>' +
          '<li>5分/在重庆科技馆微信公众号上购买电影票</li>' +
          '</ul>' +
          '<h2>志愿者</h2>' +
          '<ul>' +
          '<li>5分/志愿者申请通过</li>' +
          '<li>10分/志愿者申领任务通过</li>' +
          '</ul>' +
          '<p class="notes">注：微信积分试行期间，积分规则将会适时调整，如带来不便敬请谅解。</p>'+
          '</div>', '积分规则', {
          dangerouslyUseHTMLString: true,
          showConfirmButton: false
        });
      },
      getInterecord () {
        this.fullscreenLoading = true
        axios.get('/Home/Person/inteList')
          .then(this.getInterecordSucc)
      },
      getInterecordSucc (res) {
        if(res){
          const data = res.data
          this.count = data.integral
          this.record = data.record
          console.log(data)
          this.fullscreenLoading = false
        }
      }
    }
  }
</script>
<style scoped lang="less">

  .homeIntegral{
    background-color:#f5f5f5;
    .home-title{
      width:7.5rem;
      height:3.5rem;
      background:url(./../../assets/img/h-title-bg-1.png) no-repeat center;
      background-size:100%;
      justify-content: space-between;
      .setBtn-box{
        padding:15px;
        color:white;
        padding-bottom:0;
        .set-ico{
          display: inline-block;
          width:0.3rem;
          height:0.3rem;
          background:url(./../../assets/ico/why-ico-1.png) no-repeat center;
          background-size:100%;
          margin-right:5px;
          position:relative;
          top:0.04rem;
        }
      }
      .h-left-tx{
        text-align: center;
        .h-left-text{
          color:white;
          margin-top:10px;
          h2{
            font-size:20px;
            margin-bottom:5px;
            font-weight: bold;
          }
        }
      }
      .h-right-qd{
        margin-top:20px;
        text-align: center;
        a{
          display: inline-block;
          background-color:white;
          line-height:30px;
          border-radius: 15px;
          padding:0 10px;
          background: -webkit-linear-gradient(left, #ee886d , #f56f74); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right, #ee886d , #f56f74); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right, #ee886d , #f56f74); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #ee886d , #f56f74); /* 标准的语法 */
          color:white;
        }
      }
    }
    .hall-list-bd{
      margin-top:10px;
      background-color:white;
      h2{
        padding:10px;
        font-size:16px;
        color:#506187;
        font-weight: bold;
        /*border-bottom:1px solid #eee;*/
      }
      ul{
        li{
          flex-wrap: wrap;
          width:100%;
          text-align: left;
          padding:20px 10px;
          border-top:1px solid #eee;
          span{
            color:#ff822e;
            font-size:16px;
          }
          .left-text{
            h4{
              color:#506187;
              margin-bottom:5px;
              font-weight: bold;
            }
            p{
              color:#8490ab;
              font-size:13px;
            }
          }

        }
        li:nth-child(odd){
          border-right:1px solid #eee;
        }
      }
    }
  }
</style>
