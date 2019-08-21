<template>
  <scroll class="recommend-content" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="volunteerDetails">
        <page-swiperb :banner="swiperList"></page-swiperb>
      <div class="details-bt">
        <h2>{{list.taskName}}</h2>
        <!--<h5><span>2000 <sub>积分</sub></span> 剩余：88件</h5>-->
        <p>{{list.describe}}</p>
      </div>
      <ul class="make-d-d">
        <li>活动时间：{{list.taskStart | formatDate}} - {{list.taskEnd | formatDate}}</li>
        <li>活动地点：{{list.place}}</li>
        <li class="flex-box" v-if="list.tel"><p>咨询电话：<a href="tel:023-6666666">023-6666666</a></p> <a href="tel:023-6666666" class="el-icon-phone tell-ico"></a></li>
        <li class="flex-box"><p>所需名额：<a>{{list.nember}}人</a></p> <a>已报名：<em>{{list.num}}人</em></a></li>
      </ul>
      <div class="bm-v-btn" v-if="taskStatus==0">
        <button class="bm-btn" @click="signVo">申领报名</button>
      </div>
      <div class="bm-v-btn" v-else>
        <button class="bm-btn overdue" >申领报名</button>
      </div>
      <transition name="el-fade-in">
        <div class="v-success-tc mask" v-show="succShow">
          <div class="v-tc-wrapper">
            <i class="el-icon-circle-check ss-ico"></i>
            <h6>提交成功</h6>
            <router-link tag="button" class="retrunIndex"  to="/volunteer/index">返回首页</router-link>
            <p>人工审核中，请及时关注消息</p>
            <i class="el-icon-circle-close-outline ii-close-ico" @click="closeSuccTc"></i>
          </div>
        </div>
      </transition>
    </div>
  </scroll>
