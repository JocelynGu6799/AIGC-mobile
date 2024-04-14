<template>
    <div>
        <CommonHeader  :ifback="true" ></CommonHeader>
        <p class="t1">选择您所需要的产品设计</p>
        <div class="container">
                <VanButton @click="handletoPack">包装</VanButton>
                <VanButton @click="handletoLogo">Logo</VanButton>
                <VanButton @click="handletoPoster">海报</VanButton>
            </div>
        <div class="bottomtext">
            
            <p>科技跃动未来无限想象</p>
            <p>Generate the future Imagine Infinite</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router=useRouter()
const handletoPack=()=>{
    router.push('/pack')

}
const handletoLogo=()=>{
    router.push('/logo')

}
const handletoPoster=()=>{
    router.push('/poster')

}
</script>

<style scoped>
html{
    overflow: hidden;
}
.t1 {
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    position: absolute;
    top: 192px;
    width: 100%;
    /* margin-top: 130px; */
}
.container{
    width: 245px;
    /* background-color:cadetblue; */
    margin: 0 auto;
    padding-top: 207px;
}

.bottomtext {
    color: white;

    width: 100%;
    height: 50px;
    background-color: rgb(0, 0, 0);
    text-align: center;
    /* line-height: ; */
    font-size: 8px;
    position: fixed;
    /* left: 50%; */
    /* margin-left: -68px; */
    z-index: 2;
    bottom: 28px;
    letter-spacing: 2px;
    font-weight: 600;
}
.van-button{
    width: 100%;
    margin: 20px 0;
    font-size: 14px;
    letter-spacing: 8px;
    background-color: rgb(0, 0, 0,0);
    border: 2px solid white;
    color: white;
    border-radius: 11px;
}
</style>