<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { emitUserInfo } from "@/api/user";
import dayjs from 'dayjs'

export default {
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "更新中",
        forbidClick: true,
        duration: 0,
      });
      try {
        const day  = dayjs(this.currentDate).format('YYYY-MM-DD')
        await emitUserInfo({
          birthday:day,
        });
        this.$emit("input", day);
        this.$emit("close");
        this.$toast.success("更新成功");
      } catch (err) {
        this.$toast.fail("更新失败");
      }
    },
  },
};
</script>

<style>
</style>