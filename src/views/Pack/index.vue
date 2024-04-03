<template>
    <div>
        <CommonHeader :ifhome="true" :ifback="true" mytitle="AI包装设计"></CommonHeader>
         <!-- 公共导航栏 -->
        <!-- ifhome是否显示home标志,ifback是否显示back标志 -->
     <!-- nowStep就是当前执行第几步 -->
     <div>现在是包装页面的第{{ nowStep }}步骤</div>
        <!-- 根据nowstep显示对应步骤的内容,按这个逻辑替换对应的需求 -->
        <div v-if="nowStep===1">包装页面第一步显示的内容</div>
        <div v-if="nowStep===2">包装页面第二步显示的内容</div>
        <div v-if="nowStep===3">包装页面第三步显示的内容</div>
        <!-- total-steps可以改成这个工作流程需要的步骤数量, -->
        <PageChangeComp :nowStep="nowStep" :total-steps="3" @change-step="handleStep" @start-create="handleCreate"></PageChangeComp>

    </div>
</template>

<script setup>
import {ref} from 'vue'
let nowStep=ref(1)

const handleStep=(mystep)=>{
    // mystep的值为-1或1,对应改变nowStep的值
    console.log("mystep",mystep);
    nowStep.value+=mystep

}
// 点击生成与后端交互
const handleCreate=()=>{
    console.log("执行生成逻辑");
}
</script>

<style lang="scss" scoped>

</style>