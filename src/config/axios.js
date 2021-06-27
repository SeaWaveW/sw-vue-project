import axios from 'axios'

// 请求配置
const service = axios.create({
    timeout:10000,
})
//请求拦截
service.interceptors.request.use( config => {
    return config
})
//响应拦截
service.interceptors.response.use( response => {
    return response.data
})
export const request = service

// api集中注入
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
