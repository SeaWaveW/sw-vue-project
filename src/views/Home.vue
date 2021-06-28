<template>
<div class="" style="z-index:800">
    
    这是首页0

</div>
</template>
    
<script>
import { httpMap } from '@utils/httpStateCode.js'
import confirm from '@components/confirm'
export default {
    name:"",
    components:{
        
    },
    data(){return{
        
    }},
    methods:{
        
    },
    mounted(){
        let code = 307
        let message = httpMap( code + '' )
        confirm({title:'请求错误',showCancelButton:false,type:'error',message})
    }
}
    
</script>
<style lang="less">
    
</style>