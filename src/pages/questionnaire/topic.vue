<template>
  <scroll class="recommend-content answer-body" :data="list" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="answer-list">
      <!-- Swiper -->
      <swiper :options="swiperWrapper" ref="mySwiper">
        <!-- slides -->
        <div class="swiper-slide swiper-no-swiping" v-for="(item,index1) in list" v-bind:key="index1">
          <div class="answer-info">
            <h2>第{{index1+1 | SectionToChines}}题</h2>
            <div class="answer-text">
              <h3>{{index1+1}}{{item.title}}</h3>
              <ul class="survey" v-if="item.type==1">
                <li v-for="(it,index2) in item.answer" v-bind:key="index2">
                  <!--<input type="radio" id=""  name="s0" value="A">-->
                  <el-radio-group v-model="item.check" fill="#ffcfc8" @change="checkChange" text-color="black">
                    <el-radio-button :label="it.index"><em>{{it.index}}</em>
                      {{it.text}}</el-radio-button>
                  </el-radio-group>
                  <!--<label for="a1"  class="flex-box">-->
                    <!--<span>{{it.index}}</span>-->
                    <!--<p>{{it.text}}</p>-->
                  <!--</label>-->
                </li>
              </ul>
              <div class="answer-textarea" v-else-if="item.type==2">
                <textarea name="" id="textarea" cols="30" rows="10" placeholder="请输入你要填写的内容" v-model="item.check"></textarea>
              </div>
            </div>
          </div>
        </div>
        <!--<div class="swiper-slide swiper-no-swiping">-->
          <!--<div class="answer-info" >-->
            <!--<h2>第{{lenthLong+1 | SectionToChines}}题</h2>-->
            <!--<div class="answer-text">-->
              <!--<h3>{{lenthLong+1}}.{{ques.question}}</h3>-->
              <!--<div class="answer-textarea">-->
                <!--<textarea name="" id="textarea" cols="30" rows="10" placeholder="请输入你要填写的内容" v-model="textVal"></textarea>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="swiper-pagination swiper-a"  slot="pagination"></div>
      </swiper>
      <div class="swiper-btn text-center">
        <div class="swiper-button-prev front-btn prev-btn" v-show="front" @click="slidePrev">上一题</div>
        <div class="swiper-button-next front-btn next-btn" v-show="front" @click="getCheckk">下一题</div>
        <div class="subVo btn-ui" v-if="subShow" @click="subVo">提交问卷</div>
      </div>
    </div>
  </scroll>
</template>
<script>
  import Scroll from './../components/scroll.vue'
  import './../../assets/style/e-ui-radio.css'
  import axios from 'axios'
  export default {
    name: 'questionnaireTopic',
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    components: {
      Scroll,
    },
    data (){
      let _this = this
      return{
        a_id: null,
        textVal:'',
        fullscreenLoading: false,
        front: true,
        subShow: false,
        checkList: [],
        list:[1,2,3],//不能空  初始化没有length
        lenthLong:'',
        ques: {},
        swiperWrapper: {
          loop: false,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          paginationClickable: true,
          autoHeight: true,
          noSwiping : true,
          autoplay:false,
          effect : 'coverflow',
          slidesPerView: 1,
          centeredSlides: true,
//        allowSlideNext : false,
          pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
          },
          navigation: {
//            nextEl: '.swiper-button-next',
//            prevEl: '.swiper-button-prev',
          },
          on: {
            slideChange: function(){
//              activeIndex第几个slide
            },
            reachEnd: function(){
              //到最后一个slide
              _this.front = false
              _this.subShow = true

            }
          },
        },
      }
    },
    filters: {
      //数字转换
      SectionToChines(section){
        let chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
        let chnUnitSection = ["","万","亿","万亿","亿亿"];
        let chnUnitChar = ["","十","百","千"];
        let strIns = '', chnStr = '';
        let unitPos = 0;
        let zero = true;
        while(section > 0){
          let v = section % 10;
          if(v === 0){
            if(!zero){
              zero = true;
              chnStr = chnNumChar[v] + chnStr;
            }
          }else{
            zero = false;
            strIns = chnNumChar[v];
            strIns += chnUnitChar[unitPos];
            chnStr = strIns + chnStr;
          }
          unitPos++;
          section = Math.floor(section / 10);
        }
        return chnStr;
      },
    },
    methods:{

      //获取题目
      getAnswerList () {
        this.fullscreenLoading = true;
        axios.get('/Home/Answer/answerList')
          .then(this.getAnswerListSucc)
      },
      getAnswerListSucc (res){
        console.log(res)
        this.fullscreenLoading = false;
        const data = res.data
        this.list = data.data.data
        this.ques = data.data.ques
        this.lenthLong = this.list.length
        this.a_id = this.ques.id
      },
      checkChange (val){

      },
      subVo(){
//        if(!this.textVal){
//          this.$notify({
//            title: '错误',
//            type: 'error',
//            message:"请填写您的建议",
//            showClose: false,
//            duration: 1000,
//            onClose: function () {
//            }
//          });
//          return false
//        }
        let index = this.swiper.activeIndex
        let check = this.list[index].check
        if(!check){
          if(this.list[index].type==1){
            this.$notify.error({
              title: '错误',
              message: '请选择',
              showClose: false,
              duration: 2000
            });
            return false

          }else{
            this.$notify.error({
              title: '错误',
              message: '请填写信息',
              showClose: false,
              duration: 2000
            });
            return false
          }
        }
        this.checkList[index] = {id:this.list[index].id,answer: check }
        console.log(this.checkList)
        let _this = this
        let params = new URLSearchParams();
        params.append('a_id',this.a_id);
        params.append('answer',JSON.stringify(this.checkList));
//        params.append('possion',this.textVal);
        axios({
          method: 'post',
          url: '/Home/Answer/addAsk',
          data: params
        }).then(function (res) {
            const data = res.data
            _this.fullscreenLoading = false
            console.log(data)
            if(data.status){
              _this.$router.push({ path: './success' });
            }else{
              _this.$notify({
                title: '错误',
                type: 'error',
                message: data.msg,
                showClose: false,
                duration: 1000,
                onClose: function () {
                }
              });
            }
          })
      },
      showSwiper () {
        return this.list.length
      },
      slidePrev (){
        this.swiper.slidePrev()
      },
      getCheckk (){
        let index = this.swiper.activeIndex
        let check = this.list[index].check
        if(this.list[index].type==2){
          if(!check){
            this.$notify.error({
              title: '错误',
              message: '请填写信息',
              showClose: false,
              duration: 2000
            });
            return false
          }
        }
        if(!check){
          this.$notify.error({
            title: '错误',
            message: '请选择',
            showClose: false,
            duration: 2000
          });
          return false
        }
        this.checkList[index] = {id:this.list[index].id,answer: check }
        console.log(this.checkList)
        this.swiper.slideNext()
      }
    },
    mounted(){
      this.getAnswerList()
    }
  }
