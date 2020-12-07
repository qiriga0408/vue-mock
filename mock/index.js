const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const table = require('./table')
    //用户查询
    const userquery = require('./userQuery')
    //交易查询
    const dealquery = require('./transactionQuery')
    // 资金查询
    const fundquery = require('./fundQuery')
    //返佣查询
    const rebatequery = require('./rebateQuery')
    //平台财务
    const platform = require('./platformFinance')
    //合约配置
    const contract = require('./contract')
    //风控管理
    const risk = require('./riskAdminister')
    //系统管理
    const system = require('./systemAdminister')

const mocks = [
    ...user,
    ...table,
    ...userquery,
    // ...transactions
    ...dealquery,
    ...fundquery,
    ...rebatequery,
    ...platform,
    ...contract,
    ...risk,
    ...system
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
    // mock patch
    // https://github.com/nuysoft/Mock/issues/300
    Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
    Mock.XHR.prototype.send = function() {
        if (this.custom.xhr) {
            this.custom.xhr.withCredentials = this.withCredentials || false

            if (this.responseType) {
                this.custom.xhr.responseType = this.responseType
            }
        }
        this.proxy_send(...arguments)
    }

    function XHR2ExpressReqWrap(respond) {
        return function(options) {
            let result = null
            if (respond instanceof Function) {
                const { body, type, url } = options
                // https://expressjs.com/en/4x/api.html#req
                result = respond({
                    method: type,
                    body: JSON.parse(body),
                    query: param2Obj(url)
                })
            } else {
                result = respond
            }
            return Mock.mock(result)
        }
    }

    for (const i of mocks) {
        Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
    }
}

module.exports = {
    mocks,
    mockXHR
}