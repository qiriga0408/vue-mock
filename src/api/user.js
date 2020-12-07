import request from '@/utils/request'

//登录
export function login(data) {
    return request({
        url: '/managers/v1/manager/login',
        method: 'post',
        data: { data }
    })
}
//g谷歌验证
export function checkVkey(data) {
    return request({
        url: '/managers/v1/manager/ckeckvkey',
        method: 'post',
        data: { data }
    })
}

// 、、测试
// export function unserinfo(data){
//     return request({
//         url:'/managers/v1/manager/bcprouserlist',
//         method:'post',
//         data:{data},
//         // baseURL: process.env.VUE_APP_BASE_API
//     })
// }

export function getInfo(token) {
    return request({
        url: '/vue-admin-template/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/vue-admin-template/user/logout',
        method: 'post'
    })
}