<template>
  <div class="welcomeHome-container">
    欢迎使用平台管理系统
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'welcomeHome',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.welcomeHome {
  &-container {
    width: 100%;
    min-height: calc(100vh - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
