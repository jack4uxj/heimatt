<template>
   <van-icon color="#777" :name="value? 'star': 'star-o'" @click="collet" :loading="loading" />
</template>

<script>
import { addCollet,canceladdCollet } from '@/api/article'

export default {
   props: {
    value:{
        type:Boolean,
        required:true
    },
    uesrId:{
        type:[Number,Object,String],
        required:true
    }
   },
   methods:{
        async collet() {
            this.loading = true
            try{
                if(this.value) {
                  await canceladdCollet(this.uesrId)
                }else{
                    await addCollet(this.uesrId)
                }
                this.$emit('input',!this.value)
                this.$toast.success(!this.value?'已收藏':'取消收藏')
            }catch(error) {
                this.$toast.fail('操作失败')
            }
            this.loading= false
        }
   },
   data () {
    return {
        loading:false
    }
   }
}
</script>

<style>

</style>