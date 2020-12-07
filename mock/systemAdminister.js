const Mock = require('mockjs')

//角色管理
const roleAdminList = []
const roleAdminCount = 100
//权限分组
const authorityList = []
const authorityCount = 5 
//操作日志
const operatingList = []
const operatingCount = 100

for(let i = 0; i< roleAdminCount;i++){
    roleAdminList.push(
        Mock.mock({
          //UID
          uid: '@increment',
          //邮箱
          username: '@email',
          // 手机
          top_id:'@zip',
            //成交时间
            transaction_time:+Mock.Random.date('T'),
            //分组名称
            'Currency|1':['DLS','YY','GLY'],
            //时间
            time:+Mock.Random.date('T'),
        })
    )
}
for(let i = 0; i< authorityCount;i++){
    authorityList.push(
        Mock.mock({
          //UID
          uid: '@increment',
          //邮箱
          username: '@email',
          // 手机
          top_id:'@zip',
            //成交时间
            transaction_time:+Mock.Random.date('T'),
            //分组名称
            'Currency|1':['DLS','YY','GLY'],
            //时间
            time:+Mock.Random.date('T'),
            'type|1':['1','2']
        })
    )
}
for(let i = 0; i< operatingCount;i++){
    operatingList.push(
        Mock.mock({
          //UID
          uid: '@increment',
          //邮箱
          username: '@email',
          // 手机
          top_id:'@zip',
            //操作时间
            transaction_time:+Mock.Random.date('T'),
             //操作类型
             'Currency_type|1':['PT','GLY','YY'],
            //操作对象
            'Currency|1':['DLS','YY','GLY'],
            //时间
            time:+Mock.Random.date('T'),
        })
    )
}
module.exports = [
    //角色管理
    {
        url: '/vue-element-admin/systemAdminister/roleAdminister',
        type: 'get',
        response: config => {
          const { uid,username,top_id,transaction_time,Currency,time,page = 1, limit = 20, sort } = config.query
          
          let mockList = roleAdminList.filter(item => {
            if (uid && item.uid !== +uid) return false 
            if (top_id && item.top_id !== top_id) return false
            if (username && item.username !== username) return false
            if (transaction_time && item.transaction_time !== transaction_time) return false
            if (Currency && item.Currency !== Currency) return false
            if (time && item.time !== time) return false
            return true
          })
          if (sort === '-id') {
            mockList = mockList.reverse()
          }
          const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    
          return {
            code: 20000,
            data: {
              total: mockList.length,
              items: pageList
            }
          }
    
        }
    },
    
    //修改
    {
        url: '/vue-element-admin/systemAdminister/roleUpdate',
        type: 'post',
        response: _ => {
          return {
            code: 20000,
            data: 'success'
          }
        }
      },
      //添加标签
      {
        url: '/vue-element-admin/systemAdminister/roleCreate',
        type: 'post',
        response: _ => {
          return {
            code: 20000,
            data: 'success'
          }
        }
      },
       //权限分组
    {
        url: '/vue-element-admin/systemAdminister/authorityGrouping',
        type: 'get',
        response: config => {
          const { uid,username,top_id,transaction_time,Currency,time,page = 1, limit = 20, sort } = config.query
          
          let mockList = authorityList.filter(item => {
            if (uid && item.uid !== +uid) return false 
            if (top_id && item.top_id !== top_id) return false
            if (username && item.username !== username) return false
            if (transaction_time && item.transaction_time !== transaction_time) return false
            if (Currency && item.Currency !== Currency) return false
            if (time && item.time !== time) return false
            return true
          })
          if (sort === '-id') {
            mockList = mockList.reverse()
          }
          const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    
          return {
            code: 20000,
            data: {
              total: mockList.length,
              items: pageList
            }
          }
    
        }
    },
       //操作日志
       {
        url: '/vue-element-admin/systemAdminister/operatingLog',
        type: 'get',
        response: config => {
          const { uid,username,top_id,transaction_time,Currency,Currency_type,time,page = 1, limit = 20, sort } = config.query
          
          let mockList = operatingList.filter(item => {
            if (uid && item.uid !== +uid) return false 
            if (top_id && item.top_id !== top_id) return false
            if (username && item.username !== username) return false
            if (transaction_time && item.transaction_time !== transaction_time) return false
            if (Currency && item.Currency !== Currency) return false
            if (Currency_type && item.Currency_type !== Currency_type) return false
            if (time && item.time !== time) return false
            return true
          })
          if (sort === '-id') {
            mockList = mockList.reverse()
          }
          const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    
          return {
            code: 20000,
            data: {
              total: mockList.length,
              items: pageList
            }
          }
    
        }
    },
    
]
