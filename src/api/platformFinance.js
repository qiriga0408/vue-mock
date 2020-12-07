import request from '@/utils/request'
//概览数据
export function overView() {
    return request({
      url: '/vue-element-admin/platformFinance/overView',
      method: 'get',
    //   params: query
    baseURL: process.env.VUE_APP_BASE_API
    })
  }
//资产用户数据
  export function assetAccount() {
    return request({
      url: '/vue-element-admin/platformFinance/assetAccount',
      method: 'get',
    //   params: query
    baseURL: process.env.VUE_APP_BASE_API
    })
  }

  //资产账户历史记录
  export function assetHistoryRecord(query) {
    return request({
      url: '/vue-element-admin/platformFinance/assetHistoryRecord',
      method: 'get',
      params: query,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }

  //交易账户数据
  export function transactionAccount() {
    return request({
      url: '/vue-element-admin/platformFinance/transactionAccount',
      method: 'get',
    //   params: query
    baseURL: process.env.VUE_APP_BASE_API
    })
  }
   //交易账户历史记录
   export function transactionHistoryRecord(query) {
    return request({
      url: '/vue-element-admin/platformFinance/transactionHistoryRecord',
      method: 'get',
      params: query,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }