/**
 * Created by Administrator on 2017/12/20.
 */
import '../style/style-2.css'
let _LoadingHtml = '<div class="loadWrapper" id="loader"><div class="loader"><span class="text">Loading</span><span class="spinner"></span></div></div>'
document.write(_LoadingHtml);
document.onreadystatechange = completeLoading
function completeLoading () {
  if (document.readyState === 'complete') {
    setTimeout(function () {
      let loadingMask = document.getElementById('loader')
      loadingMask.parentNode.removeChild(loadingMask)
    }, 1500)
  }
}
