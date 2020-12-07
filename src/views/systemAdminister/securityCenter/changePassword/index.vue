<template>
    <div class="changepassword-container">

    <div class="pass">
      <div class="di">新密码</div>
      <el-input v-model="newPassword" class="input"  placeholder="请输入新密码"></el-input>
    </div>
     <div class="pass">
      <div class="di">确认新密码</div>
      <el-input v-model="confirmNewPassword" class="input" placeholder="请输入新密码"></el-input>
    </div>

    <el-button type="success" class="confirm-butoon" @click="confirmChange()">确定修改</el-button>
        
    </div>
</template>

<script>
export default {
name:'changePassword',
 data () {
 return {
        newPassword:'',
        confirmNewPassword:''
    };
 },

 components: {},

 computed: {},

 mounted(){},

 methods: {
     //确定修改密码
     confirmChange(){
         console.log('确定修改密码')
     }
 }
}

</script>
<style lang="scss" scoped>
.pass{
    width:80%;
    height: 100px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    // justify-content: space-around;
    .di{
        width: 130px;
        // background: firebrick;
    }
    .input{
        width:200px;
        // margin-left: 20px;
    }
  
}
.confirm-butoon{
    margin-left:30%;
}

</style>