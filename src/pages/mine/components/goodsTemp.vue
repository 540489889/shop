<template>
  <div class="mine-content">
    <ul class="goodsList goodsList1">
      <li class="flex-box" v-for="item in list" v-bind:key="list.id" v-if="item.type=='1'">
        <div class="left-img">
          <img v-lazy="'http://gfwx.cqkjg.cn/'+item.pic" alt="">
        </div>
        <div class="right-text box-1">
          <h4>{{item.name}}</h4>
          <p class="flex-box">
            <span>时间：{{item.addtime}}</span>
            <span>{{item.count}}人收藏</span>
          </p>
        </div>
      </li>
      <!--<li v-else class="text-center"> 暂无数据 ...</li>-->
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'goodsTemp',
    props: {
      list: Array
    }
  }
</script>
<style lang="less" scoped>
  .mine-content{
    background-color:white;
    padding:10px;
    .goodsList{
      li{
        padding-bottom:10px;
        padding-top:15px;
        border-bottom:1px solid #eee;
        .left-img{
          width:1.4rem;
          height:1.2rem;
          /*border:1px solid #eee;*/
          border-radius: 5px;
          /*padding:10px;*/
          margin-right:10px;
          img{
            width:100%;
            height:100%;
          }
        }
        .right-text{
          color:#506187;
          h4{
            font-size:15px;
            margin-bottom:10px;
          }
          p{
            justify-content: space-between;
          }
        }
      }
      li:last-child{
        border:none;
      }
    }
  }
</style>
