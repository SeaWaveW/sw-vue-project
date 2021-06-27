<template>
<div>
    <label v-for="item in this.menuData" :key="item.id">
        <el-submenu :index="item.id +''" v-if="item.children">
            <template slot="title">
                <i class="el-icon-message"></i>
                <span slot="title">{{item.name}}</span>
            </template>
            <MenuTree :menuData="item.children"></MenuTree>
        </el-submenu>
        <el-menu-item :index="item.id +''" v-else>
            <!-- <i class="el-icon-message"></i> -->
            <span slot="title">{{item.name}}</span>
        </el-menu-item>
    </label>
</div>
</template>

<script>
export default {
    name: "MenuTree",
    props: ['menuData']
}
</script>