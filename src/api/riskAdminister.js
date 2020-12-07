import request from '@/utils/request'

//用户资产查询接口
export function lebelList(query) {
    return request({
      url: '/vue-element-admin/riskAdminister/lebelList',
      method: 'get',
      params: query,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }

//添加标签接口
  export function lebelCreate(data) {
    return request({
      url: '/vue-element-admin/riskAdminister/lebelCreate',
      method: 'post',
      data,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }