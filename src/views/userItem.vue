<template>
<div class="">
    
    这是用户子类页
    <button @click="back">返回</button>
    
</div>
</template>
    
<script>
    
export default {
    name:"",
    components:{
        
    },
    data(){return{
        
    }},
    methods:{
        back(){
            this.$router.push('user',1)
        }
    },
}
    
</script>
<style lang="less">
    
</style>