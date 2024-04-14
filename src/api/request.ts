import axios from "axios";
import base from "./base";
import useUserStore from "@/stores/userStore";
import { showNotify } from "vant";

const req = axios.create({
  baseURL: base.host,
  timeout:30000,
  // headers: {'Access-Control-Allow-Origin': '*'},
 
});

// 请求拦截
req.interceptors.request.use(
  (config) => {
    // 设置请求头
    
    // 传递token,现用现取
    // const useStore = useUserStore();
    // config.headers.token=useStore.token

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截
req.interceptors.response.use(
  (res) => {
    console.log(res);

    // 成功
    // const isSuccess = res.data.code === "200";
    // const isTokenExpired=res.data.code==='10019'
    // console.log(res.data.message);

    //     if(isSuccess && res.data.message==='注册成功'){
    //       console.log('成功');

    //       return '顾菁仪注册成功'
    //     }
    //     if (isTokenExpired){
    //       // 危险通知
    // showNotify({ type: 'danger', message: '登录信息过期,请重新登陆' });
    //     }

    // if (isSuccess) {
      return res.data;
    // }
  },
  (err) => {
    // showNotify({ type: "danger", message: "网络错误" });

    return Promise.reject(err);
  }
);

export default req;
