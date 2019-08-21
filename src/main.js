// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
//ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
Vue.use(ElementUI);
//初始样式
import './assets/font-awesome/css/font-awesome.min.css'
import './assets/style/currency.css'
import './assets/style/border.css'
// import './assets/js/loading'
import './assets/js/rem'
//全局懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  // error: '/Public/static/images/error-no.png',
  // loading: '/Public/static/images/loading.gif',
  // loading: '/static/images/loading.gif',
  // error: '/static/images/error-no.png',
  throttleWait:200
})
//数字累加动画
import VueCountUp from 'vue-countupjs'
Vue.use(VueCountUp)
//swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
// import VueAreaLinkage from 'vue-area-linkage'
// Vue.use(VueAreaLinkage)
//300毫秒延迟
// fastClick.attach(document.body)
import axios from 'axios'
//Vuex
Vue.config.debug = true
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.withCredentials=true;
//url
axios.defaults.baseURL = process.env.BASE_API;

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
  // token 已过期，重定向到登录页面
  if (response.data.code===501){
    localStorage.clear()
    if( router.currentRoute.meta.requireAuth){
      router.replace({
        path:'/reg/index',
        query: {redirect: router.currentRoute.fullPath}
      })
    }

  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})
// axios.defaults.baseURL = process.env.API
// .vjike.cn/';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
