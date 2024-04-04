<template>
    <div class="pager">
        <!-- 当前是第 {{ nowStep }}个步骤 -->
        <VanButton class="laststep" v-if="nowStep !== 1" @click="handleStep(-1)">上一步</VanButton>
        <VanButton class="nextstep" v-if="nowStep < totalSteps" @click="handleStep(1)">下一步</VanButton>
        <VanButton class="resetbtn" v-if="nowStep === 1" @click="handleReset">重置</VanButton>
        <VanButton class="createbtn" v-if="nowStep === totalSteps" @click="handleCreate">生成</VanButton>

    </div>
</template>

<script setup lang="ts">
import {reactive,ref} from 'vue'

defineProps({
    // 一共有几页
    totalSteps: {
        type: Number,
        default: 3
    },
    nowStep: {
        type: Number,
        default: 1
    },
    
})
// let stepchange=ref(0)
const handleReset = () => {
    // 刷新页面
    window.location.reload();
}
const emit = defineEmits(["changeStep","startCreate"]);
const handleStep = (mystep:number) => {
    emit("changeStep",mystep)
   

}
const handleCreate = () => {
    emit("startCreate")
   

}


</script>

<style scoped>
.van-button {
    width: 140px;
    height: 42px;
    font-size: 18px;
    letter-spacing: 5px;
    position: absolute;
}

.laststep,
.resetbtn {
    background-color: #E3E3E3;
    left: 32px;
    bottom: 125px;

}

.nextstep,
.createbtn {
    background-color: #92B0FF;
    color: white;
    right: 32px;
    bottom: 125px;


}
</style>