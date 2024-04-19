import { defineStore } from "pinia"
import { ref } from "vue"

export const useDrawStore = defineStore('draw2', () => {
    //`ref()` 就是 `state` 属性
    // const contentId = ref('')
    // const dataUrl = ref('')
    // const prompt_id = ref('')
    const packimgurl1 = ref('')
    const packimguryulan = ref('')
    const logoimgurl1 = ref('')
    const logoimgurl2 = ref('')
    const posterimgurl = ref('')

    //`computed()` 就是 `getters`
    
    //`function()` 就是 `actions`
    // function increment() {
    //   count.value++
    // }
  
    return { packimgurl1,logoimgurl1,logoimgurl2,posterimgurl,packimguryulan}
  },{persist:true})