const Mock = require('mockjs')
const overViewList = []
 const overViewCount = 10
 const assetList = []
const  assetHistoryList = []
const assetHistoryCount = 100
const transactionList = []
const transactionHistoryList = []
const transactionHistoryCount = 100

//资产概览
  overViewList.push(
    Mock.mock({
        //交易账户
        transaction_account:'@first',
         //可用数量
         'lever|1-100':100,
          //冻结数量
          'sheets_number|1-100':100,
          // 提币中数量
          'opening_price|1-300.1-10':50,
          // 资产账户
          'handling_fee|1-50.1-5':12,
          // 可用余额
          'closing_price|1-200':100,
          // 账户权益
          'jing_PNL|1-300':100,
          // 用户合计
          'PNL|1-200.1-10':100,
           // 平台合约账户
           'dongjie|1-10000':100,
           // 已实现盈亏
           'fudong_PNL|1-300':100,
            //平台资产合计
            'funding_costs|1-200.1-10':100,
              // 用户+平台合计
          'PNLs|1-200.1-10':100,
             //成交时间
             transaction_time:+Mock.Random.date('T')
    })
)


//资产账户
assetList.push(
    Mock.mock({
        //uid
        UID:'@id',
        //币种
        'Currency|1':['USBT','PT'],
         //可用数量
         'lever|1-100':100,
          //冻结数量
          'sheets_number|1-100':100,
          // 平台负债
          'opening_price|1-300.1-10':50,
            // 操作
          'deal_type|1':['CB','TB','KT'],
             //成交时间
             transaction_time:+Mock.Random.date('T')
    })
)

//资产账户历史记录
for(var i = 0;i < assetHistoryCount;i++){
    assetHistoryList.push(
        Mock.mock({
              //划转uid
            uid:'@increment(100)',
            //币种
            'Currency|1':['USBT','PT'],
            //变化数量
            'lever|1-100':100,
            //剩余可用余额
            'sheets_number|1-100':100,
            // 类型
            'deal_type|1':['DD','PT'],
             //操作人
             'feng|1':['XT','GLY'],
                //时间
                time:+Mock.Random.date('T')
        })
    )
}
//交易账户
transactionList.push(
    Mock.mock({
        //uid
        UID:'@id',
        //币种
        'Currency|1':['USBT','PT'],
          //账户资产
          'sheets_number|1-100':100,
          // 已实现盈亏
          'opening_price|1-300.1-10':50,
    })
)
//交易账户历史记录
for(var i = 0;i < transactionHistoryCount;i++){
    transactionHistoryList.push(
        Mock.mock({
              //划转uid
            uid:'@increment(100)',
            //币种
            'Currency|1':['USBT','PT'],
            //变化数量
            'lever|1-100':100,
            //剩余账户资产
            'sheets_number|1-100':100,
            // 剩余已实现盈亏
            'sheet_number|1-100':100,
            // 类型
            'deal_type|1':['DD','PT'],
             //操作人
             'feng|1':['XT','GLY'],
            //时间
            time:+Mock.Random.date('T')
        })
    )
}

module.exports = [
    //资产概览数据
    {
        url:'/vue-element-admin/platformFinance/overView',
        type:'get',
        response:config => {
            const {transaction_account,lever,sheets_number,opening_price,handling_fee,closing_price,jing_PNL,PNL,dongjie,fudong_PNL,funding_costs,PNLs,transaction_time} = config.query

            let mockList = overViewList.filter(item => {
                if (transaction_account && item.transaction_account !== transaction_account) return false 
                if (lever && item.lever !== lever) return false
                if (sheets_number && item.sheets_number !== sheets_number) return false
                if (opening_price && item.opening_price !== opening_price) return false
                if (handling_fee && item.handling_fee !== handling_fee) return false
                if (closing_price && item.closing_price !== closing_price) return false
                if (jing_PNL && item.jing_PNL !== jing_PNL) return false
                if (PNL && item.PNL !== PNL) return false
                if (dongjie && item.dongjie !== dongjie) return false
                if (fudong_PNL && item.fudong_PNL !== fudong_PNL) return false
                if (funding_costs && item.funding_costs !== funding_costs) return false
                if (PNLs && item.PNLs !== PNLs) return false
                if (transaction_time && item.transaction_time !== transaction_time) return false
                return true
              })
            return {
                code:20000,
                data :{
                    items:mockList
                }
            }
        }
    },
    //资产账户数据
    {
        url:'/vue-element-admin/platformFinance/assetAccount',
        type:'get',
        response:config =>{
            const {UID,Currency,lever,sheets_number,opening_price,deal_type,} = config.query

            let mockList = assetList.filter(item => {
                if (UID && item.UID !== +UID) return false 
                if (Currency && item.Currency !== Currency) return false 
                if (lever && item.lever !== lever) return false
                if (sheets_number && item.sheets_number !== sheets_number) return false
                if (opening_price && item.opening_price !== opening_price) return false
                if (deal_type && item.deal_type !== deal_type) return false      
                return true    
              })
            return {
                code:20000,
                data :{
                    items:mockList
                }
            }
        }
    },
    //资产账户历史记录
    {
        url:'/vue-element-admin/platformFinance/assetHistoryRecord',
        type:'get',
        response:config=>{
            const { uid, Currency, lever,sheets_number,deal_type,feng,time,page = 1, limit = 20, sort } = config.query
        
            let mockList = assetHistoryList.filter(item => {
              if (uid && item.uid !== +uid) return false 
              if (Currency && item.Currency !== Currency) return false
              if (lever && item.lever !==lever) return false
              if (sheets_number && item.sheets_number !== sheets_number) return false
              if (Currency && item.Currency !== Currency) return false
              if (deal_type && item.deal_type !== deal_type) return false
              if (feng && item.feng !== feng) return false
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
    //交易账户数据
    {
        url:'/vue-element-admin/platformFinance/transactionAccount',
        type:'get',
        response:config =>{
            const {UID,Currency,sheets_number,opening_price} = config.query

            let mockList = transactionList.filter(item => {
                if (UID && item.UID !== +UID) return false 
                if (Currency && item.Currency !== Currency) return false 
                if (sheets_number && item.sheets_number !== sheets_number) return false
                if (opening_price && item.opening_price !== opening_price) return false    
                return true    
              })
            return {
                code:20000,
                data :{
                    items:mockList
                }
            }
        }
    },
      //资产账户历史记录
      {
        url:'/vue-element-admin/platformFinance/transactionHistoryRecord',
        type:'get',
        response:config=>{
            const { uid, Currency, lever,sheets_number,deal_type,feng,time,sheet_number,page = 1, limit = 20, sort } = config.query
        
            let mockList = transactionHistoryList.filter(item => {
              if (uid && item.uid !== +uid) return false
              if (sheet_number && item.sheet_number !== sheet_number) return false  
              if (Currency && item.Currency !== Currency) return false
              if (lever && item.lever !==lever) return false
              if (sheets_number && item.sheets_number !== sheets_number) return false
              if (Currency && item.Currency !== Currency) return false
              if (deal_type && item.deal_type !== deal_type) return false
              if (feng && item.feng !== feng) return false
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