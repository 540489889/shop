import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
//vue-router 路由懒加载 （解决首页加载时间过长）
var router = new Router({
  // mode: 'history',
  routes: [
    {
      name: 'regRegister',
      path: '/reg/register',
      component: resolve => require(['@/pages/reg/register'], resolve),
      meta:{index: 1, title: '注册', requireAuth: false}
    },//注册
    {
      name: 'regIndex',
      path: '/reg/index',
      component: resolve => require(['@/pages/reg/index'], resolve),
      meta:{index: 2, title: '登录', requireAuth: false}
    },//登录
    {
      name: 'regForgetPwd',
      path: '/reg/forgetPwd',
      component: resolve => require(['@/pages/reg/forgetPwd'], resolve),
      meta:{index: 3, title: '忘记密码', requireAuth: false}
    },//忘记密码
    {
      name: 'homeServiceHall',
      path: '/',
      component: resolve => require(['@/pages/home/serviceHall'], resolve) ,
      meta:{index: 4, title: '服务大厅', requireAuth: false}
    },//服务大厅
    {
      name: 'homeVenue',
      path: '/venue',
      component: resolve => require(['@/pages/home/venue'], resolve) ,
      meta:{index: 5, title: '场馆简介', requireAuth: false}
    },//场馆简介
    {
      name: 'homeTourist',
      path: '/tourist',
      component: resolve => require(['@/pages/home/tourist'], resolve) ,
      meta:{index: 5, title: '游客服务', requireAuth: false}
    },//服务大厅
    {
      name: 'HomeIndex',
      path: '/home',
      component: resolve => require(['@/pages/home/Home'], resolve),
      meta:{index: 5, title:'个人中心', requireAuth: true }
    },//个人中心
    {
      name: 'HomeSetup',
      path: '/setUp',
      component: resolve => require(['@/pages/home/setUp'], resolve),
      meta:{index: 6, title:'设置', requireAuth: true }
    },//个人中心
    {
      name: 'homeSignIn',
      path: '/signIn',
      component: resolve => require(['@/pages/home/signIn'], resolve),
      meta:{index: 6, title: '签到', requireAuth: true }
    },//签到
    {
      name: 'homeIntegral',
      path: '/integralDetails',
      component: resolve => require(['@/pages/home/integralDetails'], resolve),
      meta:{index: 7, title: '积分明细', requireAuth: true }
    },//积分明细
    {
      name: 'homeSignIndex',
      path: '/signIndex',
      component: resolve => require(['@/pages/home/signIndex'], resolve),
      meta:{index: 8, title:'积分信息', requireAuth: true }
    },//积分信息
    {
      name: 'mallIndex',
      path: '/mall/index',
      component: resolve => require(['@/pages/mall/index'], resolve),
      meta:{index: 9, title: '积分商城', requireAuth: false}
    },//积分商城首页
    {
      name: 'mallDetails',
      path: '/mall/details/:id',
      component: resolve => require(['@/pages/mall/details'], resolve),
      meta:{index: 10, title:'商品详情', requireAuth: true }
    },//积分商城首页
    {
      name: 'mallSuccess',
      path: '/mall/success',
      component: resolve => require(['@/pages/mall/success'], resolve),
      meta:{index: 11,title: '支付成功', requireAuth: true }
    },//支付成功
    {
      name: 'activeIndex',
      path: '/active/index',
      component: resolve => require(['@/pages/active/index'], resolve),
      meta:{index: 12, title:'活动预约', requireAuth: false}
    },//活动首页
    {
      name: 'activeDetails',
      path: '/active/details/:id',
      component: resolve => require(['@/pages/active/details'], resolve),
      meta:{index: 13, title:'活动详情', requireAuth: true}
    },//活动详情
    {
      name: 'activeSuccess',
      path: '/active/success',
      component: resolve => require(['@/pages/active/success'], resolve),
      meta:{index: 14, title: '预约成功', requireAuth: true }
    },//活动预约成功
    {
      name: 'volunteerIndex',
      path: '/volunteer/index',
      component: resolve => require(['@/pages/volunteer/index'], resolve),
      meta:{index: 10, title:'志愿者中心', requireAuth: false}
    },//志愿者活动列表
    {
      name: 'volunteerHome',
      path: '/volunteer/home',
      component: resolve => require(['@/pages/volunteer/home'], resolve),
      meta:{index: 10, title:'志愿者个人中心', requireAuth: true }
    },//志愿者个人中心
    {
      name: 'volunteerDetails',
      path: '/volunteer/details',
      component: resolve => require(['@/pages/volunteer/details'], resolve),
      meta:{index: 11, title:'详情', requireAuth: true}
    },//志愿者活动详情
    {
      name: 'mineCollection',
      path: '/mine/collection',
      component: resolve => require(['@/pages/mine/collection'], resolve),
      meta:{index: 6, title:'我的收藏', requireAuth: true }
    },//我的收藏
    {
      name: 'minePeak',
      path: '/mine/bespeak',
      component: resolve => require(['@/pages/mine/bespeak'], resolve),
      meta:{index: 6, title:'我的预约', requireAuth: true }
    },//我的预约
    {
      name: 'mineNews',
      path: '/mine/news',
      component: resolve => require(['@/pages/mine/news'], resolve),
      meta:{index: 6, title:'系统消息', requireAuth: true}
    },//系统消息
    {
      name: 'mineAddress',
      path: '/mine/address',
      component: resolve => require(['@/pages/mine/address'], resolve),
      meta:{index: 6, title:'收货地址', requireAuth: true }
    },//我的收货地址
    {
      name: 'mineOrder',
      path: '/mine/order',
      component: resolve => require(['@/pages/mine/order'], resolve),
      meta:{index: 6, title:'我的订单', requireAuth: true }
      },//我的订单
    {
      name: 'orderDetails',
      path: '/mine/orderDetails',
      component: resolve => require(['@/pages/mine/orderDetails'], resolve),
      meta:{index: 7, title:'订单详情', requireAuth: true }
    },//我的订单
    {
      name: 'codeOrder',
      path: '/mine/codeOrder',
      component: resolve => require(['@/pages/mine/codeOrder'], resolve),
      meta:{index: 7, title:'订单二维码', requireAuth: true }
    },//我的订单
    {
      name: 'fillAddress',
      path: '/mine/fillAddress',
      component: resolve => require(['@/pages/mine/fillAddress'], resolve),
      meta:{index: 7, title:'添加地址', requireAuth: true }
      },//填写地址
    {
      name: 'editAddress',
      path: '/mine/editAddress',
      component: resolve => require(['@/pages/mine/editAddress'], resolve),
      meta:{index: 8, title:'编辑收货地址', requireAuth: true }
    },//编辑收货地址
    {
      name: 'couponIndex',
      path: '/coupon/index',
      component: resolve => require(['@/pages/coupon/index'], resolve),
      meta:{index: 6, title:'我的优惠券', requireAuth: true }
    },//优惠券
    {
      name: 'couponCode',
      path: '/coupon/code',
      component: resolve => require(['@/pages/coupon/code'], resolve),
      meta:{index: 7, title:'我的优惠券', requireAuth: true }
    },//优惠券
    {
      name: 'questionnaireIndex',
      path: '/questionnaire/index',
      component: resolve => require(['@/pages/questionnaire/index'], resolve),
      meta:{index: 0, title:'问卷调查首页', requireAuth: false }
    },//问卷调查首页
    {
      name: 'questionnaireTopic',
      path: '/questionnaire/topic',
      component: resolve => require(['@/pages/questionnaire/topic'], resolve),
      meta:{index: 1, title:'问卷调查', requireAuth: false }
    },//问卷调查
    {
      name: 'questionnaireSucc',
      path: '/questionnaire/success',
      component: resolve => require(['@/pages/questionnaire/success'], resolve),
      meta:{index: 2, title:'问卷调查', requireAuth: false }
    },//问卷
    {
      name: 'voteIndex',
      path: '/vote/index',
      component: resolve => require(['@/pages/vote/index'], resolve),
      meta:{index: 1, title:'投票活动', requireAuth: false }
    },//投票
    {
      name: 'voteDetails',
      path: '/vote/details',
      component: resolve => require(['@/pages/vote/details'], resolve),
      meta:{index: 2, title:'投票活动', requireAuth: false }
    },//投票
    {
      name: 'movieIndex',
      path: '/movie/index',
      component: resolve => require(['@/pages/movie/index'], resolve),
      meta:{index: 5, title:'科普影片', requireAuth: false }
    },//电影
    {
      name: 'movieDetails',
      path: '/movie/details',
      component: resolve => require(['@/pages/movie/details'], resolve),
      meta:{index: 6, title:'影片详情', requireAuth: false }
    },//电影
    {
      name: 'movieSuccess',
      path: '/movie/success',
      component: resolve => require(['@/pages/movie/success'], resolve),
      meta:{index: 10, title:'购票成功', requireAuth: true }
    },//电影
    {
      name: 'movieSuccessto',
      path: '/movie/successto',
      component: resolve => require(['@/pages/movie/successto'], resolve),
      meta:{index: 10, title:'购票成功', requireAuth: true }
    },//电影
    {
      name: 'movieOrder',
      path: '/movie/order',
      component: resolve => require(['@/pages/movie/order'], resolve),
      meta:{index: 9, title:'影票订单', requireAuth: true }
    },//电影
    {
      name: 'movieCode',
      path: '/movie/code',
      component: resolve => require(['@/pages/movie/code'], resolve),
      meta:{index: 11, title:'入场二维码', requireAuth: true }
    },//电影
    {
      name: 'movieTimeChoice',
      path: '/movie/timeChoice',
      component: resolve => require(['@/pages/movie/timeChoice'], resolve),
      meta:{index: 7, title:'影片详情', requireAuth: false }
    },//电影
    {
      name: 'movieChooseSeat',
      path: '/movie/chooseSeat',
      component: resolve => require(['@/pages/movie/chooseSeat'], resolve),
      meta:{index: 8, title:'影片详情', requireAuth: false }
    },//电影巨幕
    {
      name: 'movieChooseSeat4D',
      path: '/movie/chooseSeat4D',
      component: resolve => require(['@/pages/movie/chooseSeat4D'], resolve),
      meta:{index: 8, title:'影片详情', requireAuth: false }
    },//电影4D
    {
      name: 'movieChooseSeatXd',
      path: '/movie/chooseSeatXd',
      component: resolve => require(['@/pages/movie/chooseSeatXd'], resolve),
      meta:{index: 8, title:'影片详情', requireAuth: false }
    },//电影Xd
    {
      name: 'movieChooseSeatOther',
      path: '/movie/chooseSeatOther',
      component: resolve => require(['@/pages/movie/chooseSeatOther'], resolve),
      meta:{index: 8, title:'影片详情', requireAuth: false }
    },//电影
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  //重置title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  let path = to.path
  let token = localStorage.getItem('Authorization');
  // 判断该路由是否需要登录权限
  if (to.matched.some(record => record.meta.requireAuth)){
    if(token){
      next()
    }else{
      next({
        path: '/reg/index',
        query: {redirect: to.fullPath} // 将要跳转路由的path作为参数，传递到登录页面
      })
    }
  }
  next()
});

export default router
