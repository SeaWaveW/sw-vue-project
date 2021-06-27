import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'

Vue.use(Vuex)

// store集中注入
const moduleFiles = require.context('../', true, /\/(.*)Store\.js$/)
const modules = moduleFiles.keys().reduce((modules, modulePath) => {
    const key = modulePath.substring(modulePath.lastIndexOf('/') + 1, modulePath.lastIndexOf('Store.'))
    const value = moduleFiles(modulePath).default
    modules[key] = value
    return modules
}, {})
// 获取初始数据（用于重置state）
const initStoreStateList = Object.keys(modules).map((item) => {
    return {
        key: item,
        value: JSON.parse(JSON.stringify(modules[item].state || {}))
    }
})
const mutations = {
    // 重置state
    resetState (state) {
        initStoreStateList.forEach((item) => {
            state[item.key] = JSON.parse(JSON.stringify(item.value || {}))
        })
    }
}

const projectName = window.location.host + '-';
const store = new Vuex.Store({
    modules,
    mutations,
    plugins: [
        createVuexAlong({
            name: projectName + 'vuexAlong',
            local: {
                // list: ['tab'],
                isFilter: true
            }
        })
    ]
})
export default store