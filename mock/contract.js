const Mock = require('mockjs')
overViewList = []
assetList = []
assetHistoryList = []
assetHistoryCount = 100
transactionList = []
transactionHistoryList = []
transactionHistoryCount = 100


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
    //资产账户数据
    {
        url:'/vue-element-admin/contract/assetAccount',
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
        url:'/vue-element-admin/contract/assetHistoryRecord',
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
        url:'/vue-element-admin/contract/transactionAccount',
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
        url:'/vue-element-admin/contract/transactionHistoryRecord',
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