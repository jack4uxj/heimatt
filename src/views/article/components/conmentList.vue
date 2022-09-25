<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad"
  >
    <CommentItem v-for="(item,index) in list" :key="index" :comment="item" @relpy="$emit('relpy',$event)"/>
  </van-list>
</template>

<script>
import { getComment } from "@/api/comment";
import CommentItem from './conmentItem.vue';

export default {
  name: "CommentList",
  data() {
    return {
      loading: false,
      finished: false,
      offset:null  //获取下一页数据
    };
  },
  props: {
    artId:{
      type:[Number,Object,String],
      requried:true
    },
    list:{
      type:Array,
      default: () => []
    },
    type:{
      type:String,
      // 自定义数据校验
       validator(val) {
          return ['a','c'].includes(val)
      },
      default:"a"
    }
  },
  methods: {
    // 获取评论数据
    async onLoad () {
       try{
          const {data} = await getComment({
            type:this.type,   // a代表文章评论，c代表对评论的回复
            source:this.artId.toString(),
            offset:this.offset,
            limit:10  //每页数据条数
          })
          const { results } = data.data
        //  将评论总数传回父组件
        this.$emit('sueecss_loading',data.data)

          this.list.push(...results)
          this.loading = false

        //  判断是否还有数据
        if (results.length) {
          // 有就更新获取下一页的数据页码
          this.offset = data.data.last_id
        } else {
          // 没有就将 finished 设置结束
          this.finished = true
        }
       }catch(err) {
         this.$toast('获取失败')
         this.loading = false
         console.log(err)
       }
    },
  },
  created() {
    this.loading = true
    this.onLoad()
  },
  components: {
    CommentItem
  }
};
</script>

<style>
</style>