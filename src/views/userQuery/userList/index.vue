<template>
  <div class="userquery-container">
    <div class="filter-container">

         <el-input size="mini" v-model="listQuery.uid" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter" />
          <el-select size="mini" v-model="listQuery.usertype" placeholder="用户类型" clearable   style="width: 120px;margin-left:20px;" class="filter-item">
              <el-option v-for="item in userTypeOptions" :key="item.key" :label="item.usertype_name" :value="item.key" />
         </el-select>
         <el-input v-model="listQuery.top_id" size="mini" placeholder="顶级代理ID" style="width:130px;margin-left:20px;margin-top:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
          <el-input v-model="listQuery.top_username " size="mini" placeholder="上级代理ID/用户名" style="width:150px;margin-left:20px" class="filter-item" @keyup.enter.native="handleFilter" />
         <!-- <div class="block"> -->
            <span style="margin-left:20px;font-size:15px;">注册时间</span>
            <el-date-picker
            style="width:220px;margin-top:10px;"
            class="picker"
              v-model="listQuery.registration_time"
              size="mini"
              type="daterange"
              range-separator="-"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              >
            </el-date-picker>
             <span style="margin-left:20px;font-size:12px;">最后登录时间</span>
            <el-date-picker
            style="width:220px;margin-top:10px;"
              v-model="listQuery.last_login_time"
              size="mini"
              type="daterange"
              range-separator="-"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              >
            </el-date-picker>
             <el-select size="mini" v-model="listQuery.label" placeholder="标签" clearable   style="width: 120px;margin-left:20px;margin-top:10px;" class="filter-item">
              <el-option v-for="item in userTypeOptions" :key="item.key" :label="item.usertype_name" :value="item.key" />
         </el-select>
          <el-button v-waves class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
        </el-button>
        <!-- </div> -->
    </div>
    <!-- :key="tableKey" -->
    <!-- @sort-change="sortChange" -->
    <el-table
      v-loading="listLoading"
      :data="userList"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top:20px;"
       :header-cell-style="{'background':'#F0F8FF'}"
    >
      <el-table-column label="UID" prop="uid"  align="center" width="80" >
      <!-- sortable="custom" :class-name="getSortClass('id')" -->
        <template slot-scope="{row}">
          <span>{{ row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center" min-width="100px">
        <template slot-scope="{row}">
          <span>{{row.username}}</span>
          <!-- <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
          <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="用户类型" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.usertype=='DJDL'">顶级代理</span>
          <span v-else-if="row.usertype=='DL'">代理</span>
          <span v-else-if="row.usertype=='ZTYH'">直推用户</span>
          <span v-else-if="row.usertype=='PTYH'">普通用户</span>
        </template>
      </el-table-column>
      <el-table-column label="KYC状态" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.status == 'YCG'">已成功</span>
          <span v-else-if="row.status == 'SHZ'">审核中</span>
          <!-- <span v-else>失败</span> -->
        </template>
      </el-table-column>
      <el-table-column label="邀请码" min-width="80px">
        <template slot-scope="{row}">
            <span>{{row.invite_code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="顶级代理ID" align="center" min-width="95px">
        <template slot-scope="{row}">
          <span>{{row.top_id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级代理用户名" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.top_username}}</span>
        </template>
      </el-table-column>
       <el-table-column label="下级代理人数" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.under_number}}</span>
        </template>
      </el-table-column>
       <el-table-column label="直推人数" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.direct_number}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手续费返佣比例" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.formalities_proportion}}%</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.registration_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后登录时间" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.registration_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
       <el-table-column label="最后登录IP" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.Ip}}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签" align="center" min-width="60px">
        <template slot-scope="{row}">
         
          <!-- <el-button plain size="mini">朴素按钮</el-button> -->
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" min-width="60px">
        <template slot-scope="{row}">
             <span>{{row.remarks}}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" align="center" min-width="230px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
         <!-- <el-tag :type="row.label | statusFilter">
            <span v-if="row.label=='published'">划转</span>
          </el-tag> -->
          <el-button plain  size="mini" @click="labelClick(row)">划转</el-button>
        <el-button plain size="mini" @click="Remarks(row,$index)">备注</el-button>
          <el-button plain size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='SHZ'" size="mini" type="success" @click="handleModifyStatus(row,'SHZ')">
            已成功
          </el-button>
          <el-button v-if="row.status!='YCG'" size="mini" @click="handleModifyStatus(row,'YCG')">
            审核中
          </el-button>
          <el-button type="success" size="mini" v-if="row.usertype == 'PTYH'" @click="handPromote(row)">提升代理</el-button>
          <el-button size="mini" type="warning" @click="handleCK(row,$index)">
            查看
          </el-button>
        </template>
      </el-table-column>
     
    </el-table>

  <!-- 引入封装分页组件 -->
   
   <pagina-tion v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    
 

   <!-- 备注 -->
    <el-dialog  v-dialogDrag :visible.sync="RemarksDialogPvVisible"  width="70%" title="编辑">
    <!-- 分割线 -->
      <el-divider></el-divider>
           <el-form ref="remarksform"  :model="temp" label-position="left" label-width="25%" style="width:90%">
             <el-form-item  label="备注" prop="remarks">
                <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="temp.remarks"/>
                 </el-form-item>
              </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="RemarksDialogClick">确定</el-button>
      </span>
    </el-dialog>


<!-- //新增还有编辑弹框 -->
    <el-dialog v-dialogDrag :title="textMap[dialogStatus]" width="80%" :visible.sync="dialogFormVisible">
     <!-- 分割线 -->
      <el-divider></el-divider>
      <el-form ref="dataForm"  :rules="rules" :model="temp" label-position="left" label-width="25%" style="width:90%;">
        <el-form-item label="UID" prop="uid">
          <!-- <el-select v-model="temp.uid" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select> -->
           <el-input v-model="temp.uid" />
        </el-form-item>
          <el-form-item label="用户名" prop="username">
          <!-- <el-select v-model="temp.uid" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select> -->
           <el-input v-model="temp.username" />
        </el-form-item>
         <el-form-item label="用户类型" prop="usertype"><!--v-if="temp.usertype=='DL'" -->
          <el-select v-model="temp.usertype" class="filter-item" placeholder="Please select">
            <el-option v-for="item in userTypeOptions" :key="item.key" :label="item.usertype_name" :value="item.key" />
          </el-select>
        </el-form-item>
          <el-form-item label="上级邀请码" prop="invite_code" >
             <!-- <template slot-scope="row"> -->
              <el-row>
                <el-col :span="19">
                  <div class="grid-content bg-purple" >
                    <el-input v-model="temp.invite_code"  v-if="temp.invite_code_edit"></el-input>
                    <el-input v-model="temp.invite_code" :disabled="true" v-else></el-input>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple-light">
                    <el-button type="success" @click="temp.invite_code_edit = !temp.invite_code_edit">修改</el-button>
                    <!-- <el-button @click="add(row)">完成</el-button> -->
                  </div>
                </el-col>
              </el-row>
            <!-- </template> -->
        </el-form-item>

         <el-form-item label="手续费分佣比例" prop="formalities_proportion" >
           <el-input v-model="temp.formalities_proportion"/>
         
        </el-form-item>
         
         <el-form-item label="发放期限" prop="issue" >
           <el-input v-model="temp.issue" />
        </el-form-item>
        <el-form-item label="是否可查看平仓盈亏" prop="profit" >
              <el-radio v-model="temp.profit" :label="false">否</el-radio>
             <el-radio v-model="temp.profit" :label="true">是</el-radio>
        </el-form-item>
        <!-- 分割线 -->
      <!-- <el-divider></el-divider> -->

        <el-form-item label="交易状态" prop="trading_status">
          <el-select v-model="temp.trading_status" class="filter-item">
            <el-option v-for="item in tradingStatusOptions" :key="item.key" :label="item.tradingsatus_name" :value="item.key" />
          </el-select>
        </el-form-item>
         <el-form-item label="登录状态" prop="login_status">
          <el-select v-model="temp.login_status" class="filter-item">
            <el-option v-for="item in loginStatusOptions" :key="item.key" :label="item.loginstatus_name" :value="item.key" />
          </el-select>
        </el-form-item>
         <el-form-item label="提币状态" prop="withdrawal_status">
          <el-select v-model="temp.withdrawal_status" class="filter-item">
            <el-option v-for="item in withdrawalStatusOptions" :key="item.key" :label="item.withdrawalstatus_name" :value="item.key" />
          </el-select>
        </el-form-item>

      </el-form> 
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
        <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button> -->
      </div>
    </el-dialog>
    
    <!-- 提升代理对话框 -->
    <el-dialog
      title="提升代理"
      :visible.sync="PromoteDialogVisible"
      width="70%"
      v-dialogDrag
      >
     <el-form ref="PromoteForm" label-position="left" :model="PromoteForm" label-width="20%" style="width:90%">
        <el-form-item label="UID" prop="uid">
          <el-input v-model="PromoteForm.uid"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="PromoteForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="usertype"><!--v-if="temp.usertype=='DL'" -->
          <el-select v-model="PromoteForm.usertype" class="filter-item" placeholder="Please select">
            <el-option v-for="item in userTypeOptions" :key="item.key" :label="item.usertype_name" :value="item.key" />
          </el-select>
        </el-form-item>
         <el-form-item label="上级邀请码" prop="invite_code">
          <el-input v-model="PromoteForm.invite_code"></el-input>
        </el-form-item>
         <el-form-item label="手续费分佣比例" prop="formalities_proportion" >
           <el-input v-model="PromoteForm.formalities_proportion"  suffix-icon="el-icon-male" />
        </el-form-item>
         <el-form-item label="发放期限" prop="issue" >
           <el-input v-model="PromoteForm.issue" />
        </el-form-item>
        <el-form-item label="是否可查看平仓盈亏" prop="profit" >
              <el-radio v-model="PromoteForm.profit" :label="false">否</el-radio>
             <el-radio v-model="PromoteForm.profit" :label="true">是</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="PromoteDialogClick()">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
// import deMo from '@/components/Demo/index'
import {userList,userQueryUpdate,userQueryPromoteUpdata,userQueryRemarksUpdata} from '@/api/userQuery'

// import {unserinfo} from '@/api/user'

import axios from 'axios'



// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'

//引入的自定义指令
import waves from '@/directive/waves'

const userTypeOptions = [
  {key:'DJDL',usertype_name:'顶级代理'},
  {key:'DL',usertype_name:'代理'},
  {key:'ZTYH',usertype_name:'直推用户'},
  {key:'PTYH',usertype_name:'普通用户'}
]

const tradingStatusOptions = [
  {key:'0',tradingsatus_name:'允许交易'},
  {key:'1',tradingsatus_name:'禁止交易'}
]

const loginStatusOptions = [
  
  {key:'0',loginstatus_name:'禁止登陆'},
  {key:'1',loginstatus_name:'允许登陆'},
]

const withdrawalStatusOptions = [
  {key:'0',withdrawalstatus_name:'允许提币'},
  {key:'1',withdrawalstatus_name:'禁止提币'}
]
export default {
  name: "userList",
   directives: { waves },
  data() {
    return {
      
      //表格数据
      userList:null,
      //分页的数量
        total: 0,
      //页数页码以及搜索
      listQuery: {
        page: 1,
        limit: 20,
        uid: '',
        usertype: undefined,
        top_id: undefined,
        top_username: '',
        registration_time: undefined,
        last_login_time: undefined,
        label: undefined,
        sort: '+id'
      },
      //表格加载中效果
      listLoading: true,
      //控制点击备注出现的弹框
      RemarksDialogPvVisible:false,
      //备注弹框文本绑定
      textarea:'',
      //编辑后的数据
       temp: {
        //UID
        uid:undefined,
        //用户名
        username:'',
        //用户类型
        usertype:'',
        //邀请码
        invite_code:'',
        //手续费往返比例
        formalities_proportion:'',
        //发放期限
        issue:1,
        //是否可查看平仓盈亏
        profit:false,
        //交易状态
        trading_status:'',
        //登录状态
        login_status:'',
        //  提币状态
        withdrawal_status:'',
        // 备注
        remarks:''
      },
      //是新增还是修改状态
      dialogStatus:'',
      //新增还是编辑弹框显示和隐藏
      dialogFormVisible:false,
      // 是新增还是编辑
       textMap: {
        update: '编辑',
        create: '新增'
      },
      //用户类型
      userTypeOptions,
      //交易状态
      tradingStatusOptions,
      //登录状态
      loginStatusOptions,
      // 提币状态
      withdrawalStatusOptions,
      //提升代理对话框显示和隐藏
      PromoteDialogVisible:false,
      //提升代理对话框绑定
      PromoteForm:{
         //UID
        uid:undefined,
        //用户名
        username:'',
        //用户类型
        usertype:'',
        //邀请码
        invite_code:'',
        //手续费往返比例
        formalities_proportion:'',
        //发放期限
        issue:1,
        //是否可查看平仓盈亏
        profit:false,
        
      },
      rules:{
        uid:[
          { required: true, message: 'uid不能为空', trigger: 'blur' }
        ],
        username:[
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        formalities_proportion:[
          { required: true, message: '手续费分佣比例不能为空', trigger: 'blur' }
        ],
        issue:[
          { required: true, message: '发放期限不能为空', trigger: 'blur' }
        ],
      }
    };
  },
  // 过滤器
   filters: {
     //过滤标签
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },

  components: {},

  computed: {},

  mounted(){
    this.getList()
    // this.userInfo()
  },

  methods: {
    // 测试
    // userInfo(){
    //   // http://manage.officeqb.com/managers/v1/manager/
     
    //   unserinfo({'pageNo':this.listQuery.page,'pagesize':this.listQuery.limit,'uid':this.listQuery.uid,'username':this.listQuery.top_username}).then(res=>{
    //     console.log('1111',res)
    //   })
    // },
  

    //请求表格数据
    getList(){
      var that = this
      //开始有加载中效果
      that.listLoading = true
      userList(that.listQuery).then((response)=>{
        // console.log(response)
        that.userList = response.data.items
        that.total = response.data.total
        console.log('测试',that.userList)
        setTimeout(() => {
          // 过了1.5秒就关闭
          that.listLoading = false
        }, 1500);
      })
    },
  
    //点击备注按钮
    Remarks(row,index){
      let that = this
      that.temp = Object.assign({},row)
      that.RemarksDialogPvVisible=true
       that.$nextTick(() => {
        that.$refs['remarksform'].clearValidate()
      })
      
    },
    //备注对话框里面确定按钮
    RemarksDialogClick(){
      var that = this
       const tempData = Object.assign({}, that.temp.remarks)
       console.log(tempData)
       userQueryRemarksUpdata(tempData).then(() => {
            const index = that.userList.findIndex(v => v.uid === that.temp.uid)
            that.userList.splice(index, 1, that.temp)
            // that.userList.push(index,1,that.temp.remarks)
            console.log(that.userList)
            that.RemarksDialogPvVisible = false
            that.$notify({
              title: '备注修改成功',
              type: 'success',
              duration: 2000
            })
          })
          // this.getList()

    },
    //修改和新增
     handleUpdate(row) {
       var that = this
      //  console.log('284',row)
      that.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      that.dialogStatus = 'update'
      that.dialogFormVisible = true
      that.$nextTick(() => {
        that.$refs['dataForm'].clearValidate()
      })
      // console.log('307',that.temp)
    },
    //编辑对话框里的确定按钮
     updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          userQueryUpdate(tempData).then(() => {
            const index = this.userList.findIndex(v => v.uid === this.temp.uid)
            this.userList.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '编辑成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    //kfc状态审核中和未审核
     handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    //点击划转事件
    labelClick(row){
      console.log(row)
    },
    //普通用户提升代理
    handPromote(row){
      var that = this
      console.log(row)
      that.PromoteForm = Object.assign({}, row)
      that.PromoteDialogVisible=true
       that.$nextTick(() => {
        that.$refs['PromoteForm'].clearValidate()
      })
    },
    //普通用户提升代理对话框点击确定
    PromoteDialogClick(){
         this.$refs['PromoteForm'].validate((valid) => {
        if (valid) {
          const PromoteForm = Object.assign({}, this.PromoteForm)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          userQueryPromoteUpdata(PromoteForm).then(() => {
            const index = this.userList.findIndex(v => v.uid === this.PromoteForm.uid)
            this.userList.splice(index, 1, this.PromoteForm)
             this.PromoteDialogVisible = false
            this.$notify({
              title: '编辑成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    //点击查看跳转详情页
      handleCK(row) {
        // console.log(row.uid)
        this.$router.push({
          path:'/userQuery/userListDetail',
          query:{row}
        })
      
    },
    // 回车搜索事件
     handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
  },
};
</script>
<style lang="scss" scoped>
.block{
  display: flex;
}


</style>