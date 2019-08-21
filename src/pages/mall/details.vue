<template>
  <div class="mallDetails" v-loading.fullscreen.lock="fullscreenLoading">
    <scroll class="recommend-content" :scrollY="scrollY" :data="swiperList" :dataObj="goods">
      <div style="padding-bottom:0.9rem;">
        <mall-swiperb :list="swiperList" v-show="swiperList.length"></mall-swiperb>
        <div class="details-bt">
          <h2>{{goods.title}}</h2>
          <h5><span>{{goods.intergral}} <sub>积分</sub></span> 剩余：{{goods.num}}件</h5>
        </div>
        <div class="details-text">
          <h2>商品详情</h2>
          <p v-html="goods.details"></p>
        </div>

      </div>
    </scroll>
    <div class="details-footer">
      <ul class="flex-box">
        <li @click="joinSc">加入收藏</li>
        <li class="box-1" @click="dwShow = true">立即兑换</li>
      </ul>
    </div>
    <transition name="el-fade-in">
      <div v-show="dwShow" class="details-mask mask">
        <div class="d-wrapper">
          <h3 class="qr-title">商品信息确认</h3>
          <div class="d-w-mall">
            <el-container>
              <el-aside><img v-lazy="'/Public/Uploads/goods/'+goods.img" alt=""></el-aside>
              <el-container>
                <el-header>{{goods.title}}</el-header>
                <el-main>
                  <h5><span class="integral"><b>{{goods.intergral}}</b>积分</span> <span class="stock">￥{{goods.price}}</span></h5>
                  <h6>限量：{{goods.num}}件</h6>
                </el-main>
                <el-footer>
                  <el-input-number size="small" v-model="num" @change="handleNumChange" :min="1" ></el-input-number>
                </el-footer>
              </el-container>
            </el-container>
          </div>
          <h6 class="d-w-integral">我的积分：{{myIntergral}}</h6>
          <h6 class="d-w-l">
            <div class="flex-box d-w-2">到货方式：
              <el-radio-group v-if="goods.delivery==1" v-model="radio1"	fill="#6BC541">
                  <el-radio :label="1" >自提</el-radio>
                  <el-radio :label="2" disabled>邮寄</el-radio>
              </el-radio-group>
              <el-radio-group v-if="goods.delivery==2" v-model="radio2"	fill="#6BC541">
                <el-radio :label="1" disabled >自提</el-radio>
                <el-radio :label="2" >邮寄</el-radio>
              </el-radio-group>
              <el-radio-group v-if="goods.delivery==3" v-model="radio"	fill="#6BC541">
                <el-radio :label="1" >自提</el-radio>
                <el-radio :label="2" >邮寄</el-radio>
              </el-radio-group>
            </div>
          </h6>
          <div class="d-w-l" v-show="isAddress">
            <div class="flex-box">
              收货地址：
              <el-select v-model="value" class="box-1" @change="addressVal" placeholder="请选择">
                <el-option
                  v-for="item in myAddress"
                  :key="item.id"
                  :value="item.address"
                >
                </el-option>
              </el-select>
            </div>
            <router-link tag="span" to="/mine/address" class="addDz-btn"><i class="el-icon-circle-plus-outline"></i>新增地址</router-link>
          </div>
          <button type="button" class="d-w-btn" @click="convertClick">确认兑换</button>
          <i class="el-icon-circle-close d-w-close" @click="closeDetailsMask"></i>
        </div>
      </div>
    </transition>
  </div>

