<template>
  <div class="activeDetails" v-loading.fullscreen.lock="fullscreenLoading">
    <transition name="el-fade-in">
      <div v-show="dwShow" class="details-mask mask">
        <div class="d-wrapper">
          <h3 class="qr-title">预约信息填写</h3>
          <div class="d-w-mall">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="预约人数" prop="manNum">

                <el-input v-model.number="ruleForm2.manNum" ></el-input>
              </el-form-item>
              <el-form-item label="联系姓名" prop="manName">
                <el-input v-model="ruleForm2.manName" ></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="manTell">
                <el-input v-model="ruleForm2.manTell" ></el-input>
              </el-form-item>
              <el-form-item label="孩子姓名" prop="sonName">
                <el-input v-model="ruleForm2.sonName" ></el-input>
              </el-form-item>
              <el-form-item class="subBox">
                <el-button class="d-w-btn" type="primary" @click="submitForm('ruleForm2')">完成报名</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--<button type="button" @click="convertClick">完成报名</button>-->
          <i class="el-icon-circle-close d-w-close" @click="closeDetailsMask"></i>
        </div>
      </div>
    </transition>

    <!--<scroll class="" :scrollY="scrollY">-->
    <!--:scrollY = "scrollY"-->
    <!--:data = "[swiperList,info]"-->
    <!--:dataObj = "info"-->
    <!--&gt;-->
    <div class="paddingWrapper">
      <mall-swiperb :list="swiperList"></mall-swiperb>
      <div class="details-bt">
        <h2>{{info.title}}</h2>
        <!--<h5><span>2000 <sub>积分</sub></span> 剩余：88件</h5>-->
        <!--<p style="padding-bottom:10px;">塞尔维亚引进展“尼古拉·特斯拉——来自未来的人”2018年9月29日起在上海科技馆二楼特展厅展出，为期3个月。展览循着塞尔维亚裔美国籍发明家、机械工程师电气工程师尼古拉·特斯拉独特的人生轨迹与卓越的发明创造之路，从精神、成就...</p>-->
        <div class="content" v-html="info.contents"></div>
      </div>
      <div class="make-c-c flex-box">
        <span>预约场次：</span>
        <el-select class="box-1" v-model="checkSeasons" @change="selectGet"  placeholder="请选择">
          <!--:label="item.seasonName"-->
          <el-option
            v-for="item in eduSeasons"
            :key="item.themId"
            :label="item.actionStart+' '+item.actionEnd"
            :value="item.seasonName"
          >
            <!--<span>{{item.seasonName}} {{item.actionStart}} {{item.actionEnd}}</span>-->
            <span>{{item.actionStart}} {{item.actionEnd}}</span>
          </el-option>
        </el-select>
      </div>
      <ul class="make-d-d">
        <li>场地：{{info.address}}</li>
        <li v-if="info.tel" class="flex-box"><p>咨询电话：<a href="tel:023-6666666">023-6666666</a></p> <a href="tel:023-6666666" class="el-icon-phone tell-ico"></a></li>
      </ul>
      <div class="make-e-e flex-box">
        浏览数({{view}})
        <p @click="likeClick">
          <span v-if="flag"><i class="zan-ico"></i></span>
          <span v-else><i class="zan-ico-1"></i></span>
          {{count}}</p>
      </div>
      <div class="details-text">
        <div class="make-e-e flex-box">
          <p><i class="bd-ss"></i>评价({{comment.length+comment1.length}})</p>
          <p @click="evaluateClick"><i class="sx-ico"></i>{{comment1.length}}</p>
        </div>
        <div class="evaluate-box">
          <div class="evaluateBox" v-show="evaluateShow">
            <!--<el-input v-focus="true">-->
            <div class="flex-box">
              <el-input v-model="evaluateText" class="box-1" ref="inputRef" placeholder="评价" v-focus></el-input>
              <el-button @click="Publish">发表</el-button>
            </div>

            <emotion @emotion="handleEmotion" :height="200" ></emotion>

          </div>
          <div v-if="comment.length+comment1.length===0">
            <h4 class="text-center" style="padding:10px;">暂无评论</h4>
          </div>
          <ul>
            <li v-if="comment" v-for="(item,index) in comment" :key="index">
              <div class="flex-box evaluate-tp">
                <div class="evaluate-tp-1">
                  <img src="./../../assets/img/tx-ico.png" alt="">
                  这是一个呢称
                </div>
                2018-12-10
              </div>
              <p>这个电饭锅真实太好用了，容量刚刚好！只要积分就能兑换。</p>
            </li>
            <li v-if="comment1" v-for="(item,index) in comment1" :key="index">
              <div class="flex-box evaluate-tp">
                <div class="evaluate-tp-1">
                  <img src="./../../assets/img/tx-ico.png" alt="">
                  {{item.uname}}
                </div>
                {{item.addtime}}
              </div>
              <p v-html="item.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--</scroll>-->
    <div class="details-footer">
      <div v-if="info.ifBespoke" >
        <ul class="flex-box">
          <li @click="joinCollection">加入收藏</li>
          <li class="box-1 makeBtn" @click="goMake">立即预约</li>
        </ul>
      </div>
      <div v-else>
        <ul class="flex-box">
          <li @click="joinCollection">加入收藏</li>
          <li class="box-1 makeBtn nomak">立即预约</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import Emotion from './Emotion/index'
  import Scroll from './../components/scroll.vue'
  import axios from 'axios'
  import mallSwiperb from './components/pageSwiperb.vue'
  export default {
    name: 'activeDetails',
    components: {
      mallSwiperb,
      Scroll,
      Emotion
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    },
    data (){
      //人数
      var checkManNum = (rule, value, callback) =>{
        if(!value) {
          return callback(new Error('请输入人数'))
        }
        else if(value>this.checkPople){
          return callback(new Error('剩余人数 '+this.checkPople))
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
        content: '',
        condClick: true,
        view: 0,//浏览量
        flag: null,//是否点赞
        comment: [],//评论1
        comment1: [],//评论2
        count: null,//点赞数
        scrollY: true,
        evaluateShow:false,
        evaluateText: '',
        eduSeasons: '',//场次
        themId: null,//场次Id
        fullscreenLoading:false,
        info: {},
        checkSeasons: '',//场次默认值
        checkPople:0,//场次人数
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
        num: 1,
        activeName: 'first',
        swiperList:  [],
        item: {id: 0,title: 'Lipault手提包 五彩树叶织物',integral:200,discount:399,stock:999},
      }
    },
    methods: {
      handleEmotion (i) {
        this.evaluateText += i
      },
      // 将匹配结果替换表情图片
      emotion (res) {
        let word = res.replace(/\#|\;/gi,'')
        const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
        let index = list.indexOf(word)
        return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
      },
      //点赞
      likeClick(){
        let _this = this
        let params = new URLSearchParams()
        let id = this.$route.params.id
        params.append('pid',id);
        axios({
          method:'post',
          url: '/Home/Activity/like',
          data: params
        }).then(function (res) {
          const data = res.data
          if(data.status){
            _this.count = parseInt(_this.count) + 1
            _this.flag = 1
          }else{
            _this.$notify({
              title: '消息',
              message: data.msg,
              showClose: false,
              duration: 1000,
              onClose: function () {
              }
            });
          }
          console.log(data)
        });
      },
      //立即预约
      goMake (){
        if(this.checkSeasons==''){
          this.$notify({
            title: '消息',
            message: '请选择场次',
            showClose: false,
            duration: 1000,
            onClose: function () {
            }
          });
          return false
        }
        this.dwShow = true
        this.scrollY = false
      },
      //提交评价
      Publish(){
        if(this.evaluateText===''){
          this.$message.error('请输入您的评价哦！');
          return false
        }
        const _this = this
        this.fullscreenLoading = true
        let params = new URLSearchParams()
        let id = this.$route.params.id
        params.append('pid',id)
        params.append('content',this.evaluateText);
        axios({
          method:'post',
          url: '/Home/Activity/commend',
          data: params
        }).then(function (res) {
           _this.fullscreenLoading = false
          const data = res.data
          if(!data.status){
            _this.$notify({
              title: '消息',
              message: data.msg,
              showClose: false,
              duration:1000,
              onClose: function () {
              }
            });
          }else{
            _this.getDetails()
            _this.evaluateShow = false
            _this.evaluateText = ''
          }
        });
      },
      //调起评价
      evaluateClick(){
        this.evaluateShow = !this.evaluateShow
        this.$nextTick(function () {
          // Code that will run only after the
          this.$refs.inputRef.focus()
        })
      },
      //活动收藏
      joinCollection(){
        const _this = this
//        this.fullscreenLoading = true
        let params = new URLSearchParams()
        let id = this.$route.params.id
        params.append('id',id);
        axios({
          method:'post',
          url: '/Home/Activity/collect',
          data: params
        }).then(function (res) {
          const data = res.data
          _this.$notify({
            title: '成功',
            message: data.msg,
            showClose: false,
            duration: 1000,
            type: 'success',
            onClose: function () {
//              _this.fullscreenLoading = false
            }
          });
        })
      },
      //场次选择
      selectGet(name){
        let obj = {};
        obj = this.eduSeasons.find((item)=>{
          //这里的userList就是上面遍历的数据源
          console.log(item)
          return item.seasonName === name;//筛选出匹配数据
        });
//        场次id
        this.themId = obj.themId
        this.checkPople = obj.seasonPople
      },
      //获取详情信息
      getDetails(){
        const _this = this
        this.fullscreenLoading = true
        let params = new URLSearchParams()
        let id = this.$route.params.id
        params.append('id',id);
        axios({
          method:'post',
          url: '/Home/Activity/detail',
          data: params
        }).then(function (res) {
          const data = res.data
          _this.info = data.info
          _this.eduSeasons = data.info.eduSeasons
//          _this.eduSeasons = [
//            {actionEnd: "10:57 - 12:58",
//              actionStart: "2019-08-07",
//              countPople: 20,
//              seasonName: "1",
//              seasonOrder: 1,
//              seasonPople: 20,
//              seasonPrice: 0,
//              signEnd: "10:57 - 20:57",
//              signStart: "2019-08-06",
//              themId: "4028d08a6b87acf8016c45c568960622"},
//            {actionEnd: "10:57 - 11:11",
//              actionStart: "2019-08-10",
//              countPople: 30,
//              seasonName: "5",
//              seasonOrder: 2,
//              seasonPople: 22,
//              seasonPrice: 777,
//              signEnd: "10:57 - 20:57",
//              signStart: "2019-08-06",
//              themId: "4028d08a6b87acf8016c45c568960623"},
//          ]
          _this.swiperList = data.info.icon
          _this.count = data.count
          _this.fullscreenLoading = false
          _this.comment = data.comment
          _this.comment1 = data.comment1
          _this.flag = data.flag
          _this.view = data.view
        });
      },
      submitForm(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = new URLSearchParams()
            let id = this.$route.params.id
            params.append('eduId',id);
            params.append('id',id);
            params.append('eduName',this.info.title);
            params.append('address',this.info.address);
            params.append('themId',this.themId); //场次Id
            params.append('time',this.info.startDate);
            params.append('number',this.ruleForm2.manNum);
            params.append('mobile',this.ruleForm2.manTell);
            params.append('name',this.ruleForm2.manName);
            params.append('babyname',this.ruleForm2.sonName);
            if(this.condClick){
              _this.condClick = false
              axios({
                method:'post',
                url: '/Home/Activity/order',
                data: params
              }).then(function (res) {
                _this.condClick = true
                const data = res.data
                console.log(data)
                if(data.status){
                  _this.$router.push({ path: '/active/success', query: { list: JSON.stringify(data.name)}});
                }else{
                  _this.$notify({
                    title: '消息',
                    message: data.msg,
                    showClose: false,
                    duration: 1000,
                    onClose: function () {
                      _this.dwShow = true
                    }
                  });
                }
              });
            }else{
              return false
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleNumChange(value) {
        console.log(value);
      },
      closeDetailsMask (){
        this.dwShow = false
      },
    },
    mounted (){
      this.getDetails()
    },
  }
</script>
<style lang="less">
  .activeDetails{
    color:#506187;
    padding-bottom:1rem;
    background-color:#f5f5f5;
    position:relative;
    width:100%;
    height:100%;
    .recommend-content{
      position:absolute;
      width:100%;
      height:100%;
      overflow: hidden;
      .paddingWrapper{
        padding-bottom:0.9rem;
        background-color:#f5f5f5;
      }
    }
    .evaluateBox{
      background-color:#eee;
      padding:5px;
      /*position:fixed;*/
      /*bottom:0;*/
      /*z-index: 9;*/
      width:100%;
      .el-input{
        margin-right:5px;
      }
      input{
        width:100%;
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
        }
        .tell-ico{
          color:#11b1ee;
          font-size:20px;
        }
      }
      li:last-child{
        border:none;
      }
    }
    .make-e-e{
      margin:10px 0;
      padding:10px;
      background-color:white;
      justify-content: space-between;
      i{
        display: inline-block;
        width:0.3rem;
        height:0.3rem;
        margin-right:5px;
      }
      .zan-ico{
        background:url(./../../assets/ico/zan-ico.png) no-repeat;
        background-size:100%;
      }
      .zan-ico-1{
        background:url(./../../assets/ico/zan-ico-n.png) no-repeat;
        background-size:100%;
      }
    }
    .details-bt{
      background-color:white;
      border-top:1px solid #eee;
      padding:10px;
      h2{
        font-size:16px;
        color:#506187;
        margin-bottom:10px;
        font-weight: bold;
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
      /*margin-bottom:0.9rem;*/
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
              margin-top:-2px;
              padding-left:0.8rem;
              margin-left:5px;
            }
          }
          li:last-child{
            border:none;
          }
        }
      }
    }
    .details-footer{
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
      ul{
        width:100%;


        li:first-child{
          width:40%;
          background: -webkit-linear-gradient(left, #3cc6fb , #11b1ee); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right, #3cc6fb , #11b1ee); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right, #3cc6fb , #11b1ee); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #3cc6fb , #11b1ee); /* 标准的语法 */
        }
        li{
          height:0.9rem;
          line-height:0.9rem;
          text-align: center;
          color:white;
        }
        .makeBtn{
          background: -webkit-linear-gradient(left, #ee886d , #f56f74); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right, #ee886d , #f56f74); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right, #ee886d , #f56f74); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #ee886d , #f56f74); /* 标准的语法 */
        }
        .nomak{
          background:#eee !important;
          color:#999;
        }
      }
    }
    .details-mask{
      .d-wrapper{
        width:6.5rem;
        height:7.7rem;
        background-color:white;
        border-radius: 5px;
        margin:0 auto;
        position:absolute;
        top:45%;
        left:50%;
        transform: translate(-50%,-50%);
        text-align: left;
        color:#506187;
        padding:10px 15px;
        .d-w-mall{
          .el-form-item{
            border-bottom:1px solid #eee;
          }
          .el-input__inner{
            border:none;
          }
          .subBox{
            border:none;
            .el-form-item__content{
              margin:0 !important;
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
          background: -webkit-linear-gradient(left, #3cc6fb , #12b2ee); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right, #3cc6fb , #12b2ee); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right, #3cc6fb , #12b2ee); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #3cc6fb , #12b2ee); /* 标准的语法 */
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
  }
</style>
