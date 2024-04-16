<template>
  <div>
    <CommonHeader :ifhome="true" :ifback="true" mytitle="AI海报设计"></CommonHeader>
    <!-- 公共导航栏 -->
    <!-- ifhome是否显示home标志,ifback是否显示back标志 -->
    <!-- nowStep就是当前执行第几步 -->
    <!-- 根据nowstep显示对应步骤的内容,按这个逻辑替换对应的需求 -->
    <div v-if="nowStep === 1">
      <div class="all" style="height: 100%; width: 100%">
        <div class="title-container">
          <img src="@/assets/images/18-Postedby (4) 1.png" class="Poster-logo" />
          <div class="text-overlay">
            <p>智能AI海报设计</p>
            <p>注入灵感快人一步</p>
          </div>
        </div>
        <div class="content-container">
          <div class="box">
            <p>*海报主标题</p>
            <input v-model="brandName" type="text" class="custom-input" placeholder="请输入海报主标题" />
          </div>
          <div class="box">
            <p>&nbsp海报副标题</p>
            <input v-model="brandName2" type="text" class="custom-input" placeholder="请输入海报副标题" />
          </div>
          <div class="box-1">
            <p>&nbsp海报内容</p>
            <div class="textarea-container">
              <textarea v-model="postercontent" @input="handleInput" class="custom-input-plus"
                placeholder="请输入文案内容"></textarea>
              <span class="char-counter">{{ postercontent.length }}/35</span>
            </div>
          </div>
        </div>
      </div>
      <!-- total-steps可以改成这个工作流程需要的步骤数量, -->
    </div>
    <div v-if="nowStep === 2">
      <div class="content-container">
        <div class="box-02">
          <p>请选择您的行业</p>
          <div class="item-container02">
            <div v-for="item in gridItems1" :key="item.name" class="grid-item" @click="handleClick(item.name, 1)"
              :class="{ selected: selectedName1 === item.name }">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="box-02">
          <p>请选择风格设置</p>
          <div class="item-container02">
            <div v-for="item in gridItems3" :key="item.name" class="grid-item" @click="handleClick(item.prompt, 2)"
              :class="{ selected: selectedName2 === item.prompt }">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="nowStep === 3">
      <div class="box-03" style="border: 0px">
        <p>品牌信息（LOGO）</p>
        <van-uploader class="van-uploader" v-model="fileListbrand" :after-read="afterReadbrand" reupload max-count="1"
          :preview-size="[311, 100]" upload-text="支持PNG/JPG模式,最大不超过2M" />
      </div>
      <div class="box-03" style="border: 0px">
        <p>添加主体图</p>
        <van-uploader class="van-uploader" v-model="fileListbody" :after-read="afterReadbody" reupload max-count="1"
          :preview-size="[311, 100]" upload-text="支持PNG/JPG模式,最大不超过2M" />
      </div>
      <div class="box-04">
        <p>海报类型</p>
        <div class="item-container03">
          <div v-for="item in gridItems2" :key="item.name" class="grid-item" @click="handleClick(item.name, 3)"
            :class="{ selected: selectedName3 === item.name }">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <PageChangeComp :nowStep="nowStep" :total-steps="3" @change-step="handleStep" @start-create="handleCreate">
  </PageChangeComp>

</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { postGenerateApi } from "@/api/generateApi"
import {getBlob} from "@/utils/getblob.js"
import { ElLoading } from 'element-plus';
import{ onMounted } from "vue";
import { getViewApi } from "@/api/userApi";
import { useDrawStore } from "@/stores/drawStore";
import { showNotify } from "vant";

let drawStore=useDrawStore()
onMounted(()=>{
  // ElLoading.service({ fullscreen: true, text: "正在努力绘画中..." })

})
const router = useRouter()
let nowStep = ref(1);
// 使用 ref 创建一个响应式变量 inputValue
const brandName = ref("");
const brandName2 = ref("");
const postercontent = ref("");
//品牌信息图片url
let brandImg = ref(null);
//添加主体图片url

let bodyImg = ref(null);

const handleStep = (mystep) => {
  // mystep的值为-1或1,对应改变nowStep的值
  console.log("mystep", mystep);
  nowStep.value += mystep;
};
const fileListbrand = ref([
  // Uploader 根据文件后缀来判断是否为图片文件
  // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
  //   { url: 'https://cloud-image' },
]);
const fileListbody = ref([
  // Uploader 根据文件后缀来判断是否为图片文件
  // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
  //   { url: 'https://cloud-image' },
]);
//品牌图片上传成功后
const afterReadbrand = (file) => {
  // 此时可以自行将文件上传至服务器
  // brandImg=file.objectUrl
  var base64String = file.content;
 
  
  // console.log("blob", blob);
  brandImg =getBlob(base64String)
  console.log("品牌信息file", brandImg);


};
//主体图片上传成功后

