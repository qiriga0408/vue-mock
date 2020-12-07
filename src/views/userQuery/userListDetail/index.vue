<template>
  <div class="userlistdetail-container">
    


  <el-row :gutter="6" style="border:1px solid grey;width:99.5%;margin:20px auto"> 
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"> 
        <div class="grid-content">
            <span class="grid-content-left">UID:</span>
            <span class="grid-content-right">{{ListDetail.uid}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">用户类型:</span>
            <span class="grid-content-right" v-if="ListDetail.usertype == 'DJDL'">顶级代理</span>
            <span class="grid-content-right" v-else-if="ListDetail.usertype == 'DL'">代理</span>
            <span class="grid-content-right" v-else-if="ListDetail.usertype == 'ZTYH'">直推用户</span>
            <span class="grid-content-right" v-else-if="ListDetail.usertype == 'PTYH'">普通用户</span>
        </div>
           <div class="grid-content">
            <span class="grid-content-left">注册时间:</span>
            <span class="grid-content-right">{{ListDetail.registration_time| parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </div>
      </el-col> 
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
            <span class="grid-content-left">用户名:</span>
            <span class="grid-content-right">{{ListDetail.username}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">邀请码:</span>
            <span class="grid-content-right">{{ListDetail.invite_code}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">最后登录时间:</span>
            <span class="grid-content-right">{{ListDetail.last_login_time| parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </div>
     </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content"></div>
        <div class="grid-content"></div>
        <div class="grid-content">
            <span class="grid-content-left">最后登录IP:</span>
            <span class="grid-content-right">{{ListDetail.Ip}}</span>
        </div>
      </el-col>
    </el-row>
    
     


     <el-row :gutter="6" style="border:1px solid grey;width:99.5%;margin:20px auto">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
            <span class="grid-content-left">顶级代理ID:</span>
            <span class="grid-content-right">{{ListDetail.top_id}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">下级代理人数:</span>
            <span class="grid-content-right">{{ListDetail.under_number}}</span>
          
        </div>
        <div class="grid-content">
            <span class="grid-content-left">手续费返佣:</span>
            <span class="grid-content-right">{{ListDetail.formalities_proportion}}</span>
        </div>
          <div class="grid-content">
            <span class="grid-content-left">修改内容:</span>
            <span class="grid-content-right">{{ListDetail.modify_content}}</span>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
            <span class="grid-content-left">上级代理ID:</span>
            <span class="grid-content-right">{{ListDetail.Superior_id}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">直推人数:</span>
            <span class="grid-content-right">{{ListDetail.direct_number}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">最后修改时间:</span>
            <span class="grid-content-right">{{ListDetail.last_login_time| parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">操作人:</span>
            <span class="grid-content-right">{{ListDetail.Operator}}</span>
        </div>
     </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content"></div>
        <div class="grid-content"></div>
       
      </el-col>
    </el-row>

     <el-row :gutter="6" style="border:1px solid grey;width:99.5%;margin:20px auto">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
            <span class="grid-content-left">身份信息:</span>
            <span class="grid-content-right">{{ListDetail.top_id}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">USDT钱包地址:</span>
            <span class="grid-content-right">{{ListDetail.under_number}}</span>
          
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content"></div>
     </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
            <span class="grid-content-left">通过时间:</span>
            <span class="grid-content-right">{{ListDetail.display_time}}</span>
        </div>
        <div class="grid-content"></div>
       
      </el-col>
    </el-row>

     <el-row :gutter="6" style="border:1px solid grey;width:99.5%;margin:20px auto">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
            <span class="grid-content-left">备注:</span>
            <span class="grid-content-right">{{ListDetail.remarks}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">标签:</span>
            <span class="grid-content-right">{{ListDetail.label}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">其他操作:</span>
            <span class="grid-content-right"></span>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
             <span class="grid-content-left">操作人:</span>
            <span class="grid-content-right"></span>
        </div>
        <div class="grid-content">
             <span class="grid-content-left">操作人:</span>
            <span class="grid-content-right"></span>
        </div>
        <div class="grid-content">
             <span class="grid-content-left">操作人:</span>
            <span class="grid-content-right"></span>
        </div>
     </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
            <span class="grid-content-left">操作时间:</span>
            <span class="grid-content-right">{{ListDetail.display_time}}</span>
        </div>
        <div class="grid-content">
            <span class="grid-content-left">操作时间:</span>
            <span class="grid-content-right">{{ListDetail.display_time}}</span>
        </div>
         <div class="grid-content">
            <span class="grid-content-left">操作时间:</span>
            <span class="grid-content-right">{{ListDetail.display_time}}</span>
        </div>
      </el-col>
    </el-row>


     <el-row :gutter="6" style="width:99.5%;margin:30px auto ">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
            <span class="grid-content-left">资产</span>
        </div>
         <div class="grid-content">
            <span class="font">钱包账户资产(USDT):</span>
        </div>
         <div class="grid-content" style="border-bottom:1px solid grey;">
            <span >{{ListDetail.pageviews}}</span>
        </div>
        <el-row>
            <el-col :span="12">
                <div class="grid-content">
                    <span class="font">可用余额</span>
                </div>
                 <div class="grid-content">
                     <span >{{ListDetail.pageviews}}</span>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content">
                    <span class="font">冻结数量</span>
                </div>
                 <div class="grid-content">
                     <span >{{ListDetail.pageviews}}</span>
                </div>
            </el-col>
        </el-row>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" style="border-left:1px solid grey;">
         <div class="grid-content">
           
        </div>
         <div class="grid-content">
            <span class="font">合约账户资产(USDT):</span>
        </div>
         <div class="grid-content" style="border-bottom:1px solid grey;">
            <span >{{ListDetail.pageviews}}</span>
        </div>
        <el-row>
            <el-col :span="12">
                <div class="grid-content">
                    <span class="font">账户权益</span>
                </div>
                 <div class="grid-content">
                     <span >{{ListDetail.pageviews}}</span>
                </div>
                  <div class="grid-content">
                    <span class="font">冻结保证金</span>
                </div>
                 <div class="grid-content">
                     <span >{{ListDetail.pageviews}}</span>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content">
                    <span class="font">可用余额</span>
                </div>
                 <div class="grid-content">
                     <span >{{ListDetail.pageviews}}</span>
                </div>
                  <div class="grid-content">
                    <span class="font">未实现盈亏</span>
                </div>
                 <div class="grid-content">
                     <span >{{ListDetail.pageviews}}</span>
                </div>
            </el-col>
        </el-row>
        
     </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
          
        </div>
       
      </el-col>
    </el-row>


  </div>
</template>

<script>
//时间的转换
import { parseTime } from '@/utils'
const userTypeOptions = [
  {key:'DJDL',usertype_name:'顶级代理'},
  {key:'DL',usertype_name:'代理'},
  {key:'ZTYH',usertype_name:'直推用户'},
  {key:'PTYH',usertype_name:'普通用户'}
]
import { userQueryDetail } from "@/api/userQuery";
export default {
  name: "userListDetail",
  data() {
    return {
        ListDetail:this.$route.query.row,
        //用户类型
        userTypeOptions,
    };
  },

  components: {},

  computed: {},

  mounted() {
    // this.ListDetail();
    // console.log(this.ListDetail)
  },

  methods: {
    // ListDetail() {
    //   var id = this.$route.query.row;
    //   console.log(id);
    //   userQueryDetail(id).then((response) => {
    //     console.log(response);
    //   });
    // },
  },
};
</script>
<style lang="scss" scoped>
.wc_1{
  width: 99.7%;
  height: 100px;
  // background: firebrick;
  border: 1px solid grey;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  // flex-direction: column;
  align-items: center;
  // justify-content: space-around;
  
  .wc_1-one{
    width:45%;
    // background: firebrick;
    padding-left: 10%;
    box-sizing: border-box;
  }

}
.grid-content {
  border-radius: 4px;
 // background: firebrick;
  min-height: 38px;
  display: flex;
  //justify-content: space-around;
  margin-left: 15px;
  align-items: center;
  .grid-content-right{
      //margin-left: 30px;
  }
  .grid-content-left{
      width: 150px;
      //border: 1px solid red;
  }
}
.font{
    font-size: 15px;
    color: gray;
}
</style>