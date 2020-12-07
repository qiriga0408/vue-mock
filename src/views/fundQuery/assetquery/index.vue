<template>
    <div class="asset-container">
         <div class="filter-container">
         
         <el-row>
             <el-col :span="18">
                 <el-input size="mini" v-model="listQuery.uid" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
             <el-input v-model="listQuery.top_id" size="mini" placeholder="顶级代理ID" style="width:130px;margin-left:20px;margin-top:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
              <el-input v-model="listQuery.topp_username " size="mini" placeholder="顶级昵称" style="width:150px;margin-left:20px;margin-top:10px;" class="filter-item"  @keyup.enter.native="handleFilter"/>
                <el-input v-model="listQuery.top_username " size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px;margin-top:10px;" class="filter-item"  @keyup.enter.native="handleFilter"/>
           
            <el-button  style="margin-top:10px;margin-left:10px;" class="filter-item" size="mini" type="primary" @click="handleFilter">
                搜索
            </el-button>
            <el-button style="margin-top:10px;" class="filter-item" :loading="downloadLoading" @click="handleDownload" size="mini" type="success" >
                导出
            </el-button>
             </el-col>
             <el-col :span="4">
                <div style="margin-top:15px;" @click="filter()">
                高级筛选
                <i class="el-icon-arrow-down" v-if="filters==false"></i>
                <i class="el-icon-arrow-up" v-else></i>
                
                </div>
             </el-col>
        </el-row>
        

          <div class="filter" v-show="filters">
                <el-row style="margin-top:20px;">
                    <el-col :span="24">
                    <span>合约净入金区间</span>
                         <el-input
                            v-model="filtertype.deposit_interval1"
                            style="width:100px;margin-left:15px;"
                            >
                        </el-input>
                        -
                         <el-input
                            style="width:100px"
                            v-model="filtertype.deposit_interval2">
                        </el-input>
                         <span style="margin-left:15px;">平仓笔数区间</span>
                         <el-input
                            v-model="filtertype.number_interval1"
                            style="width:100px;margin-left:15px;margin-top:10px;"
                            >
                        </el-input>
                        -
                         <el-input
                            style="width:100px"
                            v-model="filtertype.number_interval2">
                        </el-input> 
                        <span style="margin-left:15px;">盈亏区间</span>
                         <el-input
                            v-model="filtertype.profit_loss_interval1"
                            style="width:100px;margin-left:15px;margin-top:10px;"
                            >
                        </el-input>
                        -
                         <el-input
                            style="width:100px"
                            v-model="filtertype.profit_loss_interval2">
                        </el-input> 
                        <span style="margin-left:15px;">手续费</span>
                         <el-input
                            v-model="filtertype.handling_fee1"
                            style="width:100px;margin-left:15px;margin-top:10px;"
                            >
                        </el-input>
                        -
                         <el-input
                            style="width:100px"
                            v-model="filtertype.handling_fee2">
                        </el-input> 
                        <span style="margin-left:15px;">净盈亏区间</span>
                         <el-input
                            v-model="filtertype.net_profit_loss_interval1"
                            style="width:100px;margin-left:15px;margin-top:10px;"
                            >
                        </el-input>
                        -
                         <el-input
                            style="width:100px"
                            v-model="filtertype.net_profit_loss_interval2">
                        </el-input> 
                    </el-col>
                </el-row>
                <el-row style="margin-top:20px;">
                    <el-col :span="24">
                         <span style="margin-left:15px;">当前合约权益</span>
                         <el-input
                            v-model="filtertype.contract_equity1"
                            style="width:100px;margin-left:15px;margin-top:10px;"
                            >
                        </el-input>
                        -
                         <el-input
                            style="width:100px"
                            v-model="filtertype.contract_equity2">
                        </el-input>
                         <span style="margin-left:15px;">盈利率区间</span>
                         <el-input
                            v-model="filtertype.profit_rate_interval2"
                            style="width:100px;margin-left:15px;margin-top:10px;"
                            >
                        </el-input>
                        -
                         <el-input
                            style="width:120px"
                            v-model="filtertype.profit_rate_interval1">
                        </el-input>
                         <span style="margin-left:15px;">胜率区间</span>
                         <el-input
                            v-model="filtertype.winning_interval1"
                            style="width:100px;margin-left:15px;margin-top:10px;"
                            >
                        </el-input>
                        -
                         <el-input
                            style="width:100px"
                            v-model="filtertype.winning_interval2">
                        </el-input>
                         <span style="margin-left:15px;">手续费/净入金区间</span>
                         <el-input
                            v-model="filtertype.net_deposit_interval1"
                            style="width:100px;margin-left:15px;margin-top:10px;"
                            >
                        </el-input>
                        -
                         <el-input
                            style="width:100px"
                            v-model="filtertype.net_deposit_interval2">
                        </el-input>
                            <el-button type="success" style="margin-left:20px;" size="mini">高级筛选</el-button>
                            <el-button type="primary" size="mini">批量标签</el-button>
                    </el-col>
                </el-row>
          </div>
        </div>

          <el-table
            v-loading="listLoading"
            :data="assetList"
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
      <el-table-column label="平仓次数" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.lever}}</span>
        </template>
      </el-table-column>
         <el-table-column label="总入金总出金" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.sheets_number}}</span>
            </template>
      </el-table-column>
       <el-table-column label="净入金" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.opening_price}}</span>
            </template>
      </el-table-column>
      <el-table-column label="可用" align="center" min-width="60px">
        <template slot-scope="{row}">
            <span>{{row.closing_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="冻结保证金" align="center" min-width="60px">
        <template slot-scope="{row}">
            <span>{{row.dongjie}}</span>
        </template>
      </el-table-column>
       <el-table-column label="账户权益" min-width="90px" align="center">
            <template slot-scope="{row}">
                <span v-if="row.deal_type == 'CG'">成功</span>
                <span v-else-if="row.deal_type == 'SB'">失败</span>
            </template>
      </el-table-column>
      <el-table-column label="资金费用" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.funding_costs}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手续费" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.handling_fee}}</span>
        </template>
      </el-table-column>
       <el-table-column label="浮动PNL" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.fudong_PNL}}</span>
        </template>
      </el-table-column>
       <el-table-column label="平仓PNL" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.PNL}}</span>
        </template>
      </el-table-column>
      <el-table-column label="净PNL" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.jing_PNL}}</span>
        </template>
      </el-table-column>
        <el-table-column label="风险率" min-width="90px" align="center">
            <template slot-scope="{row}">
                <span v-if="row.feng == 'G'">高</span>
                <span v-else-if="row.feng == 'Z'">中</span>
                <span v-else-if="row.feng == 'X'">小</span>
            </template>
      </el-table-column>
        <el-table-column label="操作" min-width="90px" align="center">
            <template slot-scope="{row}">
               <el-button size="mini">标签</el-button>
            </template>
      </el-table-column>
    </el-table>

   <pagina-tion v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
