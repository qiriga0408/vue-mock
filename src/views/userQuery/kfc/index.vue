<template>
    <div class="kfc-container">
        <div class="filter-container" >
              <el-input size="mini" v-model="kfcQuery.uid" placeholder="UID/手机/邮箱" style="width:150px;" class="filter-item" @keyup.enter.native="handleFilter" />
            <span style="margin-left:20px;font-size:15px;">申请时间</span>
            <el-date-picker
            style="width:220px;margin-top:10px;"
              v-model="kfcQuery.application_time"
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
              v-model="kfcQuery.review_time"
              size="mini"
              type="daterange"
              range-separator="-"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              >
            </el-date-picker>
           
          <!-- <el-button v-waves class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
        </el-button> -->
        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
        </el-button>
        </div>

         <el-table
            v-loading="listLoading"
            :data="kfcList"
            border
            fit
            highlight-current-row
            style="width: 100%;margin-top:20px;"
            :header-cell-style="{'background':'#F0F8FF'}"
          >
     <el-table-column label="申请时间" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.application_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
       <el-table-column label="订单编号" prop="order_number"  align="center" min-width="70" >
        <template slot-scope="{row}">
          <span>{{ row.order_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="UID" prop="uid"  align="center" min-width="70" >
      <!-- sortable="custom" :class-name="getSortClass('id')" -->
        <template slot-scope="{row}">
          <span>{{ row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="国家地区" prop="country_map"  align="center" min-width="70" >
        <template slot-scope="{row}">
          <span>{{ row.country_map }}</span>
        </template>
      </el-table-column>
       <el-table-column label="状态" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.certification_status=='RZTG'">认证通过</span>
          <span v-else-if="row.certification_status=='RZWTG'">认证未通过</span>
        </template>
      </el-table-column>
       <el-table-column label="审核状态" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.audit_results=='SHTG'">认证通过</span>
          <span v-else-if="row.audit_results=='SHWTG'">认证未通过</span>
        </template>
      </el-table-column>
        <el-table-column label="处理时间" align="center" min-width="100px">
        <template slot-scope="{row}">
            <span>{{row.review_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" align="center" min-width="230px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
            <el-button type="primary" plain size="mini" @click="handleUpdate(row)">
            <!--  -->
                查看
            </el-button>
            <el-button type="primary" size="mini"  plain @click="handleReset(row)">
            <!-- @click="handleModifyStatus(row,'SHZ')" -->
                重置
            </el-button>
            <el-button type="primary" size="mini"  plain @click="handleReview(row)">
             <!-- @click="handleModifyStatus(row,'YCG')" -->
                审核
            </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作人" prop="country_map"  align="center" min-width="70" >
        <template slot-scope="{row}">
          <span>{{ row.Operator }}</span>
        </template>
      </el-table-column>
    </el-table>

      <pagina-tion v-show="total>0" :total="total" :page.sync="kfcQuery.page" :limit.sync="kfcQuery.limit" @pagination="getList" />


    <!-- 点击查看 -->
    <el-dialog
        title="查看"
        :visible.sync="UpdataDialogVisible"
        width="80%"
        v-dialogDrag
        
        >
          <el-divider></el-divider>
       <!-- <el-row style="width:100%">
            <el-col :sm="10" :xs="10" style="margin-left:100px;"> -->
            <div style="width:100%">
   <div class="wc_1">
                <div class="wc_1-one">国家地图:</div>
                <div>{{updata.country_map}}</div>
            </div>
             <div class="wc_1">
                <div class="wc_1-one">UID:</div>
                <div>{{updata.uid}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">用户名:</div>
                <div>{{updata.username}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">名:</div>
                <div>{{updata.ming_name}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">姓:</div>
                <div>{{updata.xing_name}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">证件号码:</div>
                <div>{{updata.id_number}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">提交证件图片:</div>
                <div>
                    <img :src="updata.image_uri"  alt="" style="width:100px;height:40px">
                </div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">出生日期:</div>
                <div> {{updata.born_data}}</div>
            </div>
             <div class="wc_1">
                <div class="wc_1-one">当前年龄:</div>
                <div>
                     {{updata.age}} 
                </div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">认证状态:</div>
                <div>
                     <span v-if="updata.certification_status == 'RZTG'">认证通过</span>
                    <span v-else-if="updata.certification_status == 'RZWTG'">认证未通过</span>
                </div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">审核结果:</div>
                <div>
                      <span v-if="updata.certification_status == 'RZTG'">审核</span>
                      <span v-else-if="updata.certification_status == 'RZWTG'">审核未通过</span>
                </div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">审核人:</div>
                <div>
                      {{updata.username}}
                </div>
            </div>
             
          </div>


           
        <span slot="footer" class="dialog-footer">
            <el-button  type="success" @click="UpdataDialogVisible = false">关闭</el-button>
            
        </span>
    </el-dialog>


    <!-- 重置对话框 -->
    <el-dialog
        title="确认信息"
        :visible.sync="ResetDialogVisible"
        width="60%"
        v-dialogDrag
        >
        <span>请确认是否重置当前认证？</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="ResetDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>

         <!-- 审核对话框 -->
    <el-dialog
        title="审核"
        :visible.sync="ReviewDialogVisible"
        width="70%"
        v-dialogDrag
        >
          <el-divider></el-divider>
  <div style="width:100%">
            <div class="wc_1">
                <div class="wc_1-one">国家地图:</div>
                <div>{{updata.country_map}}</div>
            </div>
             <div class="wc_1">
                <div class="wc_1-one">UID:</div>
                <div>{{updata.uid}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">用户名:</div>
                <div>{{updata.username}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">名:</div>
                <div>{{updata.ming_name}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">姓:</div>
                <div>{{updata.xing_name}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">证件号码:</div>
                <div>{{updata.id_number}}</div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">提交证件图片:</div>
                <div>
                    <img :src="updata.image_uri"  alt="" style="width:100px;height:40px">
                </div>
            </div>
            <div class="wc_1">
                <div class="wc_1-one">出生日期:</div>
                <div> {{updata.born_data}}</div>
            </div>
             <div class="wc_1">
                <div class="wc_1-one">当前年龄:</div>
                <div>
                     {{updata.age}} 
                </div>
            </div>
             <div class="wc_1" >
                     <el-select v-model="updata.audit_results" style="margin-left:20px;margin-top:15px;" placeholder="请选择">
                        <el-option
                        v-for="item in auditResultsOptions"
                        :key="item.key"
                        :label="item.audit_results_name"
                        :value="item.key">
                        </el-option>
                    </el-select>
                 </div>
          </div>
      
        <span slot="footer" class="dialog-footer">
            <el-button  type="info" plain @click="ReviewDialogVisible = false">取消</el-button>
             <el-button  type="success" @click="ReviewDialogClick()">确定</el-button>
        </span>
    </el-dialog>


    </div>
</template>

<script>
//引入封装接口
import {kfcList,userQueryKfcUpdate} from '@/api/userQuery'
// 转换时间的在src/utils.index.js
import { parseTime } from '@/utils'
//引入的自定义指令
// import waves from '@/directive/waves'


const auditResultsOptions = [
    {key:'SHTG',audit_results_name:'审核通过'},
    {key:'SHWTG',audit_results_name:'审核未通过'}
]

export default {
    name:'Kfc',
 data () {
 return {
    
         //页数页码以及搜索
      kfcQuery: {
        page: 1,
        limit: 20,
        uid: undefined,
        //认证状态
        certification_status: undefined,
        //申请时间
        application_time:undefined,
        //审核时间
        review_time:undefined,
        sort: '+id'
      },
      //默认总数据条数
      total:0,
      //总数据
      kfcList:null,
       //表格加载中效果
      listLoading: true,
      //控制查看对话框的显示与隐藏
      UpdataDialogVisible:false,
      //查看获取数据
      updata:{
            //申请时间
         application_time:'',
         //订单编号
         order_number:'',
          //UID
          uid: '',
          //国家地图
          country_map:'',
          //状态
          certification_status:'',
          //处理时间
          review_time:'',
          //操作人
          Operator:'',
          //用户名
          username: '',
          //证件号码
          id_number:'',
          //名
          ming_name:'',
          // 姓
          xing_name:'',
          //当前年龄
          age:'',
          //出生日期
          born_data:'',
          //图片
          image_uri:'',
          //审核结果
          audit_results:''
      },
      //控制重置对话框的显示与隐藏
      ResetDialogVisible:false,
       //控制审核对话框的显示与隐藏
        ReviewDialogVisible:false,
        //审核状态
        auditResultsOptions,
    };
 },

 components: {},

 computed: {},

 mounted() {
     this.getList()
 },

 methods: {
     //点击搜索
     handleFilter(){
         console.log('搜索')
     },
      // 回车搜索事件
     handleFilter() {
      this.kfcQuery.page = 1
      this.getList()
    },
    //  table列表数据
    getList(){
        var that = this
        //开始有加载中效果
         that.listLoading = true
        kfcList(that.kfcQuery).then((response)=>{
            // console.log(response)
            that.kfcList = response.data.items
            that.total = response.data.total
            console.log(that.kfcList)
             setTimeout(() => {
          // 过了1.5秒就关闭
          that.listLoading = false
        }, 1500);
        })
    },
    //点击查看
    handleUpdate(row){
        var that = this
        that.UpdataDialogVisible = true
         that.updata = Object.assign({}, row) 
        // that.updata = row
        console.log(that.updata) 
    },
    //重置按钮
    handleReset(row){
        var that = this
        that.ResetDialogVisible = true
    },
    //审核按钮
    handleReview(row){
        var that = this
        that.ReviewDialogVisible = true
         that.updata = Object.assign({}, row) 
    },
    //审核后点击确定按钮
    ReviewDialogClick(){
        var that = this
        const kfcUpdata = that.updata
        userQueryKfcUpdate(kfcUpdata).then(response=>{
            const index = that.kfcList.findIndex(v => v.uid === that.updata.uid)
            that.kfcList.splice(index, 1, that.updata)
            that.ReviewDialogVisible = false
            that.$notify({
              title: '审核成功',
              type: 'success',
              duration: 2000
            })
        })
    }
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