<template>
    <div class="administer-container">
        <div class="filter-container">
            <el-input size="mini" v-model="listQuery.uid" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
            <el-input v-model="listQuery.top_id" size="mini" placeholder="顶级代理ID" style="width:130px;margin-left:20px" class="filter-item" @keyup.enter.native="handleFilter" />
              <el-select size="mini" v-model="listQuery.order_type" placeholder="状态" clearable   style="width: 120px;margin-left:20px;margin-top:10px;" class="filter-item">
                 <el-option v-for="item in orderTypeOptions" :key="item.key" :label="item.order_type_name" :value="item.key" />
             </el-select>
             <span style="margin-left:20px;font-size:12px;">申请时间</span>
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
             <span style="margin-left:20px;font-size:12px;">审核时间</span>
            <el-date-picker
            style="width:220px;margin-top:10px;"
              v-model="listQuery.time"
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
            :data="administerList"
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
       <el-table-column label="订单编号" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.financiaList}}</span>
        </template>
      </el-table-column>
      <el-table-column label="币种" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span v-if="row.Currency == 'USBT'">USBT</span>
            <span v-else-if="row.Currency == 'PT'">普通</span>
        </template>
      </el-table-column>
         <el-table-column label="提现数量" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.sheets_number}}</span>
            </template>
      </el-table-column>
       <el-table-column label="转出地址" min-width="110px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.outgoing_address}}</span>
            </template>
      </el-table-column>
      <el-table-column label="状态" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span v-if="row.order_type == 'TXTG'">提现通过</span>
            <span v-else-if="row.order_type == 'TXSB'">提现拒绝</span>
             <span v-else-if="row.order_type == 'TXSQ'">提现申请</span>
        </template>
      </el-table-column>
      <el-table-column label="发起时间" align="center" min-width="120px">
        <template slot-scope="{row}">
            <span>{{row.transaction_time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
       <el-table-column label="处理时间" align="center" min-width="120px">
        <template slot-scope="{row}">
            <span>{{row.time|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" align="center" min-width="160px">
        <template slot-scope="{row}">
           <el-button size="mini" @click="handleUpdateTG(row)">通过</el-button>
           <el-button size="mini" @click="handleUpdate(row)">查看</el-button>
            <el-button size="mini"  @click="handleUpdateJJ(row)">拒绝</el-button>
        </template>
      </el-table-column>
       <el-table-column label="操作人" align="center" min-width="70px">
        <template slot-scope="{row}">
            <span>{{row.Operator}}</span>
        </template>
      </el-table-column>
       <el-table-column label="备注" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.Remarks}}</span>
        </template>
      </el-table-column>
     
    </el-table>


    <pagina-tion v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

         <!-- 点击查看 -->
    <el-dialog
        title="查看"
        :visible.sync="UpdataDialogVisible"
        width="75%"
        v-dialogDrag
        >
          <el-divider></el-divider>
          <div style="width:100%">
            <div class="wc_1">
                <div class="wc_1-one">UID:</div>
                <div>{{updata.uid}}</div>
            </div>
             <div class="wc_1">
                <div class="wc_1-one">币种:</div>
                <div>{{updata.Currency}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">申请数量:</div>
                <div>{{updata.sheets_number}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">到账数量:</div>
                <div>{{updata.closing_price}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">手续费:</div>
                <div>{{updata.handling_fee}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">转出地址:</div>
                <div>{{updata.outgoing_address}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">申请时间:</div>
                <div>{{updata.transaction_time| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">处理时间:</div>
                <div> {{updata.time| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
            </div>
             <div class="wc_1">
                <div class="wc_1-one">状态:</div>
                <div>
                       <span v-if="updata.order_type == 'TXTG'">提现通过</span>
                       <span v-else-if="updata.order_type == 'TXSB'">提现失败</span>
                       <span v-else-if="updata.order_type == 'TXSQ'">提现申请</span>
                </div>
            </div>
          </div>
          
      
        <span slot="footer" class="dialog-footer">
            <el-button  type="success" @click="UpdataDialogVisible = false">关闭</el-button>    
        </span>
    </el-dialog>


      <!-- 点击通过对话框 -->
    <el-dialog
        title="通过"
        :visible.sync="UpdataTGDialogVisible"
        width="75%"
        v-dialogDrag
        >
          <el-divider></el-divider>
            <div style="width:100%">
            <div class="wc_1">
                <div class="wc_1-one">UID:</div>
                <div>{{updata.uid}}</div>
            </div>
             <div class="wc_1">
                <div class="wc_1-one">币种:</div>
                <div>{{updata.Currency}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">申请数量:</div>
                <div>{{updata.sheets_number}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">到账数量:</div>
                <div>{{updata.closing_price}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">手续费:</div>
                <div>{{updata.handling_fee}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">转出地址:</div>
                <div>{{updata.outgoing_address}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">申请时间:</div>
                <div>{{updata.transaction_time| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">处理时间:</div>
                <div> {{updata.time| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
            </div>
             <div class="wc_1" style="margin-top:20px;">
                <div class="wc_1-one">备注(选填):</div>
                <div>
                      <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="updata.Remarks">
                    </el-input>
                </div>
            </div>
          </div>
     <!--   <el-row>
            <el-col :span="4" style="margin-left:100px;">
                 <div class="grid-content">UID:</div>
                 <div class="grid-content">币种:</div>
                 <div class="grid-content ">申请数量:</div>
                 <div class="grid-content">到账数量:</div>
                 <div class="grid-content">手续费:</div>
                 <div class="grid-content" >转出地址:</div>
                 <div class="grid-content" >申请时间:</div>
                 <div class="grid-content" >处理时间:</div>
                 <div class="grid-content" >备注(选填):</div>
            </el-col>
            <el-col :span="14">
                <div>{{updata.uid}}</div>
                <div >{{updata.Currency}}</div>
                <div >{{updata.sheets_number}}</div>
                <div  >{{updata.closing_price}}</div>
                <div  >{{updata.handling_fee}}</div>
                <div >{{updata.outgoing_address}}</div>
                <div >{{updata.transaction_time| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
                <div>{{updata.time| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
                 <div class="grid-content" >
                   <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="updata.Remarks">
                    </el-input>
                </div>
            </el-col>
        </el-row> -->
        <span slot="footer" class="dialog-footer">
        <span style="margin-left:50px;color:#ffbe47;font-size:14px;">确认信息无误后请谨慎操作</span>
            <el-button  @click="UpdataTGDialogVisible = false">关闭</el-button>
             <el-button  type="success" @click="UpdataTGClick(updata)">确认通过</el-button>    
        </span>
    </el-dialog>

     <!-- 点击拒绝对话框 -->
    <el-dialog
        title="拒绝"
        :visible.sync="UpdataJJDialogVisible"
        width="75%"
        v-dialogDrag
        >
          <el-divider></el-divider>
            <div style="width:100%">
            <div class="wc_1">
                <div class="wc_1-one">UID:</div>
                <div>{{updata.uid}}</div>
            </div>
             <div class="wc_1">
                <div class="wc_1-one">币种:</div>
                <div>{{updata.Currency}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">申请数量:</div>
                <div>{{updata.sheets_number}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">到账数量:</div>
                <div>{{updata.closing_price}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">手续费:</div>
                <div>{{updata.handling_fee}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">转出地址:</div>
                <div>{{updata.outgoing_address}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">申请时间:</div>
                <div>{{updata.transaction_time| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">处理时间:</div>
                <div> {{updata.time| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
            </div>
             <div class="wc_1" style="margin-top:20px;">
                <div class="wc_1-one">备注(选填):</div>
                <div>
                      <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="updata.Remarks">
                    </el-input>
                </div>
            </div>
          </div>
      <!--  <el-row>
            <el-col :span="4" style="margin-left:100px;">
                 <div class="grid-content">UID:</div>
                 <div class="grid-content">币种:</div>
                 <div class="grid-content ">申请数量:</div>
                 <div class="grid-content">到账数量:</div>
                 <div class="grid-content">手续费:</div>
                 <div class="grid-content" >转出地址:</div>
                 <div class="grid-content" >申请时间:</div>
                 <div class="grid-content" >处理时间:</div>
                 <div class="grid-content" >备注(选填):</div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content">{{updata.uid}}</div>
                <div class="grid-content">{{updata.Currency}}</div>
                <div class="grid-content">{{updata.sheets_number}}</div>
                <div class="grid-content" >{{updata.closing_price}}</div>
                <div class="grid-content" >{{updata.handling_fee}}</div>
                <div class="grid-content" >{{updata.outgoing_address}}</div>
                <div class="grid-content" >{{updata.transaction_time| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
                <div class="grid-content" >{{updata.time| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
                 <div class="grid-content" >
                   <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="updata.Remarks">
                    </el-input>
                </div>
            </el-col>
        </el-row> -->
        <span slot="footer" class="dialog-footer">
        <span style="margin-left:50px;color:#ffbe47;font-size:14px;">确认信息无误后请谨慎操作</span>
            <el-button  @click="UpdataJJDialogVisible = false">关闭</el-button>
             <el-button  type="success" @click="UpdataJJClick(updata)">确认拒绝</el-button>    
        </span>
    </el-dialog>


    </div>
</template>

<script>

import {administerList,updateTG,updateJJ} from '@/api/fundQuery'

// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'

const orderTypeOptions = [
     {key:'TXTG',order_type_name:'提现通过'},
     {key:'TXSB',order_type_name:'提现失败'},
     {key:'TXSQ',order_type_name:'提现申请'}
]
export default {
    name:'withdrawaladminister',
 data () {
 return {
          orderTypeOptions,
    //表格加载中效果
    listLoading:false,
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
        //币种
        Currency:undefined,
        //订单类型
        order_type:undefined,
        //成交时间
        transaction_time:undefined,
        //成交编号
        transaction_number:undefined,
        //审核时间
        time:undefined,
        sort: '+id'
      },
       administerList:null,
      total:0,
        //控制查看对话框的显示与隐藏
      UpdataDialogVisible:false,
      //控制通过对话框的显示与隐藏
      UpdataTGDialogVisible:false,
      //控制拒绝对话框的显示与隐藏
      UpdataJJDialogVisible:false,
          //查看获取数据
      updata:{
          //UID
          uid: '',
          //币种
          Currency:'',
        //   申请数量
          sheets_number:'',
          //到账数量
          closing_price:'',
        //   手续费
        handling_fee:'',
        // 转出地址
        outgoing_address:'',
        //申请时间
        transaction_time:'',
        //处理时间
        time:'',
          //状态
          order_type:'',
          //备注
          Remarks:''
         
      },
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
        administerList(that.listQuery).then(response=>{
             that.administerList = response.data.items
             that.total = response.data.total
             console.log(that.administerList)
            // 过了1.5秒就关闭
               setTimeout(() => {
                    this.listLoading = false
                    }, 1.5 * 1000)
                })
    },

    //点击通过
    handleUpdateTG(row){
        var that = this
        that.UpdataTGDialogVisible=true
        // row.order_type = 'TXTG'
        that.updata = row
        console.log(that.updata)
    },

    //查看
    handleUpdate(row){
        // console.log(row)
         var that = this
        that.UpdataDialogVisible = true
         that.updata = Object.assign({}, row) 
        console.log(that.updata) 
    },

     //通过对话框里的确定按钮
     UpdataTGClick(row) {
        //  console.log(row)
         row.order_type = 'TXTG'
         this.updata.order_type = row.order_type
   
          const tempData = Object.assign({}, this.updata)
          updateTG(tempData).then(() => {
            const index = this.administerList.findIndex(v => v.uid === this.updata.uid)
            this.administerList.splice(index, 1, this.updata)
           this.UpdataTGDialogVisible=false
            this.$notify({
              title: '通过成功',
              type: 'success',
              duration: 2000
            })
          })
    },
    UpdataJJClick(row){
         row.order_type = 'TXSB'
         this.updata.order_type = row.order_type
           const tempData = Object.assign({}, this.updata)
          updateJJ(tempData).then(() => {
            const index = this.administerList.findIndex(v => v.uid === this.updata.uid)
            this.administerList.splice(index, 1, this.updata)
           this.UpdataJJDialogVisible=false
            this.$notify({
              title: '已拒绝',
              type: 'success',
              duration: 2000
            })
          })
    },
    //点击拒绝
    handleUpdateJJ(row){
         var that = this
          that.UpdataJJDialogVisible = true
          that.updata = row

    },

        // 搜索事件
     handleFilter() {
      this.listQuery.page = 1
      this.getList()
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

.wc_1{
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  // justify-content: space-around;
  .wc_1-one{
    width: 30%;
    margin-left: 20px;
  }
}
</style>