</template>
<script>
  import bus from './../../store/bus'
  import './../../assets/style/mallStyle.css'
  import Scroll from './../components/scroll.vue'
  import mallSwiperb from './../components/pageSwiperb.vue'
  import axios from 'axios'
  export default {
    name: 'mallDetails',
    components: {
      mallSwiperb,
      Scroll
    },
    data (){
      return {
        scrollY: true,
        isAddress:false,
        radio:0,
        radio1:1,
        radio2:2,
        radio3:3,
        dwShow: false,
        num: 1,
        number: 1,
        activeName: 'first',
        swiperList:  [],
        goods:{} ,
        myIntergral:null,
        myAddress:[],
        value: '',
        fullscreenLoading: false,
        addressId:null,
        addressName:null,
      }
    },
    methods: {
      //地址变化监听
      addressVal(val){
        this.myAddress.find((item)=>{
          //匹配相对应的ID
          if(item.address === val){
            this.addressId = item.id
            this.addressName = item.name
          }
        });
      },
      //加入收藏
      joinSc(){
        const _this = this
        let params = new URLSearchParams()
        let id = this.$route.params.id
        params.append('id',id);
        axios({
          method:'post',
          url: '/Home/Intergral/collect',
          data: params
        }).then(function (res) {
          const data = res.data
          console.log(data)
          _this.$notify({
            title: '成功',
            message: data.msg,
            showClose: false,
            duration: 2000,
            type:'success'
          });
        });
      },
      //选择送货方式
      radioChange(){
        if(this.goods.delivery==1){
          this.radio = this.radio1
        }else if(this.goods.delivery==2){
          this.radio = this.radio2
        }
        if(this.radio===1){
          this.isAddress = false
        }else if(this.radio==2){
          this.isAddress = true
        }
      },
      //调整购买数量
      handleNumChange(value) {
        this.number = value
      },
      //关闭商品详情
      closeDetailsMask (){
        this.dwShow = false
      },
      //确认兑换
      convertClick(){
        console.log('radio:',this.radio)
        if(this.radio==0){
          this.$notify({
            title: '消息',
            message: '请选择提货方式',
            showClose: false,
            duration: 2000,
            onClose: function () {
            }
          });
          return false
        }
        if(this.radio==2&&!this.addressId){
          this.$notify({
            title: '消息',
            message: '请选择您的地址',
            showClose: false,
            duration: 2000,
            onClose: function () {
            }
          });
          return false
        }
        const _this = this
        this.fullscreenLoading = true
//        let allIntergral = this.num*this.goods.intergral
//        if(allIntergral>this.myIntergral){
//          this.$notify.error({
//            title: '错误',
//            message: '积分不足',
//            showClose: false,
//            duration: 1000
//          });
//          return false
//        }
        let params = new URLSearchParams();
        let id = this.$route.params.id;
        params.append('id',id);
        params.append('goods_id',id);
        params.append('number',this.number);
        params.append('address_id',this.addressId);
        params.append('name',this.addressName);
        params.append('type',this.radio);
        axios({
          method:'post',
          url: '/Home/Intergral/exchange',
          data: params
        }).then(function (res) {
          const data = res.data
          _this.fullscreenLoading = false
          _this.dwShow = false
          console.log(data)
          if(data.status==500){
            _this.$notify({
              title: '消息',
              message: data.message,
              showClose: false,
              duration: 2000,
              onClose: function () {
              }
            });
          }else{
//            _this.$store.commit('changeMallInfo',data)
//          bus.$emit('userOrderInfo',data)
            _this.$router.push({path:'/mall/success/', query: { list: JSON.stringify(data)}})
          }
        });
//        this.$router.push({path:"/mall/success"})
      },
      //获取商品详情
      getMallDetails () {
        this.fullscreenLoading = true;
        axios.get('/Home/Intergral/goods_details?id='+this.$route.params.id)
          .then(this.getMallDetailsSucc)
      },
      getMallDetailsSucc (res) {
        if(res){
          const data = res.data
          this.goods = data.Goods
          this.myIntergral = data.intergral
          this.myAddress = data.address
          this.radio = this.goods.delivery
          if(this.goods.delivery==3){
            this.radio = 0
          }
          if(data.Goods.imgs.length){
              this.swiperList = this.goods.imgs
          }
          this.fullscreenLoading = false;
          console.log(data)
        }
      }
    },
    watch: {
      radio(val) {
        console.log(val)
        this.radioChange()
      }
    },
    mounted (){
      this.getMallDetails()
      this.radioChange()

    }
  }
