<template>
  <keep-alive :include="keepString">
      <router-view />
  </keep-alive>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {
      keepString:''
    }
  },
  computed:{
      ...mapState(['tabList'])
  },
  watch:{
    tabList(newArr){
      this.keepString = newArr.join(',')
    }
  }
}
</script>