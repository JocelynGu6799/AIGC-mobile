<template>
    <div>
        <img src="@/assets/images/background-pic.png" alt="" class="bg">
        <img src="@/assets/images/logo 1-1500h 1.png" alt="" class="logo">
        <div class="t1">品牌包装全案AI设计</div>
        <div class="t2">注入灵感，创意无界</div>
        <van-button v-if="!isLogin" @click="gotoLogin" class="loginbtn">点击登录</van-button>
        <van-button v-else @click="gotoSelect">选择产品</van-button>
        <div class="bottomtext">
            <p>科技跃动未来无限想象</p>
            <p>Generate the future Imagine Infinite</p>
        </div>
       
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useUserStore from "@/stores/userStore";
let userStore=useUserStore()
// import router from '@/router';
const router=useRouter()

let isLogin=userStore.isLogin
console.log("isLogin",isLogin);

// 是否已登录?登录了跳select,否则跳login,暂时算没登录
const gotoSelect=()=>{
    router.push("/select")
}
const gotoLogin=()=>{
    router.push("/login")
}
</script>

<style scoped>
html,body{
    /* overflow: hidden; */
}
p{
    background-color:rgb(0, 0, 0,0);
}
.bg{
    position: absolute;
    z-index: -1;
    top:203px;
    width: 100%;
    left: 50%;
    margin-left: -50vw
}
.logo{
    width: 151px;
    position: absolute;
    left: 50%;
    margin-left: -75.5px;
    top: 190px;
}
.t1{
    color: white;
    text-align: center;
    letter-spacing: 2px;
    font-weight: bold;
    font-size: 32px;
    position: absolute;
   top: 235px;
   width: 100%;
   text-align: center;
    margin-bottom: 0;
    background-color: rgb(0, 0, 0,0);
    
}
.t2{
    color: white;

    text-align: center;
    letter-spacing: 7px;
    /* font-weight: bold; */
    font-size: 12px;
    margin-top: 5px;
    background-color: rgb(0, 0, 0,0);
    position: absolute;
   top: 280px;
   width: 100%;
   text-align: center;
}
.van-button{
    width: 100px;
    height: 26px;
    font-size: 12px;
    letter-spacing: 4px;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    top: 314px;
    border-radius: 9px;
    box-shadow: 2px -2px  #B12ECA ,-2px 2px #090016;


}
.bottomtext{
    color: white;
    width: 100%;
    height: 50px;
    background-color: rgb(0, 0, 0);
    text-align: center;
    /* line-height: ; */
    font-size: 8px;
    position: absolute;
    /* bottom:30px; */
    top: 790px;
    /* left: 50%; */
    /* margin-left: -68px; */
    z-index: 10;
    /* bottom:28px; */
    letter-spacing: 2px;
    font-weight: 600;
}
</style>