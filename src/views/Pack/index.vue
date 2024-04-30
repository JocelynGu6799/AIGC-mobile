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
        <!-- ---------------------------- 标题部分   ---------------- -->
        <div class="title-container">
          <img src="@/assets/images/18-Postedby (4) 1.png" alt="" class="title-img" />
          <div class="text-overlay">
            <p>智能AI包装设计</p>
            <p>让创意无界</p>
          </div>
        </div>
        <!-- -------------------- 内容部分 -- 包装类型   ---------------- -->
        <div class="content-container">
          <div class="box-02">
            <p>*包装类型</p>
            <div class="item-container">
              <div v-for="item in gridItems2" :key="item.name" class="grid-item-img" @click="handleClick(item.image, 2)"
                :class="{ selected: selectedName2 === item.image }">
                <img :src="item.image" alt="Item Image" />
              </div>
              <div class="grid-item">
                <van-uploader v-model="fileListbody" :before-read="beforeRead" :after-read="afterReadbody" reupload
                  max-count="1" :preview-size="[95, 100]" upload-text="支持PNG/JPG模式,最大不超过10M" class="mainimg" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- -----------------第二页 --------------- -->
    <div v-if="nowStep === 2">
      <div class="content-container">
        <div class="box">
          <p>*品牌（公司）名称</p>
          <input v-model="brandName" type="text" class="custom-input brandfont" placeholder="请输入品牌（公司）名称"
            :style="{ fontFamily: ListFont }" />
          <p style="font-size: 15px;">参数选择</p>
          <div class="parameter_selection">
            <div class="row">
              <!-- 选择字体------------------------- -->
              <div class="item" style="width: 62%; ">
                <p>字体</p>
                <div>
                  <el-select v-model="ListFont" placeholder="请选择" size="small" fit-input-width="true"
                    style="width: 130px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                      :value="item.value"></el-option>
                  </el-select>
                </div>
              </div>
              <!-- 选择字号--------------------- -->
              <div class="item" style="width: 38%; ">
                <p>字号</p>
                <input v-model="ListFontSize" type="number" class="num-input" style="width: 65%;" placeholder="1~100" />
              </div>
            </div>
            <div class="row">
              <div class="item" style="width: 62%;">
                <p>位置</p>
                <div style="display: flex;  justify-content: center; ">
                  <p style="margin-left: 0.5vh;">x</p>
                  <input v-model="FontPosX" type="number" class="num-input" style="width: 4.5vh; margin-right: 2vh;"
                    placeholder="0~100" />
                </div>
                <div style="display: flex;  justify-content: center; ">
                  <p>y</p>
                  <input v-model="FontPosY" type="number" class="num-input" style="width: 4.5vh;" placeholder="0~100" />
                </div>
              </div>
              <div class="item" style="width: 38%;">
                <p>字距</p>
                <input v-model="WordSpacing" type="number" class="num-input" style="width: 65%;"
                  placeholder="-1000~100" />
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          <p>*品牌信息（LOGO）</p>
          <van-uploader v-model="fileListbrand" :before-read="beforeRead" :after-read="afterRead" reupload max-count="1"
            :preview-size="[311, 114]" upload-text="支持PNG/JPG模式,最大不超过10M"
            style="border: 1px solid white; border-radius: 10px; margin: 3% 15px;" />
          <p style="font-size: 15px;">参数选择</p>
          <div class="parameter_selection">
            <div class="row">
              <div class="item" style="width: 62%;">
                <p>位置</p>
                <div style="display: flex;  justify-content: center; ">
                  <p style="margin-left: 0.5vh;">x</p>
                  <input v-model="LOGOPosX" type="number" class="num-input" style="width: 4.5vh; margin-right: 2vh;"
                    placeholder="0~100" />
                </div>
                <div style="display: flex;  justify-content: center; ">
                  <p>y</p>
                  <input v-model="LOGOPosY" type="number" class="num-input" style="width: 4.5vh;" placeholder="0~100" />
                </div>
              </div>
              <div class="item" style="width: 38%;">
                <p>大小</p>
                <input v-model="LogoSize" type="number" class="num-input" style="width: 65%;" placeholder="0~10" />
              </div>
            </div>
          </div>
        </div>
        <div class="box" style="border: none;">
          <p style="margin: 0; padding:1vh; font-size: 10px;">此页为非必选内容，可直接跳过。</p>
          <van-button  @click="handlePreview" class="prebutton">预览</van-button>
          <!-- 弹窗组件 -->
          <van-popup v-model:show="popupVisible" position="center" :round="true"
           >
            <!-- 弹窗内容，这里放置图片 -->
            <img :src="popupImageUrl" alt="Preview Image" />
            <!-- <img src="./assets/Mizune_00001_饮料食品饮料塑料瓶1.png" alt="Preview Image" /> -->
          </van-popup>
        </div>
      </div>
    </div>

    <!-- ----------------第三页--------------- -->
    <div v-if="nowStep === 3">
      <div class="content-container">
        <!-- 产品类型------------ -->
        <div class="box">
          <p>*产品类型</p>
          <input v-model="productType" type="text" class="custom-input" placeholder="例：购物袋、饼干盒" />
        </div>
        <!-- 产品描述 -->
        <div class="box">
          <p>*产品外观描述</p>
          <div class="textarea-container">
            <textarea v-model="productCopy" @input="handleInput" class="custom-input-plus"
              placeholder="请输入文案内容，例如：精美的外卖盒"></textarea>
            <span class="char-counter">{{ productCopy.length }}/20</span>
          </div>
        </div>
        <!-- 配色方案 -->
        <div class="box-02" style="margin-top: 2vh;">
          <p>*选择你喜欢的配色方案</p>
          <div class="item-container">
            <div v-for="item in gridItems1" :key="item.name" class="grid-item" @click="handleClick(item.name, 1)"
              :class="{ selected: selectedName1 === item.name }">
              {{ item.name }}
            </div>
          </div>
          <input v-model="colorType" type="text" class="custom-input" @input="handleInputColor"
            style="width: 100%;box-sizing: border-box;margin: 2vh 0 0 0;" placeholder="例：玫瑰金、鲜红等" />
        </div>
        <div class="box-02">
          <p>*风格设置</p>
          <div class="item-container">
            <div v-for="item in gridItems3" :key="item.name" class="grid-item" @click="handleClick(item.prompt, 3)"
              :class="{ selected: selectedName3 === item.prompt }">
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
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { postGenerateApi } from "@/api/generateApi";
import { getBlob } from "@/utils/getblob.js";
import { ElLoading } from "element-plus";
import { onMounted } from "vue";
import { getViewApi } from "@/api/userApi";
import { useDrawStore } from "@/stores/drawStore";
import { showNotify } from "vant";
// let brandfont=ref()
let drawStore = useDrawStore();
const router = useRouter();
let nowStep = ref(1);
// 使用 ref 创建一个响应式变量 inputValue
const brandName = ref(""); //-----------------------------------------品牌名称
const productType = ref(""); //--------------------------------------------产品类型
const productCopy = ref(""); //-------------------------------------------产品文案
// 字体 ————————————————————————开始
const ListFont = ref("汉仪雅酷黑75W.ttf");//----------------------------------------------字体名称
const ListFontSize = ref(30);//--------------------------------------------字号
const FontPosX = ref(55); // ---------------X轴位置
const FontPosY = ref(80);// -------------T轴位置
const WordSpacing = ref(-500);//  --------字间距
//字体 ————————————————————————结束
//===============================================
// ---------LOGO
let brandImg = ref(""); //--------------------------------------------------品牌信息(LOGO)图片url
const LogoSize = ref(0.5); // --------------------------------------------------Logo大小
const LOGOPosX = ref(55); // --------------------------------------------------LogoX位置
const LOGOPosY = ref(80); // --------------------------------------------------LogoY位置
// -------------结束
let bodyImg = ref(""); //----------------------------------------------------添加主体图片url
let selectedName2 = ref(""); //---------------------------------包装类型（跟主体图二选一
const colorType = ref("");//--------------------------颜色
// 创建包装类型
const gridItems2 = ref([
  { name: "红酒瓶", image: "./assets/Mizune_00001_饮料食品饮料塑料瓶1.png" },
  { name: "手提纸盒", image: "./assets/Mizune_00005_饮料食品饮料塑料瓶.png" },
  { name: "纸盒1", image: "./assets/Mizune_00009_手提袋.png" },
  { name: "Item D", image: "./assets/Mizune_00018_长方形包装盒.png" },
  { name: "Item E", image: "./assets/Mizune_00024_牛奶盒.png" },
]);

