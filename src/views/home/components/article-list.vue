<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="text" :success-duration="1000">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <ArticleItem 
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article.js";
import ArticleItem from '@/components/article-item'

export default {
  name: "ArticleList",
  props: {
    channel: {
      type: Object,
      requried: true,
    },
  },
  data() {
    return {
      list: [], //存储列表数据
      loading: false, //控制加载中的状态
      finished: false, //控制数据加载结束状态
      timestamp: null,
      error: false,
      isLoading: false,
      text:''
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      //  调用函数并传入必要的文章数据（id，time）
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, //频道id
          timestamp: this.timestamp || Date.now(), // 请求数据的页码
        });
        const { results } = data.data;
        this.list.push(...results);
        // 继续加载数据
        this.loading = false;
        // 判断数据是否加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 加载完成
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, //频道id
          timestamp:Date.now(), // 请求数据的时间，下拉刷新最新时间
        });
        const { results } = data.data;
        this.list.unshift(...results)
        this.isLoading = false;
        this.text = `刷新成功，更新了${results.length}数据`
      } catch (err) {
        this.isLoading = false;
        this.text = `刷新失败，重新再试`
      }
    },
  },
  components:{
    ArticleItem
  }
};
</script>

<style lang="less" scoped>
.article-list{
    height: 79vh;
    overflow-y: auto;
}
</style>