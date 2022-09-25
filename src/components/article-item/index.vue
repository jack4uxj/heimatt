<template>
  <van-cell class="article-item" :to="'/article/'+ article.art_id">
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <!-- 自定义下边内容slot="label" -->
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
            width="100"
            height="100"
            :src="img"
          />
        </div>
      </div>
      <div class="text">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 自定义右侧内容slot="default" -->
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
       class="img" 
       fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.title{
  font-size: 32px;
  color: #a3a3a3;
}
.cover-wrap{
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 15px 0;
}
.cover-item{
  flex: 1;
}
.text span{
  margin-right: 10px;
  font-size: 10px;
}
.van-cell__value{
  flex: unset;
  width: 232px;
  height: 146px;
}
.img{
  width: 232px;
  height: 146px;
}
</style>