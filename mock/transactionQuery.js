const Mock = require('mockjs')
const holdCount = 100
const holdList = []
const levelCount = 100
const levelList = []
const openCount = 100
const openList = []

//持仓查询数据
for (let i = 0; i < holdCount; i++) {
    holdList.push(
        Mock.mock({
            //UID
            uid: '@increment',
            //用户名
            username: '@first',
            // 顶级代理ID
            top_id:'@zip',
            // 上级代理ID
            Superior_id:'@zip',
            //上机代理用户名
            top_username:'@word',
            //合约
            'contract_type|1':['HY1','HY2'],
             // 仓位类型
             'position_type|1':['CW1','CW2'],
             //杠杆
             'lever|1-100':100,
             //张数
             'sheets_number|1-100':100,
            //  冻结保证金
            'freeze_margin|1-3000.1-10':100,
            //  开仓均价
            'open_price|1-300.1-10':50,
            //  手续费
            'handling_fee|1-50.1-5':12,
            //  资金费用
            'funding_costs|1-200':100,
            //  强平价格
            'liquidation_price|1-300':100,
            //  止盈价
            'surplus_price|1-200.1-10':100,
            //  止损价
            'damage_price|1-300.1-10':80,
            //  浮动盈亏,
            'float_profit_loss|1-400.1-10':12,
            //  IP地址
            ip:'@ip',
            //成交时间
            transaction_time:+Mock.Random.date('T')


        })
    )
}

//平仓查询数据
for (let i = 0; i < levelCount; i++) {
    levelList.push(
        Mock.mock({
            //UID
            uid: '@increment',
            //用户名
            username: '@first',
            // 顶级代理ID
            top_id:'@zip',
            // 上级代理ID
            Superior_id:'@zip',
            //上机代理用户名
            top_username:'@word',
            //合约
            'contract_type|1':['HY1','HY2'],
             // 仓位类型
             'position_type|1':['CW1','CW2'],
             //杠杆
             'lever|1-100':100,
             //张数
             'sheets_number|1-100':100,
            //  开仓时间
            position_time:+Mock.Random.date('T'),
            //  k开仓价
            'opening_price|1-300.1-10':50,
            //  手续费
            'handling_fee|1-50.1-5':12,
            //  平仓价格
            'closing_price|1-200':100,
            //  净PNL
            'jing_PNL|1-300':100,
            //  PNL
            'PNL|1-200.1-10':100,
            //  交易类型
            'deal_type|1':['YJY','WJY'],
            //  状态,
            'status|1':['YCJ','DCJ','YCX'],
            //  IP地址
            ip:'@ip',
            //更新时间
            updata_time:+Mock.Random.date('T'),
             // 交易编号
            deal_numbering:'@natural',
              //成交时间
            transaction_time:undefined,
            // /资金费用
            'funding_costs|1-200.1-10':100,
        })
    )
}
//开仓查询数据
for (let i = 0; i < openCount; i++) {
  openList.push(
      Mock.mock({
          //UID
          uid: '@increment',
          //用户名
          username: '@first',
          // 顶级代理ID
          top_id:'@zip',
          // 上级代理ID
          Superior_id:'@zip',
          //上机代理用户名
          top_username:'@word',
          //合约
          'contract_type|1':['HY1','HY2'],
           // 仓位类型
           'position_type|1':['CW1','CW2'],
           //杠杆
           'lever|1-100':100,
           //张数
           'sheets_number|1-100':100,
          //  开仓时间
          position_time:+Mock.Random.date('T'),
          //  k开仓价
          'opening_price|1-300.1-10':50,
          //  手续费
          'handling_fee|1-50.1-5':12,
          //  平仓价格
          'closing_price|1-200':100,
          //  净PNL
          'jing_PNL|1-300':100,
          //  PNL
          'PNL|1-200.1-10':100,
          //  交易类型
          'deal_type|1':['YJY','WJY'],
          //  状态,
          'status|1':['YCJ','DCJ','YCX'],
          //  IP地址
          ip:'@ip',
          //更新时间
          updata_time:+Mock.Random.date('T'),
           // 交易编号
          deal_numbering:'@natural',
            //成交时间
          transaction_time:undefined,
          // /资金费用
          'funding_costs|1-200.1-10':100,
      })
  )
}

module.exports = [
    //持仓查询table列表数据
    {
        url: '/vue-element-admin/transactionQuery/holdList',
        type: 'get',
        response: config => {
          const { uid, top_username, top_id,Superior_id,status,contract_type,position_type,transaction_time,page = 1, limit = 20, sort } = config.query
          
          let mockList = holdList.filter(item => {
            if (uid && item.uid !== +uid) return false 
            if (top_id && item.top_id !== top_id) return false
            if (top_username && item.top_username.indexOf(top_username) < 0) return false
            if (Superior_id && item.Superior_id !== Superior_id) return false
            if (contract_type && item.contract_type !== contract_type) return false
            if (position_type && item.position_type !== position_type) return false
            if (status && item.status !== status) return false
            if (transaction_time && item.transaction_time !== transaction_time) return false
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
     //平仓查询table列表数据
     {
        url: '/vue-element-admin/transactionQuery/levelList',
        type: 'get',
        response: config => {
          const { uid, top_username, top_id,Superior_id,contract_type,position_type,deal_type,deal_numbering,transaction_time,page = 1, limit = 20, sort } = config.query
          
          let mockList = levelList.filter(item => {
            if (uid && item.uid !== +uid) return false 
            if (top_id && item.top_id !== top_id) return false
            if (top_username && item.top_username.indexOf(top_username) < 0) return false
            if (Superior_id && item.Superior_id !== Superior_id) return false
            if (contract_type && item.contract_type !== contract_type) return false
            if (position_type && item.position_type !== position_type) return false
            if (transaction_time && item.transaction_time !== transaction_time) return false
            if (transaction_time && item.deal_numbering !== deal_numbering) return false
            if (deal_type && item.deal_type !== deal_type) return false
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
       //开仓查询table列表数据
       {
        url: '/vue-element-admin/transactionQuery/openList',
        type: 'get',
        response: config => {
          const { uid, top_username, top_id,Superior_id,contract_type,position_type,deal_type,deal_numbering,transaction_time,page = 1, limit = 20, sort } = config.query
          
          let mockList = openList.filter(item => {
            if (uid && item.uid !== +uid) return false 
            if (top_id && item.top_id !== top_id) return false
            if (top_username && item.top_username.indexOf(top_username) < 0) return false
            if (Superior_id && item.Superior_id !== Superior_id) return false
            if (contract_type && item.contract_type !== contract_type) return false
            if (position_type && item.position_type !== position_type) return false
            if (transaction_time && item.transaction_time !== transaction_time) return false
            if (transaction_time && item.deal_numbering !== deal_numbering) return false
            if (deal_type && item.deal_type !== deal_type) return false
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