const Mock = require('mockjs')
const rebateCount = 100
const rebateList = []

//返佣查询.手续费返佣数据
for (let i = 0; i < rebateCount; i++) {
    rebateList.push(
        Mock.mock({
            //UID
            uid: '@increment',
            //用户名
            username: '@first',
            // 顶级代理ID
            top_id:'@zip',
            //顶级昵称
            topp_username:'@first',
            // 上级代理ID
            Superior_id:'@zip',
            //上机代理用户名
            top_username:'@word',
             //平仓次数
             'lever|1-100':100,
             //总入金总出金
             'sheets_number|1-100':100,
            // 净入金
            'opening_price|1-300.1-10':50,
            //  手续费
            'handling_fee|1-50.1-5':12,
            //  可用
            'closing_price|1-200':100,
            //  返佣期限
            'jing_PNL|1-30':10,
            // 平仓 PNL
            'PNL|1-200.1-10':100,
            //  账户权益
            'deal_type|1':['CG','SB'],
            // 冻结保证金
            'dongjie|1-10000':100,
            // 浮动PNL
            'fudong_PNL|1-300':100,
            //风险率
            'feng|1':['G','Z','X'],
            // /资金费用
            'funding_costs|1-200.1-10':100,
              //统计时间
              transaction_time:+Mock.Random.date('T'),
              //开放时间
              open_time:+Mock.Random.date('T'),
              //币种
              'Currency|1':['USBT','PT'],
              // 订单类型
              'order_type|1':['YKF','DKF']
        })
    )
  }

  module.exports = [
      //返佣查询.手续费返佣数据
      {
        url: '/vue-element-admin/rebateQuery/rebateList',
        type: 'get',
        response: config => {
          const { uid, topp_username,transaction_time,Currency,order_type,top_username, top_id,Superior_id,page = 1, limit = 20, sort } = config.query
          
          let mockList = rebateList.filter(item => {
            if (uid && item.uid !== +uid) return false 
            if (top_id && item.top_id !== top_id) return false
            if (topp_username && item.topp_username.indexOf(topp_username) < 0) return false
            if (top_username && item.top_username.indexOf(top_username) < 0) return false
            if (Superior_id && item.Superior_id !== Superior_id) return false
            if (transaction_time && item.transaction_time !== transaction_time) return false
            if (Currency && item.Currency !== Currency) return false
            if (order_type && item.order_type !== order_type) return false
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
      }
  ]