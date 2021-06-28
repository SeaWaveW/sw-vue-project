<template>
<div class="">
    
    这是用户页{{msg}}
    <button @click="$router.push({name:'userItem'})">前往用户子类</button>
    <button @click="msg++">+++++</button>

</div>
</template>
    
<script>
    
export default {
    name:"",
    components:{
        
    },
    data(){return{
        msg:0
    }},
    methods:{
        
    },
}
    
</script>
<style scoped lang="scss">
    
</style>