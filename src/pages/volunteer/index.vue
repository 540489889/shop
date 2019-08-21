<template>
  <div class="volunteerIndex" v-loading.fullscreen.lock="fullscreenLoading">
    <scroll class="recommend-content" ref="scroll"
            :scrollY = "scrollY"
            :data = "[firstDate,swiperList]"
            :pulldown = "pulldown"
            :pullup = "pullup"
            @touchend = "upData"
    >
      <div>
        <volunteer-swiper :list="swiperList"></volunteer-swiper>
        <div class="malTab">
          <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane  label="最新任务" name="first">
              <ul>
                <li  v-for="item in firstDate" :key="item.id">
                  <div class="firstBox">
                    <el-container>
                      <el-aside><img v-lazy="'http://www.scicity.cn:5506/cqkjg/'+item.img" alt=""></el-aside>
                      <el-container>
                        <el-header class="media_title">{{item.taskName}}</el-header>
                        <el-main>
                          <!--<p><span class="pt-a-hd">普通活动</span></p>-->
                          <p><i class="el-icon-time"></i>{{item.taskStart}}至{{item.taskEnd}}</p>
                          <p><i class="el-icon-location-outline"></i>{{item.place}}</p>
                          <!--<h5><span class="integral">{{item.integral}}积分</span> <span class="stock">￥{{item.discount}}</span></h5>-->
                          <!--<h6>限量：{{item.stock}}件</h6>-->
                        </el-main>
                        <el-footer>
                          <div class="flex-box">
                            <div v-if="item.taskStatus==0">
                              <router-link tag="button" type="button" :to="'/volunteer/details?id='+item.id+'&taskStatus='+item.taskStatus">申领报名</router-link>
                            </div>
                            <div v-else>
                              <router-link tag="button" class="statusError" type="button" :to="'/volunteer/details?id='+item.id">{{item.taskStatus}}</router-link>
                            </div>
                            <!--<p>已报名：<span>120人</span></p>-->
                          </div>
                        </el-footer>
                      </el-container>
                    </el-container>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="日期选择" name="second">
              <span slot="label">日期选择<i class="el-icon-date" style="margin-left:5px;"></i> </span>
              <div>
                <div v-if="secondDate.length">
                  <ul>
                    <li  v-for="item in secondDate" :key="item.id">
                      <div class="firstBox">
                        <el-container>
                          <el-aside><img v-lazy="'http://www.scicity.cn:5506/cqkjg/'+item.img" alt=""></el-aside>
                          <el-container>
                            <el-header class="media_title">{{item.taskName}}</el-header>
                            <el-main>
                              <!--<p><span class="pt-a-hd">普通活动</span></p>-->
                              <p><i class="el-icon-time"></i>{{item.taskStart}}至{{item.taskEnd}}</p>
                              <p><i class="el-icon-location-outline"></i>{{item.place}}</p>
                              <!--<h5><span class="integral">{{item.integral}}积分</span> <span class="stock">￥{{item.discount}}</span></h5>-->
                              <!--<h6>限量：{{item.stock}}件</h6>-->
                            </el-main>
                            <el-footer>
                              <div class="flex-box">
                                <div v-if="item.taskStatus==0">
                                  <router-link tag="button" type="button" :to="'/volunteer/details?id='+item.id+'&taskStatus='+item.taskStatus">申领报名</router-link>
                                </div>
                                <div v-else>
                                  <router-link tag="button" class="statusError" type="button" :to="'/volunteer/details?id='+item.id">{{item.taskStatus}}</router-link>
                                </div>
                                <!--<p>已报名：<span>120人</span></p>-->
                              </div>
                            </el-footer>
                          </el-container>
                        </el-container>
                      </div>
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <transition name="el-fade-in-linear">
                    <volunteer-calendar @changeTimeName="changeTime" :valShow="valShow"></volunteer-calendar>
                  </transition>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
  import axios from 'axios'
  import Scroll from './../components/scroll.vue'
  import volunteerSwiper from './components/pageSwipera.vue'
  import volunteerCalendar from './components/calendar.vue'
  import "./../../assets/style/listStyle.css"
  export default {
    name: 'volunteerIndex',
    components: {
      volunteerSwiper,
      volunteerCalendar,
      Scroll
    },
    data (){
      return {
        valShow: 1,
        //分页
        searchCondition: {
          PageNo: 1,
          PageSize: 10
        },
        haveMore: true,
        dropDown:false,
        pullup:true,
        pulldown:true,
        scrollY: true,
        listenScroll:true,
        fullscreenLoading:false,
        activeName: 'first',
        swiperList:  [1,2],
        firstDate: [],
        secondDate:[],
      }
    },
    methods: {
      //下拉刷新
      upData (){
        this.dropDown = true
        if(this.activeName==='first'){
//          this.more()
        }
      },
      //上拉更新
      downData (){

      },
      // 分页查询
      more: function () {
        this.searchCondition.PageNo = this.searchCondition.PageNo + 1
        this.getActive()
        this.isHaveMore()
      },
      handleClick(tab, event) {
        if(this.activeName === 'second'){
          this.secondDate = []
          this.valShow +=1
        }
      },
      //获取列表数据
      getVolunteer () {
        this.fullscreenLoading = true;
        axios.get('/Home/Volunteer/taskList')
          .then(this.getVolunteerSucc)
      },
      getVolunteerSucc (res) {
        if(res){
          const data = res.data
          console.log(data)
          this.swiperList = data.pic
          if(this.searchCondition.PageNo === 1){
            this.firstDate = data.data
          }else{
            this.firstDate = this.firstDate.concat(data.data)
            this.isEndPage()
          }
          this.dropDown = false
          this.fullscreenLoading = false

        }
      },
      //是否还有数据
      isEndPage: function (size, pageRow) {
        let endPage = Math.ceil(Number(size) / Number(pageRow))
        if (this.searchCondition.PageNo >= endPage) {
          this.haveMore = false
        }
      },
      isHaveMore: function () {
        // 是否还有下一页，如果没有就禁止上拉刷新
        this.allLoaded = true // true是禁止上拉加载
        if (this.haveMore) {
          this.allLoaded = false
        }
      },
      changeTime (val){
        const _this = this
        let params = new URLSearchParams()
        params.append('time',val);
        axios({
          method:'post',
          url: '/Home/Volunteer/taskTime',
          data: params
        }).then(function (res) {
          const data = res.data
          if(data.data==null){
            _this.$notify({
              title: '消息',
              message: "当前时间并没有任务哟！",
              showClose: false,
              duration: 2000,
            });
            return false
          }
          if(data.data.length){
            _this.secondDate = data.data
          }else{
            _this.$notify({
              title: '消息',
              message: "当前时间并没有任务哟！",
              showClose: false,
              duration: 2000,
            });
          }

        });
//        this.secondDate =  [
//          {id: 0,title: '植树节争当环境小卫士 植树节争当环境小卫士',integral:200,discount:399,stock:999,img:""},
//          {id: 1,title: '植树节争当环境小卫士 植树节争当环境小卫士',integral:200,discount:399,stock:999,img:""},
//          {id: 2,title: '植树节争当环境小卫士 植树节争当环境小卫士',integral:200,discount:399,stock:999,img:""},
//        ]
      }
    },
    mounted() {
      this.getVolunteer();
    }
  }
