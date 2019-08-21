<template>
  <div class="recommend-content voteWrapper"  v-loading.fullscreen.lock="fullscreenLoading">
    <div>
      <!--分享-->
      <transition name="el-fade-in-linear">
        <div class="mask fenx-box" v-show="fenshow"  @click="fenMask">
          <div class="fenxiang">
            <h3 class="text-right"><img style="width:2rem;" src="./../../assets/vote/img/fx-img1.png" alt=""></h3>
            <h4>点击右上角，分享给好友</h4>
          </div>
        </div>
      </transition>
      <div class="detailBox">
        <div class="dContent">
          <i class="close-ico"></i>
          <div class="d-title flex-box">
            <h2>选手/队伍名称</h2>
            <span>票数：<b>{{member.votes}}</b></span>
          </div>
          <div class="d-xy">
            参赛宣言：
            <p>{{member.declar}}</p>
          </div>
          <ul>
            <li v-for="item in member.images[1]">
              <img v-lazy="item" alt="">
            </li>
            <!--<li><img class="lazy" src="./../../assets/vote/img/banner.png"></li>-->
          </ul>
        </div>
        <div class="d-btn">
          <button class="active" v-on:click.stop.prevent="vote(member.id)">投TA一票</button>
          <button @click="InviteClick">邀请好友投票</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Scroll from './../components/scroll.vue'
  import axios from 'axios'
  export default {
    name: 'voteDetails',
    data (){
      return{
        fenshow:false,
        fullscreenLoading: false,
        member: [],
      }
    },
    components: {
      Scroll
    },
    methods:{
      InviteClick (){
        this.fenshow = true
      },
      fenMask (){
        this.fenshow = false
      },
      //获取投票列表信息
      getVoteInfo(){
        let _this = this
        this.fullscreenLoading = true;
//        let params = new URLSearchParams();
        let id = this.$route.query.id
//        params.append('poem_id',id);
        axios({
          method: 'get',
          url: '/Home/Vote/detail?id='+id,
        })
          .then(function (res) {
            const data = res.data
            _this.fullscreenLoading = false
            if(data.member){
              _this.member = data.member
            }
            _this.votes = data.vote
            console.log(res)
//            if(data.status){
//              _this.$notify({
//                title: '成功',
//                type: 'success',
//                message: data.msg,
//                showClose: false,
//                duration: 1000,
//                onClose: function () {
//                }
//              });
//            }else{
//              _this.$notify({
//                title: '错误',
//                type: 'error',
//                message: data.msg,
//                showClose: false,
//                duration: 1000,
//                onClose: function () {
//                }
//              });
//            }
          })
      },
      //投票
      vote(id){
        let _this = this
        let params = new URLSearchParams()
        params.append('id',id);
        axios({
          method: 'post',
          url: '/Home/Vote/vote',
          data: params
        }).then(function (res) {
          const data = res.data
          _this.$notify({
            title: '提示',
            type: 'success',
            message:data.msg,
            showClose: false,
            duration: 1000,
            onClose: function () {

            }
          });
          return false
        })
      },
    },
    mounted (){
      this.getVoteInfo()
    }
  }
</script>
<style lang="less" scoped>
  .voteWrapper{
    min-height:100%;
    overflow: auto;
  }
  .detailBox{
    background-color:#64d3fc;
    padding:20px 10px;
    width:100%;
    min-height:100vh;
  }
  .dContent{
    background-color:white;
    padding:10px;
    position:relative;
  }
  .close-ico{
    position:absolute;
    top:5px;
    right:5px;
    width:0.4rem;
    height:0.4rem;
    background:url(.././../assets/vote/img/close-ico.png) no-repeat center;
    background-size:100%;
  }
  .d-title{
    justify-content: space-between;
    margin-top:20px;
    margin-bottom:10px;
  }
  .d-title h2{
    font-size:15px;
  }
  .d-title span b{
    color:#f56f74;
  }
  .d-xy{
    font-size:15px;
  }
  .dContent ul li{
    margin-top:15px;
  }
  .d-btn{
    margin-top:0.3rem;
  }
  .d-btn .active{
    background: -webkit-linear-gradient(left, #ee876d , #f56f74); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #ee876d , #f56f74); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #ee876d , #f56f74); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #ee876d , #f56f74); /* 标准的语法 */
    color:white;
    border:none;
  }
  .d-btn button{
    border:1px solid white;
    color:white;
    height:0.8rem;
    line-height:0.8rem;
    text-align: center;
    width:5.8rem;
    margin:0 auto;
    display: block;
    border-radius: 0.4rem;
    margin-top:0.3rem;
    background:none;
  }
  .fenx-box{
    color:white;
    text-align: center;
  }
  .fenxiang{
    padding:1rem;
  }
</style>
