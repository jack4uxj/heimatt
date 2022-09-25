/**
 * 文章评论
 */
 import request from '@/utils/request'

 // 获取评论信息
 export const getComment = params => {
   return request({
     method: 'GET',
     url: '/v1_0/comments',
     params
   })
 }


//  对评论点赞
 export const addLike = targetIg => {
    return request({
      method: 'POST',
      url: '/v1_0/comment/likings',
      data:{
        targetIg
      }
    })
  }


//   取消对文章点赞
  export const cancelAddLike = targetIg => {
    return request({
      method: 'DELETE',
      url: `/v1_0/comment/likings/${targetIg}`
    })
  }

// 发布评论
export const addComment = data => {
    return request({
      method: 'POST',
      url: '/v1_0/comments',
      data
    })
  }