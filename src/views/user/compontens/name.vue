<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="完成"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
   <div class="text">
     <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入昵称"
      show-word-limit
    />
   </div>
   
  </div>
</template>

<script>
import  { emitUserInfo } from "@/api/user"

export default {
  methods: {
    onClickLeft() {
      this.$emit("close");
    },
    async onClickRight() {
        this.$toast.loading({
            message:'更新中',
            forbidClick:true,
            duration:0
        })
        try{
           if(!this.message.length) {
            this.$toast('昵称不能为空')
            return 
          }
          await emitUserInfo({
            name:this.message
          }) 
          this.$emit('input',this.message)
          this.$emit('close')
          this.$toast.success('更新成功')
        }catch(err) {
          this.$toast.fail('更新失败')
        }
    },
  },
  data () {
    return {
        message:this.value
    }
  },
  props: {
    value:{
        type:String,
        required:true
    }
  }
};
</script>

<style>
.text{
    padding: 10px;
}
</style>