<template>
  <div>
    <CommonHeader :ifhome="true" :ifback="true" mytitle="AI包装设计"></CommonHeader>
    <!-- 公共导航栏 -->
    <!-- ifhome是否显示home标志,ifback是否显示back标志 -->
    <!-- nowStep就是当前执行第几步 -->
    <!-- <div>现在是包装页面的第{{ nowStep }}步骤</div> -->
    <!-- 根据nowstep显示对应步骤的内容,按这个逻辑替换对应的需求 -->
    <div v-if="nowStep === 1">
      <!-- 包装页面第一步显示的内容 -->
      <div class="all" style="height: 100%; width: 100%">
        <div class="title-container">
          <img src="@/assets/images/18-Postedby (4) 1.png" alt="" class="title-img" />
          <div class="text-overlay">
            <p>智能AI包装设计</p>
            <p>让创意无界</p>
          </div>
        </div>
        <div class="content-container">
          <div class="box">
            <p>*品牌（公司）名</p>
            <input v-model="brandName" type="text" class="custom-input" placeholder="请输入品牌（公司）名称"
              @input="handleInputChange" :style="{ fontFamily: selectedFont }" />
            <!-- 添加字体选择 -->
            <ul v-if="showDropdownList" class="dropdown-list">
              <li v-for="(font, index) in fontList" :key="index" @click="selectFont(font)" class="dropdown-item">
                {{ font }}
              </li>
            </ul>
          </div>
          <div class="box">
            <p>*产品类型</p>
            <input v-model="productType" type="text" class="custom-input" placeholder="请输入您的产品，例：红酒、盒子" />
          </div>
          <div class="box">
            <p>&nbsp产品文案</p>
            <div class="textarea-container">
              <textarea v-model="productCopy" @input="handleInput" class="custom-input-plus"
                placeholder="请输入文案内容"></textarea>
              <span class="char-counter">{{ productCopy.length }}/20</span>
            </div>
          </div>
          <div class="box" style="border: 0px">
            <p>&nbsp品牌信息（LOGO）</p>
            <!-- <div class="LOGO-up-container" >
                           <a href="#">
                            <p style="font-size: 30px;margin: 0;">+</p>
                            <p style="font-size: 12px;">支持PNG/JPG模式,最大不超过2M</p>
                           </a> 
                        </div>  -->
            <van-uploader v-model="fileListbrand" :before-read="beforeRead" :after-read="afterRead" reupload
              max-count="1" :preview-size="[311, 82]" upload-text="支持PNG/JPG模式,最大不超过10M" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="nowStep === 2">
      <div class="content-container">
        <div class="box-02">
          <p>选择你喜欢的配色方案</p>
          <div class="item-container">
            <div v-for="item in gridItems1" :key="item.name" class="grid-item" @click="handleClick(item.name, 1)"
              :class="{ selected: selectedName1 === item.name }">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="box-02">
          <p>*包装类型</p>
          <div class="item-container">
            <div v-for="item in gridItems2" :key="item.name" class="grid-item-img" @click="handleClick(item.image, 2)"
              :class="{ selected: selectedName2 === item.image }">
              <img :src="item.image" alt="Item Image" />
            </div>
          </div>
        </div>
        <div class="box-02">
          <p>添加主体图(可自定义)</p>
          <van-uploader v-model="fileListbody" :before-read="beforeRead" :after-read="afterReadbody" reupload
            max-count="1" :preview-size="[292, 100]" upload-text="支持PNG/JPG模式,最大不超过10M" class="mainimg" />
        </div>
      </div>
    </div>
    <div v-if="nowStep === 3">
      <div class="content-container">
        <div class="box-02">
          <p>风格设置</p>
          <div class="item-container03">
            <div v-for="item in gridItems3" :key="item.name" class="grid-item" @click="handleClick(item.name, 3)"
              :class="{ selected: selectedName3 === item.name }">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- total-steps可以改成这个工作流程需要的步骤数量, -->
    <PageChangeComp :nowStep="nowStep" :total-steps="3" @change-step="handleStep" @start-create="handleCreate">
    </PageChangeComp>
  </div>
</template>

<script setup>
import { ref,watch  } from "vue";
import { useRouter } from "vue-router";
import { postGenerateApi } from "@/api/generateApi";
import { getBlob } from "@/utils/getblob.js";
import { ElLoading } from "element-plus";
import { onMounted } from "vue";
import { getViewApi } from "@/api/userApi";
import { useDrawStore } from "@/stores/drawStore";
import { showNotify } from "vant";

