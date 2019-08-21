<template>
  <div class="activeSuccess wrapper">
    <div class="success-content">
      <i class="el-icon-circle-check s-c-ico"></i>
      <h6>恭喜你！活动预约成功</h6>
      <ul>
        <li class="flex-box"><span>活动名称：</span><p class="box-1">{{list.eduname}}</p></li>
        <li class="flex-box"><span>预约姓名：</span><p>{{list.name}}</p></li>
        <li class="flex-box"><span>联系方式：</span><p>{{list.tel}}</p></li>
        <li class="flex-box"><span>预约人数：</span><p>{{list.number}}</p></li>
      </ul>
      <ul>
        <li class="flex-box"><span>活动时间：</span>{{list.actiontime}}</li>
        <li class="flex-box"><span>活动地址：</span>重庆科技馆自行领取</li>
      </ul>
    </div>
    <router-link tag="button" :to="'/active/details/'+list.eduid" class="return-mall lookBtn">查看活动详情</router-link>
    <router-link tag="button" to="/active/index" class="return-mall">返回活动列表</router-link>
  </div>
</template>
<script>
  import axios from 'axios'
export default {
  name: 'activeSuccess',
  data (){
    return {
      list: {}
    }
  },
  methods: {
    getData(){
      let list =  JSON.parse(this.$route.query.list)
      this.list =list
      console.log(this.list)
    }
  },
  mounted(){
    this.getData()
  }
}
</script>
<style lang="less" scoped>
  .activeSuccess{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background-color:#f5f5f5;
    .return-mall{
      display: block;
      border:none;
      background: -webkit-linear-gradient(left, #3cc6fb , #12b2ee); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #3cc6fb , #12b2ee); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #3cc6fb , #12b2ee); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #3cc6fb , #12b2ee); /* 标准的语法 */
      width:6rem;
      height:0.9rem;
      line-height:0.9rem;
      border-radius: 0.45rem;
      color:white;
      margin:0 auto;
      margin-top:0.3rem;
    }
    .lookBtn{
      background:none;
      border:1px solid #666;
      color:#333;
      margin-top:1rem;
    }
    .success-content{
      text-align: center;
      color:#506187;
      padding:0 10px;
      background-color:white;
      padding-bottom:0.5rem;
      .s-c-ico{
        color:#33cc00;
        font-size:35px;
        margin-top:0.7rem;
        margin-bottom:5px;
      }
      h6{
        margin-bottom:20px;
      }
    }
    ul{
      padding:10px 0;
      text-align: left;
      border-bottom:1px solid #eee;
      li{
        align-items: stretch;
        padding-bottom:10px;
        span{
          margin-right:15px;
          display: inline-block;
          width:80px;
        }
        a{
          color:#ee886d;
        }
      }
      li:last-child{
        padding:0;
      }
    }
    ul:last-child{
      border:none;
    }
  }
</style>
