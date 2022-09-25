import request from '@/utils/request.js'

// 获取联想建议
export const getAllSuggeasts = q => {
    return request({
      method: 'GET',
      url: `/v1_0/suggestion`,
      params:{
        q
       }
    })
  }


  // 获取搜索结果
export const getAllRes = params => {
    return request({
      method: 'GET',
      url: `/v1_0/search`,
      params
    })
  }

 