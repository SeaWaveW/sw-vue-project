<template>
<div>
    <sw-menu background-color="#304156" text-color="#fff" :router="true"
        :default-openeds="openList"
        @close="handleClose" ref="menus"
    >
        <menu-tree :menuData="menuList"></menu-tree>
    </sw-menu>

</div>
</template>

<script>
import MenuTree from './MenuTree'
import {
    Menu
} from 'seawave-ui'
export default {
    components: {
        MenuTree,
        SwMenu:Menu
    },
    data() {
        return {
            menuList: [{
                id: 1,
                name: '设置',
                children: [{
                    id: 11,
                    name: '管理',
                    children: [
                        {
                            id: 'user', //路由
                            name: '用户管理',
                        },
                        {
                            id: 'ent', //路由
                            name: '企业管理',
                        }
                    ]
                }]
            }, {
                id: 2,
                name: '分配',
                children: [{
                    id: 'role',
                    name: '角色',
                }]
            }],
            openList: [],
        }
    },
    created(){
        this.openList = this.saveRoutePath(this.menuList, 'id')
    },
    methods: {
        //1.提取所有路由
        saveRoutePath(arr, condition) {
            let newArr = []
            arr.forEach(item => {
                newArr.push(item[condition]+'')
                if (item.children && item.children.length > 0) {
                    newArr = [...newArr, ...this.saveRoutePath(item.children, condition)]
                }
            })
            return newArr
        },
        //2.设置点击关闭时，重新打开---阻止收缩
        handleClose(key, keyPath) {
            //前置条件，因为open方法只能打开数组，并且数组中只能有一项
            let openKey = keyPath.length > 1 ? [ keyPath[1] ] : [ keyPath[0] ]
            //打开
            this.$refs.menus.open(openKey);
        },
    },
}
</script>
<style scoped lang="scss">
 .sw-menu .sw-submenu .sw-submenu__title .sw-submenu__icon-arrow {
        visibility: hidden
    }
</style>