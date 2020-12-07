<!--角色组内容编辑-->
<template>
  <div class="tjfz">
   <!-- <div class="w_menu">
      <span class="searchTitle">分组名称：</span>
      <span class="name_span" v-if="type == '1'">{{zname}}</span>
      <el-input v-else v-model="zname" placeholder="请输入分组名称" class="inputw" clearable></el-input>
      <el-button type="primary" class="buttons" @click="bc" >保存</el-button> 
    </div> -->
    <div class="w_menu">
      <span class="searchTitle">分组名称：</span>
      <el-input v-model="zname" placeholder="请输入分组名称" class="inputw" clearable></el-input>
      <el-button type="primary" class="buttons" >保存</el-button> 
    </div>
    
   
    <div class="big-box">
      <div class="big-box-one">
         <div class="big-box-one_1">用户列表</div> 
         <div class="big-box-one_2"> 
            <el-checkbox v-model="qx.bcprouserlist">查看</el-checkbox>
          <el-checkbox v-model="qx.bcuserpionts">备注</el-checkbox>
          <el-checkbox
            v-model="qx.bcprouserup"
            @change="qx.bcprouserlist = qx.bcprouserup || qx.bcprouserlist"
          >编辑</el-checkbox>
          <el-checkbox v-model="qx.bcverifyhistorylist">解除/开启</el-checkbox>
          <el-checkbox v-model="qx.bcupverifyhistory">提升代理</el-checkbox>
          <el-checkbox v-model="qx.bcupverifyreset">资金划转</el-checkbox>
         </div>
      </div>
       <div class="big-box-one">
         <div class="big-box-one_1">海外KYC审核</div> 
         <div class="big-box-one_2"> 
           <el-checkbox v-model="qx.kfcbcprouserlist">查看</el-checkbox>
           <el-checkbox v-model="qx.kfcreview">审核</el-checkbox>
         </div>
      </div>
    </div>
     <div class="big-box">
      <div class="big-box-one">
         <div class="big-box-one_1">持仓查询</div> 
         <div class="big-box-one_2"> 
            <el-checkbox v-model="qx.tradersListLook">查看</el-checkbox>
         </div>
      </div>
       <div class="big-box-one">
         <div class="big-box-one_1">平仓查询</div> 
         <div class="big-box-one_2"> 
           <el-checkbox v-model="qx.tradersReviewLook">查看</el-checkbox>
         </div>
      </div>
    </div>
     <div class="big-box">
      <div class="big-box-one">
         <div class="big-box-one_1">用户资产查询</div> 
         <div class="big-box-one_2"> 
             <el-checkbox v-model="qx.bcprouserwalletbill1">查看</el-checkbox>
            <el-checkbox v-model="qx.bcprouserwalletbill2">高级筛选器</el-checkbox>
            <el-checkbox v-model="qx.bcprousercashaudit1">添加标签</el-checkbox>
         </div>
      </div>
       <div class="big-box-one">
         <div class="big-box-one_1">用户出入金查询</div> 
         <div class="big-box-one_2"> 
           <el-checkbox v-model="qx.bcprocoinlist">查看</el-checkbox>
         </div>
      </div>
        <div class="big-box-one">
         <div class="big-box-one_1">用户财务记录</div> 
         <div class="big-box-one_2"> 
           <el-checkbox v-model="qx.bcprocionupdate">查看</el-checkbox>
         </div>
      </div>
        <div class="big-box-one">
         <div class="big-box-one_1">用户提币管理</div> 
         <div class="big-box-one_2"> 
           <el-checkbox v-model="qx.bcprocionsetup">查看</el-checkbox>
          <el-checkbox v-model="qx.bcotcorderdaytotal">审核</el-checkbox>
         </div>
      </div>
    </div>
    <div class="big-box">
      <div class="big-box-one">
         <div class="big-box-one_1">手续费返佣</div> 
         <div class="big-box-one_2"> 
            <el-checkbox v-model="qx.bcotcorderlist">查看</el-checkbox>
         </div>
      </div>
    </div>
     <div class="big-box">
      <div class="big-box-one">
         <div class="big-box-one_1">资产概览</div> 
         <div class="big-box-one_2"> 
            <el-checkbox v-model="qx.bcaccountlist">查看</el-checkbox>
         </div>
      </div>
       <div class="big-box-one">
         <div class="big-box-one_1">资产账户</div> 
         <div class="big-box-one_2"> 
            <el-checkbox v-model="qx.bcproffundingfee">查看</el-checkbox>
            <el-checkbox
            v-model="qx.bcprofunding"
            @change="qx.bcproffundingfee = qx.bcprofunding || qx.bcproffundingfee"
          >历史记录</el-checkbox>
         </div>
      </div>
       <div class="big-box-one">
         <div class="big-box-one_1">交易账户</div> 
         <div class="big-box-one_2"> 
             <el-checkbox v-model="qx.bcprofitloss">查看</el-checkbox>
          <el-checkbox
            v-model="qx.bcprocontractcoinlist"
            @change="qx.bcprofitloss = qx.bcprocontractcoinlist || qx.bcprofitloss"
          >历史记录</el-checkbox>
         </div>
      </div>
    </div>
     <div class="big-box">
      <div class="big-box-one">
         <div class="big-box-one_1">标签管理</div> 
         <div class="big-box-one_2"> 
             <el-checkbox v-model="qx.bcprocontractcoinset">查看</el-checkbox>
             <el-checkbox v-model="qx.bcprocontractcoinadd">创建标签</el-checkbox>
         </div>
      </div>
    </div>
     <div class="big-box">
      <div class="big-box-one">
         <div class="big-box-one_1">角色管理</div> 
         <div class="big-box-one_2"> 
             <el-checkbox v-model="qx.bcprohedgeconfig">查看</el-checkbox>
            <el-checkbox v-model="qx.bcprocontractset_openorderenable">添加账号</el-checkbox>
             <el-checkbox v-model="qx.bcprocontractset_ispositions">删除</el-checkbox>
            <el-checkbox v-model="qx.bcprocontractset_islodge">修改</el-checkbox>
            <el-checkbox v-model="qx.bcprocontractadd">重置谷歌</el-checkbox>
         </div>
      </div>
       <div class="big-box-one">
         <div class="big-box-one_1">权限分组</div> 
         <div class="big-box-one_2"> 
             <el-checkbox v-model="qx.bcprotraderhistory">查看</el-checkbox>
            <el-checkbox v-model="qx.bcproconditionorder">添加分组</el-checkbox>
            <el-checkbox v-model="qx.bcproconditionsheetcancel">删除</el-checkbox>
            <el-checkbox v-model="qx.bcprotraderhistoryside">修改</el-checkbox>
         </div>
      </div>
       <div class="big-box-one">
         <div class="big-box-one_1">操作日志</div> 
         <div class="big-box-one_2"> 
             <el-checkbox v-model="qx.bcproposition">查看</el-checkbox>
         </div>
      </div>
    </div>

    

   
    
   
  </div>
