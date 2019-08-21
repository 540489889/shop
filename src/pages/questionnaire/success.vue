<template>
  <scroll class="recommend-content indexSucc">
    <div class="index-success">
      <div class="succ-ico"></div>
      <h4>完成答卷，谢谢参与</h4>
    </div>
  </scroll>
</template>
<script>
  import Scroll from './../components/scroll.vue'
  export default {
    name: 'questionnaireSucc',
    components: {
      Scroll,
    },
  }
</script>
<style lang="less" scoped>
  .indexSucc{
    position:absolute;
    left:0;
    width:100%;
    height:100%;
    top:0;
    background-color:#f5f5f5;
  }
  .index-success{
    background-color:white;
    text-align: center;
    padding:1rem 0;

  }
  .succ-ico{
    width:0.72rem;
    height:0.72rem;
    background:url(./../../assets/questionnaire/img/succ-ico.png) no-repeat center;
    background-size:100%;
    margin:0 auto;
    margin-bottom:10px;
  }
</style>