let drawStore = useDrawStore();
const router = useRouter();
let nowStep = ref(1);
// 使用 ref 创建一个响应式变量 inputValue
const brandName = ref(""); //-----------------------------------------品牌名称
const productType = ref(""); //--------------------------------------------产品类型
const productCopy = ref(""); //-------------------------------------------产品文案
let brandImg = ref(""); //--------------------------------------------------品牌信息(LOGO)图片url
let bodyImg = ref(""); //----------------------------------------------------添加主体图片url
let selectedName2 = ref(null); //---------------------------------包装类型（跟主体图二选一
// 创建包装类型
const gridItems2 = ref([
  { name: "红酒瓶", image: "./assets/wine.png" },
  { name: "手提纸盒", image: "./assets/手提纸盒.png" },
  { name: "纸盒1", image: "./assets/纸盒1.png" },
  // { name: "Item D" },
  // { name: "Item E" },
]);
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
let fileListbody = ref([
  { url: selectedName2.value },
  // Uploader 根据文件后缀来判断是否为图片文件
  // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
  //   { url: 'https://cloud-image' },
]);
// ---------品牌名称输入后改变字体效果---------------
const showDropdownList = ref(false);
const fontList = [
  "方正黑体简体",
  "方正楷体简体",
  "汉仪雅酷黑75W",
  "YouSheBiaoTiHei-2",
];
const selectedFont = ref("Arial"); //-----------------------------------------------输入内容对应的字体font_file

const handleInputChange = (event) => {
  brandName.value = event.target.value;
  showDropdownList.value = true;
};

const selectFont = (font) => {
  selectedFont.value = font; // Update selected font
  showDropdownList.value = false;
};

//-----------判断图片大小------------------------
import { showToast } from "vant";
const beforeRead = (file) => {
  const maxSize = 10 * 1024 * 1024; // 10MB，根据需求设置最大尺寸
  if (file.size > maxSize) {
    showToast("文件大小超过限制，请选择大小在10MB以内的文件");
    return false; // 返回 false 表示不读取该文件
  }
  return true; // 返回 true 表示继续读取文件
};

//品牌图片上传成功后
const afterRead = (file) => {
  // 此时可以自行将文件上传至服务器

  var base64String = file.content;
  brandImg = getBlob(base64String);

  console.log("logo信息file", brandImg);
};
//主体图片上传成功后

const afterReadbody = (file) => {
  let imgElement = null
  // console.log("");
  // 如果是自己上传的就直接转,是自选的那就canvas
  if (file) {
    var base64String = file.content;
    bodyImg = getBlob(base64String);
  } else {
    if (selectedName2.value === "./assets/wine.png") {
      imgElement = document.querySelector(".grid-item-img:nth-child(1) img");
    }
    if (selectedName2.value === "./assets/手提纸盒.png") {
      imgElement = document.querySelector(".grid-item-img:nth-child(2) img");
    }
    if (selectedName2.value === "./assets/纸盒1.png") {
      imgElement = document.querySelector(".grid-item-img:nth-child(3) img");
    }
    console.log("imgElement", imgElement);

    // 创建一个空的 Canvas 元素
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // 设置 Canvas 元素的大小与图像大小相同
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;

    // 在 Canvas 上绘制图像
    ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height,);
    // setTimeout(() => {
    // document.body.append(canvas)

    // }, 1000)

    // 将 Canvas 中的图像转换为 Base64 字符串
    const base64String = canvas.toDataURL("image/jpeg");
    bodyImg = getBlob(base64String);
  }

  console.log("包装参考图(主体图)", bodyImg);
};
// -------------------------
// 创建配色方案
const gridItems1 = ref([
  { name: "蓝色" },
  { name: "红色" },
  { name: "金色" },
  { name: "Item 4" },
  { name: "Item 5" },
  { name: "Item 6" },
  { name: "Item 7" },
  { name: "Item 8" },
  { name: "Item 9" },
]);
const selectedName1 = ref(null); //--------------------------------------配色

const gridItems3 = ref([
  { name: "Item 1" },
  { name: "Item 2" },
  { name: "Item 3" },
  { name: "Item 4" },
  { name: "Item 5" },
  { name: "Item 6" },
  { name: "Item 7" },
  { name: "Item 8" },
  { name: "Item 9" },
  { name: "Item 10" },
  { name: "Item 11" },
  { name: "Item 12" },
]);
const selectedName3 = ref(null); //----------------------------------后端暂时没用

// 点击事件处理程序
const handleClick = (name, gridNumber) => {
  if (gridNumber === 1) {
    // 更新选中名称（第一个网格）
    selectedName1.value = name;
  } else if (gridNumber === 2) {
    // 更新选中名称（包装类型）
    selectedName2.value = name;
    fileListbody.value[0].url = selectedName2.value;
    // 等图片挂载上去之后再说
    setTimeout(() => {
      afterReadbody();
    }, 500);
  } else if (gridNumber === 3) {
    // 更新选中名称（第三个网格）
    selectedName3.value = name;
  }
  console.log("selectedName2.value", selectedName2.value);
  console.log("fileListbody.value", fileListbody.value);
};

// -----------------------------

// 处理输入事件
const handleInput = (event) => {
  // 截取前20个字符
  productCopy.value = event.target.value.slice(0, 20);
};

