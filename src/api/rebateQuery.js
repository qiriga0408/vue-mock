import request from '@/utils/request'
//用户资产查询接口
export function rebateList(query) {
    return request({
      url: '/vue-element-admin/rebateQuery/rebateList',
      method: 'get',
      params: query,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }