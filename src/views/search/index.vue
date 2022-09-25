<template>
  <div class="search-content">
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/" class="fix">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isRshow = false"
      >
      
      </van-search>
    </form>

   
      <!-- 搜索结果 -->
    <SearchRes v-if="isRshow" :searchText="searchText"></SearchRes>

    <!-- 联想建议 -->
    <SearchSuggest v-else-if="searchText" :searchText="searchText" @search="onSearch"></SearchSuggest>

     <!-- 搜索记录 -->
    <SearchHistory v-else :history="searchHistory" @clearItem="searchHistory = []" @searchItem="onSearch"></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggest from './components/search-suggest.vue'
import SearchRes from './components/search-res.vue'
import { getItem,setItem } from '@/utils/storage'

export default {
  name: 'Search',
   data() {
    return {
      searchText: '',
      isRshow:false,
      searchHistory:getItem('history') || []
    };
  },
  methods: {
    // 点击建议进入页面事件
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val

    //  历史记录
    const index = this.searchHistory.indexOf(val)
    if(index !== -1) {
         this.searchHistory.splice(index,1)
    }
   this.searchHistory.unshift(val)


    // 搜索结果
      this.isRshow = true
    },
    onCancel() {
    this.$router.back()
    },
    
  },
  components: {
    SearchHistory,
    SearchSuggest,
    SearchRes
  },
  watch: {
    searchHistory(val) {
         setItem('history',val)
    }
  }
};
</script>

<style lang="less" scoped>
.search-content{
  padding-top: 108px;
}
.van-search__action{
    color: white;
}
.fix{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
</style>