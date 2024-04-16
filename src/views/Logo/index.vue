<template>
  <div>
    <CommonHeader :ifhome="true" :ifback="true" mytitle="AILOGO设计"></CommonHeader>
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
            <p>智能LOGO设计</p>
            <p>所思所想所创</p>
          </div>
        </div>
        <div class="content-container">
          <div class="box">
            <p>品牌（公司）名称</p>
            <input v-model="brandName" type="text" class="custom-input" placeholder="请输入品牌（公司）名称" />
          </div>
          <div class="box">
            <p>传入样图</p>
            <van-uploader v-model="fileListbrand" :after-read="afterRead" reupload max-count="1"
              :preview-size="[311, 90]" upload-text="支持PNG/JPG模式,最大不超过2M" />

          </div>

          <div class="box" style="border: 0px;">
            <p>形状设置</p>
            <div class="item-container">
              <div v-for="item in gridItems1" :key="item.name" class="grid-item" @click="handleClick(item.name, 1)"
                :class="{ selected: selectedName1 === item.name }">
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="box-01" style="border: 0px;">
            <input v-model="myshape" type="text" class="custom-input" placeholder="自定义输入形状" />
          </div>
        </div>
      </div>
    </div>

    <!-- 第二页 -->
    <div v-if="nowStep === 2">
      <div class="content-container">
        <div class="box-02">
          <p>风格设置</p>
          <div class="item-container03">
            <div v-for="item in gridItems2" :key="item.name" class="grid-item" @click="handleClick(item.name, 2)"
              :class="{ selected: selectedName2 === item.name }">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="box-03" style="border: 0px;">
          <input v-model="mystyle" type="text" class="custom-input" placeholder="自定义输入风格" />
        </div>
      </div>
    </div>
    <div v-if="nowStep === 3">
      <div class="content-container">
        <div class="box-02">
          <p>配色设置</p>
          <div class="item-container03">
            <div v-for="item in gridItems3" :key="item.name" class="grid-item" @click="handleClick1(item.name)"
            :class="{ selected: isSelected(item.name) }">
            {{ item.name }}
          </div>
          </div>
        </div>
        <div class="box-03" style="border: 0px;">
          <input v-model="mycolor" type="text" class="custom-input" placeholder="自定义输入配色" />
        </div>
      </div>
    </div>

    <div v-if="nowStep === 4">
      <div class="content-container">
        <div class="box-02">
          <p>描述你对logo内容的要求</p>
        </div>

        <div class="textarea-container">
              <textarea v-model="postercontent" @input="handleInput" class="custom-input-plus"
                placeholder="请输入文案内容"></textarea>
        </div>
        
      </div>
    </div>

    <!-- total-steps可以改成这个工作流程需要的步骤数量, -->
    <PageChangeComp :nowStep="nowStep" :total-steps="4" @change-step="handleStep" @start-create="handleCreate">
    </PageChangeComp>
  </div>
</template>

<script setup>
import { ref ,watch } from "vue";
import { useRouter } from "vue-router";
import { postGenerateApi } from "@/api/generateApi"
import { getBlob } from "@/utils/getblob.js"
import { ElLoading } from 'element-plus';
import { onMounted } from "vue";
import { getViewApi } from "@/api/userApi";
import { useDrawStore } from "@/stores/drawStore";
import { showNotify } from "vant";

let drawStore = useDrawStore()

const router = useRouter()
let nowStep = ref(1);
// 使用 ref 创建一个响应式变量 inputValue
const brandName = ref("");
const mybody = ref("");
const myshape = ref("");
const mycolor = ref("");
const productType = ref("");
const productCopy = ref("");
//品牌信息图片url
let brandImg = ref("");
//添加主体图片url
let bodyImg = ref("");

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
//样图上传成功后
const afterRead = (file) => {
  // 此时可以自行将文件上传至服务器
  // brandImg=file.objectUrl
  // console.log("品牌信息file", brandImg);
  var base64String = file.content;
  bodyImg = getBlob(base64String)

  console.log("样图信息file", bodyImg);


};
//主体图片上传成功后

// const afterReadbody = (file) => {
//   // 此时可以自行将文件上传至服务器
//   bodyImg=file.objectUrl
//   console.log("主体图信息file", bodyImg);


// };
// -------------------------
// 创建网格数据
const gridItems1 = ref([
  { name: "圆形" },
  { name: "方形" },
  { name: "三角形" },
  { name: "菱形" },
  { name: "不规则形状" },
]);
const selectedName1 = ref(null);