</template>

<script>
// 封装api
import {assetList} from '@/api/fundQuery'

// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'
export default {
    name:'assetquery',
 data () {
    return {
        //表格加载中效果
        listLoading:false,
    //  控制高级筛选
    filters:true,
    //高级筛选input框绑定
    
    filtertype:{
        // 合约净入金区间
        deposit_interval1:'',
        deposit_interval2:'',
        //平仓笔数区间
        number_interval1:'',
        number_interval2:'',
        // 盈亏区间
        profit_loss_interval1:'',
        profit_loss_interval2:'',
        //手续费
        handling_fee1:'',
        handling_fee2:'',
        // 净盈亏区间
        net_profit_loss_interval1:'',
        net_profit_loss_interval2:'',
        // 当前合约权益
        contract_equity1:'',
        contract_equity2:'',
        // 盈利率区间
        profit_rate_interval1:'',
        profit_rate_interval2:'',
        // 胜率区间
        winning_interval1:'',
        winning_interval2:'',
        // 手续费/净入金区间
        net_deposit_interval1:'',
        net_deposit_interval2:''
       
    },
     //表格下载
     downloadLoading:false,
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
        sort: '+id'
      },
      //table表格接收数据
      assetList:null,
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
        assetList(that.listQuery).then(response=>{
             that.assetList = response.data.items
             that.total = response.data.total
             console.log(that.assetList)
            // 过了1.5秒就关闭
               setTimeout(() => {
                    this.listLoading = false
                    }, 1.5 * 1000)
                })
    },
     //高级筛选
     filter(){
         this.filters = !this.filters
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
        const data = this.formatJson(filterVal, this.assetList)
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
.filter{
    width: 100%;
}

</style>