const canNext = ref(false); //当前页面是否完成输入

const handleStep = (mystep) => {
  // -------------强制填写逻辑（未完成
  // if (nowStep.value === 1 && (selectedName2.value != "" || fileListbody.value.length != 0)) {
  //   canNext.value = true;
  // }
  // if (nowStep.value === 2) {
  //   if (fileListbrand.value.length != 0 && brandName.value.trim() != "") {
  //     canNext.value = true;
  //     console.log(canNext.value);
  //   } else if (fileListbrand.value.length === 0 && brandName.value.trim() === "") {
  //     canNext.value = true;
  //     console.log(canNext.value);
  //   } else {
  //     canNext.value = false;
  //     console.log(canNext.value);
  //   }
  // }
  if( nowStep.value === 1 && (bodyImg.value !== "" )){
    canNext.value = true;
  }
  // if( nowStep.value === 2 && (brandName.value  !== "" && brandImg.value!=="")){
  if( nowStep.value === 2 ){
    canNext.value = true;
  }

  // mystep的值为-1或1,对应改变nowStep的值
  if (mystep === 1) {
    if (canNext.value === true) {
      console.log("mystep", mystep);
      nowStep.value += mystep;
      canNext.value = false;
    } else {
      showToast('您还有内容未补充完整');
    }
  } else {
    nowStep.value += mystep;
    canNext.value = false;
  }
  console.log(canNext.value);

};

