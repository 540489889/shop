<template>
  <div class="homeVenue">
    <div class="header">
      <div class="header-img">
    </div>
    <a href="https://mp.weixin.qq.com/s/ou71Qc3ItsLaqTNWssYgCw" class="v-introduce flex-box">
      重庆科技馆介绍
      <i class="el-icon-arrow-right"></i>
    </a>
    <div class="v-list">
      <h4 class="title">展厅简介</h4>
      <ul class="flex-box">
        <li>
          <a href="https://mp.weixin.qq.com/s/GHM5__acn3Q3OhcWkd6i0g">
            <div class="v-l v-l1"></div>
            <h4>生活科技展厅</h4>
          </a>
        </li>
        <li>
          <a href="https://mp.weixin.qq.com/s/UCQGnoKn0WCdooxSDNfXCg">
            <div class="v-l v-l2"></div>
            <h4>儿童科技乐园</h4>
          </a>
        </li>
        <li>
          <a href="https://mp.weixin.qq.com/s/ipJU91MSfVEhED4mdTsDNg">
            <div class="v-l v-l3"></div>
            <h4>防灾科技展厅</h4>
          </a>
        </li>
        <li>
          <a href="https://mp.weixin.qq.com/s/R3iDfG4URB9Lk4vRpppp3g">
            <div class="v-l v-l4" ></div>
            <h4>交通科技展厅</h4>
          </a>
        </li>
        <li>
          <a href="https://mp.weixin.qq.com/s/x3kPMjplXAh9I1YLyFNHdQ">
            <div class="v-l v-l5"></div>
            <h4>国防科技展厅</h4>
          </a>
        </li>
        <li>
          <a href="https://mp.weixin.qq.com/s/yts-OGJuL_ljab1LxJDQyQ">
            <div class="v-l v-l6" ></div>
            <h4>基础科学展厅</h4>
          </a>
        </li>
        <li>
          <a href="https://mp.weixin.qq.com/s/mFAQbd-gMcr32CpFCRAXQg">
            <div class="v-l v-l7"></div>
            <h4>宇航科技展厅</h4>
          </a>
        </li>
        <li>
          <a href="https://mp.weixin.qq.com/s/fvKBcmjM0Dew9t01Sd379Q">
            <div class="v-l v-l8" ></div>
            <h4>临时展厅</h4>
          </a>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>
<script>
  export default {
    name: 'homeVenue',
    data (){
      return {

      }
    },
    methods: {

    },
    mounted (){

    }
  }
</script>
<style lang="less" scoped>
  .homeVenue{
    font-size:0.28rem;
    background-color:#f5f5f5;
    min-height:100vh;
    width:100%;
    color:#506187;
    .header{
      .header-img{
        width:7.5rem;
        height:3.5rem;
        background:url(./../../assets/img/v-header.png) no-repeat center;
        background-size:100%;
      }
    }
    .v-introduce{
      background-color:white;
      padding:0.3rem;
      justify-content: space-between;
      i{
        color:#c3c3c3;
        font-size:20px;
      }
    }
    .v-list{
      padding:0.3rem;
      .title{
        font-size:0.36rem;
        font-weight: bold;
        position:relative;
        padding:0 .2rem;
        margin-bottom:0.2rem;
      }
      .title::before{
        position:absolute;
        content: "";
        width:3px;
        background-color:#14b3ef;
        height:16px;
        left:0;
        top:50%;
        transform: translateY(-50%);
      }
      ul{
        flex-wrap: wrap;
        justify-content: space-between;
        li{
          width:50%;
          margin-bottom:0.3rem;
          a{
            display: inline-block;
            width:3.35rem;
            text-align: center;
            background-color:white;
            border-radius: 0.08rem;
            img{

            }
            .v-l{
              width:3.35rem;
              height:2.5rem;
              border-top-left-radius: 0.08rem;
              border-top-right-radius: 0.08rem;
            }
            .v-l1{
              background:url(./../../assets/img/v-l1.png) no-repeat center;
              background-size:100%;
            }
            .v-l2{
              background:url(./../../assets/img/v-l2.png) no-repeat center;
              background-size:100%;
            }
            .v-l3{
              background:url(./../../assets/img/v-l3.png) no-repeat center;
              background-size:100%;
            }
            .v-l4{
              background:url(./../../assets/img/v-l4.png) no-repeat center;
              background-size:100%;
            }
            .v-l5{
              background:url(./../../assets/img/v-l5.png) no-repeat center;
              background-size:100%;
            }
            .v-l6{
              background:url(./../../assets/img/v-l6.png) no-repeat center;
              background-size:100%;
            }
            .v-l7{
              background:url(./../../assets/img/v-l7.png) no-repeat center;
              background-size:100%;
            }
            .v-l8{
              background:url(./../../assets/img/v-l8.png) no-repeat center;
              background-size:100%;
            }
            h4{
              padding:10px;
            }
          }
        }
        li:nth-child(odd){
          text-align: left;
        }
        li:nth-child(even){
          text-align: right;
        }
      }
    }
  }
</style>

