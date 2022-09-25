<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="200"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment} from "@/api/comment";


export default {
  name: 'CommentPost',
  components: {},
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost() {
        try{
          const {data} = await addComment({
            target:this.target.toString(),
            content:this.message,
            art_id:this.articleId? this.articleId.toString(): null
          })
          this.message = ''
          this.$emit('post',data.data)
          this.$toast('发布成功')
        }catch (err) {
            this.$toast('发布失败')
        }
    }
  },
  props:{
    target:{
        type:[Number,Object,String],
        required:true
    }
  },
  // 接受父组件数据
  inject:{
    articleId:{
      type: [Number, String, Object],
      default:null
    }
  },
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
