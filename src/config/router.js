import Vue from 'vue'
import VueRouter from 'vue-router'
import { session } from '@utils/stroage' 

Vue.use(VueRouter)

// router集中注入
const routerFiles = require.context('../', true, /\/(.*)Router\.js$/)
const routes = routerFiles.keys().reduce((routes, routerPath) => {
  const value = routerFiles(routerPath).default
  return routes.concat(value)
}, [])

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push( location , iteration = false) {
  if( typeof(iteration) === 'boolean' && iteration){
    typeof( location ) === 'string' 
      ? session.set('iteration',location)
      : session.set('iteration',location.name)
  }
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( (to,from,next) => {
  //不太理想，会直接重置页面状态（类似第一次进入该页面）：应该配合 Activated 函数使用最佳
  if(typeof(to.meta.keepAlive) === 'boolean'){
    to.meta.keepAlive = !( to.meta.keepAlive && (session.get('iteration') === to.name) )
    session.remove('iteration')
  }
  next()
  
})

export default router
