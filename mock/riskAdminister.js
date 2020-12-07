const Mock = require('mockjs')
lebelCount = 100
lebelList = []

//标签管理数据
for (let i = 0; i < lebelCount; i++) {
    lebelList.push(
        Mock.mock({
            //UID
            uid: '@increment',
            //标签名称
            username: '@first',
             //最大杠杆
             'lever|1-100':100,
             //单笔最大下单量
             'sheets_number|1-100':100,
            // 单笔最小单量
            'opening_price|1-300.1-10':50,
            // 最大持仓
            'handling_fee|1-50.1-5':12,
            // 点差
            'closing_price|1-200':100,
            //手续费率
            'jing_PNL|1-300':100,
            //资金费率
            'PNL|1-200.1-10':100,
            // 合约
            'deal_type|1':['HY1','HY2'],
            //协议平仓线
            'dongjie|1-10000':100,
            //状态
            'feng|1':['CG','SC','SB'],
              //成交时间
              transaction_time:+Mock.Random.date('T'),
              'status|1':['GB','KQ']
        })
    )
}

module.exports = [
    //标签管理数据
    //用户资产查询table列表数据
    {
        url: '/vue-element-admin/riskAdminister/lebelList',
        type: 'get',
        response: config => {
          const { uid,username,lever, sheets_number,opening_price,handling_fee,closing_price,jing_PNL,PNL,deal_type,dongjie,feng,transaction_time,page = 1, limit = 20, sort } = config.query
          
          let mockList = lebelList.filter(item => {
            if (uid && item.uid !== +uid) return false 
            if (username && item.username.indexOf(username) < 0) return false
            if (lever && item.lever !== lever) return false
            if (sheets_number && item.sheets_number !== sheets_number) return false
            if (opening_price && item.opening_price !== opening_price) return false
            if (handling_fee && item.handling_fee !== handling_fee) return false
            if (closing_price && item.closing_price !== closing_price) return false
            if (jing_PNL && item.jing_PNL !== jing_PNL) return false
            if (PNL && item.PNL !== PNL) return false
            if (deal_type && item.deal_type !== deal_type) return false
            if (dongjie && item.dongjie !== dongjie) return false
            if (feng && item.feng !== feng) return false
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
    //添加标签
    {
      url: '/vue-element-admin/riskAdminister/lebelCreate',
      type: 'post',
      response: _ => {
        return {
          code: 20000,
          data: 'success'
        }
      }
    },
]