const fileListbrand = ref([
  // Uploader 根据文件后缀来判断是否为图片文件
  // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
  //   { url: 'https://cloud-image' },
]);

const fileListbody = ref([
  // { url: selectedName2.value },
  // Uploader 根据文件后缀来判断是否为图片文件
  // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
  //   { url: 'https://cloud-image' },
]);
// ---------品牌名称输入后改变字体效果---------------

// 选中的值和下拉框选项
const options = ref([
  { label: '汉仪雅酷黑75W', value: '汉仪雅酷黑75W.ttf' },
  { label: 'Slide秋鸿楷-Regular', value: 'Slide秋鸿楷-Regular.ttf' },
  { label: '庞门正道粗书体6.0', value: '庞门正道粗书体6.0.ttf' },
  { label: 'YouSheBiaoTiHei-2', value: 'YouSheBiaoTiHei-2.ttf' },
  { label: '优设标题黑', value: '优设标题黑.ttf' },
  { label: 'Alibaba-PuHuiTi-Heavy', value: 'Alibaba-PuHuiTi-Heavy.ttf' }

]);


//-----------判断图片大小------------------------
import { showToast } from "vant";
import { styleType } from "element-plus/es/components/table-v2/src/common.mjs";
// import { pa } from "element-plus/es/locales.mjs";
// import { log } from "console";
const beforeRead = (file) => {
  const maxSize = 10 * 1024 * 1024; // 10MB，根据需求设置最大尺寸
  if (file.size > maxSize) {
    showToast("文件大小超过限制，请选择大小在10MB以内的文件");
    return false; // 返回 false 表示不读取该文件
  }
  return true; // 返回 true 表示继续读取文件
};

//品牌图片LOGO上传成功后---------------------
const afterRead = (file) => {
  // 此时可以自行将文件上传至服务器

  var base64String = file.content;
  brandImg.value = getBlob(base64String);

  console.log("logo信息file", brandImg.value);
};

