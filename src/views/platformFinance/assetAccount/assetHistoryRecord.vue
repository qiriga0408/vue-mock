<template>
    <div class="historyrecord-container">
          <el-table
            v-loading="listLoading"
            :data="assetHistoryList"
            border
            fit
            highlight-current-row
            style="width: 100%;margin-top:30px;"
            :header-cell-style="{'background':'#F0F8FF'}"
            >
              <el-table-column label="时间" align="center" min-width="90px">
        <template slot-scope="{row}">
          <span>{{row.time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="划转UID" prop="uid"  align="center" min-width="60" >
      <!-- sortable="custom" :class-name="getSortClass('id')" -->
        <template slot-scope="{row}">
          <span>{{ row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="币种" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span v-if="row.Currency == 'USBT'">USBT</span>
            <span v-else-if="row.Currency == 'PT'">普通</span>
        </template>
      </el-table-column>
        <el-table-column label="类型" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span v-if="row.deal_type == 'DD'">订单类型</span>
            <span v-else-if="row.deal_type == 'PT'">普通类型</span>
        </template>
      </el-table-column>
         <el-table-column label="变化数量" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.lever}}</span>
            </template>
      </el-table-column>
       <el-table-column label="剩余可用余额" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.sheets_number}}</span>
            </template>
      </el-table-column>
    
      <el-table-column label="操作人" align="center" min-width="120px">
        <template slot-scope="{row}">
            <span v-if="row.feng=='XT'">系统自动</span>
            <span v-else-if="row.feng=='GLY'">管理员uid</span>
        </template>
      </el-table-column>
     
    </el-table>

   <pagina-tion v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
</template>

<script>
import {assetHistoryRecord} from '@/api/platformFinance'
// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'
export default {
    name:'assetHistoryRecord',
 data () {
 return {
      //表格加载中效果
        listLoading:false,
     assetHistoryList:null,
     total:0,
     //页数页码
     listQuery:{
         page:1,
         limit:20,
         sort:'+id'
     }
    };
 },

 components: {},

 computed: {},

 mounted() {
     this.getList()
 },

 methods: {
     getList(){
         var that = this
          //开始有加载中效果
        that.listLoading = true
         assetHistoryRecord(that.listQuery).then(response=>{
            //  console.log(response)
               that.assetHistoryList = response.data.items
             that.total = response.data.total
             console.log(that.assetHistoryList)
            // 过了1.5秒就关闭
               setTimeout(() => {
                    this.listLoading = false
                    }, 1.5 * 1000)
         })
     },
 }
}

</script>
<style lang="scss" scoped>

</style>