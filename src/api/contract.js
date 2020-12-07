import request from '@/utils/request'

//资产用户数据
  export function assetAccount() {
    return request({
      url: '/vue-element-admin/contract/assetAccount',
      method: 'get',
    //   params: query
    baseURL: process.env.VUE_APP_BASE_API
    })
  }

  //资产账户历史记录
  export function assetHistoryRecord(query) {
    return request({
      url: '/vue-element-admin/contract/assetHistoryRecord',
      method: 'get',
      params: query,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }

  //交易账户数据
  export function transactionAccount() {
    return request({
      url: '/vue-element-admin/contract/transactionAccount',
      method: 'get',
    //   params: query
    baseURL: process.env.VUE_APP_BASE_API
    })
  }
   //交易账户历史记录
   export function transactionHistoryRecord(query) {
    return request({
      url: '/vue-element-admin/contract/transactionHistoryRecord',
      method: 'get',
      params: query,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }