<template>
  <div>
    <CommonHeader :ifhome="true" :ifback="true" mytitle="AI包装设计"></CommonHeader>
    <div class="content-container">
      <div class="box" style="align-items: center">
        <p style="margin: 5px 0 15px 0; font-size: 14px">效果图</p>
      </div>
      <div class="img-display-container">
        <div class="img-box">
          <img :src="imgurl1" alt="">
        </div>
        <!-- <div class="img-box">
          <img :src="imgurl2" alt="">
        </div> -->
      </div>
      <div class="down-space">
        <div class="down-title">
          <p>作品下载</p>
          <img src="@/assets/images/down_logo.png" alt="" />
        </div>
        <div class="down-title" style="justify-content: space-between">
          <button @click="saveAs()">下载（JPG）</button>
          <button>工程文件下载&nbsp(DXF)</button>
        </div>
      </div>
      <!-- <div class="down-space">
        <div class="down-title">
          <p>作品2下载</p>
          <img src="@/assets/images/down_logo.png" alt="" />
        </div>
        <div class="down-title" style="justify-content: space-between">
          <button @click="saveAs2()">下载（JPG）</button>
          <button>工程文件下载&nbsp(DXF)</button>
        </div>
      </div> -->
    </div>


  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue'
import { useDrawStore } from "@/stores/drawStore";
import { showNotify, closeNotify } from 'vant';
let drawStore = useDrawStore();
let imgurl1 = ref('')
let imgurl2 = ref('')
onMounted(() => {
  imgurl1.value = drawStore.packimgurl1
  // imgurl2.value = drawStore.packimgurl2
  console.log("imgurl", drawStore.packimgurl1);


})
const saveAs = () => {

  const link = document.createElement('a');
  link.href = imgurl1.value;
  link.download = 'packImg.jpg'; // 下载的文件名

  // 将链接元素添加到页面中并触发点击
  document.body.appendChild(link);
  link.click();

  // 移除链接元素
  document.body.removeChild(link);

  showNotify({ type: 'success', message: '已保存图片到本地' });
}
// const saveAs2 = () => {

//   const link2 = document.createElement('a');
//   link2.href = imgurl2.value;
//   link2.download = 'packImg2.jpg'; // 下载的文件名

//   // 将链接元素添加到页面中并触发点击
//   document.body.appendChild(link2);
//   link2.click();

//   // 移除链接元素
//   document.body.removeChild(link2);

//   showNotify({ type: 'success', message: '已保存图片2到本地' });
// }
</script>

<style scoped>


.content-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
}

.box {
  position: absolute;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 349px;
  margin: 3% 3% 0 3%;
  border-bottom: 1px solid white;
}

.box p {
  margin: 0 5%;
  font-size: 17px;
  letter-spacing: 5px;
}



.img-up-container {
  position: relative;
  width: 100%;
  padding: 7% 0;
  margin: 5% 0;
  border: 1px solid white;
  border-radius: 10px;
}

.img-up-container a {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
  text-decoration: none;
}

.img-up-container a:hover {
  color: rgb(211, 211, 211);
}




.img-display-container {
  width: 70%;
  margin: 80px 0 20px 0;
}

.img-box {
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}

.down-space {
  width: 80%;
}

.down-title {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.down-space p {
  font-size: 17px;
  letter-spacing: 4px;
  margin-right: 10px;
}

.down-space button {
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 45%;
  background-color: transparent;
  font-size: 12px;
  margin: 15px 0;
  padding: 10px 3px;
  letter-spacing: 1.5px;
}

.img-box img{
  height: 100%;
  display: block;
  margin: 0 auto;
}
</style>