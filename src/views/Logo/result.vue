<template>
    <div>
        <CommonHeader
      :ifhome="true"
      :ifback="true"
      mytitle="AILOGO设计"
    ></CommonHeader>
      <div class="content-container">
        
        <div class="img-display-container">
          <div class="img-box">
            <img :src="imgurl1" alt="">
          </div>
        </div>
        <div class="down-space">
          <div class="down-title">
            <p>作品下载</p>
            <img src="@/assets/images/down_logo.png" alt="" />
          </div>
          <div class="down-title">
            <button @click="saveAs()">下载（PNG）</button>
          </div>
        </div>

        <div class="img-display-container">
          <div class="img-box">
            <img :src="imgurl2" alt="">

          </div>
        </div>
        <div class="down-space">
          <div class="down-title">
            <p>作品下载</p>
            <img src="@/assets/images/down_logo.png" alt="" />
          </div>
          <div class="down-title">
            <button  @click="saveAs2()">下载（PNG）</button>
          </div>
        </div>
      </div>
   

    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {ref} from 'vue'
import { useDrawStore } from "@/stores/drawStore";
import { showNotify, closeNotify } from 'vant';
let drawStore = useDrawStore();
let imgurl1=ref('')
let imgurl2=ref('')
onMounted(()=>{
  imgurl1.value=drawStore.logoimgurl1
  imgurl2.value=drawStore.logoimgurl2
  console.log("imgurl",drawStore.logoimgurl1,drawStore.logoimgurl2);
  
  
})
const saveAs=()=>{
  
      const link = document.createElement('a');
      link.href = imgurl1.value;
      link.download = 'logoImg.jpg'; // 下载的文件名

      // 将链接元素添加到页面中并触发点击
      document.body.appendChild(link);
      link.click();

      // 移除链接元素
      document.body.removeChild(link);
     
      showNotify({ type: 'success', message: '已保存图片1到本地' });
}
const saveAs2=()=>{
  
  const link2 = document.createElement('a');
  link2.href = imgurl2.value;
  link2.download = 'logoImg2.jpg'; // 下载的文件名

  // 将链接元素添加到页面中并触发点击
  document.body.appendChild(link2);
  link2.click();

  // 移除链接元素
  document.body.removeChild(link2);
 
  showNotify({ type: 'success', message: '已保存图片2到本地' });
}
</script>

<style scoped>

.content-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
  height: auto;
}
.img-display-container {
  width: 70%;
  margin: 30px 0 0px 0;
}
.img-box {
  width: 100%;
  height: 180px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}
.down-space {
  width: 35%;
  /* margin-left: 170px; */
}
.down-title {
  /* width: 100%; */
  display: flex;
  flex-direction: row;
}
.down-space p {
  font-size: 17px;
  letter-spacing: 4px;
  margin-right: 20px;
}
.down-space button {
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
  background-color: transparent;
  font-size: 12px;
  margin: 15px 0;
  padding: 10px 3px;
  letter-spacing: 1.5px;
}
.van-uploader{
   margin: 15px auto;
   margin-left: 17px;
  
}
.box-02 .van-uploader{
    margin-left: 0;
}
.img-box img{
  height: 100%;
  display: block;
  margin: 0 auto;
}
</style>