</template>
<script>
// import { GETJSFZXQ, TJFZ, XGFZ2 } from "@/constant";
// import { type } from "os";
export default {
    name:'addGroup',
  data() {
    return {
      zname: "",
      id: "",
      type: "1",
      qx: {
        //用户列表
        bcprouserlist: false, //查看 
        bcprouserup: false, //编辑 用户编辑
        bcuserpionts: false,//备注
        bcverifyhistorylist: false, //解除/开启
        bcupverifyhistory: false, //提升代理
        bcupverifyreset: false,//资金划转
        // 海外kfc审核
        kfcbcprouserlist:false,//查看
        kfcreview:false,//审核

        // 持仓查询
        tradersListLook: false, // 持仓查询 - 查看
         // 交易员列表 - 操作
        tradersReviewLook: false, // 平仓查询 - 查看

        //用户资产查询
        bcprouserwalletbill1: false, //查看
        bcprouserwalletbill2: false, //高级筛选器
        bcprousercashaudit1: false, //添加标签
        // 用户出入金查询
        bcprocoinlist: false, //查看
        // 用户财务记录
        bcprocionupdate: false, //查看
        // 用户提币管理
        bcprocionsetup: false, //查看
        bcotcorderdaytotal: false,//审核
        // 手续费返佣
        bcotcorderlist: false,//查看
        // 资产概览
        bcaccountlist: false, //查看
        //资产账户
        bcproffundingfee: false, //查看
        bcprofunding: false, //历史记录
        // 交易账户
        bcprofitloss: false,//查看
        bcprocontractcoinlist: false, //历史记录
        //标签管理
        bcprocontractcoinset: false, //查看
        bcprocontractcoinadd: false, //创建标签
        //角色管理
        bcprocontractset_onlinestatus: false, //查看
        bcprocontractset_openorderenable: false, //添加账号
        bcprocontractset_ispositions: false, //删除
        bcprocontractset_islodge: false, //修改
        bcprocontractadd: false, //重置谷歌
        //权限分组
        bcprotraderhistory: false, //查看
        bcproconditionorder: false, //添加分组
        bcproconditionsheetcancel: false, //删除
        bcprotraderhistoryside: false,//修改
        //操作日志
        bcproposition: false, //查看

      }
    };
  },
  components: {},
  mounted() {
    // this.$register(this);
    // this.msg = [GETJSFZXQ, TJFZ, XGFZ2];
    // if (this.$route.query.type == "1") {
    //   //修改 获取详细配置
    //   this.$api.getjsfzxq({
    //     tag: { dataType: GETJSFZXQ, id: this.$route.query.id }
    //   });
    // }
    // this.type = this.$route.query.type;

    // if (this.$route.query.name) {
    //   this.zname = this.$route.query.name;
    // }
  },
  computed: {},
  methods: {
    // bc() {
    //   if (this.type == "1") {
    //     this.$api.udpateFz({
    //       tag: {
    //         dataType: XGFZ2,
    //         qx: this.qx,
    //         model_id: this.$route.query.id,
    //         model_name: this.zname
    //       }
    //     });
    //   } else {
    //     let t = false;
    //     for (let pro in this.qx) {
    //       if (this.qx[pro]) {
    //         t = true;
    //       }
    //     }
    //     if (this.zname == null || this.zname == "") {
    //       this.$msg({
    //         title: "警告",
    //         message: "请填写分组名称",
    //         type: "warning"
    //       });
    //     } else if (!t) {
    //       this.$msg({ title: "警告", message: "请勾选权限", type: "warning" });
    //     } else {
    //       this.$api.addFz({
    //         tag: { dataType: TJFZ, qx: this.qx, model_name: this.zname }
    //       });
    //     }
    //   }
    // },
    // isShow() {
    //   let level = localStorage.getItem("level");
    //   level = JSON.parse(level);
    //   return level === "1";
    // },
    // message(tag, data) {
    //   switch (tag.dataType) {
    //     case GETJSFZXQ:
    //       if (data.data) {
    //         let mode = JSON.parse(JSON.parse(data.data.modedata));
    //         Object.assign(this.qx, mode);
    //         // console.log(typeof mode)
    //       }
    //       break;
    //     case TJFZ: //添加分组
    //       if (data.ret === 0) {
    //         this.$router.go(-1);
    //         this.$msg({ title: "成功", message: data.msg, type: "success" });
    //       }
    //       break;
    //     case XGFZ2: //修改分组内容
    //       if (data.ret === 0) {
    //         this.$router.go(-1);
    //         this.$msg({ title: "成功", message: data.msg, type: "success" });
    //       }
    //       break;
    //   }
    // }
  },

  beforeDestroy() {
    this.$unRegister(this);
  }
};
</script>