//包装类型-------------------上传成功后-------------------
const afterReadbody = (file) => {
  let imgElement = ""
  // console.log("");
  if (file) {
    //通过直接上传图片---------------------------
    //------------当我选择上传图片的时候清空之前选择的图片--------------
    const selectedItems = document.querySelectorAll('.grid-item-img.selected');
    selectedItems.forEach(item => { item.classList.remove('selected'); });
    selectedName2.value = "";
    var base64String = file.content;
    bodyImg.value = getBlob(base64String);
  } else {
    //如果已经选择了预设的图片-----------------------
    if (selectedName2 != "") {
      // 使用 findIndex 方法查找满足条件的元素在数组中的位置
      const selectedIndex = gridItems2.value.findIndex(item => item.image === selectedName2.value);
      imgElement = document.querySelector(`.grid-item-img:nth-child(${selectedIndex + 1}) img`);
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
    bodyImg.value = getBlob(base64String);
  }

  console.log("包装参考图(主体图)", bodyImg.value);
};
// -------------------------
// 创建配色方案
const gridItems1 = ref([
  { name: "蓝色" },
  { name: "红色" },
  { name: "金色" },
]);
const selectedName1 = ref(""); //--------------------------------------配色



const gridItems3 = ref([
  { name: "幻想写实", prompt: "revAnimated_v122EOL.safetensors" },
  { name: "幻想真实", prompt: "majicmixRealistic_v4.safetensors" },
  { name: "CG风", prompt: "GhostMix_V2.0.safetensors" },
  { name: "3D写实", prompt: "XXMix_9realistic_v4.0.safetensors" },
  { name: "真实工业", prompt: "realisticVisionV60B1_v51VAE.ckpt" },
]);
const selectedName3 = ref(""); //----------------------------------风格

// 点击事件处理程序
const handleClick = (name, gridNumber) => {
  if (gridNumber === 1) {
    // 更新选中名称（第一个网格）
    selectedName1.value = name;
  } else if (gridNumber === 2) {
    // 更新选中名称（包装类型）
    selectedName2.value = name;
    // fileListbody.value[0].url = selectedName2.value;
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
// ----------颜色预设/输入二选一只读取一个------------
const handleInputColor = () => {
  // 移除 gridItems1 的 selected 类
  gridItems1.value.forEach(item => {
    item.selected = false;
  });
  // 更新 selectedName1 的值为输入的内容
  selectedName1.value = colorType.value;
};
// -----------------------------

// 处理输入事件
const handleInput = (event) => {
  // 截取前20个字符
  productCopy.value = event.target.value.slice(0, 20);
};


// 控制弹窗显示状态的变量
const popupVisible = ref(false);
const popupImageUrl = ref("");
// 点击生成与后端交互
//预览工作流
const handlePreview = () => {
  if (!(brandImg.value&&brandName.value)) {
    showToast('您还有内容未补充完整');
    return; 
  }
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
  let packfd1 = new FormData();
  packfd1.append("packageRef", bodyImg.value, Date.now() + 'body.jpg');  //包装参考图
  packfd1.append("logoRef", brandImg.value, Date.now() + 'logo.jpg');  //logo

  packfd1.append("text", brandName.value);
  packfd1.append("client", "cuz");
  packfd1.append("prompt", "AI包装_logo与品牌名称调整");
  packfd1.append("brand_scale", ListFontSize.value);
  packfd1.append("spacing", WordSpacing.value);
  packfd1.append("text_x_percent", FontPosX.value);
  packfd1.append("text_y_percent", FontPosY.value);
  packfd1.append("logo_x_percent", LOGOPosX.value);
  packfd1.append("logo_y_percent", LOGOPosY.value);
  packfd1.append("logo_scale", LogoSize.value);
  packfd1.append("font_file", ListFont.value);
  postGenerateApi(packfd1, { product: "pack_logo_brand_adjust" })
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
                // const secondKey = keys[1]; // 获取数组中的第一个键
                const imgurlyulan = response.data[firstKey]; // 获取第一个键对应的值
                // const imgurl2 = response.data[secondKey]; // 获取第一个键对应的值
                console.log("imgurl,", imgurlyulan);
                drawStore.packimguryulan = imgurlyulan;
                // drawStore.packimgurl2 = imgurl2;
                popupImageUrl.value = drawStore.packimguryulan; //弹窗的图片路径赋值
                loadingInstance.close();

                clearInterval(intervalId);
                calledGetViewApi = false;
                popupVisible.value = true; //显示弹窗

              } else if (response.statusCode === 400) {
                console.log("等待绘图中...");
              } else {
                console.log("绘图失败");
                loadingInstance.close();
                calledGetViewApi.value = false;

                clearInterval(intervalId);
              }
            })
            .catch((error) => {
              console.error("获取绘图数据失败:", error);
              loadingInstance.close();
              clearInterval(intervalId);
              calledGetViewApi.value = false;

              // setTimeout(()=>{
              //     router.push("/")
              // },1000)
            });
        }
      }, 2000);
    })
    .catch((error) => {
              console.error("获取绘图数据失败:", error);
              loadingInstance.close();
              // clearInterval(intervalId);
              calledGetViewApi.value = false;
              showNotify({ type: "danger", message: "网络错误" });
              

              // setTimeout(()=>{
              //     router.push("/")
              // },1000)
            });
};

