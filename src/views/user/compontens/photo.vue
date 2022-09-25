<template>

 <div class="box">
      <img :src="img" class="img" ref="img">
      <div class="tool">
        <span class="cancel" @click="$emit('close')">取消</span>
        <span class="confirm" @click="onConfirm">完成</span>
      </div>
  </div>

  
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import {updateUserPhoto} from '@/api/user'

export default {
  props: {
    img:{
        type:[String,Object],
        required:true
    }
  },
  mounted () {
     const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,  //图片比例1：1
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  },
  methods: {
    // 图片完成裁剪
     onConfirm () {
      // 基于服务端的裁切使用 getData 方法获取裁切参数
      // console.log(this.cropper.getData())

      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateUserPhoto(blob)
      })
    },

    async updateUserPhoto (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        // 错误的用法
        // 如果接口要求 Content-Type 是 application/json
        // 则传递普通 JavaScript 对象
        // updateUserPhoto({
        //   photo: blob
        // })

        // 如果接口要求 Content-Type 是 multipart/form-data
        // 则你必须传递 FormData 对象
        const formData = new FormData()
        formData.append('photo', blob)

        const { data } = await updateUserPhoto(formData)

        // 关闭弹出层
        this.$emit('close')

        // 更新视图
        this.$emit('update-photo', data.data.photo)

        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box{
    background-color: black;
    height: 100%;
    position: relative;
    .img{
        display: block;
    max-width: 100%;
    position: absolute;
    top: 30%;
}
.tool{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 80px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .cancel,.confirm{
    font-size: 30px;
    color: white;
}
}
}

</style>