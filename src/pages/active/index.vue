<template>
  <div class="activeIndex" v-loading.fullscreen.lock="fullscreenLoading">
    <scroll class="recommend-content" ref="scroll"
            :scrollY = "scrollY"
            :data = "swiperList"
            :pulldown = "pulldown"
            :pullup = "pullup"
            @touchend = "upData"
    >
      <div>
          <mall-swipera :list="swiperList"></mall-swipera>
        <div class="malTab">
          <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane  label="最新活动" name="first">
              <ul>
                <li  v-for="item in firstDate" :key="item.id" >
                  <div class="firstBox">
                    <el-container>
                      <!--'http://gfwx.cqkjg.cn/active/'-->
                      <el-aside><img v-lazy="'http://www.scicity.cn:5506/cqkjg/'+item.titleIcon" alt=""></el-aside>
                      <el-container>
                        <el-header class="media_title">{{item.title}}</el-header>
                        <el-main>
                          <p><span class="pt-a-hd">{{item.actkind}}</span></p>
                          <p><i class="el-icon-time"></i>{{item.ationStart}}至{{item.ationEnd}}</p>
                          <p v-if="item.address"><i class="el-icon-location-outline"></i>{{item.address}}</p>
                          <!--<h5><span class="integral">{{item.integral}}积分</span> <span class="stock">￥{{item.discount}}</span></h5>-->
                          <!--<h6>限量：{{item.stock}}件</h6>-->
                        </el-main>
                        <el-footer>
                          <div class="flex-box">
                            <!--<router-link tag="button" type="button" :to="'/active/details/'+item.id">立即预约</router-link>-->
                            <div v-if="item.personType">
                              <router-link tag="button" type="button" :to="'/active/details/'+item.id">立即预约</router-link>
                            </div>
                            <div v-else>
                              <router-link tag="button" class="lookDetails" type="button" :to="'/active/details/'+item.id">查看详情</router-link>
                            </div>
                            <!--<p>已预约：<span>120人</span></p>-->
                          </div>
                        </el-footer>
                      </el-container>
                    </el-container>
                  </div>
                </li>
              </ul>
              <p class="text-center" v-show="dropDown"><i class="el-icon-loading"></i> 加载中...</p>
            </el-tab-pane>
            <el-tab-pane label="日期选择" name="second">
              <span slot="label">日期选择<i class="el-icon-date" style="margin-left:5px;"></i> </span>
              <div v-if="secondDate.length">
                <ul>
                  <li  v-for="item in secondDate" :key="item.id">
                    <div class="firstBox">
                      <el-container>
                        <!--'http://gfwx.cqkjg.cn/active/'-->
                        <el-aside><img v-lazy="'http://www.scicity.cn:5506/cqkjg/'+item.titleIcon" alt=""></el-aside>
                        <el-container>
                          <el-header class="media_title">{{item.title}}</el-header>
                          <el-main>
                            <p><span class="pt-a-hd">{{item.actkind}}</span></p>
                            <p><i class="el-icon-time"></i>{{item.ationStart}}至{{item.ationEnd}}</p>
                            <p v-if="item.address"><i class="el-icon-location-outline"></i>{{item.address}}</p>
                            <!--<h5><span class="integral">{{item.integral}}积分</span> <span class="stock">￥{{item.discount}}</span></h5>-->
                            <!--<h6>限量：{{item.stock}}件</h6>-->
                          </el-main>
                          <el-footer>
                            <div class="flex-box">
                              <!--<router-link tag="button" type="button" :to="'/active/details/'+item.id">立即预约</router-link>-->
                              <div v-if="item.personType">
                                <router-link tag="button" type="button" :to="'/active/details/'+item.id">立即预约</router-link>
                              </div>
                              <div v-else>
                                <router-link tag="button" class="lookDetails" type="button" :to="'/active/details/'+item.id">查看详情</router-link>
                              </div>
                              <!--<p>已预约：<span>120人</span></p>-->
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
                  <active-calendar @changeTimeName="changeTime" :timeList="timeList"></active-calendar>
                </transition>
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
  import mallSwipera from './components/pageSwipera.vue'
  import activeCalendar from './components/calendar.vue'
  import Scroll from './../components/scroll.vue'
  import "./../../assets/style/listStyle.css"
  export default {
    name: 'mallIndex',
    components: {
      mallSwipera,
      Scroll,
      activeCalendar
    },
    data (){
      return {
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
        swiperList:  [],
        firstDate: [],
        secondDate:[],
        timeList: [],
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

      //获取列表数据
      getActive () {
        this.fullscreenLoading = true;
        axios.get('/Home/Activity/index')
          .then(this.getActiveSucc)
      },
      getActiveSucc (res) {
        if(res){
          const data = res.data
          if(this.searchCondition.PageNo === 1){
            this.swiperList = data.imgArr
            this.firstDate = data.info
            for(let i=0;i<this.firstDate.length;i++){
              this.timeList.push({datetime:new Date(this.firstDate[i].ationStart).valueOf(),status:0})
            }
          }else{
            this.firstDate = this.firstDate.concat(data.info)
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
      //列表切换 活动/选择
      handleClick(tab, event) {
        if(this.activeName === 'second'){
          this.secondDate = []
        }
      },
      //时间查询
      changeTime (val){
        console.log(val)
        const _this = this
        let params = new URLSearchParams()
        params.append('date',val);
        axios({
          method:'post',
          url: '/Home/Activity/index',
          data: params
        }).then(function (res) {
          const data = res.data
          if(data.info.length){
            _this.secondDate = data.info
          }else{
            _this.$notify({
              title: '消息',
              message: "当前时间并没有活动哟！",
              showClose: false,
              duration: 2000,
            });
          }

        });
      }
    },
    mounted() {
      this.getActive()
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
  .activeIndex{
    background-color:#f5f5f5;
    font-size:14px;
    .recommend-content{
      background-color:#f5f5f5;
    }
    .malTab{
      background-color:white;
      margin-top:10px;
      .el-aside{
        width:2.8rem !important;
        height:2rem !important;
        line-height:2rem;
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
          margin-top:2px;
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
          margin-top:2px;
          display: inline-block;
          color:white;
          font-size:12px;
          min-width:1.2rem;
          height:0.5rem;
          line-height:0.5rem;
          border-radius: 0.3rem;
          border:none;
          background: -webkit-linear-gradient(left, #3cc6fb , #12b2ee); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right, #3cc6fb , #12b2ee); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right, #3cc6fb , #12b2ee); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #3cc6fb , #12b2ee); /* 标准的语法 */
        }
        .lookDetails{
          /*background:none;*/
          /*color:#666;*/
          /*border:1px solid #eee;*/
        }
      }
    }
  }
</style>
