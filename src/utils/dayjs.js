import Vue from 'vue'
import dayjs from 'dayjs'

//将语言改成中文
import 'dayjs/locale/zh-cn'
// 配置使用插件处理时间
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用

Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
  })