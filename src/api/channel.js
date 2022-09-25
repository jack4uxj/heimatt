import request from '@/utils/request.js'

// 获取所有频道列表
export const getAllChannels = () => {
    return request({
      method: 'GET',
      url: `/v1_0/channels`
    })
  }


  //用户添加频道
  export const addUserChannels = channel => {
    return request({
      method: 'PATCH',
      url: `/v1_0/user/channels`,
      data:{
        channels:[channel]
      }
    })
  }

   //用户添加频道
   export const deleteUserChannels = id => {
    return request({
      method: 'DELETE',
      url: `/v1_0/user/channels/${id}`
    })
  }