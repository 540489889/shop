<template>
  <div class="mine-content">
    <ul class="goodsList goodsList1">
      <li class="flex-box" v-if="list.length" v-show="item.status==2" v-for="item in list">
        <div class="left-img flex-box">
          <img :src="'http://gfwx.cqkjg.cn/Public/Uploads/goods/'+item.pic" alt="">
        </div>
        <div class="right-text box-1">
          <h4 class="media_title">{{item.name}}</h4>
          <h6 v-if="item.start">{{item.start.substring(0,16)}} 至</h6>
          <h6 v-if="item.end">{{item.end.substring(0,16)}} 有效</h6>
          <p class="flex-box">
            <span>积分商城通用</span>
            <router-link tag="a" :to="'./code?id='+item.id" class="active" v-if="item.status==1">立即使用</router-link>
            <a class="" v-else>已可用</a>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'peakBein',
    props: {
      list: Array
    }
  }
</script>
<style lang="less" scoped>
  .mine-content{
    .goodsList{
      li{
        padding:10px;
        padding-bottom:0;
        align-items: flex-start;
        .left-img{
          padding:10px;
          background-color:white;
          border-radius: 5px;
          height:2rem;
          width:1.75rem;
          margin-right:10px;
          img{
            width:100%;
          }
        }
        .right-text{
          height:2rem;
          background-color:white;
          color:#506187;
          padding:10px;
          border-radius: 5px;
          position:relative;
          .yhq-ico{
            position:absolute;
            right:10px;
            top:10px;
            width:1.11rem;
            height:0.87rem;
            background:url(./../../../assets/ico/ysy-q-ico.png) no-repeat center;
            background-size:100%;
          }
          h4{
            font-size:14px;
            /*margin-bottom:5px;*/
          }
          h6{
            font-size:12px;
          }
          p{
            justify-content: space-between;
            a{
              display: inline-block;
              width:1.4rem;
              height:0.55rem;
              line-height:0.55rem;
              border-radius: 0.3rem;
              border:1px solid #ccc;
              text-align: center;
              padding:0 10px;
              font-size:12px;
              color:#666;
            }
            .active{
              background: -webkit-linear-gradient(left, #3cc6fb , #12b1ee); /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(right, #3cc6fb , #12b1ee); /* Opera 11.1 - 12.0 */
              background: -moz-linear-gradient(right, #3cc6fb , #12b1ee); /* Firefox 3.6 - 15 */
              background: linear-gradient(to right, #3cc6fb , #12b1ee); /* 标准的语法 */
              color:white;
              border:none;

            }
          }
        }
      }
      li:last-child{
        border:none;
      }
    }
  }
</style>
