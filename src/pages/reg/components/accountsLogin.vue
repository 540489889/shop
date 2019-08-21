<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <ul>
      <li>
        <el-input class="input-ui"
                  placeholder="帐号名称"
                  v-model="inputName">
          <i slot="prefix" class="el-input__icon el-icon-r-1"></i>
        </el-input>
      </li>
      <li>
        <el-input :type="visible" class="input-ui"
                  placeholder="帐号密码"
                  v-model="inputPwd" autocomplete="off">
          <i slot="prefix" class="el-input__icon el-icon-r-2"></i>
          <i slot="suffix" @click="showPwd" class="el-input__icon el-icon-r-5"></i>
        </el-input>
      </li>
      <li>
        <el-button type="primary" class="r-btn-bg" round @click="accountsSign">立即登录</el-button>
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
    name: 'accountsLogin',
    data () {
      return {
        fullscreenLoading: false,
        inputName: '',
        inputPwd: '',
        visible: 'password'
      }
    },
    methods:{
      ...mapMutations(['changeLogin']),
      //显示密码
      showPwd (){
        if(this.visible === 'password'){
          this.visible = 'text'
        }else{
          this.visible = 'password'
        }
      },
      //登录
      accountsSign(){
        let nameReg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
        if (!this.inputName) {
          this.$message.error('请输入正确的用户名称')
          return false
        }
//        let pwdReg=/^[a-zA-Z0-9]{4,10}$/;
        if (!this.inputPwd) {
          this.$message.error('请输入密码');
          return false
        }
        this.subAccountsSign()
      },
      subAccountsSign(){
        let _this = this
        this.fullscreenLoading = true;
        let params = new URLSearchParams();
        params.append('loginName',this.inputName );
        params.append('pwd', this.inputPwd);
        axios({
          method: 'post',
          url: '/Home/Person/login',
          data: params
        }).then(function (res) {
          _this.fullscreenLoading = false;
          const data = res.data
          if(data.status){
            _this.userToken = 'Bearer ' + data.token;
            // 将用户token保存到vuex中
            _this.changeLogin({ Authorization: _this.userToken });
            //如果存在参数
            if(_this.$route.query.redirect) {
              let redirect = _this.$route.query.redirect;
              //则跳转至进入登录页前的路由
              _this.$router.replace(redirect);
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