// 创建第二个网格数据
const gridItems2 = ref([
  { name: "三维" },
  { name: "简易" },
  { name: "抽象" },
  { name: "塔罗牌" },
  { name: "水彩" },
  { name: "复古风格" },
  { name: "卡通" },
  { name: "油画" },
  { name: "新艺术运动" },
  { name: "单色" },
  { name: "剪影" },
  { name: "强阴影" },
]);
const selectedName2 = ref(null);

const gridItems3 = ref([
  { name: "红色" },
  { name: "紫色" },
  { name: "蓝色" },
  { name: "橙色" },
  { name: "黄色" },
  { name: "银色" },
  { name: "绿色" },
  { name: "金色" },
  { name: "白色" },
  { name: "黑色" },
  { name: "粉色" },
  { name: "棕色" },
]);
const selectedName3 = ref([]);
const handleClick1 = (name) => {
  const index = selectedName3.value.indexOf(name);
  if (index === -1) {
    // 如果项目名称不在已选中的数组中，将其添加进去
    selectedName3.value.push(name);
  } else {
    // 如果项目名称已经在已选中的数组中，将其从数组中移除
    selectedName3.value.splice(index, 1);
  }
};

const isSelected = (name) => {
  return selectedName3.value.includes(name);
};

const gridItems4 = ref([
  { name: "猫" },
  { name: "云" },
  { name: "狗" },
  { name: "剑" },
  { name: "鸟" },
  { name: "火箭" },
  { name: "猴子" },
  { name: "拳" },
  { name: "树" },
  { name: "太阳" },
  { name: "花" },
  { name: "月亮" },
]);
const selectedName4 = ref(null);

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
  } else if (gridNumber === 4) {
    // 更新选中名称（第四个网格）
    selectedName4.value = name;
  }
};
// -----------------------------

// 处理输入事件
const handleInput = (event) => {
  // 截取前20个字符
  productCopy.value = event.target.value.slice(0, 20);
};
  let calledGetViewApi = ref(true);

// 点击生成与后端交互
const handleCreate = () => {

  if(brandName.value === null && selectedName1.value === null && selectedName2.value === null
     && selectedName4.value === null){
    showNotify({ type: 'danger', message: '请输入必选内容' });
  }

  let logokeysarr = ref(brandName.value + ',' + selectedName1.value + ',' + selectedName2.value + ',' + selectedName3.value.join() + ',' + selectedName4.value)
  const loadingInstance = ElLoading.service({ fullscreen: true, text: "正在努力绘画中..." })
  
  var fd = new FormData();
  fd.append("logoReference", bodyImg, Date.now() + ".jpg");
  fd.append("logoKeys", logokeysarr.value);
  fd.append("language", "chinese simplified");
  fd.append("weight", "0.6");
  fd.append("prompt", "Custom_Logo");
  fd.append("client", "cuz");
  // getViewApi({prompt_id: "64e8f292-3db5-41cc-b9fa-b37a4e128450", client_id: "client_id_argv" })
  // .then((res)=>console.log(res))
  console.log("执行生成逻辑", bodyImg, logokeysarr.value);
  postGenerateApi(fd, { product: 'logo' })
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
                drawStore.logoimgurl1 = imgurl1
                drawStore.logoimgurl2 = imgurl2

                loadingInstance.close()
                calledGetViewApi.value = false

                clearInterval(intervalId);
                router.push("/logo/view")


              }
              else if (response.statusCode === 400) {
                console.log("等待绘图中...");
              } else {
                console.log("绘图失败");
                loadingInstance.close()
                // calledGetViewApi.value = false

                clearInterval(intervalId);
              }

            }).catch((error) => {
              console.error("获取绘图数据失败:", error);
              loadingInstance.close()
              clearInterval(intervalId);
              // calledGetViewApi.value = false

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

};
watch(
  calledGetViewApi,
  (newValue, oldValue) => {
    console.log("newValue",newValue);

    // 立即执行，且当 `source` 改变时再次执行
  },
  { immediate: true }
)
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

.box-01 {
  // position: absolute;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 388px;
  margin: 3% 3% 0 3%;
  border-bottom: 1px solid white;
}

.box-01 p {
  margin: 0 5%;
  font-size: 17px;
  letter-spacing: 5px;
}

.box-03 {
  // position: absolute;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 328px;
  margin: 3% 3% 0 3%;
  border-bottom: 1px solid white;
}

.box-03 p {
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
  width: 75%;
  height: 480px;
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
  grid-row-gap: 8px;
  /* 设置行间距 */
  grid-column-gap: 15px;
  /* 设置列间距 */
  margin-top: 18px;
}

.grid-item {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
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
  grid-row-gap: 13px;
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
