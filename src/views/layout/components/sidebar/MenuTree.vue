<template>
<div>
    <label v-for="item in this.menuData" :key="item.id">
        <sw-submenu :index="item.id +''" v-if="item.children">
            <template slot="title">
                <i class="sw-icon-message"></i>
                <span slot="title">{{item.name}}</span>
            </template>
            <MenuTree :menuData="item.children"></MenuTree>
        </sw-submenu>
        <sw-menu-item :index="item.id +''" v-else>
            <!-- <i class="sw-icon-message"></i> -->
            <span slot="title">{{item.name}}</span>
        </sw-menu-item>
    </label>
</div>
</template>

<script>
import {
    Submenu,MenuItem
} from 'seawave-ui'

export default {
    name: "MenuTree",
    props: ['menuData'],
    components:{
        SwSubmenu:Submenu,
        SwMenuItem:MenuItem
    }
}
</script>