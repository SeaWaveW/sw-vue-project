// api集中注入
// const moduleFiles = require.context('../', true, /\/api\/(.*)Api\.js$/)
const moduleFiles = require.context('../', true, /\/(.*)Api\.js$/)
const modules = moduleFiles.keys().reduce((modules, modulePath) => {
  const key = modulePath.substring(modulePath.lastIndexOf('/') + 1, modulePath.lastIndexOf('Api.'))
  const value = moduleFiles(modulePath).default
  modules[key] = value
  return modules
}, {})

export default modules
