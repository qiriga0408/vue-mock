<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container"  trigger="click">
      <!-- -->
            <span>admin</span>
          <i class="el-icon-caret-bottom" />
         
        <el-dropdown-menu slot="dropdown" style="width:240px;position:absolute;left:1656px">
        <!--  <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link> -->
          <el-dropdown-item>
            我的邀请
          </el-dropdown-item>
          <el-dropdown-item style="display:flex;">
              <div>邀请码</div>
              <div style="margin-left:20px;">
                  <span>CASSDFD</span>
               <!--   <svg t="1606878424016" @click="copy()" style="width:15px;height:15px;margin-left:20px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3333" width="200" height="200"><path d="M924 862a40 40 0 0 1 0-80 20 20 0 0 0 20-20V100a20 20 0 0 0-20-20H262a20 20 0 0 0-20 20 40 40 0 0 1-80 0A100 100 0 0 1 262 0h662a100 100 0 0 1 100 100v662a100 100 0 0 1-100 100z" fill="" p-id="3334"></path><path d="M762 1024H100A100 100 0 0 1 0 924V262a100 100 0 0 1 100-100h662a100 100 0 0 1 100 100v662a100 100 0 0 1-100 100zM100 242a20 20 0 0 0-20 20v662a20 20 0 0 0 20 20h662a20 20 0 0 0 20-20V262a20 20 0 0 0-20-20z" fill="" p-id="3335"></path><path d="M431 807a40 40 0 0 1-40-40V419a40 40 0 0 1 80 0v348a40 40 0 0 1-40 40z" fill="" p-id="3336"></path><path d="M605 633H257a40 40 0 0 1 0-80h348a40 40 0 0 1 0 80z" fill="" p-id="3337"></path></svg> -->
              </div> 
          </el-dropdown-item>
          <el-dropdown-item>
              <div>二维码</div>
              <img src="../../../public/QRcode.png" alt="">
          </el-dropdown-item>
           <el-dropdown-item>
              <div>链接</div>
              <div style="width:100%;overflow: hidden">https://www.processon.com/mindmap/5fac9b3af232fba49777ae</div>
          </el-dropdown-item>
          
           
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Cookies from 'js-cookie'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      //从vuex传过来用户名
      'name'
    ])
  },
  created(){
    // console.log(this.$store.state.name)
  },
  methods: {
      copy(){
        document.execCommand("Copy"); // 执行浏览器复制命令
        this.$message({
          message:'复制成功',
          type:'success'
        });
      },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      Cookies.remove('platform_token');
      // await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    // line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      cursor: pointer;
      margin-top: 20px;
      .avatar-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 40px;
        margin-top: 10px;
        // position: relative;
        
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-dropdown-menu{
          width: 200px;
          height: 500px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
