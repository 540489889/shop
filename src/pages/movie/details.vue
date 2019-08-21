<template>
  <scroll class="recommend-content movieDetails" v-loading.fullscreen.lock="fullscreenLoading" ref="scroll"
          :scrollY = "scrollY"
          :date="list"
          :pulldown = "pulldown"
          :pullup = "pullup"
          @touchend = "upData"
  >
    <div class="paddingBox">
      <div class="DetailsContent">
        <div class="sheetBox">
          <div class="flex-box topInfo">
            <div class="imgDiv">
              <img v-lazy="'http://gfwx.cqkjg.cn/'+list.poster" alt="">
            </div>
            <div class="movieInfo box-1">
              <h4 class="media_title">{{list.title}}</h4>
              <!--<p class="media_title">主演：杰森.郭达 苏菲玛索玛雅小蜜蜂历险记苏菲玛索玛雅小蜜蜂历险记</p>-->
              <!--<p class="media_title">导演：希区柯克</p>-->
              <p class="media_title" v-if="list.uptime">{{list.uptime}} 上映</p>
              <!--<h6><span>￥40</span> <em>5980人</em>想看</h6>-->
              <h6><span>￥{{list.price}}</span></h6>
            </div>
          </div>
        </div>
        <div class="sheetContent">
          <h4 class="flex-box recText">
            推荐：
            <el-rate
              v-model="value5"
              disabled
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </h4>
          <div class="priceText">
            <div class="Price flex-box">
              <p>票价：<b>{{list.price}}</b> 元/张</p>
              <p class="box-1 text-center">{{count}}人已购票</p>
            </div>
            <p class="text" v-html="list.introduction">
            </p>
          </div>

        </div>
      </div>
    </div>
    <router-link tag="div" :to="'./timeChoice?id='+list.id" class="buyNow" >立即购票：￥{{list.price}}/张</router-link>
  </scroll>
</template>
<script>
import axios from 'axios'
import Scroll from './../components/scroll.vue'
export default{
  name: 'movieDetails',
  data (){
    return {
      value5: 5,
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
      list: {},
      count: 0,
    }
  },
  components:{
    Scroll
  },
  methods:{
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
    getMovieDetail () {
      let id = this.$route.query.id
      this.fullscreenLoading = true;
      axios.get('/Home/Film/detail?id='+id)
        .then(this.getMovieDetailSucc)
    },
    getMovieDetailSucc (res) {
      if(res){
        const data = res.data
        this.list = data.msg
        this.count = data.count
        console.log(data)
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
    this.getMovieDetail()
  }
}
</script>
<style scoped lang="less">
  .movieDetails{
    background-color:#f5f5f5;
    color:#506187;
    .paddingBox{
      padding-bottom:0.9rem;
    }
    .buyNow{
      line-height:0.9rem;
      background-color:#35c3f9;
      color:white;
      text-align: center;
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
    }
    .sheetBox{
      background-color:white;
      .topInfo{
        background-color:#506187;
        padding: 20px 10px;
        color:white;
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
            height:0.6rem;
            width:1.2rem;
            border-radius: 0.3rem;
            color:white;
          }
        }
      }
    }
    .sheetContent{
      background-color:white;
      margin-top:10px;
      padding:10px;
      .recText{
        padding:10px 0;
        border-bottom:1px solid #eee;
      }
      .priceText{
        .Price{
          padding:10px 0;
          border-bottom:1px solid #eee;
          p{
            b{
              color:#ee886d;
              font-weight: bold;
              font-size:16px;

            }
          }
          .text-center{
            color:#ee886d;
          }
        }
        .text{
          padding:10px 0;
        }
      }
    }
  }
</style>