<style lang="scss" scoped>
.big-box:nth-of-type(2){
  border-top: 1px solid grey;
}
  .big-box{
    width: 99%;
    min-height: 90px;
    border-bottom: 1px solid grey;
    display: flex;
    flex-direction: column;
    // align-items: center;
    margin-top: 10px;
    justify-content: space-around;
    .big-box-one{
      display: flex;
      min-height: 40px;
      align-items: center;
      .big-box-one_1{
        min-width: 65px;
      }
      .big-box-one_2{
        margin-left: 40px;
      }
    }
  }
</style>

<style lang="scss" scoped>
.inputw {
  width: 200px;
  padding-right: 30px;
}
.name_span {
  padding-top: 2px;
}
.inputs {
  padding-right: 30px;
}

.buttons {
  margin-left:20px;
}

.checkboxp {
  padding: 3px 0;
}

.dc {
  display: flex;
  padding: 10px 0px;
  box-sizing: border-box;
  border-bottom: 1px solid#F0F2F5;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  // flex-direction: column;
}

.tjfz {
  width: 100%;
  display: flex;
  flex-direction: column;
  .w_menu {
    width: 100%;
    height: 50px;
    // padding-left:15px;
    padding-top: 15px;
    padding-bottom: 15px;
    flex-shrink: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .searchTitle {
      padding: 0;
    }
  }
  .zc {
    & > div {
      display: flex;
    }
  }
  .w_c1 {
    .dc {
        display: flex;
        padding: 10px 0px;
        box-sizing: border-box;
        border-bottom: 1px solid#F0F2F5;
        width: 100%;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        flex-direction: column;
    }
    // display: flex;

    // margin-left: 30px;
    margin-top: 10px;
    flex-direction: column;
    border-bottom: 1px solid grey;
    .titlespanb {
      text-align: left;
      font-weight: 900;
      padding: 2px 0px;
    }
    .w_c2 {
      display: flex;
      flex-wrap: wrap;
      padding: 2px 0px;
    //   margin-top: ;
    }
    .itemdiv {
        height: 35px;
      // display: flex;
      min-width: 300px;
      padding: 4px 0;
    //   margin-top: 10px;
      .titlespan {
        display: inline-block;
        width: 300px;
        text-align: left;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .w_page {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 10px;
    padding-right: 30px;
  }


.dialogc {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dialogstip {
  color: red;
  padding: 20px 10px;
}
}
</style>
