<template>
    <div class="financial-container">
          <div class="filter-container">
            <el-input size="mini" v-model="listQuery.uid" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
            <el-input v-model="listQuery.top_id" size="mini" placeholder="顶级代理ID" style="width:130px;margin-left:20px" class="filter-item" @keyup.enter.native="handleFilter" />
            <el-input v-model="listQuery.topp_username " size="mini" placeholder="顶级昵称" style="width:150px;margin-left:20px;margin-top:10px;" class="filter-item"  @keyup.enter.native="handleFilter"/>
            <el-input v-model="listQuery.topp_username " size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px" class="filter-item"  @keyup.enter.native="handleFilter"/>
            <el-select size="mini" v-model="listQuery.Currency" placeholder="币种" clearable   style="width: 120px;margin-left:20px;margin-top:10px;" class="filter-item">
                  <el-option v-for="item in CurrencyOptions" :key="item.key" :label="item.Currency_name" :value="item.key" />
             </el-select>
              <el-select size="mini" v-model="listQuery.order_type" placeholder="订单类型" clearable   style="width: 120px;margin-left:20px;" class="filter-item">
                 <el-option v-for="item in orderTypeOptions" :key="item.key" :label="item.order_type_name" :value="item.key" />
             </el-select>
             <span style="margin-left:20px;font-size:12px;">成交时间</span>
            <el-date-picker
            style="width:220px;margin-top:10px;"
              v-model="listQuery.transaction_time"
              size="mini"
              type="daterange"
              range-separator="-"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              >
            </el-date-picker>
             <el-input v-model="listQuery.transaction_number " size="mini" placeholder="成交编号" style="width:150px;margin-left:20px;margin-top:10px;" class="filter-item"  @keyup.enter.native="handleFilter"/>
           
            <el-button  class="filter-item" size="mini" type="primary" @click="handleFilter">
                搜索
            </el-button>
            <el-button class="filter-item" :loading="downloadLoading" @click="handleDownload" size="mini" type="success" >
                导出
            </el-button>
        </div>

         <el-table
            v-loading="listLoading"
            :data="financiaList"
            border
            fit
            highlight-current-row
            style="width: 100%;margin-top:30px;"
            :header-cell-style="{'background':'#F0F8FF'}"
            >
      <el-table-column label="UID" prop="uid"  align="center" min-width="60" >
      <!-- sortable="custom" :class-name="getSortClass('id')" -->
        <template slot-scope="{row}">
          <span>{{ row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center" min-width="90px">
        <template slot-scope="{row}">
          <span>{{row.username}}</span>
        </template>
      </el-table-column>
       <el-table-column label="顶级代理ID" align="center" min-width="95px">
        <template slot-scope="{row}">
          <span>{{row.top_id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="顶级昵称" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.topp_username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级代理ID" align="center" min-width="95px">
        <template slot-scope="{row}">
          <span>{{row.Superior_id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级代理用户名" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.top_username}}</span>
        </template>
      </el-table-column>
       <el-table-column label="成交编号" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.financiaList}}</span>
        </template>
      </el-table-column>
      <el-table-column label="币种" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span v-if="row.Currency == 'USBT'">USBT</span>
            <span v-else-if="row.Currency == 'PT'">普通</span>
        </template>
      </el-table-column>
         <el-table-column label="金额" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.sheets_number}}</span>
            </template>
      </el-table-column>
       <el-table-column label="账户余额" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.opening_price}}</span>
            </template>
      </el-table-column>
      <el-table-column label="订单类型" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span v-if="row.order_type == 'PT'">普通订单</span>
            <span v-else-if="row.order_type == 'SW'">商务订单</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center" min-width="120px">
        <template slot-scope="{row}">
            <span>{{row.transaction_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
     
    </el-table>

   <pagina-tion v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />



    </div>
</template>

<script>

import {financiaList} from '@/api/fundQuery'

// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'

const CurrencyOptions = [
    {key:'USBT',Currency_name:'USBT'},
     {key:'PT',Currency_name:'普通'}
]
const orderTypeOptions = [
     {key:'PT',order_type_name:'普通订单'},
     {key:'SW',order_type_name:'商务订单'}
]
export default {
    name:'financialrecords',
 data () {
 return {
          //表格下载
     downloadLoading:false,
     CurrencyOptions,
     orderTypeOptions,
    //表格加载中效果
    listLoading:false,
     //页数页码以及搜索
     listQuery: {
        page: 1,
        limit: 20,
        uid: undefined,
        // 顶级代理ID
        top_id: undefined,
        // 上级代理用户名
        top_username: undefined,
        // 上级代理ID
        Superior_id:undefined,
        //币种
        Currency:undefined,
        //订单类型
        order_type:undefined,
        //成交时间
        transaction_time:undefined,
        //成交编号
        transaction_number:undefined,
        sort: '+id'
      },
       financiaList:null,
      total:0
    };
 },

 components: {},

 computed: {},

 mounted(){
     this.getList()
 },

 methods: {
      //  渲染table列表
       getList(){
        var that = this
        //开始有加载中效果
        that.listLoading = true
        financiaList(that.listQuery).then(response=>{
             that.financiaList = response.data.items
             that.total = response.data.total
             console.log(that.financiaList)
            // 过了1.5秒就关闭
               setTimeout(() => {
                    this.listLoading = false
                    }, 1.5 * 1000)
                })
    },
       // 搜索事件
     handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
        //表格导出功能
       handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['UID', '用户名', '上级代理ID', '上机代理用户名','交易编号','合约','仓位类型','杠杆','张数','开仓时间','开仓价','平仓价格','手续费','净PNL','PNL','交易类型','状态','成交时间']
        const filterVal = ['uid', 'username', 'Superior_id', 'top_username','deal_numbering','contract_type','position_type','lever','sheets_number','position_time','opening_price','closing_price','handling_fee','jing_PNL','PNL','deal_type','status','transaction_time']
        const data = this.formatJson(filterVal, this.financiaList)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'position_time') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
 }
}

</script>
<style lang="scss" scoped>

</style>