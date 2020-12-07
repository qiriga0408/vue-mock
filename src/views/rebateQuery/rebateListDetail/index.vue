<template>
 <div class="rebatelistdetail">
    <el-table
            :data="rebateListDetail.rebateList1"
            border
            fit
            highlight-current-row
            style="width: 100%;margin-top:30px;"
            :header-cell-style="{'background':'#F0F8FF'}"
            >
      <el-table-column label="UID" prop="uid"  align="center" min-width="60" >
        <template slot-scope="{row}">
         <!-- <span>{{ row.uid }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center" min-width="90px">
        <template slot-scope="{row}">
         <!-- <span>{{row.username}}</span>  -->
        </template>
      </el-table-column>
       <el-table-column label="用户类型" align="center" min-width="100px">
        <template slot-scope="{row}">
          <!--  <span v-if="row.Currency == 'USBT'">USBT</span> -->
           <!-- <span v-else-if="row.Currency == 'PT'">普通</span> -->
        </template>
      </el-table-column>
       <el-table-column label="用户交易金额" align="center" min-width="95px">
        <template slot-scope="{row}">
         <!-- <span>{{row.top_id}}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="用户手续费" align="center" min-width="90px">
        <template slot-scope="{row}">
          <!--  <span>{{row.topp_username}}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="返佣金额" align="center" min-width="95px">
        <template slot-scope="{row}">
        <!--  <span>{{row.Superior_id}}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="返佣期限" align="center" min-width="90px">
        <template slot-scope="{row}">
          <!--  <span>{{row.top_username}}</span> -->
        </template>
      </el-table-column>
       <el-table-column label="状态" align="center" min-width="100px">
        <template slot-scope="{row}">
           <!--  <span v-if="row.order_type == 'YKF'">已开放</span> -->
           <!--  <span v-else-if="row.order_type == 'DKF'">待开放</span>-->
        </template>
      </el-table-column>
      <el-table-column label="统计时间" align="center" min-width="100px">
        <template slot-scope="{row}">
           <!--   <span>{{row.transaction_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="发放时间" align="center" min-width="100px">
        <template slot-scope="{row}">
           <!-- <span>{{row.transaction_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span> -->
        </template>
      </el-table-column>
    
       <el-table-column label="操作" align="center" min-width="120px">
        <template slot-scope="{row}">
           <el-button size="mini">发放</el-button>
        </template>
      </el-table-column> 
    </el-table> 

     <div class="filter-container">
            <el-input size="mini" v-model="listQuery.uid" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
            <el-input v-model="listQuery.top_id" size="mini" placeholder="上级代理ID/用户名" style="width:130px;margin-left:20px" class="filter-item" @keyup.enter.native="handleFilter" />
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
            :data="rebateListDetail.rebateList2"
            border
            fit
            highlight-current-row
            style="width: 100%;margin-top:30px;"
            :header-cell-style="{'background':'#F0F8FF'}"
            >
      <el-table-column label="交易者UID" prop="uid"  align="center" min-width="60" >
        <template slot-scope="{row}">
         <!-- <span>{{ row.uid }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center" min-width="90px">
        <template slot-scope="{row}">
         <!-- <span>{{row.username}}</span>  -->
        </template>
      </el-table-column>
       <el-table-column label="上级代理ID" align="center" min-width="95px">
        <template slot-scope="{row}">
         <!-- <span>{{row.top_id}}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="上级代理用户名" align="center" min-width="90px">
        <template slot-scope="{row}">
          <!--  <span>{{row.topp_username}}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="交易金额" align="center" min-width="95px">
        <template slot-scope="{row}">
        <!--  <span>{{row.Superior_id}}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="手续费" align="center" min-width="90px">
        <template slot-scope="{row}">
          <!--  <span>{{row.top_username}}</span> -->
        </template>
      </el-table-column>
       <el-table-column label="返佣比例" align="center" min-width="100px">
        <template slot-scope="{row}">
           
        </template>
      </el-table-column>
       <el-table-column label="返佣金额" align="center" min-width="100px">
        <template slot-scope="{row}">
           <!-- <span>{{row.transaction_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="统计时间" align="center" min-width="100px">
        <template slot-scope="{row}">
           <!--   <span>{{row.transaction_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span> -->
        </template>
      </el-table-column>
       <el-table-column label="操作" align="center" min-width="120px">
        <template slot-scope="{row}">
           <el-button size="mini">查看</el-button>
        </template>
      </el-table-column> 
    </el-table> 
    

 </div>
</template>

<script>
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
    name:'rebatalistdetail',
 data (){
   return {
        //表格下载
     downloadLoading:false,
      rebateListDetail:{
         rebateList1:null,
         rebateList2:null
      },
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
        //返佣时间
        transaction_time:undefined,
        sort: '+id'
      },
   };
 },

 components: {},

 computed: {},

 mounted(){
    this.rebatelistDetail()
   // console.log(this.rebateListDetail)
 },

 methods: {
     rebatelistDetail() {
      // var id = this.$route.query.row;
      // this.rebateListDetail.rebateList1 = this.$route.query.row
      // this.rebateListDetail.rebateList2 = this.$route.query.row
      console.log(this.rebateListDetail)
      // console.log(id);
      // rebateListDetail(id).then((response) => {
      //   console.log(response);
      // });
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