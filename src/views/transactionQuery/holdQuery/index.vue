<template>
    <div class="hold-cantainer">
        <div class="filter-container">
             <el-input size="mini" v-model="listQuery.uid" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
         <el-input v-model="listQuery.top_id" size="mini" placeholder="顶级代理ID" style="width:130px;margin-left:20px" class="filter-item" @keyup.enter.native="handleFilter" />
          <el-input v-model="listQuery.top_username " size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px;margin-top:10px;" class="filter-item"  @keyup.enter.native="handleFilter"/>
          <!--  -->
         <!-- <div class="block"> -->
            <el-select size="mini" v-model="listQuery.contract_type" placeholder="合约" clearable   style="width: 120px;margin-left:20px;" class="filter-item">
              <el-option v-for="item in contractTypeOptions" :key="item.key" :label="item.contract_type_name" :value="item.key" />
         </el-select>
          <el-select size="mini" v-model="listQuery.position_type" placeholder="仓位类型" clearable   style="width: 120px;margin-left:20px;margin-top:10px;" class="filter-item">
              <el-option v-for="item in positionTypeOptions" :key="item.key" :label="item.position_type_name" :value="item.key" />
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
           <!-- @click="handleFilter" -->
            搜索
        </el-button>
        <el-button class="filter-item" :loading="downloadLoading" @click="handleDownload" size="mini" type="success" >
            导出
        </el-button>
        </div>


         <el-table
      v-loading="listLoading"
      :data="holdList"
      border
      fit
      highlight-current-row
      style="width: 100%; margin-top:20px;"
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
      <el-table-column label="上级代理用户名" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.top_username}}</span>
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
      <el-table-column label="冻结保证金" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.freeze_margin}}</span>
        </template>
      </el-table-column>
      <el-table-column label="开仓均价" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.open_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手续费" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.handling_fee}}</span>
        </template>
      </el-table-column>
      <el-table-column label="资金费用" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.funding_costs}}</span>
        </template>
      </el-table-column>
      <el-table-column label="强平价格" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.liquidation_price}}</span>
        </template>
      </el-table-column>
       <el-table-column label="止盈价" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.surplus_price}}</span>
        </template>
      </el-table-column>
       <el-table-column label="止损价" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.damage_price}}</span>
        </template>
      </el-table-column>
       <el-table-column label="浮动盈亏" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.float_profit_loss}}</span>
        </template>
      </el-table-column>
       <el-table-column label="IP地址" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.ip}}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagina-tion v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />



    </div>
</template>

<script>
// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'
//引入的自定义指令
import waves from '@/directive/waves'
//引入封装接口
import {holdList} from '@/api/transactionQuery'

    const contractTypeOptions = [
        {key:'HY1',contract_type_name:'合约1'},
        {key:'HY2',contract_type_name:'合约2'}
    ]

    const positionTypeOptions = [
        {key:'CW1', position_type_name:'仓位类型1'},
        {key:'CW2', position_type_name:'仓位类型2'}
    ]

export default {
    name:'holdquery',
 data () {
 return {
     //导出加载中效果
      downloadLoading:false,
     //合约类型
     contractTypeOptions,
     //仓位类型
     positionTypeOptions,
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
        //合约类型
        contract_type:undefined,
        // 仓位类型
        position_type:undefined,
        //成交时间
        transaction_time:undefined,
        sort: '+id'
      },
      //表格加载中效果
      listLoading:false,
      //table表格总数据
      holdList:null,
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
    //  请求表格数据
    getList(){
        var that = this
        //开始有加载中效果
        that.listLoading = true
        holdList(that.listQuery).then(response=>{
            
             that.holdList = response.data.items
             that.total = response.data.total
             console.log(that.holdList)
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
        const tHeader = ['UID', '用户名', '顶级代理ID', '上级代理ID', '上机代理用户名','合约','仓位类型','杠杆','张数','冻结保证金','开仓均价','手续费','成交时间','资金费用','强平价格','止盈价','止损价','浮动盈亏','IP地址']
        const filterVal = ['uid', 'username', 'top_id', 'Superior_id', 'top_username','contract_type','position_type','lever','sheets_number','freeze_margin','open_price','handling_fee','transaction_time','funding_costs','liquidation_price','surplus_price','damage_price','float_profit_loss','ip']
        const data = this.formatJson(filterVal, this.holdList)
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
        if (j === 'transaction_time') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
 }
}

</script>
<style lang="scss" scoped>
</style>