// 点击生成与后端交互
const handleCreate = () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在努力绘画中...",
  });
  let calledGetViewApi = ref(true);
  let packkeysarr = ref(
    brandName.value +
    "," +
    productType.value +
    "," +
    productCopy.value +
    "," +
    selectedName1.value
  );
  console.log("packkeysarr.value", packkeysarr.value);
  let packfd = new FormData();
  packfd.append("logoRef", brandImg, Date.now() + ".jpg");
  packfd.append("packageRef", bodyImg, Date.now() + ".jpg");
  packfd.append("packKeys", packkeysarr.value);
  packfd.append("content", productType.value);
  packfd.append("client", "cuz");
  packfd.append("prompt", "AI_PACK");
  packfd.append("font_file", selectedFont.value + ".ttf");
  packfd.append("from_translate", "auto");
  packfd.append("to_translate", "english");
  packfd.append("spacing", "-500");
  console.log("执行生成逻辑", packfd, selectedFont.value + ".ttf");
  // router.push({name:'packview'})
  postGenerateApi(packfd, { product: "pack" })
    .then((postres) => {
      console.log("posterupload res", postres);

      const intervalId = setInterval(() => {
        if (calledGetViewApi.value) {
          console.log("calledGetViewApi", calledGetViewApi.value);

          getViewApi({ prompt_id: postres.prompt_id, client_id: "cuz" })
            .then((response) => {
              console.log("view res", response);
              if (response.statusCode === 200) {
                console.log("绘图成功", response);

                const keys = Object.keys(response.data); // 获取对象的所有键
                const firstKey = keys[0]; // 获取数组中的第一个键
                const secondKey = keys[1]; // 获取数组中的第一个键
                const imgurl1 = response.data[firstKey]; // 获取第一个键对应的值
                const imgurl2 = response.data[secondKey]; // 获取第一个键对应的值
                console.log("imgurl,", imgurl1, imgurl2);
                drawStore.packimgurl1 = imgurl1;
                drawStore.packimgurl2 = imgurl2;

                loadingInstance.close();

                clearInterval(intervalId);
                calledGetViewApi = false;
                router.push("/pack/view");
              } else if (response.statusCode === 400) {
                console.log("等待绘图中...");
              } else {
                console.log("绘图失败");
                loadingInstance.close();
                // calledGetViewApi.value = false;

                clearInterval(intervalId);
              }
            })
            .catch((error) => {
              console.error("获取绘图数据失败:", error);
              loadingInstance.close();
              clearInterval(intervalId);
              // calledGetViewApi.value = false;

              // setTimeout(()=>{
              //     router.push("/")
              // },1000)
            });
        }
      }, 2000);
    })
    .catch((error) => {
      showNotify({ type: "danger", message: "网络错误" });
      loadingInstance.close();
      // clearInterval(intervalId);
      // calledGetViewApi.value = false;
      console.error("获取上传数据失败:", error);
    });
  // router.push({name:'posterview'})
};
// watch(
//   calledGetViewApi,
//   (newValue, oldValue) => {
//     console.log("newValue",newValue);

//     // 立即执行，且当 `source` 改变时再次执行
//   },
//   { immediate: true }
// )
</script>

<style lang="scss" scoped>
// ————————————————————————第一个页面的内容——————————————————————
.title-container {
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-img {
  display: block;
  width: 100%;
  height: auto;
}

.text-overlay {
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
  margin: 3% 3% 0 3%;
  border-bottom: 1px solid white;
}

.box p {
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
  height: 40px;
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

.LOGO-up-container {
  position: relative;
  // width: 80%;
  // height: 40px;
  padding: 10px 0;
  margin: 3% 5% 5% 5%;
  border: 1px solid white;
  border-radius: 10px;
}

.LOGO-up-container a {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
  text-decoration: none;
}

.LOGO-up-container a:hover {
  color: rgb(211, 211, 211);
}

// 字体选择

.dropdown-list {
  position: absolute;
  left: 12%;
  top: 18%;
  width: 75%;
  background-color: #fffffff4;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.dropdown-item {
  padding: 2% 3%;
  color: black;
  cursor: pointer;
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

.item-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 创建四列 */
  grid-row-gap: 10px;
  /* 设置行间距 */
  grid-column-gap: 15px;
  /* 设置列间距 */
  margin-top: 18px;
}

.grid-item {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 8px;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
  background-size: cover;
  background-position: center;
}

.grid-item-img::after {
  opacity: 0.8;
}

.grid-item-img {
  border-radius: 10px;
  cursor: pointer;
}

.grid-item-img img {
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  border-radius: 10px;
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

// -------------------------------------
.item-container03 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* 创建四列 */
  grid-row-gap: 20px;
  /* 设置行间距 */
  grid-column-gap: 35px;
  /* 设置列间距 */
  margin-top: 18px;
}

.item-container03 .grid-item {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 10px;
  text-align: center;
  font-size: 17px;
  cursor: pointer;
}

.item-container03 .selected {
  background-color: #92b0fd;
  /* 设置选中后的背景颜色 */
}

// --------------------------最后一个页面
.img-display-container {
  width: 70%;
  margin: 40px 0 20px 0;
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

.van-uploader {
  margin: 15px auto;
  margin-left: 17px;
}

.box-02 .van-uploader {
  margin-left: 0;
}
</style>
