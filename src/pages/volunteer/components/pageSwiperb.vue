<template>
  <swiper :options="swiperB" ref="mySwiper">
    <!-- slides -->
    <swiper-slide >
      <!--<img class="swiper-img" src="http://dimg04.c-ctrip.com/images/700b0y000000m0tjsBA9C_750_284_191.jpg" alt="">-->
      <img class="swiper-img" :src="'http://www.scicity.cn:5506/cqkjg/'+banner" alt="">
    </swiper-slide>
    <div class="swiper-pagination swiper-b"  slot="pagination"></div>
  </swiper>
</template>
<script>
  export default {
    name: 'pageSwiperb',
    props: {
      banner: String
    },
    components:{
    },
    data() {
      return {
        swiperB: {
          loop: false,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          paginationClickable: true,
          autoHeight: true,
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            autoplay : {
              disableOnInteraction: false,
              delay:3000
            },
          }
        },
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {

    }
  }
</script>
<style lang="less" scoped>
  .swiper-pagination{
    display: inline-block;
    background:rgba(0,0,0,0.5);
    text-align: center;
    color:white;
    width:initial;
    right:0;
    left:initial;
    padding:0 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .swiper-slide{
    width:100%;
  }
  .swiper-slide img{
    width:100%;
    height:4rem;
    /*height:200px;*/
  }
</style>
