<template>
    <div class="security-container">
        <div class="password">
            <div class="password-one">
                密码
            </div>
            <div class="password-two" @click="changePasswordClick()">
                修改
            </div>
        </div>
        <div class="google">
             <div class="google-one">
                谷歌验证器
            </div>
            <div class="google-two" @click="changeGoogleClick()">
                修改
            </div>
        </div>
    </div>
</template>

<script>
export default {
name:'securityCenter',
 data () {
 return {

    };
 },

 components: {},

 computed: {},

 mounted(){},

 methods: {
     changePasswordClick(){
         this.$router.push({
             path:'/systemAdminister/roleAdminister/changePassword'
         })
     },
       changeGoogleClick(){
         this.$router.push({
             path:'/systemAdminister/roleAdminister/changeGoogle'
         })
     }
 }
}

</script>
<style lang="scss" scoped>
.password{
    width: 96%;
    height: 90px;
    border: 1px solid grey;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .password-one{
        width: 80%;
        margin-left: 30px;
    }
    .password-two{
        color: blue;
        cursor: pointer;
    }
}

.google{
    width: 96%;
    height: 90px;
    border: 1px solid grey;
    margin: 20px auto;
     display: flex;
    align-items: center;
    .google-one{
        width: 80%;
        margin-left: 30px;
    }
    .google-two{
        color: blue;
        cursor: pointer;
    }
}

</style>