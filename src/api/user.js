/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

// 提交登录信息
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 获取验证码
export const sendSmc = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`,
  })
}


// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: `/v1_0/user/profile`
  })
}


// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: `/v1_0/user/channels`
  })
}

// 关注用户
export const addFollowed = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data:{
      target
    }
  })
}

// 取消用户
export const cancelFollowed = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}


// 修改用户资料
export const emitUserInfo = data => {
  return request({
    method: 'PATCH',
    url: `/v1_0/user/profile`,
    data
  })
}

/**
 * 更新用户头像
 */
 export function updateUserPhoto (data) {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