</script>
<style lang="less" scoped>
  .answer-body{
    background:url(./../../assets/questionnaire/img/a-bg.png) no-repeat center;
    background-size:cover;
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
  }
  .answer-info h2{
    font-size:0.48rem;
    font-weight: bold;
    color:white;
    padding:0.6rem 0;
    text-align: center;
  }
  .answer-text{
    width:6.9rem;
    height:7.2rem;
    background:url(./../../assets/questionnaire/img/text-bg.png) no-repeat center;
    background-size:100%;
    margin:0 auto;
    overflow: hidden;
  }
  .answer-text h3{
    margin-top:0.8rem;
    padding-bottom:15px;
    font-size:0.3rem;
    font-weight: bold;
    position:relative;
    padding-left:8px;
  }
  .answer-text h3:before{
    position:absolute;
    content: "";
    display: inline-block;
    width:3px;
    height:15px;
    background-color:#f2796b;
    left:0;
    top:4px;

  }
  .answer-text ul{
    height:5.3rem;
    overflow: auto;
    padding:0;
    font-size:0.28rem;
  }
  .answer-text ul li{
    position:relative;
  }
  .answer-text ul li em{
    position:absolute;
    border:1px solid #eee;
    left:10px;
    top:50%;
    transform: translateY(-50%);
    z-index: 2;
    padding:2px 4px;
    color:black;
    background-color:transparent;
    transition: all 0.8s;
  }
  .answer-text ul li label{
    /*align-items: flex-start;*/
    /*padding:10px 15px;*/
    display: block;
    width:100%;
  }
  .answer-text ul li label span{
    margin-right:10px;
    border:1px solid #ccc;
    display: inline-block;
    padding:2px 5px;
  }
  .answer-text ul li input{
    border:none;
    background:none;
    display: none;
  }
  .answer-text ul li input:checked + label{
    background-color:#ffcfc8;
  }
  .answer-text ul li input:checked + label>span{
    color:white;
    background-color:#fe614a;
  }
  .swiper-button-prev, .swiper-container-rtl .swiper-button-next{
    background:none;
  }
  .swiper-button-next, .swiper-container-rtl .swiper-button-prev{
    background:none;
  }
  .swiper-btn{
    margin-top:0.8rem;
  }
  .swiper-button-next, .swiper-button-prev{
    position:relative;
    top:initial;
    left:initial;
    right:initial;
    bottom:initial;
    width:3rem;
    height:0.9rem;
    text-align: center;
    border:1px solid white;
    background-color:white;
    color:#506187;
    line-height:0.9rem;
    border-radius: 0.45rem;
    margin:initial;
    display: inline-block;
  }
  .swiper-button-next{
    margin-left:0.2rem;
  }
  .swiper-button-prev{
    margin-right:0.2rem;
  }
  .answer-textarea{
    padding:0 15px;
  }
  .answer-textarea textarea{
    background-color:#eee;
    width:100%;
    height:5.3rem;
    overflow: auto;
    border:none;
    padding:10px;
  }
  .btn-ui{
    display: block;
    width:6rem;
    height:0.9rem;
    line-height:0.9rem;
    border-radius: 0.45rem;
    background-color:white;
    color:#506187;
    margin:0 auto;
  }
</style>
