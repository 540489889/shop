<template>
  <scroll class="recommend-content" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="index-body">
      <div class="index-title">
        <h2>关于{{title}}的问卷调查</h2>
        <p>重庆科技馆</p>
      </div>
      <div class="index-partake">
        <div @click="goTopic" class="partake-btn">立即参与</div>
      </div>
    </div>
  </scroll>
</template>
<script>
  import Scroll from './../components/scroll.vue'
  import axios from 'axios'
  export default {
    name: 'questionnaireIndex',
    components: {
      Scroll,
    },
    data () {
      return {
        title: "",
        fullscreenLoading: false
      }
    },
    methods:{
      //获取列表
      getQuesList () {
        this.fullscreenLoading = true;
        axios.get('/Home/Answer/answerTitle')
          .then(this.getQuesListSucc)
      },
      getQuesListSucc (res){
        this.fullscreenLoading = false;
        const data = res.data
        if(!data.status){
          this.title = '暂无问卷调查'
        }else{
          this.title = data.msg.title
        }
      },
      getQuesListTwo () {
        this.fullscreenLoading = true;
        axios.get('/Home/Answer/answerTitle')
          .then(this.getQuesListSuccTwo)
      },
      getQuesListSuccTwo (res){
        this.fullscreenLoading = false;
        const data = res.data
        this.title = data.msg.title
        if(data.code===500){
          this.$notify({
            title: '错误',
            type: 'error',
            message:data.msg,
            showClose: false,
            duration: 1000,
            onClose: function () {
            }
          });
          return false
        }else {
          this.$router.push({path:"/questionnaire/topic"})
        }
      },
      goTopic(){
        this.getQuesListTwo()
      }
    },
    mounted () {
      this.getQuesList()
    },
  }
</script>
<style lang="less" scoped>
  .index-body{
    background:url(./../../assets/questionnaire/img/s-bg.png) no-repeat center;
    background-size:100%;
    width:100%;
    min-height:12.06rem;
  }
  .index-body .index-title{
    overflow: hidden;
    color:#506187;
    text-align: center;
  }
  .index-body .index-title h2{
    margin-top:1.1rem;
    margin-bottom:5px;
    font-weight: bold;
    font-size:0.36rem;
  }
  .index-partake{
    text-align: center;
    margin-top:7.6rem;
  }
  .partake-btn{
    display: block;
    width:5.95rem;
    height:0.9rem;
    line-height:0.9rem;
    border-radius: 0.45rem;
    background-color:#39c5fa;
    color:white;
    margin:0 auto;
  }
</style>
