import request from '@/utils/request'

//用户列表接口
export function userList(query) {
    return request({
      url: '/vue-element-admin/userQuery/tableList',
      method: 'get',
      params: query,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }
//编辑后点击确定
  export function userQueryUpdate(data) {
    return request({
      url: '/vue-element-admin/userQuery/update',
      method: 'post',
      data,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }
//提升代理对话框点击确定
  export function userQueryPromoteUpdata(data) {
    return request({
      url: '/vue-element-admin/userQuery/PromoteUpdata',
      method: 'post',
      data,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }
//备注对话框点击确定
  export function userQueryRemarksUpdata(data) {
    return request({
      url: '/vue-element-admin/userQuery/RemarksUpdata',
      method: 'post',
      data,
      baseURL: process.env.VUE_APP_BASE_API
    })
  }
  // 点击查看跳转详情页
  export function userQueryDetail(id) {
    return request({
      url: '/vue-element-admin/article/detail',
      method: 'get',
      params: { id },
      baseURL: process.env.VUE_APP_BASE_API
    })
  }
  //kfc首页table列表
export function kfcList(query) {
  return request({
    url: '/vue-element-admin/userQuery/kfcTableList',
    method: 'get',
     params:query,
     baseURL: process.env.VUE_APP_BASE_API
  })
}

//审核后点击确定
export function userQueryKfcUpdate(data) {
  return request({
    url: '/vue-element-admin/userQuery/update',
    method: 'post',
    data,
      baseURL: process.env.VUE_APP_BASE_API
  })
}