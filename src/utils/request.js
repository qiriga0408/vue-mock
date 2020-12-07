import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: config.url,
  // process.env.NODE_ENV === "production"
  // ? config.url
  // : "http://manage.officeqb.com", //请求总地址
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 12000, //超时时间
})

// request interceptor
service.interceptors.request.use(
  reqData =>{
    if(reqData.baseURL == config.url){
      let time = parseInt(new Date().getTime() / 1000) + "";
      let sin = md5(
        md5(config.secretKey) + time
      );
      reqData.data['sign'] = sin
      reqData.data['ts'] = time
      if (store.getters.token) {
        reqData.headers['token'] = store.getters.token
      }
    }
   
      
  
    return reqData
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
  

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log('查看res，在request.js',res)
      return res;
      
      //用mock模拟数据所以先注释
    
    // if (res.ret !== 0) {
    //   Message({
    //     message: res.msg || '网络状态不好,请稍后再试',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   return Promise.reject(new Error(res.msg || '网络状态不好,请稍后再试'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('报错了' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
