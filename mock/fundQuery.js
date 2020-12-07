const Mock = require('mockjs')
const assetCount =100
const assetList = []
const goldCount = 100
const goldList = []
const financiaCount = 100
const financiaList = []
const administerCount = 100
const administerList = []

//用户资产查询数据
for (let i = 0; i < assetCount; i++) {
    assetList.push(
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
            //  净PNL
            'jing_PNL|1-300':100,
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
              //成交时间
              transaction_time:+Mock.Random.date('T')
        })
    )
}

//用户出入金查询数据
for (let i = 0; i < goldCount; i++) {
  goldList.push(
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
          //  净PNL
          'jing_PNL|1-300':100,
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
            //成交时间
            transaction_time:+Mock.Random.date('T'),
            //币种
            'Currency|1':['USBT','PT'],
            // 订单类型
            'order_type|1':['PT','SW']
      })
  )
}

//用户财务记录数据
for (let i = 0; i < financiaCount; i++) {
  financiaList.push(
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
          //  净PNL
          'jing_PNL|1-300':100,
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
            //成交时间
            transaction_time:+Mock.Random.date('T'),
            //币种
            'Currency|1':['USBT','PT'],
            // 订单类型
            'order_type|1':['PT','SW'],
            //成交编号
            financiaList:'@natural',
            //时间
            time:+Mock.Random.date('T'),
      })
  )
}
//用户提币管理数据
for (let i = 0; i < administerCount; i++) {
  administerList.push(
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
          //  净PNL
          'jing_PNL|1-300':100,
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
            //成交时间
            transaction_time:+Mock.Random.date('T'),
            //币种
            'Currency|1':['USBT','PT'],
            // 订单类型
            'order_type|1':['TXTG','TXSB','TXSQ'],
            //订单
            financiaList:'@natural',
            //时间
            time:+Mock.Random.date('T'),
            //转出地址
            outgoing_address:'@guid',
            // 操作人
            Operator:'',
            // 备注
            Remarks:''

      })
  )
}


module.exports = [
      //用户资产查询table列表数据
      {
        url: '/vue-element-admin/fundQuery/assetList',
        type: 'get',
        response: config => {
          const { uid, topp_username,top_username, top_id,Superior_id,page = 1, limit = 20, sort } = config.query
          
          let mockList = assetList.filter(item => {
            if (uid && item.uid !== +uid) return false 
            if (top_id && item.top_id !== top_id) return false
            if (topp_username && item.topp_username.indexOf(topp_username) < 0) return false
            if (top_username && item.top_username.indexOf(top_username) < 0) return false
            if (Superior_id && item.Superior_id !== Superior_id) return false
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
     //用户出入金查询table列表数据
     {
      url: '/vue-element-admin/fundQuery/goldList',
      type: 'get',
      response: config => {
        const { uid, topp_username,top_username, top_id,Currency,order_type,transaction_time,Superior_id,page = 1, limit = 20, sort } = config.query
        
        let mockList = goldList.filter(item => {
          if (uid && item.uid !== +uid) return false 
          if (top_id && item.top_id !== top_id) return false
          if (topp_username && item.topp_username.indexOf(topp_username) < 0) return false
          if (top_username && item.top_username.indexOf(top_username) < 0) return false
          if (Superior_id && item.Superior_id !== Superior_id) return false
          if (Currency && item.Currency !== Currency) return false
          if (order_type && item.order_type !== order_type) return false
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
   //用户财务记录table列表数据
   {
    url: '/vue-element-admin/fundQuery/financiaList',
    type: 'get',
    response: config => {
      const { uid, topp_username,top_username,transaction_number, top_id,Currency,order_type,transaction_time,Superior_id,page = 1, limit = 20, sort } = config.query
      
      let mockList = financiaList.filter(item => {
        if (uid && item.uid !== +uid) return false 
        if (top_id && item.top_id !== top_id) return false
        if (topp_username && item.topp_username.indexOf(topp_username) < 0) return false
        if (top_username && item.top_username.indexOf(top_username) < 0) return false
        if (Superior_id && item.Superior_id !== Superior_id) return false
        if (Currency && item.Currency !== Currency) return false
        if (transaction_number && item.transaction_number !== transaction_number) return false
        if (order_type && item.order_type !== order_type) return false
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
 //用户提币管理table列表数据
 {
  url: '/vue-element-admin/fundQuery/administerList',
  type: 'get',
  response: config => {
    const { uid, topp_username,top_username,time,transaction_number, top_id,Currency,order_type,transaction_time,Superior_id,page = 1, limit = 20, sort } = config.query
    
    let mockList = administerList.filter(item => {
      if (uid && item.uid !== +uid) return false 
      if (top_id && item.top_id !== top_id) return false
      if (topp_username && item.topp_username.indexOf(topp_username) < 0) return false
      if (top_username && item.top_username.indexOf(top_username) < 0) return false
      if (Superior_id && item.Superior_id !== Superior_id) return false
      if (time && item.time !== time) return false
      if (Currency && item.Currency !== Currency) return false
      if (transaction_number && item.transaction_number !== transaction_number) return false
      if (order_type && item.order_type !== order_type) return false
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
 //通过后点击确定
 {
  url: '/vue-element-admin/fundQuery/updateTG',
  type: 'post',
  response: _ => {
    return {
      code: 20000,
      data: 'success'
    }
  }
},
 //拒绝后点击确定
 {
  url: '/vue-element-admin/fundQuery/updateJJ',
  type: 'post',
  response: _ => {
    return {
      code: 20000,
      data: 'success'
    }
  }
},
]