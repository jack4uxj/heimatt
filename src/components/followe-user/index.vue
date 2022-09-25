<template>
    <van-button
      v-if="value"
      class="follow-btn"
      round
      size="small"
      :loading="loading"
      @click="onFollwed"
      >已关注</van-button
    >
    <van-button
      v-else
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      @click="onFollwed"
      :loading="loading"
      >关注</van-button
    >
</template>

<script>
import { addFollowed,cancelFollowed } from "@/api/user";
export default {
  props: {
    value: {
      type: Boolean,
      required:true
    },
    uesrId:{
      type:[Number,String,Object],
      required:true
    }
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    // 用户关注
    async onFollwed() {
      this.loading = true;
      try {
        if (this.value) {
          await cancelFollowed(this.uesrId);
        } else {
          await addFollowed(this.uesrId);
        }
        //  更新关注按钮状态
        this.$emit('input',!this.value)
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast("用户不能关注自己");
        }
        this.$toast("操作失败，请重试");
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>