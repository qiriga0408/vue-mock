<template>
    <div class="changepassword-container">
        <el-timeline>
            <el-timeline-item timestamp="1" placement="top">
                <el-card>
                    <h4>安装完成后打开Google Authentication,扫描下方二维码或手动输入秘钥，得到六位数验证码</h4>
                    <p style="color:orange">请务必妥善保管谷歌验证秘钥，以免更换或丢失手机号导致无法换绑</p>
                    <img src="../../../../../public/QRcode.png" style="width:93px;height:93px;">
                    <p>秘钥:TGOXJ3V2B5S7POF3</p>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2" placement="top">
                <el-card>
                    <h4>请将您获得的验证码填入下方输入框中,并完成验证</h4>
                    <p>新的谷歌验证码</p>
                    <el-input v-model="google" style="width:200px;"></el-input>
                </el-card>
                </el-timeline-item>
        </el-timeline>
         <el-button type="success" class="confirm-butoon" @click="confirmChange()">确定修改</el-button>
    </div>
</template>

<script>
export default {
name:'changeGoogle',
 data () {
 return {
        google:''
    };
 },

 components: {},

 computed: {},

 mounted(){},

 methods: {
     confirmChange(){
         console.log('修改谷歌验证码')
     }
 }
}

</script>
<style lang="scss" scoped>
.confirm-butoon{
    margin-left: 30%;
}
.el-timeline{
    width: 100%;
}

</style>