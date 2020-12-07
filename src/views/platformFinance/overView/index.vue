<!--资产表-->
<template>
  <div class="overview-container">
    <div class="w_menu">
      <el-date-picker v-model="time"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"></el-date-picker>
                    <!-- <el-date-picker v-model="time"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期" @change="search"></el-date-picker>-->
      <el-button type="primary"
                 class="buttons"
                >搜索</el-button> <!-- @click="search" -->
    </div>
    <div class="w_c">
      <table>
        <tr>
          <th></th>
          <th>USDT</th>
          <!-- <th>折合USD</th> -->
        </tr>
        <tr>
          <th>交易账户</th>
         <!-- <th>{{(this.tableData.totalwallet).toFixed(6)}}</th>-->
            <th>{{tableData.transaction_account}}</th> 
        </tr>
        <tr class="bg_color_one">
          <th>可用数量</th>
         <!-- <th>{{(this.tableData.walletbalance).toFixed(6)}}</th> -->
           <th>{{tableData.lever}}</th> 
        </tr>
        <tr class="bg_color_one">
          <th>冻结数量</th>
        <!--  <th>{{(this.tableData.withdrawlock).toFixed(6)}}</th> -->
           <th>{{tableData.sheets_number}}</th> 
        </tr>
        <tr class="bg_color_one">
          <th>提币中数量</th>
        <!--  <th>{{(this.tableData.withdrawlock).toFixed(6)}}</th>-->
           <th>{{tableData.opening_price}}</th> 
        </tr>
        <tr>
          <th>资产账户</th>
         <!-- <th>{{(this.tableData.accountbalance).toFixed(6)}}</th> -->
           <th>{{tableData.handling_fee}}</th> 
        </tr>
        <tr class="bg_color_one">
          <th>账户资产</th>
        <!--  <th>{{(this.tableData.accountbalance).toFixed(6)}}</th> -->
           <th>{{tableData.closing_price}}</th> 
        </tr>
        <tr class="bg_color_one">
          <th>可用余额</th>
        <!--  <th>{{(this.tableData.accountavailable).toFixed(6)}}</th> -->
           <th>{{tableData.closing_price}}</th> 
        </tr>
        <tr class="bg_color_one">
          <th>账户权益</th>
         <!-- <th>{{(this.tableData.accountprofit).toFixed(6)}}</th> -->
          <th>{{tableData.jing_PNL}}</th> 
        </tr>
        <tr class="bg_color_three">
          <th>用户_合计</th>
        <!--  <th>{{Number(this.tableData.usertotal).toFixed(6)}}</th> -->
          <th>{{tableData.PNL}}</th> 
        </tr>
        <tr></tr>
        <tr>
          <th>平台钱包账户</th>
        <!--  <th>{{(this.tableData.platformbalance).toFixed(6)}}</th> -->
         <th>{{tableData.dongjie}}</th> 
        </tr>
        <tr class="bg_color_one">
          <th>负债资产</th>
         <!-- <th>{{(this.tableData.platformliabilities).toFixed(6)}}</th> -->
          <th>{{tableData.fudong_PNL}}</th> 
        </tr>
        <tr class="bg_color_one">
          <th>平台合约账户</th>
         <!-- <th>{{(this.tableData.platformc2cmaccout).toFixed(6)}}</th> -->
          <th>{{tableData.funding_costs}}</th> 
        </tr>
        <tr>
          <th>平台交易账户</th>
        <!--  <th>{{(this.tableData.platformaccout).toFixed(6)}}</th> -->
          <th>{{tableData.closing_price}}</th> 
        </tr>
        <tr class="bg_color_one">
          <th>已实现盈亏</th>
         <!-- <th>{{(this.tableData.platformaccoutporit).toFixed(6)}}</th> -->
          <th>{{tableData.sheets_number}}</th> 
        </tr>
        <tr class="bg_color_three">
          <th>平台资产_合计</th>
         <!-- <th>{{(this.tableData.totalplatform).toFixed(6)}}</th> -->
           <th>{{tableData.fudong_PNL}}</th> 
        </tr>
        <tr></tr>
        <tr class="bg_color_four">
          <th>平台+用户_合计</th>
         <!-- <th>{{Number(this.tableData.userPlat).toFixed(6)}}</th> -->
           <th>{{tableData.PNLs}}</th> 
        </tr>
        <tr></tr>
        <tr class="bg_color_five">
          <th>链上钱包账户</th>
         <!-- <th>{{(this.tableData.chainwallet).toFixed(6)}}</th> -->
           <th>123</th> 
        </tr>
        <tr class="bg_color_six">
          <th>清算</th>
         <!-- <th>{{Number(this.tableData.liquid).toFixed(6)}}</th> -->
           <th>123</th> 
        </tr>

      </table>
    </div>
  </div>
