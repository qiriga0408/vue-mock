<template>
    <div contractasset-container>
          <div class="history-record">
            <el-button style="float:right;" plain @click="historyClick()">历史记录</el-button>
        </div>

           <el-table
            v-loading="listLoading"
            :data="assetAccount"
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
     
      <el-table-column label="可用数量" align="center" min-width="95px">
        <template slot-scope="{row}">
          <span>{{row.lever}}</span>
        </template>
      </el-table-column>
      <el-table-column label="冻结数量" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.sheets_number}}</span>
        </template>
      </el-table-column>
         <el-table-column label="平台负债" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.opening_price}}</span>
            </template>
      </el-table-column>
          <el-table-column label="操作" min-width="90px" align="center">
            <template slot-scope="{row}">
                <el-button v-if="row.deal_type=='CB'" size="mini">充币</el-button>
                <el-button v-else-if="row.deal_type=='TB'" size="mini">提币</el-button>
                <el-button v-else-if="row.deal_type=='KT'" size="mini">空投</el-button>
            </template>
      </el-table-column>
     
    </el-table>
    </div>
</template>

<script>
import {assetAccount} from '@/api/contract'
export default {
    name:'assetAccount',
 data () {
 return {
      //表格加载中效果
        listLoading:false,
        assetAccount:null
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
            path:'/contract/assetAccount/assetHistoryRecord'
        })
    },
       //数据
     getList(){
          var that = this
        //开始有加载中效果
        that.listLoading = true
         assetAccount().then(response=>{
               that.assetAccount = response.data.items
             console.log(that.assetAccount)
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