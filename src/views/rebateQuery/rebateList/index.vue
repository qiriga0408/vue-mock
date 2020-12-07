<template>
    <div class="rebate-container">
       <div class="filter-container">
            <el-input size="mini" v-model="listQuery.uid" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
             <el-input v-model="listQuery.top_id" size="mini" placeholder="顶级代理ID" style="width:130px;margin-left:20px" class="filter-item" @keyup.enter.native="handleFilter" />
              <el-input v-model="listQuery.topp_username " size="mini" placeholder="顶级昵称" style="width:150px;margin-left:20px;margin-top:10px;" class="filter-item"  @keyup.enter.native="handleFilter"/>
                <el-input v-model="listQuery.topp_username " size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px" class="filter-item"  @keyup.enter.native="handleFilter"/>
                 <el-select size="mini" v-model="listQuery.Currency" placeholder="用户类型" clearable   style="width:120px;margin-left:20px;margin-top:10px;" class="filter-item">
              <el-option v-for="item in CurrencyOptions" :key="item.key" :label="item.Currency_name" :value="item.key" />
             </el-select>
              <el-select size="mini" v-model="listQuery.order_type" placeholder="状态" clearable   style="width: 120px;margin-left:20px;" class="filter-item">
              <el-option v-for="item in orderTypeOptions" :key="item.key" :label="item.order_type_name" :value="item.key" />
             </el-select>
             <span style="margin-left:20px;font-size:12px;">返佣时间</span>
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
           
            <el-button  class="filter-item" size="mini" type="primary" @click="handleFilter">
                搜索
            </el-button>
            <el-button class="filter-item" :loading="downloadLoading" @click="handleDownload" size="mini" type="success" >
                导出
            </el-button>
        </div>

         <el-table
            v-loading="listLoading"
            :data="rebateList"
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
      <el-table-column label="用户类型" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span v-if="row.Currency == 'USBT'">USBT</span>
            <span v-else-if="row.Currency == 'PT'">普通</span>
        </template>
      </el-table-column>
         <el-table-column label="用户交易金额" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.sheets_number}}</span>
            </template>
      </el-table-column>
       <el-table-column label="用户手续费" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.handling_fee}}</span>
            </template>
      </el-table-column>
        <el-table-column label="返佣金额" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.funding_costs}}</span>
            </template>
      </el-table-column>
        <el-table-column label="返佣期限" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.jing_PNL}}</span>
            </template>
      </el-table-column>
      <el-table-column label="订单类型" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span v-if="row.order_type == 'YKF'">已开放</span>
            <span v-else-if="row.order_type == 'DKF'">待开放</span>
        </template>
      </el-table-column>
      <el-table-column label="统计时间" align="center" min-width="120px">
        <template slot-scope="{row}">
            <span>{{row.transaction_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开放时间" align="center" min-width="120px">
        <template slot-scope="{row}">
            <span>{{row.open_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" align="center" min-width="120px">
        <template slot-scope="{row}">
           <el-button size="mini" @click="DetailClick(row)">查看</el-button>
        </template>
      </el-table-column>
     
    </el-table>

 
       
<pagina-tion v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  <!--  <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10, 50, 100, 500]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination> 
        -->

    </div>
</template>

<script>
// import Page from '@/components/Pagination'

import {rebateList} from '@/api/rebateQuery'

// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'

const CurrencyOptions = [
    {key:'USBT',Currency_name:'USBT'},
     {key:'PT',Currency_name:'普通'}
]
const orderTypeOptions = [
     {key:'YKF',order_type_name:'已开放'},
     {key:'DKF',order_type_name:'待开放'}
]
export default {
    name:'rebatelist',
      // components: { Page:Page },
 data () {
 return {
 
      //表格下载
     downloadLoading:false,
     orderTypeOptions,
     CurrencyOptions,
    //表格加载中效果
    listLoading:false,
      //页数页码以及搜索
     listQuery: {
        page: 1,
        limit: 20,
        uid: undefined,
        // 顶级代理ID
        top_id: undefined,
        //顶级昵称
        topp_username:undefined,
        // 上级代理用户名
        top_username: undefined,
        // 上级代理ID
        Superior_id:undefined,
        //用户类型
        Currency:undefined,
        //状态
        order_type:undefined,
        //返佣时间
        transaction_time:undefined,
        sort: '+id'
      },
      rebateList:null,
      total:0
    };
 },

 components: {},

 computed: {},

 mounted(){
     this.getList();
 },

 methods: {
   SellPageChange(){
　  　this.listQuery.page = item.currentPage; //页码
},
        //  渲染table列表
       getList(){
        var that = this
        //开始有加载中效果
        that.listLoading = true
        rebateList(that.listQuery).then(response=>{
             that.rebateList = response.data.items
             that.total = response.data.total
             console.log(that.rebateList)
            // 过了1.5秒就关闭
               setTimeout(() => {
                    this.listLoading = false
                    }, 1.5 * 1000)
                })
    },
    //跳转详情页
    DetailClick(row){
        console.log(row)
        this.$router.push({
            path:'/rebateQuery/rebateListDetail',
            query:{row}
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
        const data = this.formatJson(filterVal, this.rebateList)
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
       // 获取子组件传来修改后的pagesize和currentPage，改变数据页码或每页条目，进而请求新数据
    handleSizeChange (page,limit) {
      this.listQuery.page = page
      this.listQuery.limit = limit
      this.getList()
    },
    handleCurrentChange(page,limit){
       this.listQuery.page = page
      this.listQuery.limit = limit
      this.getList()
    },
 }
}

</script>
<style lang="scss" scoped>
</style>