</script>
<style lang="less" scoped>

  .mallDetails{
    position:absolute;
    background-color:#f5f5f5;
    width:100%;
    min-height:100%;
    .details-bt{
      background-color:white;
      border-top:1px solid #eee;
      padding:10px 15px;
      h2{
        font-size:16px;
        color:#506187;
        margin-bottom:5px;
        font-weight: bold;
      }
      h5{
        color:#506187;
        span{
          color:#ee886d;
          margin-right:5px;
          font-size:18px;
          font-weight: bold;
          sub{
            font-size:14px;
            font-weight: 400;
          }
        }
      }
    }
    .details-text{
      background-color:white;
      color:#506187;
      padding:10px 15px;
      margin-top:10px;
      /*margin-bottom:0.9rem;*/
      h2{
        padding-bottom:10px;
        border-bottom:1px solid #eee;
        margin-bottom:10px;
        font-size:16px;
        font-weight: bold;
      }
      p{
        color:#999;
      }
    }
    .details-footer{
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
      ul{
        width:100%;
        li{
          height:0.9rem;
          line-height:0.9rem;
          text-align: center;
          color:white;
          background: -webkit-linear-gradient(left, #ee886d , #f56f74); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right, #ee886d , #f56f74); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right, #ee886d , #f56f74); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #ee886d , #f56f74); /* 标准的语法 */
        }
        li:first-child{
          width:40%;
          background: -webkit-linear-gradient(left, #3cc6fb , #11b1ee); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right, #3cc6fb , #11b1ee); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right, #3cc6fb , #11b1ee); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #3cc6fb , #11b1ee); /* 标准的语法 */
        }
      }
    }
    .details-mask{
      .d-wrapper{
        width:6.9rem;
        min-height:8.7rem;
        background-color:white;
        border-radius: 5px;
        margin:0 auto;
        position:absolute;
        top:45%;
        left:50%;
        transform: translate(-50%,-50%);
        text-align: left;
        color:#506187;
        padding:10px 15px;
        padding-bottom:0.5rem;
        .d-w-close{
          position:absolute;
          bottom:-1rem;
          left:50%;
          transform: translateX(-50%);
          color:white;
          font-size:35px;
        }
        .d-w-integral{
          padding:15px 0;
          border-bottom:1px solid #eee;
          border-top:1px solid #eee;
          margin-top:20px;
          font-size:14px;
        }
        .d-w-l{
          font-size:14px;
          padding:10px 0;
          border-bottom:1px solid #eee;
          .d-w-2{
            padding:10px 0;
          }
          .el-input__inner{
            border:none !important;
            width:2.7rem;
          }
          .addDz-btn{
            i{
              font-size:25px;
              margin-right:5px;
              position:relative;
              top:4px;
            }
          }
        }
        .d-w-btn{
          display: block;
          color:white;
          font-size:13px;
          line-height:0.8rem;
          border-radius: 0.4rem;
          border:none;
          margin:0 auto;
          width:2.8rem;
          margin-top:0.5rem;
          background: -webkit-linear-gradient(left, #ee886d , #f56f74); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right, #ee886d , #f56f74); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right, #ee886d , #f56f74); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #ee886d , #f56f74); /* 标准的语法 */
        }
        .qr-title{
          text-align: center;
          padding:0.3rem 0 0.5rem 0;
          font-size:16px;
          font-weight: bold;
        }
        .el-aside{
          width:2.5rem !important;
          height:2.5rem !important;
          text-align: center;
          overflow: hidden;
          border:1px solid #f5f5f5;
          border-radius: 5px;
          padding:10px;
          img{
            width:100%;
            height:100%;
          }
        }
        .el-header{
          color:#506187;
          padding:0 10px;
          padding-right:0;
          /*height:initial !important;*/
          font-weight: bold;
          height:60px;
          overflow: hidden;
          line-height:1.3;
        }
        .el-main{
          padding:0 0 0 10px;
          h5{
            .integral{
              color:#ee886d;
              font-size:10px;
              b{
                font-weight: bold;
                font-size:16px;
              }
            }
            .stock{
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
        }
      }
    }
  }

</style>
