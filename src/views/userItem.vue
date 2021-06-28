<template>
<div class="">
    
    这是用户子类页
    <button @click="back">返回不刷新</button>
    <button @click="backO">返回刷新</button>
    
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
            this.$router.push('user')
        },
        backO(){
            this.$router.push('user',true)
        }
    },
}
    
</script>
<style scoped lang="scss">
    
</style>