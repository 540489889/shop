<template>
  <div class="register-wrapper recommend-content wrapper"  v-loading.fullscreen.lock="fullscreenLoading" ref="wrapper">
    <div>
      <div class="register-content">
        <h4>用户注册</h4>
        <ul>
          <li>
            <el-input class="input-ui"
                      placeholder="用户名称"
                      v-model="inputName">
              <i slot="prefix" class="el-input__icon el-icon-r-1"></i>
            </el-input>
          </li>
          <li>
            <el-input class="input-ui"
                      :type="visible1"
                      placeholder="设置密码"
                      v-model="inputPwd">
              <i slot="prefix" class="el-input__icon el-icon-r-2"></i>
              <i slot="suffix" @click="showPwd1" class="el-input__icon el-icon-r-5"></i>
            </el-input>
          </li>
          <li>
            <el-input class="input-ui"
                      :type="visible2"
                      placeholder="确认密码"
                      v-model="inputPwds">
              <i slot="prefix" class="el-input__icon el-icon-r-2"></i>
              <i slot="suffix" @click="showPwd2" class="el-input__icon el-icon-r-5"></i>
            </el-input>
          </li>
          <li>
            <el-input class="input-ui input-tell"
                      placeholder="手机号码"
                      v-model="inputTell">
              <i slot="prefix" class="el-input__icon el-icon-r-3"></i>
            </el-input>
            <el-button type="info" :disabled="captchaDisable"  plain @click="codeBtnAction" v-html="captchaLabel"></el-button>
          </li>
          <li>
            <el-input class="input-ui"
                      placeholder="短信验证码"
                      v-model="inputCode">
              <i slot="prefix" class="el-input__icon el-icon-r-4"></i>
            </el-input>
          </li>
          <li>
            <el-button type="primary" class="r-btn-bg" round @click="handleRegister">完成注册</el-button>
          </li>
        </ul>
      </div>
      <div class="regIndex-footer">
        <div class="sign-switch text-center">
          <router-link to="/reg/index" replace>已有帐号</router-link>
          <router-link to="/reg/forgetPwd" replace>忘记密码？</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

