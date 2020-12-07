<!--登录-->
<template>
 <!-- <div class="container"> -->
    <div class="main login-container">

       <el-form  :model="form" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Welcome</h3>
      </div>
      <el-form-item prop="username" class="el-form-s">
        <span class="svg-container">
          <!-- <i class="el-icon-user-solid"></i> -->
          <img src="../../icons/svg/user.svg" style="width:100%;height:100%">
        </span>
        <el-input
          ref="username"
          v-model="form.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="pwd" class="el-form-s">
        <span class="svg-container">
          <!-- <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-mima"></use>
          </svg> -->
          <img src="../../icons/svg/mima.svg" style="width:100%;height:100%">
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="form.pwd"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <img src="../../icons/svg/chakanmima.svg" v-if="passwordType==='password'" style="width:100%;height:100%">
          <img src="../../icons/svg/chakanmima1.svg" v-else style="width:100%;height:100%">
        </span>
      </el-form-item>
      <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="loginClick()">登录</el-button>

    </el-form>

     <el-dialog
      title="扫描下方谷歌二维码"
      width="80%"
      :visible.sync="dialogErWeiMa"
      @open="init()"
      :close-on-click-modal="false"
    >
      <div class="banner-box">
        <canvas ref="qrc" id="qrccode-canvas"></canvas>
        <p>{{ this.vkey }}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="entrySendewm()">下一步</el-button>
      </div>
    </el-dialog>

    <el-dialog
      @close="closexgmm"
      class
      title="输入谷歌二维码"
      width="80%"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :rules="rules" ref="ruleForm" :model="ruleForm">
        <el-form-item label="验证码" prop="yzmVal" label-width="56px">
         <!-- <div class="sixcode_div">-->
            <el-input v-model="ruleForm.yzmVal" class="input_div" autocomplete="off" maxlength="6" ></el-input>
         <!--  </div> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="entrySendyzm()">确 定</el-button>
      </div>
    </el-dialog>

    </div>
  
 <!-- </div> -->
</template>
<script>
import inputMove from "@/components/inputMove.vue";
import { getToken, setToken, removeToken } from '@/utils/auth'
import {login, checkVkey} from "@/api/user"
// import user from 'mock/user';
// import Service from "@/http.js";
// import { LOGINOK, GETDLYZ, LOGINOUT } from "../constant";
var QRCode = require("qrcode");
var canvas = "";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else {
        callback();
      }
    };
    return {
       loginRules: {
        username: [
          { required: true, trigger: 'blur',message:"请输入用户名" }
          ],
        pwd: [
          { required: true, trigger: 'blur',message:"请输入密码"},
          { min: 6, max: 12, message: '密码至少6位', trigger: 'blur' }
          ]
      },
       passwordType: 'password',
      tabActiveIdx: 0, //切换方式
      isChecked: true, //是否已阅读服务条款
      form:{
        username: "", //15600530060
        pwd: "", //123abc
      },

      accountErr: "",
      passwordErr: "",

      dialogFormVisible: false, //用户输入验证码弹出对话框
      dialogErWeiMa: false, //二维码弹出框
      ruleForm: {
        yzmVal: "" //验证码
      },
      rules: {
        yzmVal: [{ validator: checkAge, trigger: "blur" }]
      },
      vkey: null, //暂存vkey
    };
  },
  components: {
    inputMove
  },
  created() {
    window.scrollTo(0, 0);
    let that = this;
    document.onkeydown = function(e) {
      if (e.keyCode === 13){
        // console.log("登录回车事件");
        if (that.dialogErWeiMa) {
          //二维码
          that.entrySendewm();
        } else if (that.dialogFormVisible) {
          //输入框
          that.entrySendyzm();
        } else {
          //登录
          that.loginClick();
        }
      }
    };
  },

  mounted() {
    // this.$register(this);
    // this.msg = [LOGINOK, GETDLYZ, LOGINOUT];
  },
  methods: {
    //点击切换是否显示密码还是隐藏
      showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    closexgmm() {
      this.$refs["ruleForm"].resetFields();
    },
    leaveAccInput(val) {},
    leavePassInput(val) {},
    handleLogin(){
       //登录操作
      if (!this.form.username){
        this.$message({
          title:'警告',
           type: 'error',
           message: "请输入手机号/邮箱"
        });
        return false;
      }
      if (!this.form.pwd) {
         this.$message({
          title:'警告',
           type: 'error',
           message: "请输入密码"
        });
        return false;
      }
      login(this.form).then(res=>{
        this.$store.commit('user/SET_TOKEN', res.data.token)
        if (res.data.vkey == "") {
          //绑定谷歌验证 展示验证码输入界面
          this.dialogFormVisible = true;
        } else {
          //未绑定谷歌验证 展示绑定界面
          this.dialogErWeiMa = true;
          this.vkey = res.data.vkey
        }
      })
    },
    loginClick() {
      //登录操作
      if (!this.form.username){
        this.$message({
          title:'警告',
           type: 'error',
           message: "请输入手机号/邮箱"
        });
        return false;
      }
      if (!this.form.pwd) {
         this.$message({
          title:'警告',
           type: 'error',
           message: "请输入密码"
        });
        return false;
      }
      login(this.form).then(res=>{
        this.$store.commit('user/SET_TOKEN', res.data.token)
        if (res.data.vkey == "") {
          //绑定谷歌验证 展示验证码输入界面
          this.dialogFormVisible = true;
        } else {
          //未绑定谷歌验证 展示绑定界面
          this.dialogErWeiMa = true;
          this.vkey = res.data.vkey
        }
      })
    },
    init() {
      this.$nextTick(function() {
        // console.log('---------','otpauth://totp/sugar?secret='+this.vkey)
        canvas = this.$refs.qrc;
        this.createQrc("otpauth://totp/dxop?secret=" + this.vkey);
      });
    },
    createQrc(val) {
      QRCode.toCanvas(this.$refs.qrc, val, error => {
        if (error) {
          console.log(error);
        }
      });
    },
    entrySendyzm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let data = {}
          data.vkey = this.vkey
          data.code = this.ruleForm.yzmVal
          // console.log(data)
          this.$store.dispatch('user/checkVkey', data).then(() => {
            this.$router.push({ path: this.redirect || '/' })
          }).catch((error) => {
            console.error(error)
          })
          // checkVkey(data).then(res=>{
          //   setToken(this.$store.getters.token)
          //   // this.$router.push({ path: this.redirect || '/' })
          // })
        } else {
          return false;
        }
      });
    },
    entrySendewm() {
      this.dialogErWeiMa = false;
      this.dialogFormVisible = true;
    },
  },
  destroyed() {
    document.onkeydown = null;
  }
};
</script>


<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

/* reset element-ui css */
.login-container {
  .login-form{
     .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  }
 

  .el-form-s {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 35px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .el-dialog {
    .el-form-item {
      margin-bottom: 0;
    }
    .banner-box {
      text-align: center;
    }
  }
  .show-pwd {
    width: 20px;
    position: absolute;
    right: 15px;
    top: 12px;
    font-size: 15px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