</script>
<style lang="less" scoped>
  #pane-second{
    min-height:8.7rem;
  }
  .el-tabs__content{
    overflow:initial;
  }
  .swiper-slide{
    width:100% !important;
  }
  .swiper-img{
    width:100%
  }
  .volunteerIndex{
    background-color:#f5f5f5;
    font-size:14px;
    .recommend-content{
      background-color:#f5f5f5;
    }
    .div_calendar span.select{
      background: #ee886d;
    }
    .arrowActive{
      color:#ee886d;
    }
    .el-tabs__item.is-active{
      color:#ee886d;
    }
    .el-tabs__active-bar{
      background-color:#ee886d;
    }
    .el-container{
      /*border-bottom:1px solid #eee;*/
    }
    .el-tabs__header{
      margin-bottom:0;
    }
    .el-tabs__content{
      padding:0 10px;
      ul{
        li{
          padding:15px 0;
          border-bottom:1px solid #eee;
        }
        li:last-child{
          border:none;
        }
      }
    }
    .el-tabs__nav-scroll{
      padding:0 10px;
    }
    .el-tabs__nav-wrap::after{
      height:1px;
      background-color: #f5f5f5;
    }
    .el-tabs__item{
      height:50px;
      line-height:50px;
    }
    .malTab{
      background-color:white;
      margin-top:10px;
      .el-aside{
        width:2.8rem !important;
        height:2rem !important;
        text-align: center;
        overflow: hidden;
        /*border:1px solid #f5f5f5;*/
        border-radius: 5px;
        /*padding:10px;*/
        img{
          width:100%;
          height:100%;
        }
      }
      .el-header{
        color:#506187;
        padding:0 10px;
        padding-right:0;
        height:initial !important;
        font-size:15px;
        font-weight: bold;
      }
      .el-main{
        padding:0 0 0 10px;
        font-size:14px;
        height:initial !important;
        p{
          color:#999;
          font-size:12px;
          i{
            margin-right:2px;
          }
          .pt-a-hd{
            color:#11b1ee;
            font-size:10px;
            border:1px solid #11b1ee;
            display: inline-block;
            border-radius: 5px;
            padding:0 2px;
          }
        }
        h5{
          .integral{
            color:#ee886d;
          }
          .stock{
            color:#999;
            margin-left:5px;
            text-decoration:line-through;
          }
        }
        h6{
          color:#506187;
        }
      }
      .el-footer{
        padding:0 0 0 10px;
        height:initial !important;
        .flex-box{
          justify-content: space-between;
          p{
            span{
              color:#ee886d;
            }
          }
        }
        button{
          display: inline-block;
          color:white;
          font-size:13px;
          height:28px;
          line-height:28px;
          border-radius: 14px;
          border:none;
          padding:0 8px;
          background: -webkit-linear-gradient(left, #ee886d , #f56f74); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right, #ee886d , #f56f74); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right, #ee886d , #f56f74); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #ee886d , #f56f74); /* 标准的语法 */
        }
        .statusError{
          background:#eee;
          color:#666;
        }
      }
    }
  }
</style>