const afterReadbody = (file) => {
  var base64String = file.content;
  bodyImg = getBlob(base64String)
 
  console.log("主体图信息file", bodyImg);


};
// -------------------------
// 创建网格数据
const gridItems1 = ref([
  { name: "影视" },
  { name: "IT/科技" },
  { name: "建筑/家具" },
  { name: "金融/财务" },
  { name: "餐饮/食品" },
  { name: "丽人/美发" },
]);
const selectedName1 = ref(null);

// 创建第二个网格数据
const gridItems2 = ref([
  { name: "9:16" },
  { name: "1:1" },
]);
const selectedName2 = ref(null);

const gridItems3 = ref([
  { name: "山水自然", prompt: "poster_test" },
  { name: "晶石国风", prompt: "FINAL_POSTER_DEMO0002" },
  { name: "纸雕风格", prompt: "FINAL_POSTER_DEMO0003" },
]);
const selectedName3 = ref(null);

// 点击事件处理程序
const handleClick = (name, gridNumber) => {
 
  if (gridNumber === 1) {
    // 更新选中名称（第一个网格）
    selectedName1.value = name;
  } else if (gridNumber === 2) {
    // 更新选中名称（第二个网格）
    selectedName2.value = name;
  } else if (gridNumber === 3) {
    // 更新选中名称（第三个网格）
    selectedName3.value = name;
  }
  // } else if (gridNumber === 4) {
  //   // 更新选中名称（第四个网格）
  //   selectedName4.value = name;
  // } else if (gridNumber === 5) {
  //   // 更新选中名称（第五个网格）
  //   selectedName5.value = name;
  // }
  // console.log(selectedName1,selectedName2,selectedName3);
};
// -----------------------------

// 处理输入事件
const handleInput = (event) => {
  // 截取前35个字符
  postercontent.value = event.target.value.slice(0, 35);
};



// 点击生成与后端交互
const handleCreate = () => {
  const loadingInstance = ElLoading.service({ fullscreen: true, text: "正在努力绘画中..." })
  let calledGetViewApi = ref(true);

  //后端传参
var fd = new FormData();
fd.append("mainImg", bodyImg,Date.now() + ".jpg");
fd.append("logo", brandImg,Date.now() + ".jpg");
fd.append("mainTitle", brandName.value);
fd.append("posterContent", postercontent.value);
fd.append("prompt", selectedName2.value);
fd.append("client", "cuz");
// getViewApi({prompt_id: "64e8f292-3db5-41cc-b9fa-b37a4e128450", client_id: "client_id_argv" })
// .then((res)=>console.log(res))
  console.log("执行生成逻辑", bodyImg, brandImg, brandName.value, postercontent.value, selectedName2.value);
  postGenerateApi(fd,{product:'poster'})
    .then((postres) => {

      console.log("posterupload res", postres);
     

      const intervalId = setInterval(() => {
        if(calledGetViewApi.value){
          console.log("calledGetViewApi",calledGetViewApi.value);

          getViewApi({ prompt_id: postres.prompt_id, client_id: "cuz" })
              .then((response) => {
                  console.log("view res", response);
                  if (response.statusCode === 200) {
                      
                      console.log("绘图成功", response);


                      const keys = Object.keys(response.data); // 获取对象的所有键
                      const firstKey = keys[0]; // 获取数组中的第一个键
                      const imgurl = response.data[firstKey]; // 获取第一个键对应的值
                      console.log("imgurl,", imgurl);
                      drawStore.posterimgurl=imgurl

                      loadingInstance.close()
                      calledGetViewApi.value=false


                      clearInterval(intervalId);
                      router.push("/poster/view")


                  }
                  else if (response.statusCode === 400) {
                      console.log("等待绘图中...");
                  } else {
                      console.log("绘图失败");
                      loadingInstance.close()
                      // calledGetViewApi.value=false

                  clearInterval(intervalId);
                  }

              }).catch((error) => {
                  console.error("获取绘图数据失败:", error);
                  loadingInstance.close()
                  clearInterval(intervalId);
                  // calledGetViewApi.value=false

                  // setTimeout(()=>{
                  //     router.push("/")
                  // },1000)

              });
            }
      }, 2000)
      


    }).catch((error) => {
      console.error("获取上传数据失败:", error);
      showNotify({ type: "danger", message: "网络错误" });
    loadingInstance.close()
    });
  // router.push({name:'posterview'})


};
</script>

