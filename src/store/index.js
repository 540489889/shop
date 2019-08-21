import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let defaultMallInfo = {}
try{
  if(localStorage.mallInfo){
    defaultMallInfo = localStorage.mallInfo
  }
} catch (e){}
export default new Vuex.Store({
  state: {
    URL_PATH: 'http://gfwx.cqkjg.cn',
    adShow: true,//广告显示
    //商品返回信息
    mallInfo: defaultMallInfo,
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    },
    changeAd (state,user){
      console.log(state,user)
      state.adShow = user
    },
    //
    changeMallInfo(state,data){
      state.mallInfo = data
      try{
        localStorage.mallInfo = JSON.stringify(data)
      } catch (e){}
    }
  },
  actions: {
    // changeMallInfo(ctx,data){
    //   ctx.commit("changeMallInfo",data)
    // }
  }
})
