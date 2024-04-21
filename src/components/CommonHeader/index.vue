<template>
  <div class="header">
    <van-nav-bar :title="mytitle" >
  <template #right v-if="ifhome">
    <van-icon name="wap-home-o" size="36" color="white" @click="gotoHome"/>
  </template>
  <template #left v-if="ifback">
    <van-icon name="arrow-left" size="36" color="white" @click="goback"/>
  </template> 
</van-nav-bar>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router=useRouter()
const gotoHome=()=>{
  router.push('/')
}
const goback=()=>{
  history.back();
}
defineProps({
  mytitle: {
    type:String,
    default: ""
  },
  // 是否有home键
  ifhome:  {
    type:Boolean,
    default: false
  },
  // 是否有back键
  ifback:  {
    type:Boolean,
    default: false
  },
})

</script>

<style scoped>
.van-nav-bar{
 
    /* background-color: palevioletred; */
    width: 349px;
    margin: 0 auto;
    padding-top: 44px;
    border-bottom: 2px solid white;
}
.header{
  position: sticky;
  top: 0;
  background-color: rgb(0, 0, 0);
  z-index: 100;
}

</style>
