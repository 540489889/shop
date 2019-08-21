<template>
  <div class="movieIndex mallIndex" v-loading.fullscreen.lock="fullscreenLoading">
    <scroll class="recommend-content" ref="scroll"
            :scrollY = "scrollY"
            :data = "[swiperList]"
            :pulldown = "pulldown"
            :pullup = "pullup"
            @touchend = "upData"
    >
      <div>
        <movie-swiper :list="swiperList"></movie-swiper>
        <div class="malTab">
          <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane  label="巨幕影院" name="first">
              <ul class="sheetUl">
                <li class="flex-box" v-for="item in list" v-bind:key="item.id">
                  <div class="imgDiv">
                    <img v-lazy="'http://gfwx.cqkjg.cn/'+item.poster" alt="">
                  </div>
                  <div class="movieInfo box-1">
                    <h4 class="media_title">{{item.title}}</h4>
                    <p v-if="item.uptime">{{item.uptime.substring(0,10)}} 上映</p>
                    <!--<p>导演：希区柯克</p>-->
                    <!--<p>主演：杰森.郭达 苏菲玛索</p>-->
                    <h6><span>￥ {{item.price}}</span> </h6>
                  </div>
                  <div class="buyDiv">
                    <router-link tag="button" :to="'details?id='+item.id">购票</router-link>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="4D影院" name="second">
              <ul class="sheetUl">
                <li class="flex-box" v-for="item in list" v-bind:key="item.id">
                  <div class="imgDiv">
                    <img v-lazy="'http://gfwx.cqkjg.cn/'+item.poster" alt="">
                  </div>
                  <div class="movieInfo box-1">
                    <h4 class="media_title">{{item.title}}</h4>
                    <p v-if="item.uptime">{{item.uptime.substring(0,10)}} 上映</p>
                    <!--<p>导演：希区柯克</p>-->
                    <!--<p>主演：杰森.郭达 苏菲玛索</p>-->
                    <h6><span>￥ {{item.price}}</span></h6>
                  </div>
                  <div class="buyDiv">
                    <router-link tag="button" :to="'details?id='+item.id">购票</router-link>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="XD影院" name="third">
              <ul class="sheetUl">
                <li class="flex-box" v-for="item in list" v-bind:key="item.id">
                  <div class="imgDiv">
                    <img v-lazy="'http://gfwx.cqkjg.cn/'+item.poster" alt="">
                  </div>
                  <div class="movieInfo box-1">
                    <h4 class="media_title">{{item.title}}</h4>
                    <p v-if="item.uptime">{{item.uptime.substring(0,10)}} 上映</p>
                    <!--<p>导演：希区柯克</p>-->
                    <!--<p>主演：杰森.郭达 苏菲玛索</p>-->
                    <h6><span>￥ {{item.price}}</span></h6>
                  </div>
                  <div class="buyDiv">
                    <router-link tag="button" :to="'details?id='+item.id">购票</router-link>
                  </div>
                </li>
              </ul>
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
import movieSwiper from './components/pageSwipera.vue'
import './../../assets/style/movie.css'
import './../../assets/style/mallStyle.css'
export default{
  name: 'movieIndex',
  data (){
    return {
      swiperList:  ["movie-banner.png","movie-banner.png","movie-banner.png"],
      //分页
      searchCondition: {
        PageNo: 1,
        PageSize: 10
      },
      activeName: 'first',
      haveMore: true,
      dropDown:false,
      pullup:true,
      pulldown:true,
      scrollY: true,
      listenScroll:true,
      fullscreenLoading:false,
      imgUrl:'static/image/movie-list-1.png',
      imgArr: [],
      list: []
    }
  },
  components:{
    movieSwiper,
    Scroll
  },
  methods:{
    handleClick(tab, event) {
      if(tab.name== 'first'){
        this.getMovie(1)
      }
      if(tab.name == 'second'){
        this.getMovie(2)
      }
      if(tab.name == 'third'){
        this.getMovie(3)
      }
    },
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
    getMovie (id) {
      this.fullscreenLoading = true;
      axios.get('/Home/Film/index?cid='+id)
        .then(this.getMovieSucc)
    },
    getMovieSucc (res) {
      if(res){
        const data = res.data
        console.log(data)
        this.swiperList = data.imgArr
        this.list = data.info

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
  },
  mounted (){
    this.getMovie(1)
  }
}
</script>
<style scoped lang="less">
  .movieIndex{
    background-color:#f5f5f5;
    .malTab{
      background-color:white;
      margin-top:10px;
      width:100%;
      .el-aside{
        width:2rem !important;
        height:2rem !important;
        text-align: center;
        overflow: hidden;
        border:1px solid #f5f5f5;
        border-radius: 5px;
        /*padding:10px;*/
        img{
          width:100%;
          height:100%;
          border-radius: 5px;
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
        padding:5px 0 0 10px;
        font-size:14px;
        height:initial !important;
        h5{
          .intergral{
            color:#ee886d;
            b{
              font-weight: bold;
            }
          }
          .num{
            color:#999;
            margin-left:5px;
            text-decoration:line-through;
            font-size:12px;
          }
        }
        h6{
          color:#506187;
        }
      }
      .el-footer{
        padding:0 0 0 10px;
        height:initial !important;
        button{
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
      }
    }
    .sheetUl{
      li{
        padding: 10px;
        border-bottom:1px solid #eee;
        .imgDiv{
          width:1.5rem;
          height:2.2rem;
          margin-right:10px;
          img{
            width:100%;
            height:100%;
          }
        }
        .movieInfo{
          margin-right:10px;
          h4{
            /*font-size:16px;*/
            font-weight: bold;
            margin-bottom:5px;
          }
          h6{
            margin-top:5px;
            span{
              font-weight: bold;
              color:#ee886d;
              margin-right: 10px;
            }
            em{
              color:#ee886d;
              font-weight: 400;
            }
          }
        }
        .buyDiv{
          button{
            border:none;
            background: -webkit-linear-gradient(left, #53cdfb , #11b1ee); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #53cdfb , #11b1ee); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #53cdfb , #11b1ee); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right,  #53cdfb , #11b1ee); /* 标准的语法 */
            font-size:12px;
            min-width:1.2rem;
            height:0.5rem;
            line-height:0.5rem;
            border-radius: 0.3rem;
            color:white;
          }
        }
      }
      li:last-child{
        border:none;
      }
    }
    .sheetBox{
      background-color:white;
      margin-top:10px;
      color:#506187;
      h1{
        /*font-size:18px;*/
        font-weight: bold;
        border-bottom:1px solid #eee;
        justify-content: space-between;
        padding:10px;
        span{
          /*font-size:14px;*/
          color:#ccc;
          font-weight: 400;
        }
      }
    }
  }
</style>
