<template>
  <div class="touristWrapper">
    <ul class="flex-box">
      <li>
        <a href="https://mp.weixin.qq.com/s/fhe_L8bAE0yjPI6RuXZZIw">
          <i class="t-ico-1"></i>
          <h6>参观须知</h6>
        </a>
      </li>
      <li>
        <a href="https://mp.weixin.qq.com/s/4Vtrcixe4ndqPQU4I8EjJw">
          <i class="t-ico-2"></i>
          <h6>交通信息</h6>
        </a>
      </li>
      <li>
        <a href="https://mp.weixin.qq.com/s/QQ91lNA3cHNld6yJ1sEpHA">
          <i class="t-ico-3"></i>
          <h6>讲解服务</h6>
        </a>
      </li>
      <li>
        <a href="https://mp.weixin.qq.com/s/LqSQpSWAqUaY6xwVCB6BKw">
          <i class="t-ico-4"></i>
          <h6>餐饮</h6>
        </a>
      </li>
      <li>
        <a href="https://mp.weixin.qq.com/s/mJQ5ZVq8zlWoyswSfhUg1w">
          <i class="t-ico-5"></i>
          <h6>科普商店</h6>
        </a>
      </li>
      <li>
        <a href="https://mp.weixin.qq.com/s/qDBpiiL6QSNkO888KaR8lQ">
          <i class="t-ico-6"></i>
          <h6>游客中心</h6>
        </a>
      </li>
      <li>
        <a href="https://mp.weixin.qq.com/s/ETMOxQxiEpM8MMnmqLJBtQ">
          <i class="t-ico-7"></i>
          <h6>母婴室</h6>
        </a>
      </li>
      <li>
        <a href="https://mp.weixin.qq.com/s/g9aCanuPjfjvduVgromU3g">
          <i class="t-ico-8"></i>
          <h6>物品寄存</h6>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'HomeTourist',
    data (){
      return {

      }
    },
    methods:{

    },
    mounted(){

    }
  }
</script>
<style lang="less" scoped>
  .touristWrapper{
    background-color:#f5f5f5;
    padding:0.25rem;
    min-height:100vh;
    ul{
      flex-wrap: wrap;
      li{
        width:33.33%;
        margin-bottom:0.25rem;
        a{
          text-align: center;
          display: block;
          background-color:white;
          border-radius: 10px;
          width:2.1rem;
          height:2.1rem;
          margin:0 auto;
          i{
            display: inline-block;
            width:1rem;
            height:0.9rem;
            margin-top:0.3rem;
          }
          .t-ico-1{
            background:url(./../../assets/ico/yk-ico-1.png) no-repeat center;
            background-size:100%;
          }
          .t-ico-2{
            background:url(./../../assets/ico/yk-ico-2.png) no-repeat center;
            background-size:100%;
          }
          .t-ico-3{
            background:url(./../../assets/ico/yk-ico-3.png) no-repeat center;
            background-size:100%;
          }
          .t-ico-4{
            background:url(./../../assets/ico/yk-ico-4.png) no-repeat center;
            background-size:100%;
          }
          .t-ico-5{
            background:url(./../../assets/ico/yk-ico-5.png) no-repeat center;
            background-size:100%;
          }
          .t-ico-6{
            background:url(./../../assets/ico/yk-ico-6.png) no-repeat center;
            background-size:100%;
          }
          .t-ico-7{
            background:url(./../../assets/ico/yk-ico-7.png) no-repeat center;
            background-size:100%;
          }
          .t-ico-8{
            background:url(./../../assets/ico/yk-ico-8.png) no-repeat center;
            background-size:100%;
          }
          h6{
            font-size:0.28rem;
            color:#506187;
          }

        }
      }
      /*li:nth-child(3n+2){*/
        /*margin:0 2%;*/
      /*}*/
    }
  }
</style>
