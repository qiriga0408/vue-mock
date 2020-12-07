<template>
    <div class="operating-container">
        <div class="filter-container">
             <el-input size="mini" v-model="listQuery.username" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
             <span style="margin-left:20px;font-size:12px;">操作时间</span>
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
        </div>

         <el-table
            v-loading="listLoading"
            :data="operatingList"
            border
            fit
            highlight-current-row
            style="width: 100%;margin-top:30px;"
            :header-cell-style="{'background':'#F0F8FF'}"
            >
            <el-table-column label="操作时间" align="center" min-width="110px">
        <template slot-scope="{row}">
            <span>{{row.transaction_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色账号" align="center" min-width="90px">
        <template slot-scope="{row}">
          <span>{{row.username}}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作类型" align="center" min-width="130px">
        <template slot-scope="{row}">
            <span v-if="row.Currency_type=='PT'">普通</span>
            <span v-if="row.Currency_type=='GLY'">管理员</span>
            <span v-if="row.Currency_type=='YY'">运营</span>
        </template>
      </el-table-column>
       <el-table-column label="操作对象" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span v-if="row.Currency == 'DLS'">代理商</span>
            <span v-else-if="row.Currency == 'YY'">运营</span>
            <span v-else-if="row.Currency == 'GLY'">管理员</span>
        </template>
      </el-table-column>
     
    </el-table>

    <pagina-tion v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    </div>
</template>

<script>
import {operatingLog} from '@/api/systemAdminister'

// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'
export default {
    name:'operatingLog',
 data () {
 return {
        listLoading:false,
          listQuery:{
            page:1,
            limit:20,
            uid:undefined,
            username:undefined,
            top_id:undefined,
            transaction_time:undefined
        },
        operatingList:null,
        total:0,
    };
 },

 components: {},

 computed: {},

 mounted(){
     this.getList()
 },

 methods: {
      //渲染table数据
     getList(){
         var that = this
           //开始有加载中效果
            that.listLoading = true
            operatingLog(that.listQuery).then(response=>{
             that.operatingList = response.data.items
             that.total = response.data.total
             console.log(that.operatingList)
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
 }
}

</script>
<style lang="scss" scoped>

</style>