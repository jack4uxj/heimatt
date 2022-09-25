// 封装模块



// 获取模块

export const getItem = name => {
    const data = window.localStorage.getItem(name)
    try {
      return JSON.parse(data)
    } catch (err) {
      return data
    }
  }
  

  // 设置模块
  export const setItem = (name, value) => {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)
  }
  

  // 删除模块
  export const removeItem = name => {
    window.localStorage.removeItem(name)
  }