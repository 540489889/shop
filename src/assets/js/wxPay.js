
import Axios from 'axios'
const wxApi = {
  /**
   * [wxRegister 微信Api初始化]
   */
  weixinPay: function (data,id,_this) {
    var vm = this;
    if (typeof WeixinJSBridge == "undefined") {//微信浏览器内置对象。参考微信官方文档
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data,id,_this), false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data,id,_this));
        document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady(data,id,_this));
      }
    } else {
      vm.onBridgeReady(data,id,_this);
    }
  },
  onBridgeReady: function (data,id,_this) {
    var vm = this;
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        debug: true,
        "appId": data.appId,     //公众号名称，由商户传入
        "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
        "nonceStr": data.nonceStr, //随机串
        "package": data.package,
        "signType": data.signType, //微信签名方式：
        "paySign": data.paySign, //微信签名
        //这里的信息从后台返回的接口获得。
        jsApiList: [
          'chooseWXPay'
        ]
      },
      function (res) {
        console.log(res.err_msg)
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          _this.$router.push({ path: '/movie/successto', query: { id: id}});
        } else {
          console.log("取消支付")
        }
      }
    );

  }
}
export default wxApi
