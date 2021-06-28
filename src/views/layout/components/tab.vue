<template>
<div class="sw-tab">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in tabBreadList" :key="index" :to="{ name:item.name }" :disabled="index===0">
            {{item.meta.title}}
        </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 缓存页签 -->
    <el-tag v-for="(item,index) in tabTagList" :key="index" 
        @click="routerCut(item)"
        closable @close="deleteClick(item)"
    >
        <i class="aliveI"  :class=" item.name === tabActive ? 'success' : '' ">●</i>
        {{item.meta.title}}
    </el-tag>



    <el-button @click="drawer = true" type="primary" style="margin-right: 16px;float:right;">打开个人中心</el-button>
    <el-drawer
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
            <el-row class="icon">
                <el-col :span="7">
                    <img src="#"/>
                </el-col>
                <el-col :span="17" class="userName">
                    用户名称
                </el-col>
            </el-row>
        </div>
    </el-drawer>

</div>
</template>
    
<script>
import {mapState} from 'vuex'
export default {
    name:"",
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
    .el-tag{
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
    .el-tag__close{
        color: #999999;
        &:hover{
            background-color: #F56C6C;
        }
    }
}  

.sw-userInfo{
    .el-drawer{
    }
    .el-drawer__header{
        padding: 0 30px;
        margin: 0 0 10px 0;
    }
    .el-drawer__body{
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