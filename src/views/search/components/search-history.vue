<template>
  <div>
    <van-cell title="搜索历史">
      <div v-if="isShow">
        <span @click="$emit('clearItem')">全部删除</span>&nbsp;&nbsp;
        <span  @click="isShow = false">完成</span>
      </div>
        <van-icon name="delete" v-else @click="isShow = true"></van-icon>
    </van-cell>
     <van-cell v-for="(item,index) in history" :key="index" :title="item" @click="onSearch(item,index)">
        <van-icon name="close" v-show="isShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
         isShow:false  
    }
  },
    props: {
      history:{
        type:Array,
        required:true
      }
    },
    methods: {
      onSearch(item,index) {
           if(this.isShow){
               this.history.splice(index,1)
           }else{
               this.$emit('searchItem',item)
           }
      }

    }
}
</script>

<style>

</style>