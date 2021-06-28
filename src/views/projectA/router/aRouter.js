const routes = [
    {
      path: '/',
      name: 'layout',
      component: ()=>import('@views/layout/layout.vue'),
      redirect:'/home',
      children:[
        {
          path:'/home',
          name:'home',
          component:() => import('@views/Home.vue')
        },
        {
          path:'/user',
          name:'user',
          component:() => import('@views/user.vue'),
          meta:{
            title:'用户',
            root:'企业用户管理',
            keepAlive:true
          }
        },
        {
          path:'/userItem',
          name:'userItem',
          component:() => import('@views/userItem.vue'),
          meta:{
            parent:'user',
            title:'用户子类'
          }
        },
        {
          path:'/role',
          name:'role',
          component:() => import('@views/role.vue'),
          meta:{
            title:'角色'
          }
        },
        {
          path:'/ent',
          name:'ent',
          component:() => import('@views/ent.vue'),
          meta:{
            title:'企业',
            root:'企业用户管理'
          }
        }
      ]
    },
  ]
  export default routes