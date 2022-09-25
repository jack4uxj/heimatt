<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <input type="file" ref="file" hidden @change="onfile">
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image width="30" height="30" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="show = true" />
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link @click="gentershow = true" />
    <van-cell title="生日" :value="user.birthday" is-link  @click="dayshow = true" />
    <!-- name -->
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <Name v-if="show" @close="show = false" v-model="user.name"></Name>
    </van-popup>
    <!-- name -->

    <!-- genter -->
    <van-popup
      v-model="gentershow"
      position="bottom"
      :style="{ height: '50%' }"
    >
       <Genter  v-if="gentershow" v-model="user.gender" @close="gentershow = false"></Genter>
    </van-popup>
    <!-- genter -->
     <!-- day -->
    <van-popup
      v-model="dayshow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <Day v-if="dayshow" v-model="user.birthday" @close="dayshow = false"></Day>
    </van-popup>
    <!-- day -->
    <!-- 头像 -->
    <van-popup
      v-model="phototshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <Photo v-if="phototshow" :img="img" @close="phototshow = false" @update-photo="user.photo = $event"></Photo>
    </van-popup>
    <!-- 头像-->

  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
import Name from "./compontens/name.vue";
import Genter from './compontens/genter.vue';
import Day from './compontens/day.vue';
import Photo from './compontens/photo.vue'

export default {
  data() {
    return {
      user: {},
      show: false,
      gentershow:false,
      dayshow:false,
      phototshow:false,
      img:null
    };
  },
  methods: {
    async loadUser() {
      try {
        const { data } = await getUserInfo();
        this.user = data.data;
        console.log(data);
      } catch (err) {
        this.$toast("获取失败");
      }
    },

  //  图片上传
  onfile() {
     const fileObj = this.$refs.file.files[0]
     this.img = window.URL.createObjectURL(fileObj)
     this.phototshow = true
     this.$refs.file.value = ''
  }


  },
  created() {
    this.loadUser();
  },
  components: {
    Name,
    Genter,
     Day,
     Photo
  },
};
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
</style>