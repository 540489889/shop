<template>
  <div class="homeAnswer mask">
    <div class="answer-content">
      <h1 class="answer-title"></h1>
      <div class="answer-box">
        <h4 class="answer-bt">{{listAnswer.problem}}</h4>
        <el-radio-group v-model="radio2" @change="radioChange(listAnswer.answer)" >
          <div class="radioDiv flex-box" v-if="listAnswer.a">
            <el-radio class="box-1" :label="'A'">{{listAnswer.a}}</el-radio>
            <span class="cSpan" check="A" v-bind:class="[ listAnswer.answer=='A' ? 'el-icon-circle-check' : 'el-icon-circle-close']"></span>
          </div>
          <div class="radioDiv flex-box" v-if="listAnswer.b">
            <el-radio class="box-1" :label="'B'">{{listAnswer.b}}</el-radio>
            <span class="cSpan" check="B" v-bind:class="[ listAnswer.answer=='B' ? 'el-icon-circle-check' : 'el-icon-circle-close']"></span>
          </div>
          <div class="radioDiv flex-box" v-if="listAnswer.c">
            <el-radio class="box-1" :label="'C'">{{listAnswer.c}}</el-radio>
            <span class="cSpan" check="C" v-bind:class="[ listAnswer.answer=='C'? 'el-icon-circle-check' : 'el-icon-circle-close']"></span>
          </div>
          <div class="radioDiv flex-box" v-if="listAnswer.d">
            <el-radio class="box-1" :label="'D'">{{listAnswer.d}}</el-radio>
            <span class="cSpan" check="D" v-bind:class="[ listAnswer.answer=='D'? 'el-icon-circle-check' : 'el-icon-circle-close']"></span>
          </div>
        </el-radio-group>
        <button class="overAnswer" @click="overAnswer()">完成答题</button>
      </div>
      <i @click="closeAnswer" class="close-ico el-icon-error"></i>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'homeAnswer',
    data () {
      return {
        radio2: '0',
        status: 0,
      }
    },
    props:{
      listAnswer: Object
    },
    methods: {
      closeAnswer() {
        this.$emit('closeChange',false)
      },
      radioChange(answer){
        if(this.radio2===answer){
          this.status = 2
        }else{
          this.status = 1
        }
      },
      //完成答题
      overAnswer (){
        if(!this.status){
          alert('请选择答案')
          return false
        }else{
          let rightAnswer = document.querySelectorAll('.el-icon-circle-check'); //正确答案元素
          let thisAnser = document.querySelectorAll('span[check='+this.radio2+']'); //选择元素
          thisAnser[0].style.display = 'initial'
          rightAnswer[0].style.display = 'initial'
          let _this = this
          let params = new URLSearchParams();
          params.append('intergral',this.status);
          setTimeout(function () {
            axios({
              method: 'post',
              url: '/Home/Person/addInte',
              data: params
            })
              .then(function (res) {
                const data = res.data
                console.log(data)
                _this.$emit('closeChange',data.integral,data.inte)
              })
          },1000)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .radioDiv .el-radio{
    white-space:initial;
    line-height:1.4;
  }
  .answer-content{
    width:6.5rem;
    height:6.9rem;
    background-color:white;
    border-radius: 5px;
    position:relative;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding-top:0.5rem;
    .close-ico{
      position:absolute;
      bottom:-1rem;
      left:50%;
      transform: translateX(-50%);
      color:white;
      font-size:25px;
    }
    .answer-title{
      width:6.63rem;
      height:1.27rem;
      background:url(./../../../assets/img/answer-title.png) no-repeat center;
      background-size:100%;
      position:absolute;
      top:-0.7rem;
      left:50%;
      transform: translateX(-50%);
    }
    .answer-box{
      padding:0 0.5rem 0.5rem 0.5rem;
      text-align: left;
      height:6.4rem;
      overflow: auto;
      .el-radio-group{
        width:100%;
      }
      .answer-bt{
        margin-top:10px;
        padding-bottom:10px;
      }
      .radioDiv{
        padding:10px 0;
        .cSpan{
          font-size:28px;
          display: none;
        }
        .el-icon-circle-check{
          color:#2ECC71;
        }
        .el-icon-circle-close{
          color:#F96368;
        }
      }
      .overAnswer{
        display: block;
        width:2.2rem;
        line-height:0.7rem;
        color:white;
        border:none;
        margin:0 auto;
        margin-top:0.5rem;
        border-radius: 0.35rem;
        background: -webkit-linear-gradient(left, #3cc6fb , #12b1ee); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #3cc6fb , #12b1ee); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #3cc6fb , #12b1ee); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #3cc6fb , #12b1ee); /* 标准的语法 */
      }
    }
  }
</style>
