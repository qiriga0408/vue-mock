import request from '@/utils/request'

//持仓查询接口
export function holdList(query) {
    return request({
      url: '/vue-element-admin/transactionQuery/holdList',
      method: 'get',
      params: query,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }

  //平仓查询接口
export function levelList(query) {
    return request({
      url: '/vue-element-admin/transactionQuery/levelList',
      method: 'get',
      params: query,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }

    //开仓查询接口
export function openList(query) {
  return request({
    url: '/vue-element-admin/transactionQuery/openList',
    method: 'get',
    params: query,
    baseURL: process.env.VUE_APP_BASE_API
  })
}