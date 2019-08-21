<template>
  <div class="regIndex recommend-content"
          :listenScroll="listenScroll"
          :scrollY="scrollY"
  >
      <div>
        <div class="regIndex-logo"><span class="logo"></span></div>
        <div class="regIndex-list">
          <keep-alive>
            <div v-if="cond">
              <!--帐号登录-->
              <transition name="slide-fade">
                <accounts-login></accounts-login>
              </transition>
            </div>
            <div v-else>
              <!--短信登录-->
              <transition name="slide-fade">
                <sms-login></sms-login>
              </transition>
            </div>
          </keep-alive>
        </div>
        <div class="regIndex-footer">
          <h6><button type="button" @click="signSwitch">{{signText}}</button></h6>
          <div class="sign-switch text-center">
            <router-link to="/reg/register" replace>立即注册</router-link>
            <router-link to="/reg/forgetPwd" replace>忘记密码？</router-link>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import Scroll from './../components/scroll.vue'
  import './../../assets/style/resetEui.css'
  import accountsLogin from './components/accountsLogin'
  import smsLogin from './components/smsLogin'
//  import timer from './../../assets/js/timer'
  import axios from 'axios'
  export default {
    name: 'regIndex',
    data () {
      return {
        signText: '手机验证码登录',
        cond: true,
        scrollY: true,
        pulldown: true,
        pullup: true,
        listenScroll:true
      }
    },
    components:{
      accountsLogin,
      smsLogin,
      Scroll
    },
    mounted () {
    },
    methods:{
      upScroll(x,y){
      },
      signSwitch() {
        this.cond = !this.cond
        if(this.signText == '手机验证码登录'){
          this.signText = '帐号密码登录'
        }else{
          this.signText = '手机验证码登录'
        }
      }
    }
  }
</script>
<style lang="less">
  .slide-fade-enter-active {
    transition: all 1s ease;
  }
  .slide-fade-leave-active {
    transition: all 0s;
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(30px);
    opacity: 0;
  }
  .regIndex{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    min-height:12.06rem;
    height:100%;
    background:url(./../../assets/img/register-bg.png) no-repeat top center;
    background-size:cover;
    overflow: hidden;
    .regIndex-logo{
      text-align: center;
      .logo{
        width:1.8rem;
        height:2.24rem;
        margin:1.2rem auto;
        display: inline-block;
        background:url(./../../assets/ico/logo.png) no-repeat center;
        background-size:100%;
      }
    }
    .regIndex-list{
      height:4rem;
      padding:1.2rem 0.7rem 0.5rem 0.7rem;
      padding-top:0;
      padding-bottom:0;
      overflow: hidden;
      ul{
        li{
          position:relative;
          margin-bottom:0.5rem;
          .el-input__inner{
            color:#506187;
            background:rgba(255,255,255,0.6);
            border:none;
            border-radius: 0.5rem;
            padding-left:0.9rem;
            height: 0.9rem;
          }
          .el-input__inner::-webkit-input-placeholder{
            color:white;
          }    /* 使用webkit内核的浏览器 */
          .el-input__inner:-moz-placeholder{
            color:white;
          }                  /* Firefox版本4-18 */
          .el-input__inner::-moz-placeholder{
            color:white;
          }                  /* Firefox版本19+ */
          .el-input__inner:-ms-input-placeholder{
            color:white;
          }           /* IE浏览器 */
          .el-input__icon{
            margin-left:0.2rem;
          }
          .el-input__suffix{
            right:14px;
          }
          .el-icon-r-1{
            background:url(./../../assets/ico/r-ico-1.png) no-repeat center;
            background-size:0.5rem 0.5rem;
          }
          .el-icon-r-2{
            background:url(./../../assets/ico/r-ico-2.png) no-repeat center;
            background-size:0.5rem 0.5rem;
          }
          .el-icon-r-3{
            background:url(./../../assets/ico/r-ico-3.png) no-repeat center;
            background-size:0.5rem 0.5rem;
          }
          .el-icon-r-4{
            background:url(./../../assets/ico/r-ico-4.png) no-repeat center;
            background-size:0.5rem 0.5rem;
          }
          .el-icon-r-5{
            background:url(./../../assets/ico/r-ico-5.png) no-repeat center;
            background-size:0.5rem 0.5rem;
          }
          .input-tell{
            .el-input__inner{
              padding-right:2.5rem;
            }
          }
          .el-button--info{
            border:1px solid rgba(255,255,255,0.6);
            position:absolute;
            right:0;
            top:0;
            background-color:#8daeca;
            color:white;
            height:0.9rem;
            border-radius: 0.45rem;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            width:2.5rem;
            border-left:0;
            padding:0;
            font-size:13px;
            span{
              position:relative;
              left:-0.1rem;
            }
          }
          .r-btn-bg{
            display: block;
            width:100%;
            height:1rem;
            border-radius:0.45rem;
            border:none;
            background:url(./../../assets/ico/r-btn-bg.png) no-repeat center;
            background-size:100% 100%;
          }
        }
      }
    }
    .regIndex-footer{
      h6{
        margin:0.6rem 0;
        text-align: center;
        button{
          border:none;
          background:none;
          color:white;
        }
      }
      .sign-switch{
        a{
          color:white;
        }
        a:first-child{
          padding-right:11px;
          border-right:1px solid white;
        }
        a:last-child{
          padding-left:10px;
        }
      }
    }
  }
</style>
