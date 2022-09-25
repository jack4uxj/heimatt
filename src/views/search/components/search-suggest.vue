<template>
  <div>
     <van-cell icon="search" v-for="(text,index) in suggestions" :key="index" @click="$emit('search',text)">
        <div slot="title" v-html="heHiglt(text)"></div>
     </van-cell>
  </div>
</template>

<script>
import { getAllSuggeasts } from '@/api/search.js'
// 加载第三包处理节流函数
import { debounce } from 'lodash'
 
export default {
    data () {
        return {
            suggestions:[]
        }
    },
    props:{
        searchText:{
            type:String,
            required:true
        }
    },
    watch: {
        searchText:{
            // debounce函数，第一个参数是函数体，第二个是毫秒数
            handler:debounce(function(value) {
                 this.getSuggest(value)
            },500),
            
            immediate:true  //立即监听数据变化
        }
    },
    methods: {
        // 获取推荐列表
        async getSuggest(q) {
            try{
              const {data} = await getAllSuggeasts(q)
              this.suggestions = data.data.options
            }catch(err) {
                console.log(err)
                this.$toast('获取数据失败')
            }
        },
        // 文字高亮
        heHiglt(text) {
            const str = `<span style="color:#3296fa;">${this.searchText}</span>`
            // 独立构造正则函数，第一个条件，第二个全局使用
             const reg = new RegExp(this.searchText, 'gi')
            return text.replace(reg, str)
        }
    }
}
</script>

<style>

</style>