<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import type { ConfigProviderThemeVars } from "vant";
import {reactive} from 'vue'
let themeVars=reactive<ConfigProviderThemeVars>({
    // fieldPlaceholderTextColor:"white"
   navBarTitleTextColor:"white",
   navBarBackground:"rgb(0,0,0,0)",
   navBarTitleFontSize:"14px"
   
   


})
</script>

<template>
 <van-config-provider :theme-vars="themeVars">
 <router-view></router-view>
 <CommonFooter></CommonFooter>
</van-config-provider>
 <!-- 底部图片/文字 -->
</template>

<style scoped>

</style>
