import confirm from './confirm.vue'
import Vue from 'vue';
const ConfirmConstructor = Vue.extend(confirm);
let Confirm = (options) => {
    return new Promise( (res,rej) => {
        //默认配置
        let defaultOptions = {
            zIndex:+window.getComputedStyle(document.body).zIndex || 1,
            show:true,
            shade:true,
            shadeBg: 'rgba(0,0,0,0.25)',
            type:'info',
            title:'标题',
            showClose:true,
            dangerouslyUseHTMLString:false,
            message:'内容', 
            showCancelButton:true,
            cancelButtonClass:'',
            cancelButtonText:'取消',
            showConfirmButton:true,
            confirmButtonClass:'',
            confirmButtonText:'确定',
            closeOnClickModal:false, 
            closeOnPressEscape:true,
        }
        //创建构造
        let mbEl = new ConfirmConstructor({
            el:document.createElement('div')
        })
        //往body添加
        document.body.appendChild(mbEl.$el)
        //配置更新
        let newOptions = Object.assign(defaultOptions,options)
        for(let key in newOptions){
            mbEl[key] = newOptions[key]
        }
        //返回promise
        mbEl.confirm = () => {
            res(true)
            mbEl.show = false
        }
        mbEl.close = () => {
            rej(false)
            mbEl.show = false
        }

    } )
}

export default Confirm