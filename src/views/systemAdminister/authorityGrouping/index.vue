<template>
    <div class="authority-container">
         <div class="filter-container">
            <el-button type="success" style="margin-left:60%;margin-top:15px;" @click="AddClick()">添加分组</el-button><!--@click="AddClick()"-->
        </div>

         <el-table
            v-loading="listLoading"
            :data="authorityList"
            border
            fit
            highlight-current-row
            style="width: 100%;margin-top:30px;"
            :header-cell-style="{'background':'#F0F8FF'}"
            >
      <el-table-column label="角色账号" align="center" min-width="90px">
        <template slot-scope="{row}">
          <span>{{row.username}}</span>
        </template>
      </el-table-column>
        
      <el-table-column label="创建时间" align="center" min-width="110px">
        <template slot-scope="{row}">
            <span>{{row.transaction_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" align="center" min-width="130px">
        <template slot-scope="{row,$index}">
          <el-button size="mini">删除</el-button> <!-- @click="deleteClick(row,$index)"  @click="updataClick(row)" -->
          <el-button size="mini">修改</el-button>
        </template>
      </el-table-column>
     
    </el-table>

   <pagina-tion v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />



    </div>
</template>

<script>
import {authorityGrouping} from '@/api/systemAdminister'
// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'
export default {
    name:'authorityGrouping',
 data () {
 return {
         listLoading:false,
        listQuery:{
            page:1,
            limit:20,
        },
        authorityList:null,
        total:0,
    };
 },

 components: {},

 computed: {},

 mounted(){
     this.getList()
 },

 methods: {
     //添加分组
     AddClick(){
         this.$router.push({
             path:'/systemAdminister/roleAdminister/addGroup',
             query:{uid:'',username:'',type:"2"}
         })
     },
       //渲染table数据
     getList(){
         var that = this
           //开始有加载中效果
            that.listLoading = true
            authorityGrouping(that.listQuery).then(response=>{
             that.authorityList = response.data.items
             that.total = response.data.total
             console.log(that.authorityList)
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