</template>
<script>
  import {formatDate} from '../../assets/js/formTime.js';
  import Scroll from './../components/scroll.vue'
  import axios from 'axios'
  import pageSwiperb from './components/pageSwiperb.vue'
  export default {
    name: 'activeDetails',
    components: {
      pageSwiperb,
      Scroll
    },
    data (){
      //人数
      var checkManNum = (rule, value, callback) =>{
        if(!value) {
          return callback(new Error('请输入人数'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          }else{
            callback();
          }
        })
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
      var checkSonName = (rule, value, callback) =>{
        if(!value) {
          return callback(new Error('请输入姓名'))
        }else{
          callback()
        }
      };
      return {
        fullscreenLoading: false,
        taskStatus: 1,
        isOver: null,//是否结束
        list:{},
        ruleForm2: {
          manNum: '',
          manName: '',
          manTell: '',
          sonName: '',
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          manNum: [
            { validator: checkManNum, trigger: 'blur' }
          ],
          manName: [
            { validator: checkManName, trigger: 'blur' }
          ],
          manTell: [
            { validator: checkManTell, trigger: 'blur' }
          ],
          sonName: [
            { validator: checkSonName, trigger: 'blur' }
          ]
        },
        makeTime: '2018/12/12 11:11',
        dwShow: false,
        succShow: false,
        num: 1,
        activeName: 'first',
        swiperList:  '',
        item: {id: 0,title: 'Lipault手提包 五彩树叶织物',integral:200,discount:399,stock:999},
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy年MM月dd日 hh:mm');
      }
    },
    methods: {
      //详情信息
      getInfo () {
        this.fullscreenLoading = true;
        let params = new URLSearchParams()
        let id = this.$route.query.id
        let taskStatus = this.$route.query.taskStatus
        this.taskStatus = taskStatus
        axios.get('/Home/Volunteer/detail?id='+id)
          .then(this.getInfoSucc)
      },
      getInfoSucc (res) {
        const _this = this
        _this.fullscreenLoading = false
        if(res){
          const data = res.data
          this.list = data.data
          console.log(data)
          this.swiperList = this.list.img

        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleNumChange(value) {
        console.log(value);
      },
      closeDetailsMask (){
        this.succShow = false
      },
      //领取任务
      signVo(){
        const _this = this
        let params =  new URLSearchParams()
        let id = this.$route.query.id
        params.append('id',id)
        axios({
          method: 'post',
          url: '/Home/Volunteer/apply',
          data: params
        }).then(function (res) {
          const data = res.data
          if(data.status){
            _this.succShow = true
          }else{
            _this.$notify({
              title: '消息',
              message: data.msg,
              showClose: false,
              duration: 2000,
            });
          }
          console.log(data)
        })
      },
      closeSuccTc (){
        this.succShow = false
      }
    },
    mounted (){
      this.getInfo()
    }
  }
</script>
<style lang="less">
  .volunteerDetails{
    position:absolute;
    background-color:#f5f5f5;
    width:100%;
    min-height:100%;
    color:#506187;
    .d-wrapper{
      background-color:white;
    }
    .v-success-tc{
      .v-tc-wrapper{
        width:4.9rem;
        height:4.9rem;
        background-color:white;
        border-radius: 5px;
        position:relative;
        top:45%;
        left:50%;
        transform: translate(-50%,-50%);
        padding:0.5rem;
        .ss-ico{
          font-size:40px;
          color:#33cc00;
          margin-bottom:5px;
          margin-top:0.2rem;
        }
        .retrunIndex{
          display: block;
          width:2.2rem;
          height:0.7rem;
          background: -webkit-linear-gradient(left, #ee886d , #f56f74); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right, #ee886d , #f56f74); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right, #ee886d , #f56f74); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #ee886d , #f56f74); /* 标准的语法 */
          color:white;
          border:none;
          border-radius: 0.35rem;
          margin:0 auto;
          margin-top:0.5rem;
        }
        p{
          margin-top:0.4rem;
        }
        .ii-close-ico{
          position:absolute;
          bottom:-1rem;
          left:50%;
          transform: translateX(-50%);
          color:white;
          font-size:30px;
        }
      }
    }
    .make-c-c{
      background:white;
      margin:10px 0;
      padding:10px;
      input{
        border:none;
        background:none;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-progress-appearance: none;
      }
    }
    .make-d-d{
      background-color:white;
      padding:10px;
      padding-bottom:0;
      li{
        padding:10px 0;
        border-bottom:1px solid #eee;
        justify-content: space-between;
        a{
          color:#333;
          em{
            color:#ee886d;
          }
        }
        .tell-ico{
          color:#ee886d;
          font-size:20px;
        }
      }
      li:last-child{
        border:none;
      }
    }
    .bm-v-btn{
      .bm-btn{
        display: block;
        border:none;
        background: -webkit-linear-gradient(left, #ee886d , #f56f74); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #ee886d , #f56f74); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #ee886d , #f56f74); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #ee886d , #f56f74); /* 标准的语法 */
        width:6rem;
        height:0.9rem;
        line-height:0.9rem;
        border-radius: 0.45rem;
        color:white;
        margin:0 auto;
        margin-top:1rem;
      }
      .overdue{
        background:#ccc;
        color:#333;
      }
    }
    .details-bt{
      background-color:white;
      border-top:1px solid #eee;
      padding:10px 15px;
      margin-top:10px;
      margin-bottom:10px;
      h2{
        font-size:16px;
        color:#506187;
        margin-bottom:5px;
      }
      p{
        color:#506187;
      }
      h5{
        color:#506187;
        span{
          color:#ee886d;
          margin-right:5px;
          font-size:18px;
          sub{
            font-size:14px;
          }
        }
      }
    }
    .details-text{
      background-color:white;
      padding:10px;
      margin-top:10px;
      margin-bottom:0.9rem;
      .make-e-e{
        margin:0;
        padding:10px 0;
        border-bottom:1px solid #eee;
        .bd-ss{
          display: inline-block;
          height:12px;
          background-color:#11b1ee;
          width:3px;
          border-radius: 2px;
          margin-right:5px;
        }
        .sx-ico{
          display: inline-block;
          width:0.3rem;
          height:0.3rem;
          background:url(./../../assets/ico/sx-ico.png) no-repeat;
          background-size:100%;
          margin-right:5px;
        }
      }
      h2{
        padding-bottom:10px;
        border-bottom:1px solid #eee;
        margin-bottom:10px;
        font-size:16px;
      }
      .evaluate-box{
        ul{
          li{
            padding:10px 0;
            border-bottom:1px solid #eee;
            .evaluate-tp{
              justify-content: space-between;
              img{
                width:0.8rem;
                height:0.8rem;
                border-radius: 50%;
                margin-right:5px;
              }
            }
            p{
              color:#999;
              margin-top:10px;
            }
          }
          li:last-child{
            border:none;
          }
        }
      }
    }
  }
</style>
