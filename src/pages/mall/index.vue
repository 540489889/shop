<template>
  <div class="mallIndex " v-loading.fullscreen.lock="fullscreenLoading">
    <scroll class="recommend-content" ref="scroll"
            :scrollY = "scrollY"
            :data = "[swiperList,cateGory]"
            :pulldown = "pulldown"
            :pullup = "pullup"
            @touchend = "upData">
      <div>
        <mall-swipera :list="swiperList"></mall-swipera>
        <div class="malTab">
          <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane  label="新品兑换" name="first">
              <ul>
                <li  v-for="item in firstDate.goods_list" :key="item.id">
                  <div class="firstBox">
                    <el-container>
                      <el-aside><img v-lazy="'/Public/Uploads/goods/'+item.img" alt=""></el-aside>
                      <!--'http://www.scicity.cn:5506/cqkjg'+-->
                      <el-container>
                        <el-header class="media_title">{{item.title}}</el-header>
                        <el-main>
                          <h5><span class="intergral"><b>{{item.intergral}}</b>积分</span> <span class="num">￥{{item.price}}</span></h5>
                          <h6>限量：{{item.num}}件</h6>
                        </el-main>
                        <el-footer>
                          <router-link tag="button" type="button" :to="'/mall/details/'+item.id">立即兑换</router-link>
                        </el-footer>
                      </el-container>
                    </el-container>
                  </div>
                </li>

              </ul>
            </el-tab-pane>
            <el-tab-pane label="藏品推荐" name="second">
              <ul>
                <li  v-for="item in secondDate.goods_list" :key="item.id">
                  <div class="firstBox">
                    <el-container>
                      <el-aside><img v-lazy="'/Public/Uploads/goods/'+item.img" alt=""></el-aside>
                      <el-container>
                        <el-header class="media_title">{{item.title}}</el-header>
                        <el-main>
                          <h5><span class="intergral"><b>{{item.intergral}}</b>积分</span> <span class="num">￥{{item.price}}</span></h5>
                          <h6>限量：{{item.num}}件</h6>
                        </el-main>
                        <el-footer><router-link tag="button" type="button" :to="'/mall/details/'+item.id">立即兑换</router-link></el-footer>
                      </el-container>
                    </el-container>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="影票推荐" name="third">
              <ul>
                <li  v-for="item in thirdDate.goods_list" :key="item.id">
                  <div class="firstBox">
                    <el-container>
                      <el-aside><img v-lazy="'/Public/Uploads/goods/'+item.img" alt=""></el-aside>
                      <el-container>
                        <el-header class="media_title">{{item.title}}</el-header>
                        <el-main>
                          <h5><span class="intergral"><b>{{item.intergral}}</b>积分</span> <span class="num">￥{{item.price}}</span></h5>
                          <h6>限量：{{item.num}}件</h6>
                        </el-main>
                        <el-footer><router-link tag="button" type="button" :to="'/mall/details/'+item.id">立即兑换</router-link></el-footer>
                      </el-container>
                    </el-container>
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
  import mallSwipera from './../components/pageSwipera.vue'
//  import InfiniteLoading from 'vue-infinite-loading'
  import axios from 'axios'
  import Scroll from './../components/scroll.vue'
  import './../../assets/style/mallStyle.css'
  export default {
    name: 'mallIndex',
    components: {
      mallSwipera,
      Scroll
    },
    data (){
      return {
        //分页
        searchCondition: {
          PageNo: 1,
          PageSize: 10
        },
        activeName: 'first',
        distance: 200,
        swiperList:  [],
        firstDate: {},
        secondDate:{},
        thirdDate:{},
        fullscreenLoading: false,
        scrollY: true,
        pulldown: true,
        pullup: true,
        cateGory: []
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

      },
      getMallIndex () {
        this.fullscreenLoading = true;
        axios.get('/Home/Intergral/index')
          .then(this.getMallIndexSucc)
      },
      getMallIndexSucc (res) {
        if(res){
          const data = res.data;
          if(this.searchCondition.PageNo === 1){
            this.swiperList = data.imgArr
            this.cateGory = data.cateGory
            this.firstDate = data.cateGory[0]
            this.secondDate = data.cateGory[1]
            this.thirdDate = data.cateGory[2]
          }else{
            this.firstDate = this.firstDate.concat(data.info)
            this.isEndPage()
          }
          this.dropDown = false
//          this.swiperList = data.imgArr
          this.fullscreenLoading = false
        }
      }
    },
    mounted() {
      this.getMallIndex()
    }
  }
</script>
<style lang="less" scoped>
  .recommend-content{
    height:100vh;
    overflow: hidden;
  }

  .mallIndex{
    background-color:#f5f5f5;
    font-size:14px;
    width:100%;
    .recommend-content{
      background-color:#f5f5f5;
    }
    .loadMore{
      background-color:#eee;
      color:#506187;
      padding:10px;
    }
    .malTab{
      background-color:white;
      margin-top:10px;
      width:100%;

      .el-aside{
        width:2.8rem !important;
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
  }
</style>