//  import timer from './../../assets/js/timer'
  import Scroll from './../components/scroll.vue'
  import { mapMutations } from 'vuex'
  import axios from 'axios'
  import './../../assets/style/resetEui.css'
  export default {
    name: 'regRegister',
    data () {
      return {
        fullscreenLoading: false,
        inputName: '',
        inputPwd: '',
        inputPwds: '',
        inputTell: '',
        inputCode: '',
        captchaLabel:"获取验证码",
        seconds:60,
        captchaDisable:false,
        timer:null,
        visible1: 'password',
        visible2: 'password'
      }
    },
    components:{
      Scroll
    },
    mounted () {

    },
    methods:{
      ...mapMutations(['changeLogin']),
      //显示密码
      showPwd1 (){
        if(this.visible1 === 'password'){
          this.visible1 = 'text'
        }else{
          this.visible1 = 'password'
        }
      },
      showPwd2 (){
        if(this.visible2 === 'password'){
          this.visible2 = 'text'
        }else{
          this.visible2 = 'password'
        }
      },
      //定义倒计时数据
      countdown () {
        if (this.seconds < 1) {
          this.captchaLabel = '获取验证码';
        } else {
          this.captchaDisable = true;
          this.seconds --;
          this.captchaLabel = this.seconds + '秒后重新获取'
        }
      },
      //获取验证码
      codeBtnAction () {
        let tellReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if(!tellReg.test(this.inputTell)){
          this.$message.error('请填写正确的手机号!');
          return false
        }
        //发送请求
        this.getCode();
        //启动1s步长倒计时
        this.timer = setInterval(()=>{
          this.countdown()
          if(this.seconds === 0){
            this.captchaLabel = '重新获取';
            this.seconds = 60;
            this.captchaDisable = false;
            //停止倒计时
            clearTimeout(this.timer)
          }
        },1000);

      },
      //注册
      handleRegister(){
//        let nameReg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
        if (!this.inputName) {
          this.$message.error('用户名不能为空');
          return false
        }
        let pwdReg=/^[a-zA-Z0-9]{4,10}$/;
        if (!pwdReg.test(this.inputPwd)) {
          this.$message.error('密码不能含有非法字符，长度在4-10之间');
          return false
        }
        if (this.inputPwds != this.inputPwd) {
          this.$message.error('两次输入的密码不一致');
          return false
        }
        if (this.inputCode == '') {
          this.$message.error('请输入验证码');
          return false
        }
        this.subRegister()
      },
      getCode () {
        let _this =this
        let params = new URLSearchParams();
        params.append('tel', this.inputTell);
        axios({
          method: 'post',
          url: '/Home/Person/send_verify',
          data:params
        }).then(function (res) {
            const data = res.data
            if(!data.status){
              _this.$notify.error({
                title: '错误',
                message: data.msg,
                showClose: false,
                duration: 2000
              });
            }
          }).catch(function (error) {
            console.log(error);
          })
      },
      subRegister () {
        this.fullscreenLoading = true;
        let _this =this
        let params = new URLSearchParams();
        params.append('loginName',this.inputName );
        params.append('pwd', this.inputPwd);
        params.append('tel', this.inputTell);
        params.append('yzm', this.inputCode);
        axios({
          method: 'post',
          url: '/Home/Person/register',
          data: params
        }).then(function (res) {
          const data = res.data
          _this.fullscreenLoading = false;
          if(data.status){
            _this.userToken = 'Bearer ' + data.token;
            // 将用户token保存到vuex中
            _this.changeLogin({ Authorization: _this.userToken });
            _this.$alert('<div class="text-center">' +
              '<i class="el-icon-success\n"></i>' +
              '<p class="alert-infor-p">恭喜你注册成功！</p>' +
              '</div>', '', {
              confirmButtonText: '去服务大厅',
              dangerouslyUseHTMLString: true,
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  _this.$router.replace({ path: '/' });
                  done();
                } else {
                  done();
                }
              }
            });
          }else{
            _this.$notify.error({
              title: '错误',
              message: data.msg,
              showClose: false,
              duration: 2000
            });
          }

        }).catch(function (error) {
          console.log(error);
        })
      },
    }
  }
</script>
<style lang="less">
  .alert-infor-p{
    color:#506187;
    font-size:15px;
    margin:15px 0 0 0!important;
  }
  .el-message-box__btns{
    text-align: center;
  }
  .el-button--small, .el-button--small.is-round{
    display: inline-block;
    width:2.1rem;
    height:0.7rem;
    border-radius: 0.4rem;
    background: -webkit-linear-gradient(left, #3cc6fb , #12b1ee); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #3cc6fb , #12b1ee); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #3cc6fb , #12b1ee); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #3cc6fb , #12b1ee); /* 标准的语法 */
    color:white;
    margin-top:15px;
  }
  .alert-r-a{

  }
  .el-message-box{
    width:4.9rem;
    height:4.2rem;
    overflow: initial;
  }
  .el-icon-success{
    font-size:40px;
    color:#33cc00;
  }
  .el-icon-close{
    position:absolute;
    border-radius: 50%;
    bottom:-5rem;
    left:-2.55rem;
    padding:0.1rem;
    font-size:25px;
    background-color:white;
  }
  .register-wrapper{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    min-height:12.06rem;
    background:url(./../../assets/img/register-bg.png) no-repeat top center;
    background-size:cover;
    overflow: hidden;
    .register-content{
      padding:1rem 0.7rem 0.5rem 0.7rem;
      h4{
        position:relative;
        padding-left:10px;
        color:white;
        font-size:15px;
        margin-bottom:0.6rem;
      }
      h4:before{
        position:absolute;
        left:0;
        top:50%;
        content: "";
        display: inline-block;
        width:3px;
        height:14px;
        margin-top:-7px;
        background-color:white;
        border-radius: 2px;
      }
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
              color:#506187;
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
            font-size:13px;
            padding:0;
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
