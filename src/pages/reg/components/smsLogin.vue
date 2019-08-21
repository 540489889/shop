<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <ul>
      <li>
        <el-input class="input-ui input-tell"
                  placeholder="手机号码"
                  v-model="inputTell">
          <i slot="prefix" class="el-input__icon el-icon-r-3"></i>
        </el-input>
        <el-button type="info" plain :disabled="captchaDisable" @click="codeBtnAction" v-html="captchaLabel"></el-button>
      </li>
      <li>
        <el-input class="input-ui"
                  placeholder="短信验证码"
                  v-model="inputCode">
          <i slot="prefix" class="el-input__icon el-icon-r-4"></i>
        </el-input>
      </li>
      <li>
        <el-button type="primary" class="r-btn-bg" round @click="smsSign">立即登录</el-button>
      </li>
    </ul>
  </div>
</template>
<style>
</style>
<script>
  import { mapMutations } from 'vuex'
  import axios from 'axios'
  export default {
    name: 'smsLogin',
    data () {
      return {
        fullscreenLoading: false,
        inputTell: '',
        inputCode: '',
        captchaLabel:"获取验证码",
        seconds:60,
        captchaDisable:false,
        timer:null
      }
    },
    methods:{
      ...mapMutations(['changeLogin']),
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
        let tellReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(!tellReg.test(this.inputTell)){
          this.$message.error('请填写正确的手机号!');
          return false
        }
        //发送请求
        this.getCode();
        //启动1s步长倒计时
        this.timer = setInterval(()=>{
          this.countdown()
          if(this.seconds == 0){
            //停止倒计时
            clearTimeout(this.timer)
            this.captchaLabel = '重新获取';
            this.seconds = 60;
            this.captchaDisable = false;
          }
        },1000);

      },
      getCode () {
        let _this =this
        let params = new URLSearchParams();
        params.append('tel', this.inputTell);
        axios({
          method: 'post',
          url: '/Home/Person/send_code',
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
      //登录
      smsSign(){
        let tellReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(!tellReg.test(this.inputTell)){
          this.$message.error('请填写正确的手机号!');
          return false
        }
        if (this.inputCode == '') {
          this.$message.error('请输入验证码');
          return false
        }
        this.subSmsSign()
      },
      subSmsSign(){
        this.fullscreenLoading = true;
        let _this = this
        let params = new URLSearchParams();
        params.append('tel',this.inputTell );
        params.append('yzm', this.inputCode);
        axios({
          method: 'post',
          url: '/Home/Person/telLogin',
          data: params
        }).then(function (res) {
          const data = res.data
          _this.fullscreenLoading = false;
          if(data.status){
            _this.userToken = 'Bearer ' + data.token;
            // 将用户token保存到vuex中
            _this.changeLogin({ Authorization: _this.userToken });
            //如果存在参数
            if(_this.$route.query.redirect) {
              let redirect = _this.$route.query.redirect;
              _this.$router.replace(redirect);//则跳转至进入登录页前的路由
            }else{
              _this.$router.replace({ path: '/' });
            }
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
      }
    }
  }
</script>
