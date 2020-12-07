<template>
    <div class="contracttransaction-container">
           <div class="history-record">
            <el-button style="float:right;" plain @click="historyClick()">历史记录</el-button>
        </div>

           <el-table
            v-loading="listLoading"
            :data="transactionAccount"
            border
            fit
            highlight-current-row
            style="width: 100%;margin-top:30px;"
            :header-cell-style="{'background':'#F0F8FF'}"
            >
         <el-table-column label="币种" align="center" min-width="100px">
            <template slot-scope="{row}">
                <span v-if="row.Currency == 'USBT'">USBT</span>
                <span v-else-if="row.Currency == 'PT'">普通</span>
            </template>
      </el-table-column>
     
      <el-table-column label="账户资产" align="center" min-width="95px">
        <template slot-scope="{row}">
          <span>{{row.sheets_number}}</span>
        </template>
      </el-table-column>
        <el-table-column label="已实现盈亏" align="center" min-width="95px">
        <template slot-scope="{row}">
          <span>{{row.opening_price}}</span>
        </template>
      </el-table-column>
    </el-table>

    </div>
</template>

<script>
import { transactionAccount } from "@/api/contract";
export default {
name:'transactionAccount',
 data () {
 return {
          //表格加载中效果
        listLoading:false,
        transactionAccount:null
    };
 },

 components: {},

 computed: {},

 mounted(){
     this.getList()
 },

 methods: {
      //  点击历史记录
    historyClick(){
        this.$router.push({
            path:'/contract/assetAccount/transactionHistoryRecord'
        })
    },
     getList(){
      var that = this
        //开始有加载中效果
        that.listLoading = true
         transactionAccount().then(response=>{
            //  console.log(response)
            that.transactionAccount = response.data.items
            //  console.log(that.transactionAccount)
             // 过了1.5秒就关闭
               setTimeout(() => {
                    this.listLoading = false
                    }, 1.5 * 1000)
             
         })
     }
 }
}

</script>
<style lang="scss" scoped>

</style>