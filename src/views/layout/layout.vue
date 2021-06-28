<template>
<el-container class="sw-layout">
  <el-aside class="sw-aside">
      <sw-sidebar/>
  </el-aside>
  <el-container>
    <el-header>
        <sw-tab/>
    </el-header>
    <el-main>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import swTab from './components/tab.vue'
import swSidebar from './components/sidebar/sidebar.vue'
import {mapState} from 'vuex'
export default {
    components:{
        swTab,swSidebar
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
.sw-layout{
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    width: 200px;
    height: 100%;
}
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 60px;
    line-height: 60px;
}
.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: calc(100% - 60px);
}
</style>