<template>
<div class="sw-tab">
    <!-- 面包屑 -->
    <sw-breadcrumb separator-class="sw-icon-arrow-right">
        <sw-breadcrumb-item v-for="(item,index) in tabBreadList" :key="index" :to="{ name:item.name }" :disabled="index===0">
            {{item.meta.title}}
        </sw-breadcrumb-item>
    </sw-breadcrumb>
    <!-- 缓存页签 -->
    <sw-tag v-for="(item,index) in tabTagList" :key="index" 
        @click="routerCut(item)"
        closable @close="deleteClick(item)"
    >
        <i class="aliveI"  :class=" item.name === tabActive ? 'success' : '' ">●</i>
        {{item.meta.title}}
    </sw-tag>



    <sw-button @click="drawer = true" type="primary" style="margin-right: 16px;float:right;">打开个人中心</sw-button>
    <sw-drawer
        class="sw-userInfo"
        :visible.sync="drawer"
        :direction="'rtl'"
        size="30%"    
    >
        <!-- 标题区 -->
        <div class="title" slot="title">
            SSML个人中心
        </div>
        <!-- 内容区 -->
        <div class="body">
            <sw-row class="icon">
                <sw-col :span="7">
                    <img src="#"/>
                </sw-col>
                <sw-col :span="17" class="userName">
                    用户名称
                </sw-col>
            </sw-row>
        </div>
    </sw-drawer>

</div>
</template>
    
<script>
import {mapState} from 'vuex'

import {
    Breadcrumb,BreadcrumbItem,Tag,Button,Drawer,Row,Col
} from 'seawave-ui'

export default {
    name:"",
    components:{
        SwBreadcrumb:Breadcrumb,
        SwBreadcrumbItem:BreadcrumbItem,
        SwTag:Tag,
        SwButton:Button,
        SwDrawer:Drawer,
        SwRow:Row,
        SwCol:Col
    },
    data(){
        return{
            drawer:false
        }
    },
    computed:{
        ...mapState(['tabTagList','tabActive','tabBreadList'])
    },
    methods:{
        //切换
        routerCut(item){
            this.$router.push({name:item.name})
        },
        //删除
        deleteClick(item){
            this.$store.commit('tabDel',item)
        }
    }
}
    
</script>
<style scoped lang="scss">
.sw-tab{
    .sw-tag{
        background-color: white;
        color: #999999;
        margin-left: 5px;
        cursor: pointer;
        .aliveI{
            font-size: 16px;
            font-style: normal;
            &.success{
                color:#67C23A;
            }
        }
    }
    .sw-tag__close{
        color: #999999;
        &:hover{
            background-color: #F56C6C;
        }
    }
}  

.sw-userInfo{
    .sw-drawer{
    }
    .sw-drawer__header{
        padding: 0 30px;
        margin: 0 0 10px 0;
    }
    .sw-drawer__body{
        .body{
            width: 70%;
            margin: auto;
            .icon{
                height: 70px;
                img{
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    border:1px solid black;
                }
                .userName{
                    text-align: left;
                }
            }
        }
    }
}

</style>