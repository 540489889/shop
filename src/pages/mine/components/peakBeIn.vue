<template>
  <div class="mine-content">
    <ul class="goodsList goodsList1">
      <li class="text-center" v-if="list.length==0">暂无数据...</li>
      <li v-for="item in list">
        <h4 class="flex-box timeYy">{{item.actiontime}}
          <span v-if="item.status==1">已预约</span>
          <span v-else-if="item.status==2">已参与</span>
          <span v-else-if="item.status==3">未参与</span>
          <span v-else-if="item.status==-1">已取消</span>
          <span v-else-if="item.status==-2">审核未通过</span>
          <span v-else-if="item.status==0">未审核</span>
        </h4>
        <div class="right-text">
          <h4>{{item.eduname}}</h4>
          <p class="flex-box">
            <span>开始时间：{{item.addtime}}</span>
            <router-link tag="a" :to="'/active/details/'+item.eduid" class="active">详情</router-link>
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
        background-color:white;
        margin-bottom:10px;
        padding-bottom:10px;
        padding:10px;
        padding-top:15px;
        .timeYy{
          padding:10px 0;
          justify-content: space-between;
          border-bottom:1px solid #eee;
          span{
            color:#11b1ee;
          }
        }
        .right-text{
          color:#506187;
          padding:10px 0;
          .endBtn{
            margin-top:0.2rem;
            justify-content: flex-end;
            a{
              margin-left:15px;
            }
          }
          h4{
            font-size:15px;
            margin-bottom:10px;
          }
          p{
            justify-content: space-between;
            a{
              display: inline-block;
              width:1.3rem;
              height:0.6rem;
              line-height:0.6rem;
              border-radius: 0.3rem;
              border:1px solid #ccc;
              text-align: center;
            }
            .active{
              border:1px solid #11b1ee;
              color:#11b1ee;
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
