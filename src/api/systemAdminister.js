import request from '@/utils/request'

   //系统管理、角色管理table数据接口
   export function roleAdminister(query) {
    return request({
      url: '/vue-element-admin/systemAdminister/roleAdminister',
      method: 'get',
      params: query,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }
  //系统管理、角色管理修改接口
  export function roleUpdate(data) {
    return request({
      url: '/vue-element-admin/systemAdminister/roleUpdate',
      method: 'post',
      data,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }
  //系统管理、角色管理添加标签接口
  export function roleCreate(data) {
    return request({
      url: '/vue-element-admin/systemAdminister/roleCreate',
      method: 'post',
      data,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }
    //系统管理、权限分组table数据接口
    export function authorityGrouping(query) {
        return request({
          url: '/vue-element-admin/systemAdminister/authorityGrouping',
          method: 'get',
          params: query,
          baseURL: process.env.VUE_APP_BASE_API
        })
      }
        //系统管理、操作日志table数据接口
    export function operatingLog(query) {
        return request({
          url: '/vue-element-admin/systemAdminister/operatingLog',
          method: 'get',
          params: query,
          baseURL: process.env.VUE_APP_BASE_API
        })
      }