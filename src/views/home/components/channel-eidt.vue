<template>
  <div class="channel-eidt">
    <van-cell>
      <div slot="title" class="title">我的频道</div>
      <van-button type="danger" size="small" round plain class="btn" @click="isEidt = !isEidt">{{isEidt? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-gird">
      <van-grid-item
      class="gird-item"
        v-for="(value,index) in mychannels"
        :key="index"
        @click="goChannel(value,index)"
      >
      <van-icon slot="icon" name="clear" v-show="isEidt && !fix.includes(value.id)"></van-icon>
      <span slot="text" class="text" :class="{active:index === active}">{{value.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
     <van-cell>
      <div slot="title" class="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="rec-gird">
      <van-grid-item
       class="gird-item"
       icon="plus"
        v-for="(value,index) in recChannels"
        :key="index"
        :text="value.name"
        @click="add(value)"
      />
    </van-grid>
    <!-- 频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels,addUserChannels,deleteUserChannels } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'

export default {
  name: "ChannelEidt",
  data() {
    return {
        allChannels:[],
        isEidt:false,
        fix:[0]
    };
  },
  methods: {
    // 获取全部频道
   async loadAllChannels() {
       try{
         const {data} = await getAllChannels()
         this.allChannels = data.data.channels
       } catch(err) {
        this.$toast('获取全部频道失败')
       }
    },
    // 添加频道
    async add(value) {
        this.mychannels.push(value)
        // 数据持久化处理
        if(this.user) {
            // 已登录
            try{
              await addUserChannels({
              id:value.id,      // 频道id
              seq:this.mychannels.length  // 频道序号
              })
            }catch(err) {
                this.$toast('添加频道失败')
            }
        } else{
           // 未登录 
           setItem('CHANNELS',this.mychannels)
        }
        
        
    },
    // 切换频道
    goChannel(value,index) {
        if(this.isEidt) {
        //    编辑状态
        if(this.fix.includes(value.id)) {
           return
        }
          if(index <= this.active) {
            this.$emit('udactive',this.active - 1,true)
          }
          // 删除频道
           this.mychannels.splice(index,1)
           this.deleteChannel(value)
        }
        else{
        //  非编辑状态
        this.$emit('udactive',index,false)
        }
    },
    // 删除频道
    async deleteChannel(value) {
      if(this.user) {
        //  登录
        await deleteUserChannels(value.id)
      }else{
        // 未登录
        setItem('CHANNELS',this.mychannels)
      }
    }
  },
  props:{
    mychannels:{
        type:Array,
        required:true
    },
    active:{
        type:Number,
        required:true
    }
  },
  created () {
    this.loadAllChannels()
  },
  computed: {
    ...mapState(['user']),
    recChannels () {
        // 创建一个新数组保存推荐频道，遍历数组去除我的频道（根据id），取反条件把新的下元素追加到新数组
         const channels = []
         this.allChannels.forEach(item => {
            const res = this.mychannels.find(mychannel => {
                return mychannel.id  === item.id
            })
            if(!res) {
              channels.push(item)
            }
         })
         
        return channels
    }
  }
};
</script>

<style lang="less" scoped>
.channel-eidt {
  padding: 85px 2px;
  .title{
    font-size: 32px;
    color: #333;
  }
  .btn{
    width: 104px;
    height: 48px;
  }
  /deep/ .gird-item{
    width: 160px;
    height: 80px;
    .van-grid-item__content,.text{
        font-size: 18px;
        background-color: #f4f5f6;
        color: #222;
        white-space: nowrap;
    }
    .active{
        color: red;
    }
    .van-grid-item__icon-wrapper{
        position: unset;
    }
  }

  /deep/ .rec-gird{
    .gird-item{
        .van-grid-item__content{

            flex-direction: row;
            .van-icon-plus{
                font-size: 18px;
                margin-right: 6px;
            }
            .van-grid-item__text{
                margin-top: 0;
            }
        }
    }
  }

   /deep/ .my-gird{
    .gird-item{
        .van-grid-item__content{
            flex-direction: row;
            .van-icon-clear{
                position: absolute;
                top: -5px;
                right: -5px;
                z-index: 99;
                font-size: 30px;
            }
            .van-grid-item__text{
                margin-top: 0;
            }
        }
    }
  }
}
</style>