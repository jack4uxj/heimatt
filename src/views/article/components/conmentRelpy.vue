<template>
  <div class="reply">
     <van-nav-bar :title="comment.reply_count > 0? `${comment.reply_count}条回复`: '暂无回复'">
        <van-icon slot="left" name="cross" @click="$emit('close')" />
     </van-nav-bar>

     <div class="content">
      <CommentItem :comment="comment"></CommentItem>
     
    <!-- 回复评论 -->
    <van-cell title="全部评论"/>
     <CommentList :artId="comment.com_id" type="c" :list="list"></CommentList>
     <!-- 回复评论 -->
     </div>
     

     <!-- 评论按钮 -->
     <div class="post">
        <van-button class="post-btn" @click="replyshow = !replyshow">写评论</van-button>
     </div>
         <van-popup v-model="replyshow" position="bottom">
            <comment-post :target="comment.com_id" @post="onPost" />
        </van-popup>
     <!-- 评论按钮 -->
  </div>
</template>

<script>
import CommentItem from "./conmentItem.vue"
import CommentList from './conmentList.vue'
import CommentPost from './conmentPost.vue'

export default {
  data () {
    return {
         replyshow:false,
         list:[]
    }
  },
  created () {
    
  },
  methods: {
      onPost(data) {
        this.comment.reply_count++
        this.replyshow = false
        this.list.unshift(data.new_obj)
      }
  },
  // 接受父组件数据
  inject:{
    articleId:{
      type: [Number, String, Object],
      default:null
    }
  },
  props:{
    comment:{
        type:Object,
        required:true
    }
  },
  components: {
    CommentItem,
     CommentList,
     CommentPost
  }
}
</script>

<style lang="less" scoped>
.content{
  padding: 80px 0;
  overflow-y: scroll;
}
  .post{
     height: 80px;
     width: 100%;
     justify-content: center;
     display: flex;
     align-items: center;
     background-color: white;
      position: fixed;
      bottom: 0;
     left: 0;
     .van-button{
       width: 60%;
     }
  }
</style>