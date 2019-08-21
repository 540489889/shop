<template>
  <div class="mine-content">
    <ul class="goodsList goodsList1">
      <li v-show="list.length" v-for="item in list">
        <h4 class="flex-box timeYy">{{item.addtime}}
          <span v-if="item.status==1" class="noLq">未领取</span>
          <span v-else-if="item.status==2" class="">已领取</span>
        </h4>
        <div class="right-text">
          <h4>{{item.goods.title}}</h4>
          <p class="flex-box">
            <span>已支付：{{item.intergral}}积分</span>
            <router-link tag="a" class="xqInfor" :to="'/mine/orderDetails?id='+item.id+'&type=1'">详情</router-link>
          </p>
        </div>
        <!--<h6 class="text-right"></h6>-->
      </li>
      <li v-show="listTwo.length" v-for="item in listTwo">
        <h4 class="flex-box timeYy">时间：{{item.comtime}}
          <span v-if="item.status==2" class="noLq">未使用</span>
          <span v-else-if="item.status==3" class="">已使用</span>
        </h4>
        <div class="right-text">
          <h4>影票名称：{{item.film_name}}</h4>
          <p class="flex-box">
            <span>观影时间：{{item.view_time}}</span>
          </p>
          <p class="endBtn flex-box">
            <a v-if="item.status==2" @click="refundClick(item.order_sn)">退款</a>
            <router-link tag="a" class="xqInfor" :to="'/mine/orderDetails?id='+item.id+'&type=2'">详情</router-link>
          </p>
        </div>
        <h6 class="text-right" v-if="item.intergral">已支付：{{item.intergral}}积分</h6>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'orderCom',
    props:{
      list:Array,
      listTwo:Array
    },
    methods:{
      refundClick(id){
        this.$emit('changeRefundClick',id)
      }
    },
    mounted (){
      console.log(this.list)
    }
  }
</script>
<style lang="less" scoped>
  .goodsList{
    li{
      background-color:white;
      margin-bottom:10px;
      padding:10px;
      .timeYy{
        padding:10px 0;
        justify-content: space-between;
        border-bottom:1px solid #eee;
        .noLq{
          color:#11b1ee;
        }
      }
      .right-text{
        color:#506187;
        padding:10px 0;
        .endBtn{
          margin-top:0.3rem;
          justify-content: flex-end;
          a{
            margin-left:15px;
          }
          .xqInfor{
            border: 1px solid #11b1ee;
            color: #11b1ee;
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
          .xqInfor{
            border: 1px solid #11b1ee;
            color: #11b1ee;
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
</style>
