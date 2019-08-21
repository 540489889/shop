<template>
  <div class="volunteerHome wrapper" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="" :scrollY="scrollY" :data="list">
      <div>
        <div class="home-title flex-box">
          <span class="v-g-box" @click="userMask"><i class="v-g-ico-1"></i>个人资料</span>
          <div class="h-left-tx">
            <div class="tx-box">
              <img :src="userInfo.headimgurl" alt="">
            </div>
            <div class="h-left-text">
              <h2 class="text-center">{{info.name}}</h2>

              <h6 v-if="info.check==1" class="text-center"><span>已认证</span></h6>
              <h6 v-else class="text-center"><span>暂未认证</span></h6>
            </div>
          </div>
        </div>
        <div class="home-list-tp">
          <h2>千里之行，始于足下，从这里开启志愿者之旅吧</h2>
          <router-link tag="button" class="retrunIndex"  to="/volunteer/index">去看看志愿者项目</router-link>
        </div>
        <div class="home-list-bt">
          <ul class="h-list-2 h-list-ui">
            <li class="flex-box">
              <div class="list-left">
                当前参与志愿者项目
              </div>
              <div v-if="task.length">
                <div class="list-right">{{task.length}}个项目即将开始 <i class="el-icon-arrow-right"></i></div>
              </div>
              <div v-else>
                <div class="list-right">你暂时还没有任务哟！<i class="el-icon-arrow-right"></i></div>
              </div>
            </li>
            <li class="flex-box">
              <div class="list-left">
                最新消息
              </div>
              <div class="list-right">暂无消息 <i class="el-icon-arrow-right"></i></div>
            </li>
            <li class="flex-box">
              <div class="list-left">
                志愿者参加记录
              </div>
              <div class="list-right">暂无记录 <i class="el-icon-arrow-right"></i></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--身份认证-->
    <transition name="el-fade-in">
      <div v-show="dwShow" class="details-mask mask">
        <div class="d-wrapper">
          <h3 class="qr-title">志愿者身份认证</h3>
          <div class="d-w-mall">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户姓名" prop="manName">
                <i class="zz-rz-ico-2 zz-rz"></i>
                <el-input v-model="ruleForm2.manName" ></el-input>
              </el-form-item>
              <el-form-item label="身份证号码" prop="manId">
                <i class="zz-rz-ico-1 zz-rz"></i>
                <el-input v-model="ruleForm2.manId" ></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="manTell">
                <i class="zz-rz-ico-3 zz-rz"></i>
                <el-input v-model="ruleForm2.manTell" ></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="resource">
                <i class="zz-rz-ico-4 zz-rz"></i>
                <el-radio-group v-model="ruleForm2.resource">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="学校" prop="school">
                <i class="zz-rz-ico-5 zz-rz"></i>
                <el-input v-model="ruleForm2.school" ></el-input>
              </el-form-item>
              <el-form-item class="subBox">
                <el-button class="d-w-btn" type="primary" @click="submitForm('ruleForm2')">提交志愿者认证</el-button>
              </el-form-item>
            </el-form>
            <p class="desc-ts">以上信息请如实填写，便于审核通过</p>
          </div>
          <!--<button type="button" @click="convertClick">完成报名</button>-->
          <i class="el-icon-circle-close d-w-close" @click="closeDetailsMask"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import './../../assets/style/radioStyle.css'
  import Scroll from './../components/scroll.vue'
  import axios from 'axios'
  export default {
    name: 'volunteerHome',
    data () {
      //人数
      var checkManId = (rule, value, callback) =>{
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(!reg.test(value)) {
          return callback(new Error('请输入正确的身份证号码'))
        }else{
          callback()
        }
      };
      //姓名
      var checkManName = (rule, value, callback) =>{
        if(!value) {
          return callback(new Error('请输入姓名'))
        }else{
          callback()
        }
      };
      //电话
      var checkManTell = (rule, value, callback) =>{
        let tellReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(!tellReg.test(value)){
          return callback(new Error('请输入正确的电话号码'))
        }else{
          callback()
        }
      };
      //学校
      var checkManSchool = (rule, value, callback) =>{
          if(!value) {
            return callback(new Error('请输入您的学校'))
          }else{
            callback()
          }
      };
      return {
        userInfo: {},
        task: [],//我的任务
        scrollY: true,
        list: [],
        fullscreenLoading: false,
        info: {},//个人资料
        ruleForm2: {
          manId: '',
          manName: '',
          manTell: '',
          resource: '',
          school: ''
        },
        rules2: {
          manName: [
            { validator: checkManName, trigger: 'blur' }
          ],
          manTell: [
            { validator: checkManTell, trigger: 'blur' }
          ],
          manId: [
            { validator: checkManId, trigger: 'blur' }
          ],
          school: [
            { validator: checkManSchool, trigger: 'blur' }
          ],
          resource: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
        },
        makeTime: '2018/12/12 11:11',
        dwShow: false,
      }
    },
    components: {
      Scroll,
    },
    mounted () {
      this.getVolunHome()
      this.myTask()
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
      //个人资料
      userMask (){
        this.dwShow = true
      },
      closeDetailsMask (){
        this.dwShow = false
        this.list.push(1)
      },
      //认证
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this = this
            this.fullscreenLoading = true;
            let params = new URLSearchParams();
            params.append('name',this.ruleForm2.manName );
            params.append('idcard', this.ruleForm2.manId);
            params.append('tel', this.ruleForm2.manTell);
            params.append('sex', this.ruleForm2.resource);
            params.append('school', this.ruleForm2.school);
            axios({
              method: 'post',
              url: '/Home/Volunteer/reg',
              data: params
            }).then(function (res) {
              _this.fullscreenLoading = false;
              const data = res.data
              _this.dwShow = false
              console.log(data)
              if(data.status){
                location.reload()
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //获取个人信息
      getVolunHome () {
        axios.get('/Home/Volunteer/index')
          .then(this.getVolunHomeSucc)
      },
      getVolunHomeSucc (res) {
        if(res){
          const data = res.data
          if( data.info === null){
            this.dwShow = true
          }else{
            this.dwShow = false
            this.info = data.info
            this.ruleForm2.manId = this.info.idcard
            this.ruleForm2.manName = this.info.name
            this.ruleForm2.resource = this.info.sex
            this.ruleForm2.school = this.info.school
            this.ruleForm2.manTell = this.info.tel
          }
          console.log(data)
          this.list.push(1)
        }
      },
      //我的任务
      myTask (){
        const _this = this
        axios({
          method: "get",
          url: "/Home/Volunteer/myTask",
        }).then(function (res) {
          const data = res.data
          _this.task = data.data
          console.log(data)
        })
      }
    }
  }
</script>

<style lang="less">
  .volunteerHome{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color:#f5f5f5;
    .details-mask{
      .d-wrapper{
        width:6.2rem;
        height:9rem;
        background-color:white;
        border-radius: 5px;
        margin:0 auto;
        position:absolute;
        top:45%;
        left:50%;
        transform: translate(-50%,-50%);
        text-align: left;
        color:#506187;
        padding:10px 20px;
        .d-w-mall{
          .desc-ts{
            color:#999;
            text-align: center;
          }
          .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
            content: initial;
          }
          .el-form-item{
            border-bottom:1px solid #eee;
            position:relative;
            margin-bottom:15px;
            .zz-rz{
              position:absolute;
              left:-105px;
              top:50%;
              transform: translateY(-50%);
              width:0.4rem;
              height:0.4rem;
              z-index: 9;
            }
            .zz-rz-ico-1{
              background:url(./../../assets/ico/zz-rz-1.png) no-repeat;
              background-size:100%;
            }
            .zz-rz-ico-2{
              background:url(./../../assets/ico/zz-rz-2.png) no-repeat;
              background-size:100%;
            }
            .zz-rz-ico-3{
              background:url(./../../assets/ico/zz-rz-3.png) no-repeat;
              background-size:100%;
            }
            .zz-rz-ico-4{
              background:url(./../../assets/ico/zz-rz-4.png) no-repeat;
              background-size:100%;
            }
            .zz-rz-ico-5{
              background:url(./../../assets/ico/zz-rz-6.png) no-repeat;
              background-size:100%;
            }
          }
          .el-input__inner{
            border:none;
          }
          .subBox{
            border:none;
            .el-form-item__content{
              margin:0 !important;
              .el-radio-group{
                display: inline-block;
              }
            }
          }
        }
        .d-w-close{
          position:absolute;
          bottom:-1rem;
          left:50%;
          transform: translateX(-50%);
          color:white;
          font-size:35px;
        }
        .d-w-integral{
          padding:10px 0;
          border-bottom:1px solid #eee;
          border-top:1px solid #eee;
          margin-top:20px;
          font-size:16px;
        }
        .d-w-btn{
          display: block;
          color:white;
          font-size:13px;
          border-radius: 0.4rem;
          border:none;
          margin:0 auto;
          width:2.8rem;
          margin-top:0.2rem;
          background: -webkit-linear-gradient(left, #ee886d , #f56f74); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right, #ee886d , #f56f74); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right, #ee886d , #f56f74); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #ee886d , #f56f74); /* 标准的语法 */
        }
        .qr-title{
          text-align: center;
          padding:0.2rem 0 0.2rem 0;
          font-size:16px;
          margin-top:0;
        }
        .el-aside{
          width:2.5rem !important;
          height:2.5rem !important;
          text-align: center;
          overflow: hidden;
          border:1px solid #f5f5f5;
          border-radius: 5px;
          padding:10px;
          img{
            width:100%;
            height:100%;
          }
        }
        .el-header{
          color:#506187;
          padding:0 10px;
          padding-right:0;
          height:initial !important;
        }
        .el-main{
          padding:5px 0 0 10px;
          h5{
            .integral{
              color:#ee886d;
            }
            .stock{
              color:#999;
              margin-left:5px;
              text-decoration:line-through;
            }
          }
          h6{
            color:#506187;
          }
        }
        .el-footer{
          padding:0 0 0 10px;
          height:initial !important;
        }
      }
    }
    .v-g-box{
      position:absolute;
      right:10px;
      top:10px;
      color:white;
      .v-g-ico-1{
        display: inline-block;
        width:0.4rem;
        height:0.4rem;
        background:url(./../../assets/ico/v-g-ico-1.png) no-repeat center;
        background-size:100%;
        position:relative;
        top:6px;
        margin-right:5px;
      }
    }
    .home-title{
      width:7.5rem;
      height:3rem;
      background:url(./../../assets/img/h-title-bg-2.png) no-repeat center;
      background-size:100%;
      justify-content: center;
      position:relative;
      .h-left-tx{
        text-align: center;
        .tx-box{
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
            margin:5px 0;
          }
          h6{
            span{
              min-width:0.8rem;
              line-height:20px;
              text-align: center;
              font-size:12px;
              padding:0 10px;
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
      margin:10px 0;
      padding:10px;
      h2{
        text-align: center;
        padding:10px;
      }
      .retrunIndex{
        display: block;
        width:5rem;
        height:0.8rem;
        background: -webkit-linear-gradient(left, #ee886d , #f56f74); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #ee886d , #f56f74); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #ee886d , #f56f74); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #ee886d , #f56f74); /* 标准的语法 */
        color:white;
        border:none;
        border-radius: 0.4rem;
        margin:0 auto;
        margin-top:0.2rem;
        margin-bottom:10px;
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
            font-size:15px;
            position:relative;
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
