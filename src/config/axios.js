import axios from 'axios'
import confirm from '@components/confirm'
import { httpMap } from '@utils/httpStateCode.js'
// ----------------------------------------------------  请求配置  ----------------------------------------------------
//基础配置
const service = axios.create({
    timeout:10000,
    dataType:'json'
})
//错误提示
const errorHandling = ( errorResponse ) => {
    let item = {
      title:'',
      message:''
    }
    if(typeof(errorResponse) === 'string'){
        if(errorResponse.includes('timeout')){
          item.title = '请求超时'
          item.message = '请检查网络是否正常连接'
        }else{
          item.title = '请求失败'
          item.message = '请检查网络是否已连接'
        }
    }else{
        item = httpMap( errorResponse.code + '' )
    }
    confirm({
      title:item.title,
      showCancelButton:false,
      type:'error',
      message:item.message
    })
}
//请求拦截
service.interceptors.request.use( config => {
    //logding配置
    // if(config.data && typeof(config.data) === 'object' && config.data.unlock){
    //     ZjLog.unLock()
    // }else{
    //     ZjLog.lock()
    // }

    //上传格式转换
    if(config.isUpload){
        const form = new FormData()
        for(let key in config.data){
            form.append(key,config.data[key])
        }
        config.data = form
    }

    //龙哥的配置
    // if (config.method === 'get') {
    //     config.paramsSerializer = function (params) {
    //         return qs.stringify(params, {arrayFormat: 'comma'})
    //     }
    // }
    return config
}, (error) => {
    //     ZjLog.lock()
    return Promise.reject(error)
})
//响应拦截
service.interceptors.response.use( response => {
    // ZjLog.unLock()
    if (response.status === 200 || response.data.code === '200') { // json
      if (response.headers['content-type'] && response.headers['content-type'].indexOf('application/json') !== -1) {
        //判断
        if (response.data.code === 200 || response.data.code === '200') {
          return Promise.resolve(response.data)
        } else {
          if (response.data.code) {
            //正常报错
            if (response.data.code !== 200 && response.data.code !== '200') {
                errorHandling(response.data.code, response.data)
                return Promise.reject(response.data)
            } else{
                return Promise.resolve(response.data)
            }
          } else {
            //blob转json
            const reader = new FileReader()
            reader.onload = function () {
              let res = JSON.parse(reader.result)
              errorHandling(res.code, res)
            }
            reader.readAsText(response.data)
            return Promise.reject(response.data)
          }
        }
      } else { // other
        if (response.config.responseType === 'arraybuffer') {
          return Promise.resolve(response.data)
        } else if (response.config.responseType === 'blob') {
          return Promise.resolve(response)
        } else {
          return Promise.resolve(response)
        }
      }
    } else {
      return Promise.reject(response.data)
    }
}, error => {
    // ZjLog.unLock()
    if (error.response) {
      errorHandling( error.response )
      return Promise.reject(error)
    } else {
        errorHandling( error.message )
        return Promise.reject(new Error())
    }
})

export const request = service


//---------------------------------------------------- api集中注入  ----------------------------------------------------
const moduleFiles = require.context('../', true, /\/(.*)Api\.js$/)
export const api = moduleFiles.keys().reduce((modules, modulePath) => {
  const key = modulePath.substring(modulePath.lastIndexOf('/') + 1, modulePath.lastIndexOf('Api.'))
  const value = moduleFiles(modulePath).default
  modules[key] = value
  return modules
}, {})

export default {
    api,
    request
}