//生成工作流
const handleCreate = () => {
  console.log("productCopy.value",productCopy.value);
  // if (!productType.value==="" || !productCopy.value===""||!selectedName1.value===""||!selectedName3.value==="" ) {
  if (!(productType.value&&productCopy.value&&selectedName1.value&&selectedName3.value)) {
    showToast('您还有内容未补充完整');
    return; 
  }
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
  // packfd.append("logoRef", brandImg, Date.now() + ".jpg");  //logo
  packfd.append("productRef", bodyImg.value, Date.now() + "body2.jpg");  //品牌
  packfd.append("productDesc", packkeysarr.value);
  packfd.append("style", selectedName3.value);
  // packfd.append("style", "GhostMix_V2.0.safetensors");
  // packfd.append("productDesc", productType.value);
  packfd.append("client", "cuz");
  packfd.append("prompt", "AI包装_渲染出图");
  packfd.append("steps", 20);
  packfd.append("deep", 14);
  packfd.append("denoise", 0.69);
  // packfd.append("font_file", "汉仪雅酷黑75W.ttf .ttf");
  // packfd.append("from_translate", "auto");
  // packfd.append("to_translate", "english");
  // packfd.append("spacing", "-500");
  console.log("执行生成逻辑", packfd, ListFont.value + ".ttf");
  // router.push({name:'packview'})
  postGenerateApi(packfd, { product: 'pack_render' })
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
                // const secondKey = keys[1]; // 获取数组中的第一个键
                const imgurl1 = response.data[firstKey]; // 获取第一个键对应的值
                // const imgurl2 = response.data[secondKey]; // 获取第一个键对应的值
                console.log("imgurl,", imgurl1);
                drawStore.packimgurl1 = imgurl1;
                // drawStore.packimgurl2 = imgurl2;

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
                showNotify({ type: "danger", message: "绘图失败,请重试" });

              }
            })
            .catch((error) => {
              console.error("获取绘图数据失败:", error);
              loadingInstance.close();
              clearInterval(intervalId);
              // showNotify({ type: "danger", message: "网络错误" });

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
//---------banner-----------
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

//-------------------公用外侧容器--------------------
.content-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
}

// ---------------包装类型选择---------------------------
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
  grid-row-gap: 10px;
  grid-column-gap: 15px;
  margin-top: 18px;
}

.grid-item {
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 10px;
  display: flex;
  font-size: 15px;
  padding: 1vh 0;
  letter-spacing: 5px;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
}

// .box-02 .van-uploader {
//   margin: 0;
// }

:deep(.van-uploader__upload) {
  // margin: 5%;
margin: 0 auto;
  border: none;
}

:deep(.van-uploader__preview) {
  margin: 0 auto;
}
// // :deep(.van-uploader__preview-image) {
// //   width: 347px
// // }


:deep(.van-uploader__upload-text) {
  font-size: 11px;
  letter-spacing: 0;
}

.grid-item-img {
  border-radius: 10px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  background-color: white;
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
}

// -----------------第二个页面--------------
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
  height: 8vh;
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

// -------------参数选择---------
.parameter_selection {
  width: 100%;
  height: auto;
  margin-bottom: 2%;
  flex-wrap: wrap;
}

.parameter_selection .row {
  margin: 3% 5% 3% 8%;
  display: flex;
}

.parameter_selection .row .item {
  margin: 0;
  display: flex;
  align-items: center;
  /* 垂直居中 */
}

.parameter_selection .row p {
  font-size: 13px;
  margin: 0;
  padding-right: 2%;
}

:deep(.el-select__wrapper) {
  background-color: transparent;
  border-radius: 10px;
}

:deep(.el-select__placeholder) {
  color: white;
}

// :deep(.selectFont){
//   .el-select-dropdown__item{
//   padding: 0;
//   }
// }
.parameter_selection .num-input {
  width: 40%;
  height: auto;
  background-color: transparent;
  border: 1px solid white;
  border-radius: 10px;
  font-size: 13px;
  box-sizing: border-box;
  padding: 2% 7%;
}

.parameter_selection .num-input::placeholder {
  font-size: 10px;
  color: #999;
}

:deep(.van-cell-group) {
  background-color: transparent;
  border: 1px solid white;
  border-radius: 10px;
}

.char-counter {
  position: absolute;
  right: 3%;
  bottom: 6%;
  font-size: 15px;
  color: #666;
}

// 字体选择.....暂时没用
// .dropdown-list {
//   position: absolute;
//   left: 12%;
//   top: 18%;
//   width: 75%;
//   background-color: #fffffff4;
//   border-bottom-left-radius: 10px;
//   border-bottom-right-radius: 10px;
// }
// .dropdown-item {
//   padding: 2% 3%;
//   color: black;
//   cursor: pointer;
// }
// 没找出来而且没印象
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

.van-popup img {
  margin: 0 auto;
  display: block;
}

</style>
