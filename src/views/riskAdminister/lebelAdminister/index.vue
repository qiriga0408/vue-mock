<template>
    <div class="lebeladminister-container">
        <div class="filter-container">
            <el-button type="success" style="margin-left:30%;margin-top:15px;" @click="AddClick()">添加标签</el-button>
        </div>

          <el-table
            v-loading="listLoading"
            :data="lebelList"
            border
            fit
            highlight-current-row
            style="width: 100%;margin-top:30px;"
            :header-cell-style="{'background':'#F0F8FF'}"
            >
      <el-table-column label="标签名称" align="center" min-width="90px">
        <template slot-scope="{row}">
          <span>{{row.username}}</span>
        </template>
      </el-table-column>
       <el-table-column label="合约" align="center" min-width="95px">
        <template slot-scope="{row}">
          <span v-if="row.deal_type == 'HY1'">合约1</span>
          <span v-else-if="row.deal_type == 'HY2'">合约2</span>
        </template>
      </el-table-column>
      <el-table-column label="最大杠杆" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.lever}}</span>
        </template>
      </el-table-column>
      <el-table-column label="单笔最大下单量" align="center" min-width="95px">
        <template slot-scope="{row}">
          <span>{{row.sheets_number}}</span>
        </template>
      </el-table-column>
      <el-table-column label="单笔最小下单量" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.opening_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最大持仓" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.handling_fee}}</span>
        </template>
      </el-table-column>
         <el-table-column label="点差" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.closing_price}}</span>
            </template>
      </el-table-column>
       <el-table-column label="手续费率" min-width="90px" align="center">
            <template slot-scope="{row}">
                 <span>{{row.jing_PNL}}</span>
            </template>
      </el-table-column>
      <el-table-column label="资金费率" align="center" min-width="60px">
        <template slot-scope="{row}">
            <span>{{row.PNL}}</span>
        </template>
      </el-table-column>
      <el-table-column label="协议平仓线" align="center" min-width="60px">
        <template slot-scope="{row}">
            <span>{{row.dongjie}}</span>
        </template>
      </el-table-column>
       <el-table-column label="状态" min-width="90px" align="center">
            <template slot-scope="{row}">
                <span v-if="row.feng == 'CG'">成功</span>
                <span v-else-if="row.feng == 'SB'">失败</span>
                <span v-else-if="row.feng == 'SC'">审核</span>
            </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" min-width="90px">
        <template slot-scope="{row}">
            <span>{{row.transaction_time| parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
        <el-table-column label="操作" min-width="140px" align="center">
            <template slot-scope="{row}">
               <el-button size="mini">编辑</el-button>
            <el-button v-if="row.status!='GB'" size="mini" type="success" @click="handleModifyStatus(row,'GB')">
            开启
          </el-button>
          <el-button v-if="row.status!='KQ'" size="mini" type="warning" @click="handleModifyStatus(row,'KQ')">
            关闭
          </el-button>
            </template>
      </el-table-column>
    </el-table>
   <pagina-tion v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

        <el-dialog
            title="添加标签"
            :visible.sync="AddDialogVisible"
            width="80%"
            v-dialogDrag>
           
      <el-form ref="AddForm" :rules="rules" :model="AddForm" label-width="120px" style="width:90%;" :label-position="labelPosition">
        <el-form-item label="标签名称" :label-position="labelPosition" prop="username">
            <el-input v-model="AddForm.username"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="选择合约" prop="deal_type">
            <el-select v-model="AddForm.deal_type" placeholder="请选择合约" style="width:100%;">
                <el-option v-for="item in dealTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"></el-option>
            </el-select>
        </el-form-item> 
        <el-form-item label="最大杠杆"  prop="lever">
            <el-input v-model="AddForm.lever"></el-input>
        </el-form-item>
        <el-form-item label="单笔最大下单量"  prop="sheets_number">
            <el-input v-model="AddForm.sheets_number"></el-input>
        </el-form-item>
        <el-form-item label="最大持仓量"  prop="handling_fee">
            <el-input v-model="AddForm.handling_fee"></el-input>
        </el-form-item>
        <el-form-item label="点差" prop="closing_price">
            <el-input v-model="AddForm.closing_price"></el-input>
        </el-form-item>
        <el-form-item label="手续费率" prop="jing_PNL">
            <el-input v-model="AddForm.jing_PNL"></el-input>
        </el-form-item>
        <el-form-item label="资金费率" prop="PNL">
            <el-input v-model="AddForm.PNL"></el-input>
        </el-form-item>
        <el-form-item label="协议平仓线" prop="dongjie">
            <el-input v-model="AddForm.dongjie"></el-input>
        </el-form-item>
         <el-divider></el-divider>
         <el-button style="width:90%;margin-left:5%">设置其他合约</el-button>
</el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="CreateClick()">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
import {lebelList,lebelCreate} from '@/api/riskAdminister'

// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'

const dealTypeOptions = [
    { key: 'HY1', display_name: '合约1' },
    { key: 'HY2', display_name: '合约2' },
]

export default {
    name:'lebelAdminister',
 data () {
 return {
     dealTypeOptions,
      labelPosition: 'left',
    //  添加对话框绑定
      AddForm: {
          uid:'',
        //   标签名称
          username: '',
        //   选择合约
          deal_type: '',
          //最大杠杆
          lever:'',
        //   单笔最大下单量
        sheets_number:'',
        //   最大持仓量
        handling_fee:'',
        //   点差
        closing_price:'',
        //   手续费率
        jing_PNL:'',
        //   资金费率,
        PNL:'',
        //   协议平仓线
        dongjie:'',
        transaction_time:new Date(),
        feng:'SC',
        status:'GB',
        opening_price:0
        },
     //控制添加标签对话框的显示和隐藏
     AddDialogVisible:false,
        //表格加载中效果
        listLoading:false,
        // 页数页码
        listQuery:{
            page:1,
            limit:20,
            sort:'+id'
        },
        lebelList:null,
        total:0,
        rules:{
            username:[
                  { required: true, message: '请输入标签', trigger: 'blur' },
            ],
             deal_type:[
                  { required: true, message: '请选择合约', trigger: 'change' }
            ],
             lever:[
                  { required: true, message: '请输入', trigger: 'blur' },
            ],
             sheets_number:[
                  { required: true, message: '请输入', trigger: 'blur' },
            ],
             handling_fee:[
                  { required: true, message: '请输入', trigger: 'blur' },
            ],
             closing_price:[
                  { required: true, message: '请输入', trigger: 'blur' },
            ],
             jing_PNL:[
                  { required: true, message: '请输入', trigger: 'blur' },
            ],
             PNL:[
                  { required: true, message: '请输入', trigger: 'blur' },
            ],
             dongjie:[
                  { required: true, message: '请输入', trigger: 'blur' },
            ]
        }
       
    };
     
 },

 components: {},

 computed: {},

 mounted(){
     this.getList()
 },

 methods: {
     //点击添加标签对话框里面确定按钮
     CreateClick(){
            this.$refs['AddForm'].validate((valid) => {
        if (valid) {
          this.AddForm.uid = parseInt(Math.random() * 100) + 1024 
        //   this.temp.author = 'vue-element-admin'
          lebelCreate(this.AddForm).then(() => {
            this.lebelList.unshift(this.AddForm)
            this.AddDialogVisible = false
            this.$notify({
              title: '添加成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })

     },
     //点击添加标签出现弹框
     AddClick(){
         this.AddDialogVisible = true
          this.$nextTick(() => {
              this.$refs['AddForm'].clearValidate()
         })
     },
      //状态开启和关闭
     handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    //  渲染table列表
    getList(){
        var that = this
          var that = this
        //开始有加载中效果
        that.listLoading = true
        lebelList(that.listQuery).then(response=>{
             that.lebelList = response.data.items
             that.total = response.data.total
             console.log(that.lebelList)
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