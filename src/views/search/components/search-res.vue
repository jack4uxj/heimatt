<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，点击重试"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>

import { getAllRes } from '@/api/search.js'

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      error:false,
    };
  },
  methods: {
    async onLoad() {
      try{
        const {data} = await getAllRes({
           page:this.page,
           per_page:20,
           q:this.searchText
        })
        // 2. 将数据添加到数组列表中
        const { results } = data.data
        this.list.push(...results)

        // 3. 将本次加载中的 loading 关闭
        this.loading = false

        // 4. 判断是否还有数据
        if (results.length) {
          // 如果有，则更新获取下一个数据的页码
          this.page++
        } else {
          // 如果没有，则将加载状态 finished 设置为结束
          this.finished = true
        }
      }catch(err) {
        this.error = true
        this.loading = false
      }
    },
  },
   props:{
        searchText:{
            type:String,
            required:true
        }
    },
};
</script>

<style>
</style>