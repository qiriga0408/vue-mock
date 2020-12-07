<template>
    <div class="role-container">
          <div class="filter-container">
            <el-button type="success" style="margin-left:60%;margin-top:10px;" @click="createClick()">添加标签</el-button><!--@click="AddClick()"-->
        <div>
            <el-input size="mini" v-model="listQuery.username" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
            <el-select size="mini" v-model="listQuery.Currency" placeholder="分组名称" clearable   style="width: 120px;margin-left:20px;" class="filter-item">
                  <el-option v-for="item in CurrencyOptions" :key="item.key" :label="item.Currency_name" :value="item.key" />
             </el-select>
             <span style="margin-left:20px;font-size:12px;">创建时间</span>
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
                <el-button   class="filter-item" size="mini" type="primary" @click="handleFilter">
                    搜索
                </el-button>
               
            </div>
           
        </div>
          

         <el-table
            v-loading="listLoading"
            :data="roleList"
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
       
      <el-table-column label="分组名称" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span v-if="row.Currency == 'DLS'">代理商</span>
            <span v-else-if="row.Currency == 'YY'">运营</span>
            <span v-else-if="row.Currency == 'GLY'">管理员</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" min-width="110px">
        <template slot-scope="{row}">
            <span>{{row.transaction_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" align="center" min-width="130px">
        <template slot-scope="{row,$index}">
          <el-button size="mini" @click="deleteClick(row,$index)">删除</el-button>
          <el-button size="mini" @click="updataClick(row)">修改</el-button>
          <el-button size="mini" type="warning">重置谷歌</el-button>
        </template>
      </el-table-column>
     
    </el-table>

   <pagina-tion v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

        <!--修改-->
    <el-dialog title="修改" width="80%" v-dialogDrag :visible.sync="updataDialogVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="100px" style="width:90%;">
        <el-form-item label="账号" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
         <el-form-item label="分组名称" prop="type">
          <el-select v-model="temp.Currency" style="width:100%" placeholder="选择分组">
            <el-option v-for="item in CurrencyOptions" :key="item.key" :label="item.Currency_name" :value="item.key" />
          </el-select>
        </el-form-item>
         <el-form-item label="修改时间" prop="transaction_time" >
          <el-date-picker v-model="temp.transaction_time" type="datetime" style="width:100%;"/>
        </el-form-item>
     </el-form>
     
       
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updataDialogClick()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <!--添加标签-->
    <el-dialog title="添加标签" width="80%" v-dialogDrag :visible.sync="createDialogVisible">
      <el-form ref="dataForm" :rules="rules" :model="create" label-position="left" label-width="100px" style="width:90%;">
       <el-form-item label="UID" prop="uid">
          <el-input v-model="create.uid" />
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="create.username" />
        </el-form-item>
         <el-form-item label="分组名称" prop="Currency">
          <el-select v-model="create.Currency" style="width:100%" placeholder="选择分组">
            <el-option v-for="item in CurrencyOptions" :key="item.key" :label="item.Currency_name" :value="item.key" />
          </el-select>
        </el-form-item>
         <el-form-item label="修改时间" prop="transaction_time">
          <el-date-picker v-model="create.transaction_time" style="width:100%" type="datetime" />
        </el-form-item>
     </el-form>
       
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createDialogClick()">
          确定
        </el-button>
      </div>
    </el-dialog>

    </div>
</template>

<script>
import {roleAdminister,roleUpdate,roleCreate} from '@/api/systemAdminister'

// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'

const CurrencyOptions = [
    {key:'DLS',Currency_name:'代理商'},
    {key:'YY',Currency_name:'运营'},
    {key:'GLY',Currency_name:'管理员'}
]
export default {
name:'roleAdminister',
 data () {
 return {
     CurrencyOptions,
     listLoading:false,
     listQuery:{
            page:1,
            limit:20,
            uid:undefined,
            username:undefined,
            top_id:undefined,
            Currency:undefined,
            transaction_time:undefined
        },
        roleList:null,
        total:0,
        //控制修改对话框的显示和隐藏
        updataDialogVisible:false,
        //控制添加对话框的显示和隐藏
        createDialogVisible:false,
        //修改数据
        temp:{
            uid:undefined,
            username:undefined,
            top_id:undefined,
            Currency:undefined,
            transaction_time:new Date()
        },
        create:{
            uid:undefined,
            username:undefined,
            top_id:undefined,
            Currency:undefined,
            transaction_time:new Date()
        },
        rules:{
           uid: [
            { required: true, message: 'uid不能为空', trigger: 'blur' },
          ],
           username: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
          ],
            Currency: [
            {required:true, message: '请选择分组名称', trigger: 'change' }
          ],
        }
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
            roleAdminister(that.listQuery).then(response=>{
             that.roleList = response.data.items
             that.total = response.data.total
             console.log(that.roleList)
            // 过了1.5秒就关闭
               setTimeout(() => {
                    this.listLoading = false
                    }, 1.5 * 1000)
                })
     },
     //删除
     deleteClick(row,index){
         this.roleList.splice(index,1)
          this.$message({
          message: '删除成功',
          type: 'success'
        });
     },
     //修改
     updataClick(row){
         console.log(row)
         this.updataDialogVisible = true
         this.temp = Object.assign({},row)
          this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
         })

     },
     //添加标签按钮
     createClick(){
          this.createDialogVisible = true
           this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
         })
     },
     //添加对话框点击确定
     createDialogClick(){
          this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          roleCreate(this.create).then(() => {
            this.roleList.unshift(this.create)
            this.createDialogVisible = false
            this.$notify({
              title: '添加成功',
              type: 'success',
              duration: 2000
            })
            this.create = {}
          })
          // this.create = {}
        }
      })
     },
     //修改对话框点击确定
     updataDialogClick(){
           this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          roleUpdate(tempData).then(() => {
            const index = this.roleList.findIndex(v => v.uid === this.temp.uid)
            this.roleList.splice(index, 1, this.temp)
            this.updataDialogVisible = false
            this.$notify({
              title: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
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