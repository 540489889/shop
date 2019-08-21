<template>
  <scroll class="recommend-content" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="voteIndex">
      <div class="index-banner flex-box">
        <img :src="votes.theme_banar" style="width:100%" alt="">
      </div>
      <div class="indexContent">
        <div class="bd-title flex-box text-center">
          <div class="bd-left box-1">
            <h6>{{votes.general_vote}}</h6>
            累计票数
          </div>
          <div class="bd-right box-1">
            <h6>{{votes.general_visit}}</h6>
            访问总数
          </div>
        </div>
        <!--搜索-->
        <div class="search-wrapper">
          <input type="search" placeholder="请输入搜索内容" >
          <i class="search-ico"  @click="searchClick"></i>
        </div>
        <!--1-->
        <div class="home-main" id="homeMain">
          <div class="home-bt flex-box">
            <button class="rank-btn box-1" v-bind:class="{ active: rankwrapper }" @click="ranking">全部选手</button>
            <button class="player-btn box-1" v-bind:class="{ active: playerShow }" @click="allPlayer">排行榜</button>
          </div>
          <div class="home-bd">
            <!--{{resultTeam}}-->
            <transition name="el-fade-in-linear">
              <div class="rank-wrapper" v-if="rankwrapper">
                <ul>
                  <li v-for="item in member">
                    <router-link tag="a" :to="'details?id='+item.id" class="infor-box">
                      <div class="img-box">
                        <img v-lazy="item.images[1][0]" alt="">
                        <!--<div v-html="item.images"></div>-->
                        <i class="rank-num">{{item.id}}</i>
                        <!--<p class="media_title ranks-test">xxx队伍名称</p>-->
                      </div>
                      <h6 class="ranks-test media_title unit">{{item.username}}</h6>
                      <div class="enounce media_desc">
                        <b>宣言</b>：<span>{{item.declar}}</span>
                      </div>
                      <div class="vote-box flex-box">
                        <button class="flex-box btn-active" v-on:click.stop.prevent="vote(item.id)"><i class="heart-o xx-1" aria-hidden="true"></i>投票</button>
                        <span>{{item.votes}}票</span>
                      </div>
                    </router-link>
                  </li>
                </ul>
                <!--<el-pagination-->
                <!--small-->
                <!--layout="prev, pager, next"-->
                <!--:total="30">-->
                <!--</el-pagination>-->
                <h6 class="noMore text-center">暂无更多内容</h6>
              </div>
            </transition>
            <div class="player-wrapper" v-if="playerShow">
              <div class="player-bt">
                <ul class="flex-box">
                  <li class="box-1">名次</li>
                  <li class="box-1">姓名</li>
                  <li class="box-1">票数</li>
                </ul>
              </div>
              <div class="player-bd">
                <ul>
                  <li class="flex-box"  v-for="(item,index) in rank" v-bind:key="index">
                    <span class="box-1">{{index+1}}</span>
                    <span class="box-1">{{item.username}}</span>
                    <span class="box-1">{{item.votes}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!--活动规则-->
        <div class="home-footer">
          <!--<div class="title">组织机构</div>-->
          <!--<ul>-->
            <!--<li class="flex-box">主办单位：<div class="right-text box-1"><p>中共重庆渝北区委宣传部</p></div></li>-->
            <!--<li class="flex-box">承办单位：-->
              <!--<div class="right-text box-1">-->
                <!--<p>重庆市渝北区文化委员会</p>-->
                <!--<p>重庆市渝北区体育事业发展中心</p>-->
                <!--<p>重庆市渝北区广播电视台</p>-->
                <!--<p>重庆广电网络渝北分公司</p>-->
              <!--</div>-->
            <!--</li>-->
            <!--<li class="flex-box">协办单位：<div class="right-text box-1"><p>重庆市渝北区仙桃街道办事处</p></div></li>-->
          <!--</ul>-->
          <div class="title">活动规则</div>
          <div class="ruleBox" v-html="votes.rule"></div>
          <!--<ul>-->
            <!--<li class="flex-box">1、投票时间：11月7日7:30 – 11月9日18:00，为期3天。</li>-->
            <!--<li class="flex-box">2、每个微信每天可投5票，可投给相同或不同参赛队。</li>-->
            <!--<li class="flex-box">3、投票截止后排名第一的参赛队伍进入晋级赛。</li>-->
            <!--<li class="flex-box">4、投票作弊者将取消参赛资格。</li>-->
            <!--<li class="flex-box">5、如遇不可抗拒因素需中止活动，【渝北视界】不承担任何责任。</li>-->
          <!--</ul>-->
        </div>
      </div>
    </div>
  </scroll>
</template>
<script>
  import Scroll from './../components/scroll.vue'
  import './../../assets/vote/private.css'
  import axios from 'axios'
  export default {
    name: 'voteIndex',
    components: {
      Scroll
    },
    data (){
      return {
        rankwrapper: true,
        playerShow: false,
        fullscreenLoading: false,
        member:[],
        votes: '',
        rank: [],
        list: [
          {
            id: 0,
            ranking: 12,
            img: 'l1.png',
            title: 'xxx队伍名称xxx队伍名称xxx队伍名称',
            dec: '加油！加油！我们是最棒的！',
            ticket: 128
          },
          {
            id: 1,
            ranking: 12,
            img: 'l1.png',
            title: 'xxx队伍名称xxx队伍名称xxx队伍名称',
            dec: '加油！加油！我们是最棒的！',
            ticket: 128
          },
          {
            id: 2,
            ranking: 12,
            img: 'l1.png',
            title: 'xxx队伍名称xxx队伍名称xxx队伍名称',
            dec: '加油！加油！我们是最棒的！',
            ticket: 128
          },
          {
            id: 3,
            ranking: 12,
            img: 'l1.png',
            title: 'xxx队伍名称xxx队伍名称xxx队伍名称',
            dec: '加油！加油！我们是最棒的！',
            ticket: 128
          }
        ]
      }
    },
    methods: {
      //搜索
      searchClick (){

      },
      ranking (){
        this.rankwrapper = true
        this.playerShow = false
      },
      allPlayer (){
        this.rankwrapper = false
        this.playerShow = true
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
      //获取投票列表信息
      getVoteInfo(){
        let _this = this
        this.fullscreenLoading = true;
//        let params = new URLSearchParams();
        let id = this.$route.query.poem_id
//        params.append('poem_id',id);
        axios({
          method: 'get',
          url: '/Home/Vote/index?poem_id='+id,
        })
          .then(function (res) {
            const data = res.data
            _this.fullscreenLoading = false
            if(data.member){
              _this.member = data.member
              _this.rank = data.rank
            }
            _this.votes = data.vote
            console.log(data)
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
      }
    },
    mounted (){
      this.getVoteInfo()
    }
  }
</script>
<style lang="less" scoped>
  /*.index-banner{*/
    /*width:7.5rem;*/
    /*height:3.2rem;*/
  /*}*/
  .ruleBox{
    padding:10px;
    color:white;
  }
  .voteIndex{
    max-width:7.5rem;
    min-height:100vh;
  }
  .indexContent{
    background:#64d3fc;
  }
  .bd-title{
    width:7.5rem;
    height:1.44rem;
    background:url(./../../assets/vote/img/bd-bg.png) no-repeat center;
    background-size:100%;
    color:white;
  }
  .bd-left,.bd-right{
    position:relative;
  }
  .bd-left::after{
    content: "";
    display: inline-block;
    width:1px;
    height:30px;
    position:absolute;
    top:50%;
    transform: translateY(-50%);
    right:0;
    background-color:white;
  }
  .search-wrapper{
    padding:0 10px;
    margin-top:0.55rem;
    margin-bottom:0.35rem;
    position:relative;
  }
  .search-wrapper input{
    border:none;
    width:100%;
    height:0.8rem;
    border-radius: 0.4rem;
    -moz-appearance: none;
    -ms-appearance: none;
    -webkit-appearance: none;
    appearance:none;
    background:none;
    color:white;
    padding-left:15px;
    padding-right: 1rem;
    background:rgba(255,255,255,0.5);
  }
  .search-wrapper input::-webkit-input-placeholder{
    color:white;
  }
  .search-wrapper input:-moz-placeholder{
    color:white;
  }
  .search-wrapper input::-moz-placeholder{
    color:white;
  }
  .search-wrapper input:-ms-input-placeholder{
    color:white;
  }
  .search-wrapper .search-ico{
    position:absolute;
    width: 0.4rem;
    height: 0.4rem;
    background: url(./../../assets/vote/img/search-ico.png) no-repeat;
    background-size:100%;
    right: 0.5rem;
    top:0.2rem;
  }
  .home-main{
    width:100%;
    height:100%;
  }
  .home-bt{
    padding:0 10px;
    color: black;
  }
  .home-bt button{
    background-color:white;
    line-height:0.8rem;
    border-radius: 5px;
    text-align: center;
    border:none;
  }
  .home-bt .active{
    color:white;
    background-color:#f96468;
  }
  .home-bt .rank-btn{
    border-top-right-radius:0;
    border-bottom-right-radius:0;
  }
  .home-bt .player-btn{
    border-top-left-radius:0;
    border-bottom-left-radius:0;
  }
  .rank-wrapper{
    padding:0 10px;
  }
  .rank-wrapper ul{
    overflow: hidden;
    padding-bottom:10px;
  }
  .rank-wrapper ul li{
    float:left;
    width:50%;
    margin-top:15px;
  }
  .rank-wrapper ul li:nth-child(even){
    padding-left:0.1rem;
  }
  .rank-wrapper ul li:nth-child(odd){
    padding-right:0.1rem;
  }
  .rank-wrapper ul li .infor-box{
    display: block;
    background-color:white;
    padding:0.2rem;
    border-radius: 5px;
  }
  .rank-wrapper ul li .infor-box  .img-box{
    position:relative;
  }
  .rank-wrapper ul li .infor-box  .img-box img{

  }
  .rank-wrapper ul li .infor-box  .img-box  .rank-num{
    position:absolute;
    top:0;
    left:0.2rem;
    height:0.5rem;
    line-height:0.5rem;
    padding:0 0.2rem;
    text-align: center;
    background-color:#ff4240;
    color:white;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .rank-wrapper ul li .infor-box  .img-box .ranks-test{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    height:0.5rem;
    line-height:0.5rem;
    background:rgba(0,0,0,0.5);
    color:white;
    padding:0 0.2rem;
  }
  .rank-wrapper ul li .infor-box .unit{
    padding:0.1rem 0;
    border-bottom:1px solid #eee;
  }
  .rank-wrapper ul li .infor-box .enounce{
    margin:0.1rem auto;
    min-height:0.38rem;
  }
  .rank-wrapper ul li .infor-box .enounce b{
    color:#ca1132;
  }
  .vote-box{
    justify-content: space-between;
    margin-top:10px;
  }
  .vote-box button{
    background-color:white;
    text-align: center;
    width:1.66rem;
    height:0.6rem;
    line-height:0.6rem;
    border-radius: 0.3rem;
    color:black;
    border:1px solid #f96468;
    justify-content: center;
  }
  .vote-box .btn-active{
    background: -webkit-linear-gradient(left, #ee876d , #f56f74); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #ee876d , #f56f74); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #ee876d , #f56f74); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #ee876d , #f56f74); /* 标准的语法 */
    color:white;
    border:none;
  }
  .vote-box .btn-active .xx-1{
    background:url(./../../assets/vote/img/x-2.png) no-repeat center;
    background-size:100%;
  }
  .vote-box i{
    display: inline-block;
    margin-right:0.1rem;
    width:0.29rem;
    height:0.26rem;
  }
  .vote-box .xx-1{
    background:url(./../../assets/vote/img/x-1.png) no-repeat center;
    background-size:100%;
  }
  .noMore{
    padding:10px;
    color:white;
  }
  .player-wrapper .player-bt{
    background-color:white;
    text-align: center;
    color:black;
    font-size:0.28rem;
    padding:0.2rem 0;
    margin-top:15px;
  }
  .player-wrapper .player-bd{
    text-align: center;
    padding:0.2rem 0;
    color:white;
  }
  .player-wrapper .player-bd ul li{
    padding:0.2rem 0;
  }
  /*活动规则*/
  .home-footer .title{
    background-color:white;
    text-align: center;
    height:0.7rem;
    line-height:0.7rem;
    display: inline-block;
    padding:0 0.5rem;
    border-top-right-radius: 0.35rem;
    border-bottom-right-radius: 0.35rem;
    font-size:0.32rem;
    color:#506187;
    font-weight: bold;

  }
  .home-footer ul{
    color:white;
    padding:0.2rem;
    margin-top:0.2rem;
  }
  .home-footer ul li{
    margin-bottom:0.2rem;
    align-items: stretch;
  }
</style>
