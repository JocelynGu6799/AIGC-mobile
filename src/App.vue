<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import type { ConfigProviderThemeVars } from "vant";
import {reactive} from 'vue'
import CommonFooter from '@/components/CommonFooter/index.vue'
let themeVars=reactive<ConfigProviderThemeVars>({
    // fieldPlaceholderTextColor:"white"
   navBarTitleTextColor:"white",
   navBarBackground:"rgb(0,0,0,0)",

   navBarTitleFontSize:"14px",
   uploaderUploadBackground:"rgb(0,0,0,0)",
   uploaderFileBackground:"rgb(0,0,0,0)",
   uploaderMaskBackground:"rgb(0,0,0,0)",
   
   

   
   


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
