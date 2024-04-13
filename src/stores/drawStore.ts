import { defineStore } from "pinia"
import { ref } from "vue"

export const useDrawStore = defineStore('draw2', () => {
    //`ref()` 就是 `state` 属性
    // const contentId = ref('')
    // const dataUrl = ref('')
    // const prompt_id = ref('')
    const packimgurl = ref('https://cuz-meiti.oss-cn-hangzhou.aliyuncs.com/cuzaigc/clientId_client_id_argv/Image_20240412_194900_1?x-oss-process=style/small')
    const logoimgurl = ref('https://cuz-meiti.oss-cn-hangzhou.aliyuncs.com/cuzaigc/clientId_client_id_argv/Image_20240412_194900_1?x-oss-process=style/small')
    const posterimgurl = ref('https://cuz-meiti.oss-cn-hangzhou.aliyuncs.com/cuzaigc/clientId_client_id_argv/Image_20240412_194900_1?x-oss-process=style/small')
    

    //`computed()` 就是 `getters`
    
    //`function()` 就是 `actions`
    // function increment() {
    //   count.value++
    // }
  
    return { packimgurl,logoimgurl,posterimgurl}
  },{persist:true})