import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import { getUserInfoApi, postLoginApi, type ILoginParams } from '@/api/user'
import { useRouter } from 'vue-router'
import router from '@/router'
import { showNotify } from 'vant'
import type { ILoginParams } from '@/api/userApi'

// const router=useRouter()

const useUserStore = defineStore('user', () => {

  // const loginAction = async (params: ILoginParams) => {
  // }
  let isLogin=ref(false)
  return {isLogin}
   
},
{
    persist:true
}
)
export default useUserStore
