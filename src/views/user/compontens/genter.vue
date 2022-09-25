<template>
  <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    :default-index="value"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
  />
</template>

<script>
import  { emitUserInfo } from "@/api/user"

export default {
  data() {
    return {
      columns: ["男", "女"],
      gender:this.value
    };
  },
  methods: {
    onChange(picker, value, index) {
      this.gender = index
    },
    async onConfirm() {
      this.$toast.loading({
        message: "更新中",
        forbidClick: true,
        duration: 0,
      });
      try {
        await emitUserInfo({
          gender: this.gender,
        });
        this.$emit("input", this.gender);
        this.$emit("close");
        this.$toast.success("更新成功");
      } catch (err) {
        this.$toast.fail("更新失败");
      }
    },
    onCancel() {
      this.$emit("close");
    },
  },
  props: {
    value: {
      type:Number,
      required: true,
    },
  },
};
</script>

<style>
</style>