</template>
<script>
import { overView } from "@/api/platformFinance";
export default {
    name:'overView',
  data() {
    return {
      time: null,
      tableData: {}
    };
  },
  components: {},
  mounted() {
    // this.$register(this);
    // this.msg = [GETZCB_PRO];
    // this.time = this.getNowDate();
    this.getList();
  },
  computed: {},
  methods: {
      //数据
      getList(){
          overView().then(response=>{
              console.log(response.data.items)
              this.tableData = response.data.items[0]
          })
      }
    // search() {
    //   this.getData();
    // },

    // getData() {
    //   let day = null;
    //   if (this.time) {
    //     day = this.time;
    //   } else {
    //     console.log("没有选择任何时间");
    //   }
    //   this.tableData = {};
    //   this.$api.getAssetTable({
    //     tag: {
    //       dataType: GETZCB_PRO,
    //       take:1,//
    //       tdate: this.time//参数
    //     }
    //   });
    // },

    // message(tag, data) {
    //   switch (tag.dataType) {
    //     case GETZCB_PRO:
    //       if(data.ret === 0){
    //         this.tableData = data.data[0];
    //         this.tableData.usertotal = Number(Number(this.tableData.totalwallet)+Number(this.tableData.accountbalance));
    //         this.tableData.userPlat = this.tableData.usertotal+Number(this.tableData.totalplatform);
    //         this.tableData.liquid = this.tableData.userPlat - Number(this.tableData.chainwallet);
    //       }
          
    //       break;
    //   }
    // },

    // getNowDate() {
    //   var date = new Date();
    //   var year = date.getFullYear();
    //   var month = date.getMonth() + 1;
    //   var day = date.getDate();
    //   if (month < 10) {
    //     month = "0" + month;
    //   }
    //   if (day < 10) {
    //     day = "0" + day;
    //   }
    //   return year + "-" + month + "-" + day;
    // }
  },
  beforeDestroy() {
    this.$unRegister(this);
  }
};
</script>

<style lang="scss" scoped>
.buttons {
  margin-left: 30px;
}

.overview-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  .w_menu {
    width: 100%;
    flex-shrink: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }
  .w_c {
    width: 100%;
    box-sizing: border-box;
    font-family: Arial;
    table {
      width: 95%;
      border: 1px solid #c0c4cc;
      border-collapse: collapse;
      margin-bottom: 15px;
      font-size: 14px;
      margin:  20px auto;
      tr {
        width: 100%;
        text-align: center;
        height: 35px;
        th {
          width: 14%;
          border: 1px solid #c0c4cc;
          font-size: 16px;
          height: 40px;
        }
        td {
          width: 25%;
          border: 1px solid #c0c4cc;
        }
      }
      .bg_color_one {
        background: rgb(245, 245, 255);
        font-weight: normal;
      }
      .bg_color_two {
        background: rgb(255, 254, 203);
      }
      .bg_color_three {
        background: rgb(255, 241, 178);
      }
      .bg_color_four {
        background: rgb(255, 251, 0);
      }
      .bg_color_five {
        background: rgb(0, 255, 234);
      }
      .bg_color_six {
        background: rgb(12, 28, 255);
        color: #fff;
      }
    }
  }
}
</style>
