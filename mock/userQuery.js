const Mock = require('mockjs')

const List = []
const count = 100
const counts = 100
const kfcList = []

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

//用户列表
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            //UID
            uid: '@increment',
            //用户名
            username: '@first',
            //用户类型
            'usertype|1':['DJDL','DL','ZTYH','PTYH'],
            //kfc状态
            'status|1':['SHZ', 'YCG'],
            //邀请码
            invite_code:'@increment(1000)',
            //修改邀请码
            invite_code_edit:false,
            // 顶级代理ID
            top_id:'@zip',
            // 上级代理ID
            Superior_id:'@zip',
            //上机代理用户名
            top_username:'@word',
            //下级代理人数
            'under_number|1-100':2,
            // 直推人数
            'direct_number|1-76':3,
            //手续费往返比例
            'formalities_proportion|1-15.1-5':2,
            //发放期限
            'issue|1-32':2,
            //注册时间
            registration_time: +Mock.Random.date('T'),
            //最后登录时间
            last_login_time: +Mock.Random.date('T'),
            // 最后登录IP
            Ip:'@ip',
            //标签
            // 'label|1': ['划转', '提升代理'],, 'draft'
            'label|1':['published'],
            //备注
            remarks:'',
             //是否可查看平仓盈亏
             profit:false,
             //交易状态
             'trading_status|1':['0','1'],
             //登录状态
             'login_status|1':['0','1'],
            //  提币状态
            'withdrawal_status|1':['0','1'],
            //备注
            //操作
            display_time: '@datetime',
            platforms: ['a-platform'],
             comment_disabled: true,
             pageviews: '@integer(300, 5000)',
            //  修改内容
            modify_content:'',
            //操作人
            Operator:''
        })
    )
}

// kfc列表
for (let i = 0; i < counts; i++) {
  kfcList.push(
      Mock.mock({
         //申请时间
         application_time: +Mock.Random.date('T'),
         //订单编号
         order_number:'@float',
          //UID
          uid: '@increment',
          //国家地图
          country_map:'@province',
          //状态
          'certification_status|1':['RZTG','RZWTG'],
          //处理时间
          review_time:+Mock.Random.date('T'),
          //操作人
          Operator:'@cname',
          //用户名
          username: '@first',
          //证件号码
          id_number:'@id',
          //名
          ming_name:'@clast',
          // 姓
          xing_name:'@cfirst',
          //当前年龄
          'age|1-100':18,
          //出生日期
          born_data:+Mock.Random.date('T'),
          //图片  
          image_uri,
          // 审核结果
          'audit_results|1':['SHTG','SHWTG'],
      })
  )
}

module.exports = [
  //table列表
    {
      url: '/vue-element-admin/userQuery/tableList',
      type: 'get',
      response: config => {
        const { uid, usertype, top_id,top_username,registration_time,last_login_time,label,page = 1, limit = 20, sort } = config.query
  
        let mockList = List.filter(item => {
          if (uid && item.uid !== +uid) return false
          if (usertype && item.usertype !== usertype) return false
          if (top_id && item.top_id !== top_id) return false
          if (usertype && item.usertype !== usertype) return false
          if (top_username && item.top_username.indexOf(top_username) < 0) return false
          if (registration_time && item.registration_time !== registration_time) return false
          if (last_login_time && item.last_login_time !== last_login_time) return false
          if (label && item.label !== label) return false
          return true
        })
  
        if (sort === '-id') {
          mockList = mockList.reverse()
        }
  
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        // const pageList = mockList.slice((page - 1) * limit, page * page)
  
        return {
          ret: 0,
          data: {
            total: mockList.length,
            items: pageList
          }
        }
      }
    },
    //编辑后点击确定
    {
      url: '/vue-element-admin/userQuery/update',
      type: 'post',
      response: _ => {
        return {
          ret: 0,
          data: 'success'
        }
      }
    },
    //提升代理对话框点击确定
    {
      url: '/vue-element-admin/userQuery/PromoteUpdata',
      type: 'post',
      response: _ => {
        return {
          ret: 0,
          data: 'success'
        }
      }
    },
    //备注对话框点击确定
    {
      url: '/vue-element-admin/userQuery/RemarksUpdata',
      type: 'post',
      response: _ => {
        return {
          ret: 0,
          data: 'success'
        }
      }
    },
    // 点击查看跳转详情页
    {
      url: '/vue-element-admin/userQuery/userListDetail',
      type: 'get',
      response: config => {
        const { id } = config.query
        for (const article of List) {
          if (article.id === +id) {
            return {
              ret: 0,
              data: article
            }
          }
        }
      }
    },
    //kfc首页table列表
    {
      url: '/vue-element-admin/userQuery/kfcTableList',
      type: 'get',
      response: config => {
        const { uid, application_time, review_time,certification_status,page = 1, limit = 20, sort } = config.query
  
        let mockList = kfcList.filter(item => {
          if (uid && item.uid !== +uid) return false
          if (certification_status && item.certification_status !== certification_status) return false
          if (application_time && item.application_time !== application_time) return false
          if (review_time && item.review_time !== review_time) return false
          return true
        })
        console.log(mockList)
        if (sort === '-id') {
          mockList = mockList.reverse()
        }
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        // const pageList = mockList.slice((page - 1) * limit, page * page)
        return {
          ret: 0,
          data: {
            total: mockList.length,
            items: pageList
          }
        }
      }
    },
      //审核后点击确定
      {
        url: '/vue-element-admin/userQuery/kfcUpdata',
        type: 'post',
        response: _ => {
          return {
            ret: 0,
            data: 'success'
          }
        }
      },
]
//     const data = Mock.mock({
//         'items|30': [{
//           id: '@id',
//           title: '@sentence(10, 20)',
//           'status|1': ['published', 'draft', 'deleted'],
//           author: 'name',
//           display_time: '@datetime',
//           pageviews: '@integer(300, 5000)'
//         }]
//       })
//   module.exports = [
//     {
//       url: '/vue-admin-template/table/list',
//       type: 'get',
//       response: config => {
//         const items = data.items
//         return {
//           ret: 0,
//           data: {
//             total: items.length,
//             items: items
//           }
//         }
//       }
//     }
//   ]
  