<style lang="scss" scoped>
// ————————————————————————第一个页面的内容——————————————————————
.Poster-logo {
  width: 100%;
  height: 100%;
}

.title-container {
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-overlay {
  font-weight: bold;
  position: absolute;
  top: 0;
  height: 100%;
  width: 349px;
  margin: 0 auto;
  border-bottom: 2px solid white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-overlay p {
  margin: 0;
  /* 去除段落的默认边距 */
  padding: 5px 50px;
  /* 添加一些内边距，让文字距离图片有一定的间隔 */
}

.text-overlay p:first-child {
  text-align: left;
  /* 上面左对齐 */
  letter-spacing: 5px;
  /* 设置字间距 */
}

.text-overlay p:last-child {
  text-align: right;
  /* 下面右对齐 */
  letter-spacing: 5px;
  /* 设置字间距 */
}

.content-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
}

.box {
  // position: absolute;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 349px;
  margin: 5% 3% 0 3%;
  border-bottom: 1px solid white;
}

.box-1 {
  // position: absolute;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 349px;
  margin: 5% 3% 0 3%;
}

.box p {
  margin: 0 5%;
  font-size: 17px;
  letter-spacing: 5px;
}

.box-1 p {
  margin: 0 5%;
  font-size: 17px;
  letter-spacing: 5px;
}

.custom-input {
  outline: none;
  background-color: transparent;
  // width: 80%;
  padding: 10px;
  margin: 3% 5% 5% 5%;
  border: 1px solid white;
  border-radius: 10px;
  font-family: Arial, sans-serif;
  font-size: 16px;
  letter-spacing: 4px;
}

.textarea-container {
  position: relative;
  // width: 80%;
  height: 80px;
  padding: 10px;
  margin: 3% 5% 5% 5%;
  border: 1px solid white;
  border-radius: 10px;
}

.custom-input-plus {
  display: block;
  outline: none;
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
  font-size: 16px;
  letter-spacing: 4px;
}

.char-counter {
  position: absolute;
  right: 3%;
  bottom: 6%;
  font-size: 15px;
  color: #666;
  /* 字体颜色 */
}

// ————————————————————————第二个页面的内容——————————————————————
.box-02 {
  width: 78%;
  margin-top: 30px;
  height: auto;

}

.box-02 p {
  font-size: 17px;
  letter-spacing: 5px;
}

.selected {
  background-color: #92b0fd;
  /* 设置选中后的背景颜色 */
}

.img-up-container {
  position: relative;
  width: 100%;
  padding: 7% 0;
  margin: 5% 0;
  border: 1px solid white;
  border-radius: 10px;
}

// -------------------------------------
.item-container02 {
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  /* 创建四列 */
  grid-row-gap: 15px;
  /* 设置行间距 */
  grid-column-gap: 20px;
  /* 设置列间距 */
  margin-top: 20px;
  margin-left: -10px;
}

.item-container02 .grid-item {
  background-color: #cfcfcf1d;
  border: 1px solid #ccc;
  font-weight: bold;
  border-radius: 10px;
  width: 80px;
  padding: 15px 5px;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
  letter-spacing: 3px;
}

.item-container02 .selected {
  background-color: #92b0fd;
  /* 设置选中后的背景颜色 */
}

// --------------------------第三个页面
.box-03 {
  width: 100%;
  margin-top: 30px;
  margin-left: 15px;
  height: 150px;
  position: relative;
}

.box-03 p {
  font-size: 17px;
  letter-spacing: 5px;
}

.box-04 {
  width: 100%;
  margin-top: 50px;
  margin-left: 17px;
  height: auto;
  position: relative;
}

.box-04 p {
  font-size: 17px;
  letter-spacing: 5px;
}

.item-container03 {
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  /* 创建四列 */
  grid-row-gap: 25px;
  /* 设置行间距 */
  grid-column-gap: 10px;
  /* 设置列间距 */
  margin-top: 20px;
  // margin-left: -10px;
}

.item-container03 .grid-item {
  background-color: #cfcfcf55;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-left: 20px;
  width: 125px;
  height: 10px;
  padding: 15px 5px;
  text-align: center;
  font-size: 17px;
  cursor: pointer;
}

.item-container03 .selected {
  background-color: #92b0fd;
  /* 设置选中后的背景颜色 */
}

.van-uploader {
  left: 50%;
  margin: 15px auto;
  margin-left: -170px;
  position: absolute
}

.item-container03 {
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-row-gap: 25px;
  grid-column-gap: 10px;
  margin-top: 20px;
  /* width: 78%; */
  position: absolute;
  left: 50%;
  margin-left: -190px;
}
</style>
@/api/generateApi