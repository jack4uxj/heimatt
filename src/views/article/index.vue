<template>
  <div class="article-container">
    <!-- 导航栏 -->
      <van-nav-bar
        class="page-nav-bar"
        left-arrow
        title="黑马头条"
        @click-left="$router.back()"
      ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loding">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <Follow
            class="follow-btn"
            :uesrId="article.aut_id"
            v-model="article.is_followed"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <CommentList
          :artId="article.art_id"
          @sueecss_loading="total = $event.total_count"
          :list="commentList"
          @relpy="replyClick"
        ></CommentList>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="show = !show"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="total" color="#777" />
          <Collet v-model="article.is_collected" :uesrId="article.art_id" />
          <Like v-model="article.attitude" :uesrId="article.art_id" />
          <UnLike v-model="article.attitude" :uesrId="article.art_id" />
        </div>
        <!-- /底部区域 -->

        <!-- 弹出层 -->
        <van-popup v-model="show" position="bottom">
          <CommentPost
            :target="article.art_id"
            @post="postSuccess"
          ></CommentPost>
        </van-popup>
        <!-- 弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="(errStatus = 404)">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

      <!-- 回复评论弹层 -->
      <!-- 加个v-if使组件每次关闭再打开重新渲染，获取不同数据 -->
        <van-popup v-model="replyshow" position="bottom" style="height:80%">
          <CommentRelpy :comment="currentComment" @close="replyshow = false" v-if="replyshow"></CommentRelpy>
        </van-popup>
        <!-- 回复评论弹层-->

  </div>
</template>


<script>
import { getArticleId } from "@/api/article";
import { ImagePreview } from "vant";
import Follow from "@/components/followe-user";
import Collet from "@/components/collet-article";
import Like from "@/components/like-article";
import UnLike from "@/components/like-article/unlike";
import CommentList from "./components/conmentList.vue";
import CommentPost from "./components/conmentPost.vue";
import CommentRelpy from './components/conmentRelpy.vue'



export default {
  data() {
    return {
      article: {},
      loding: true, //加载状态
      errStatus: 0,
      total: 0, //评论总数
      show: false, //处理弹出层
      commentList: [], //评论列表
      replyshow:false,  //回复评论弹层
      currentComment:{} //当前回复评论的评论项
    };
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      requried: true,
    },
  },
  // 给所有子组件传值
  provide:function () {
       return{
          articleId:this.articleId
       }
  },
  created() {
    this.loadArticle();
  },
  methods: {
    // 获取文章详细信息
    async loadArticle() {
      this.loding = true;
      try {
        const { data } = await getArticleId(this.articleId);
        console.log(data);
        this.article = data.data;
        //  处理图片预览效果
        setTimeout(() => {
          this.picLaoding();
        }, 0);
      } catch (error) {
        // 根据后端反应的状态码显示不同的错误到页面
        if (error.response && error.response.status === 404) {
          this.errStatus = 404;
        }
        console.log(error);
      }
      this.loding = false;
    },

    // 图片处理函数
    picLaoding() {
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");
      const imgssrc = [];
      imgs.forEach((img, index) => {
        imgssrc.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images: imgssrc,
            // 当前图片开始位置等于当前索引
            startPosition: index,
          });
        };
      });
    },

    // 评论发布处理函数
    postSuccess(data) {
      this.show = false;
      this.commentList.unshift(data.new_obj);
    },

    //  回复他人评论
    replyClick(comment) {
      this.replyshow = true
         this.currentComment = comment
    }
  },
  components: {
    Follow,
    Collet,
    Like,
    UnLike,
    CommentList,
    CommentPost,
    CommentRelpy
  },
};
</script>

<style lang="less" scoped>
@import "./github-markdown.css";

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>