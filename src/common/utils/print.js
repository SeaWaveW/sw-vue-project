/* eslint-disable */
import { MessageBox } from 'element-ui'
// 页面获取CLodop云打印必须的js文件
var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
// https版本引用双端口(8443和8444）避免其中某个被占用
var JS1 = document.createElement('script')
JS1.src = 'https://localhost.lodop.net:8443/CLodopfuncs.js?priority=1'
head.insertBefore(JS1, head.firstChild)
var JS2 = document.createElement('script')
JS2.src = 'https://localhost.lodop.net:8444/CLodopfuncs.js?priority=0'
head.insertBefore(JS2, head.firstChild)
// js文件加载状态
var CLodopJsState
if (JS1.attachEvent) {
  CLodopJsState = 'loading'
  var onChange = function () {
    if (window.event.srcElement.readyState === 'loaded') {
      CLodopJsState = 'complete'
    }
  }
  JS1.attachEvent('onreadystatechange', onChange)
  JS2.attachEvent('onreadystatechange', onChange)
}
// 获取LODOP对象
function getLodop () {
  var LODOP
  try {
    LODOP = getCLodop()
  } catch (e) {}
  // console.error(LODOP)
  // 判断js文件加载状态
  var ua = navigator.userAgent
  var isIE = !!(ua.match(/MSIE/i)) || !!(ua.match(/Trident/i))
  if (!LODOP && (document.readyState !== 'complete' || (isIE && CLodopJsState === 'loading'))) {
    MessageBox.alert('网页还没下载完毕，请稍等一下再操作')
    return
  }
  // 未安装控件
  if (!LODOP) {
    MessageBox.alert('Web打印服务CLodop未安装启动，点击这里' +
      '<a style="color: #409EFF" href="/lodop/CLodop_Setup_for_Win32NT.exe" target="_self">下载执行安装</a>' +
      '<br>（若此前已安装过，可' +
      '<a style=\'color: #409EFF\' href=\'CLodop.protocol:setup\' target=\'_self\'>点这里直接再次启动</a>' +
      '），成功后请刷新本页面。', '提示', { dangerouslyUseHTMLString: true })
    return
  }
  // 版本过低
  if (CLODOP.CVERSION < '3.0.9.3') {
    MessageBox.alert('Web打印服务CLodop需升级!点击这里' +
      '<a href="/lodop/CLodop_Setup_for_Win32NT.exe" target="_self">执行升级</a>' +
      ',升级后请刷新页面。', '提示', { dangerouslyUseHTMLString: true })
    return
  }
  // 注册信息
  LODOP.SET_LICENSES('深圳市前海泽金互联网金融服务有限公司', '8B7E7CA30068F815196A28FBFA05AA89', '', '')
  return LODOP
}
export default getLodop
