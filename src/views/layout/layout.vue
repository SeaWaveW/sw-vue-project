<template>
<sw-container class="sw-layout-container">
  <sw-aside class="sw-layout-aside">
      <layout-sidebar/>
  </sw-aside>
  <sw-container>
    <sw-header>
        <layout-tab/>
    </sw-header>
    <sw-main>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
    </sw-main>
  </sw-container>
</sw-container>
</template>

<script>
import layoutTab from './components/tab.vue'
import layoutSidebar from './components/sidebar/sidebar.vue'
import {mapState} from 'vuex'

import {
    Container,Aside,Header,Main
} from 'seawave-ui'

export default {
    components:{
        layoutTab,layoutSidebar,
        SwContainer:Container,
        SwAside:Aside,
        SwHeader:Header,
        SwMain:Main
    },
    computed:{
        ...mapState(['tabList'])
    },
    watch:{
        '$route'(newRoute){
            if(!newRoute.isDel){
                
            }
        }
    }
}
</script>

<style scoped lang="scss">
*{
    margin: 0;
    padding: 0;
}
html,body{
    width: 100%;
    height: 100%;
}
.sw-layout-container{
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}
::v-deep .sw-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    width: 200px;
    height: 100%;
}
::v-deep .sw-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 60px;
    line-height: 60px;
}
::v-deep .sw-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: calc(100% - 60px);
}
</style>