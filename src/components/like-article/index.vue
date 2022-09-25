<template>
  <van-icon color="#777" :name="value===1?'good-job':'good-job-o'" :loading="loading" @click="like"/>
</template>

<script>
import {likeArticle,cancelLikeArticle} from '@/api/article'

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
      async like() {
        this.loading = true
        try{
            let status = -1
           if(this.value ===1) {
            await cancelLikeArticle(this.uesrId)
           }else{
            await likeArticle(this.uesrId)
            status = 1
           }
           this.$emit('input',status)
           this.$toast.success(status===1? '已点赞': '取消点赞')
        }catch(error) {
            this.$toast.fail('点赞失败')
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