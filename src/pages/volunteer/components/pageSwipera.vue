<template>
  <swiper :options="swiperA" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(item,index) in list" :key="index" v-if="showSwiper">
      <a :href="item.href"><img class="swiper-img" :src="'http://gfwx.cqkjg.cn/Public/Uploads/'+item.img" alt=""></a>
      <!--<img class="swiper-img" :src="'http://gfwx.cqkjg.cn/Public/static/img/'+item" alt="">-->
    </swiper-slide>
    <div class="swiper-pagination swiper-a"  slot="pagination"></div>
  </swiper>
</template>
<script>
  export default {
    name: 'pageSwipera',
    props: {
      list: Array
    },
    data() {
      return {
        swiperA: {
          loop: false,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          paginationClickable: true,
          autoHeight: true,
          pagination: {
            el: '.swiper-pagination',
            autoplay : {
              disableOnInteraction: false,
              delay:3000
            },
          }
        },
      }
    },
    computed: {
      showSwiper () {
        return this.list.length
      },
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {

    }
  }
</script>
<style lang="less" scoped>
  .swiper-pagination-bullet{
    width:12px;
    height:6px;
    border-radius: 0;
  }
  .swiper-pagination-bullet-active{
    background-color:white;
  }
  .swiper-slide{
    width:100%;
  }
  .swiper-slide img{
    width:100%;
    height:4rem;
  }
</style>
