import request from '@/utils/request'

//用户资产查询接口
export function assetList(query) {
    return request({
      url: '/vue-element-admin/fundQuery/assetList',
      method: 'get',
      params: query,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }
  //用户出入金查询接口
export function goldList(query) {
    return request({
      url: '/vue-element-admin/fundQuery/goldList',
      method: 'get',
      params: query,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }

    //用户财务记录接口
export function financiaList(query) {
    return request({
      url: '/vue-element-admin/fundQuery/financiaList',
      method: 'get',
      params: query,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }
      //用户提币管理接口
export function administerList(query) {
    return request({
      url: '/vue-element-admin/fundQuery/administerList',
      method: 'get',
      params: query,
       baseURL: process.env.VUE_APP_BASE_API
    })
  }

  //用户提币管理通过后点击确定
  export function updateTG(data) {
    return request({
      url: '/vue-element-admin/fundQuery/updateTG',
      method: 'post',
      data,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }
    //用户提币管理拒绝后点击确定
    export function updateJJ(data) {
        return request({
          url: '/vue-element-admin/fundQuery/updateJJ',
          method: 'post',
          data,
          baseURL: process.env.VUE_APP_BASE_API
        })
      }