<template>
    <div class="open-cantainer">
          <div class="filter-container">
             <el-input size="mini" v-model="listQuery.uid" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
             <el-input v-model="listQuery.deal_numbering" size="mini" placeholder="交易编号" style="width:130px;margin-left:20px" class="filter-item" @keyup.enter.native="handleFilter" />
              <el-input v-model="listQuery.top_username " size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px;margin-top:10px;" class="filter-item"  @keyup.enter.native="handleFilter"/>
          <!--  -->
         <!-- <div class="block"> -->
            <el-select size="mini" v-model="listQuery.contract_type" placeholder="合约" clearable   style="width: 120px;margin-left:20px;" class="filter-item">
              <el-option v-for="item in contractTypeOptions" :key="item.key" :label="item.contract_type_name" :value="item.key" />
            </el-select>
             <el-select size="mini" v-model="listQuery.position_type" placeholder="仓位类型" clearable   style="width: 120px;margin-left:20px;margin-top:10px;" class="filter-item">
              <el-option v-for="item in positionTypeOptions" :key="item.key" :label="item.position_type_name" :value="item.key" />
             </el-select>
              <el-select size="mini" v-model="listQuery.deal_type" placeholder="交易类型" clearable   style="width: 120px;margin-left:20px;" class="filter-item">
              <el-option v-for="item in dealTypeOptions" :key="item.key" :label="item.deal_type_name" :value="item.key" />
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
         
            <el-button  class="filter-item" size="mini" type="primary"  @click="handleFilter">
                搜索
            </el-button>
            <el-button class="filter-item" :loading="downloadLoading" @click="handleDownload" size="mini" type="success" >
            导出
        </el-button>
        </div>

         <el-table
            v-loading="listLoading"
            :data="openList"
            border
            fit
            highlight-current-row
            style="width: 100%;margin-top:20px;"
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
      <el-table-column label="交易编号" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.deal_numbering}}</span>
        </template>
      </el-table-column>
         <el-table-column label="合约" min-width="90px" align="center">
            <template slot-scope="{row}">
            <span v-if="row.contract_type == 'HY1'">合约1</span>
            <span v-else-if="row.contract_type == 'HY2'">合约2</span>
            </template>
      </el-table-column>
       <el-table-column label="仓位类型" min-width="90px" align="center">
            <template slot-scope="{row}">
            <span v-if="row.position_type == 'CW1'">仓位类型1</span>
            <span v-else-if="row.position_type == 'CW2'">仓位类型2</span>
            </template>
      </el-table-column>
      <el-table-column label="杠杆" align="center" min-width="60px">
        <template slot-scope="{row}">
            <span>{{row.lever}}</span>
        </template>
      </el-table-column>
      <el-table-column label="张数" align="center" min-width="60px">
        <template slot-scope="{row}">
            <span>{{row.sheets_number}}</span>
        </template>
      </el-table-column>
      <el-table-column label="委托时间" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.position_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="委托价格" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.opening_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手续费" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.handling_fee}}</span>
        </template>
      </el-table-column>
        <el-table-column label="交易类型" min-width="90px" align="center">
            <template slot-scope="{row}">
                <span v-if="row.deal_type == 'YJY'">已交易</span>
                <span v-else-if="row.deal_type == 'WJY'">未交易</span>
            </template>
      </el-table-column>
        <el-table-column label="状态" min-width="90px" align="center">
            <template slot-scope="{row}">
                <span v-if="row.status == 'YCJ'">已成交</span>
                <span v-else-if="row.status == 'DCJ'">待成交</span>
                <span v-else-if="row.status == 'YCX'">已撤销</span>
            </template>
      </el-table-column>
       <el-table-column label="IP地址" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.ip}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.updata_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
    </el-table>

   <pagina-tion v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />


    </div>
</template>

<script>

//封装的api
import {openList} from '@/api/transactionQuery'
// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'

 const contractTypeOptions = [
        {key:'HY1',contract_type_name:'合约1'},
        {key:'HY2',contract_type_name:'合约2'}
    ]

    const positionTypeOptions = [
        {key:'CW1', position_type_name:'仓位类型1'},
        {key:'CW2', position_type_name:'仓位类型2'}
    ]

    const dealTypeOptions = [
        {key:'YJY', deal_type_name:'已交易'},
        {key:'WJY', deal_type_name:'未交易'}
    ]
    const statusOptions = [
        {key:'YCJ', status_name:'已成交'},
        {key:'DCJ', status_name:'待成交'},
        {key:'YCX', status_name:'已撤销'}
    ]
export default {
    name:'openquery',
 data () {
 return {
      //导出加载中效果
      downloadLoading:false,
       //合约类型
     contractTypeOptions,
     //仓位类型
     positionTypeOptions,
     //交易类型
     dealTypeOptions,
     //状态
     statusOptions,
         //页数页码以及搜索
      listQuery: {
        page: 1,
        limit: 20,
        uid: undefined,
        // 交易编号
        deal_numbering: undefined,
        // 上级代理用户名
        top_username: undefined,
        // 上级代理ID
        Superior_id:undefined,
        //合约类型
        contract_type:undefined,
        // 仓位类型
        position_type:undefined,
        //交易类型
        deal_type:undefined,
        //成交时间
        transaction_time:undefined,
        sort: '+id'
      },
         //表格加载中效果
      listLoading:false,
      //table表格总数据
      openList:null,
      //总条数，默认为0
      total:0
    };
 },

 components: {},

 computed: {},

 mounted(){
      this.getList()
 },

 methods: {
       getList(){
        var that = this
        //开始有加载中效果
        that.listLoading = true
        openList(that.listQuery).then(response=>{
             that.openList = response.data.items
             that.total = response.data.total
             console.log(that.openList)
             setTimeout(() => {
            // 过了1.5秒就关闭
            that.listLoading = false
            }, 1500);
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
        const data = this.formatJson(filterVal, this.openList)
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