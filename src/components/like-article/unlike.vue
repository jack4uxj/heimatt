<template>
  <van-icon :name="value===0?'clear': 'close'" color="#777777" @click="unlike" :loading="loading"/>
</template>

<script>
import {unlikeArticle,cancelUnlikeArticle} from "@/api/article"

export default {
  props:{
    uesrId:{
       type:[Number,Object,String],
       required:true
    },
    value:{
        type:Number,
        required:true
    }
   },
   methods: {
      async unlike() {
        this.loading = true
        try{
            let status = -1
           if(this.value ===0) {
            await cancelUnlikeArticle(this.uesrId)
           }else{
            await unlikeArticle(this.uesrId)
            status = 0
           }
           this.$emit('input',status)
           this.$toast.success(status===0? '操作成功': '取消不喜欢')
        }catch(error) {
            this.$toast.fail('操作失败')
        }
        this.loading = false
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