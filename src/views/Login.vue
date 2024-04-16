<template>
    <div>
        <img src="@/assets/images/background-pic.png" alt="" class="bg">
        <img src="@/assets/images/logo 1-1500h 1.png" alt="" class="logo">


        <van-form @submit="onSubmit">
            <p>登录SOLART</p>
            <van-cell-group inset>
                <van-field v-model="loginInfo.client" name="用户名" label="用户名" placeholder="cuz"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="loginInfo.pw" type="password" name="密码" label="密码" placeholder="123456"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>

        <div class="bottomtext">
            <p>科技跃动未来无限想象</p>
            <p>Generate the future Imagine Infinite</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router";
import { postLoginApi } from '@/api/userApi'
import useUserStore from "@/stores/userStore";
import { showNotify } from "vant";

let userStore = useUserStore()
const router = useRouter()
interface ILoginInfo {
    client: string
    pw: string
}
const loginInfo = ref<ILoginInfo>({
    client: '',
    pw: ''
})
// 点击提交,和后端交互修改islogin
const onSubmit = (values: any) => {
    console.log('submit', values);
    console.log(loginInfo.value);

    postLoginApi(loginInfo.value)
        .then((loginres => {
            console.log("loginres", loginres);
            if (loginres.statusCode === 200) {
                userStore.isLogin = true
            } else if (loginres.statusCode === 201) {
                showNotify({ type: "danger", message: "用户名或密码错误" });

            }else{
            showNotify({ type: "danger", message: "数据库错误" });

            }



        }))
        .catch(err => {
            console.log("err", err);
            showNotify({ type: "danger", message: "网络错误" });


        })


    router.push("/select")
};
</script>

<style scoped lang="scss">
.bg {
    position: absolute;
    z-index: -1;
    top: 203px;
    width: 100%;
    left: 50%;
    margin-left: -50vw
}

.logo {
    width: 151px;
    position: absolute;
    left: 50%;
    margin-left: -75.5px;
    top: 67px;
}

.van-form {
    background-color: rgb(255, 255, 255, 0.5);
    width: 263px;
    height: 312px;
    border-radius: 24px;
    // margin: 0 auto;
    // margin-top: 168px;
    position: absolute;
    top: 168px;
    left: 50%;
    margin-left: -131.5px;

    p {
        text-align: center;
        color: white;
        font-size: 20px;
        font-weight: bold;
        padding: 20px 0;
    }
}

.van-cell .van-field {
    background-color: rgb(0, 0, 0, 0) !important;
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

.van-button {
    background-color: white;
    color: black;
    font-size: 14px;
    letter-spacing: 8px;
    border: none;
}
</style>