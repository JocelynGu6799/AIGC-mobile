<template>
  <div>
      <CommonHeader :ifhome="true" :ifback="true" mytitle="AI海报设计"></CommonHeader>
       <!-- 公共导航栏 -->
      <!-- ifhome是否显示home标志,ifback是否显示back标志 -->
   <!-- nowStep就是当前执行第几步 -->
      <!-- 根据nowstep显示对应步骤的内容,按这个逻辑替换对应的需求 -->
      <div v-if="nowStep===1">
          <div class="all" style="height: 100%; width: 100%">
              <div class="title-container">
                <img src="@/assets/images/18-Postedby (4) 1.png" class="Poster-logo"/>
                <div class="text-overlay">
                <p>智能AI海报设计</p>
                <p>注入灵感快人一步</p>
                </div>
              </div>
          <div class="content-container">
              <div class="box">
              <p>*海报主标题</p>
              <input v-model="brandName" type="text" class="custom-input"placeholder="请输入海报主标题"/>
              </div>
              <div class="box">
              <p>&nbsp海报副标题</p>
              <input v-model="productType" type="text" class="custom-input" placeholder="请输入海报副标题"/>
              </div>
              <div class="box-1">
              <p>&nbsp海报内容</p>
                  <div class="textarea-container">
                  <textarea v-model="productCopy" @input="handleInput" class="custom-input-plus" placeholder="请输入文案内容"></textarea>
                  <span class="char-counter">{{ productCopy.length }}/35</span>
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
          <div
            v-for="item in gridItems1"
            :key="item.name"
            class="grid-item"
            @click="handleClick(item.name, 3)"
            :class="{ selected: selectedName3 === item.name }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="nowStep === 3">
      <div class="box-03" style="border: 0px">
          <p>品牌信息（LOGO）</p>
          <van-uploader class="van-uploader" v-model="fileListbrandlogo" :after-read="afterRead1" reupload max-count="1" :preview-size="[311, 82]" upload-text="支持PNG/JPG模式,最大不超过2M"/>
      </div>
      <div class="box-03" style="border: 0px">
          <p>品牌信息（二维码）</p>
          <van-uploader class="van-uploader" v-model="fileListbrandcode" :after-read="afterRead2" reupload max-count="1" :preview-size="[311, 82]" upload-text="支持PNG/JPG模式,最大不超过2M"/>
      </div>
      <div class="box-03">
        <p>海报类型</p>
        <div class="item-container03">
          <div
            v-for="item in gridItems2"
            :key="item.name"
            class="grid-item"
            @click="handleClick(item.name, 2)"
            :class="{ selected: selectedName2 === item.name }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
  </div>
  <div v-if="nowStep === 4">
      <div class="content-container">
      <div class="box-04">
        <p>风格设置</p>
        <div class="item-container04">
          <div
            v-for="item in gridItems3"
            :key="item.name"
            class="grid-item"
            @click="handleClick(item.name, 3)"
            :class="{ selected: selectedName3 === item.name }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
  </div>
  </div>
  <div v-if="nowStep === 5">
      <div class="content-container05">
      <div class="box-05">
        <p>选择喜欢的配色方案</p>
        <div class="item-container05">
          <div
            v-for="item in gridItems4"
            :key="item.name"
            class="grid-item05"
            @click="handleClick(item.name, 4)"
            :class="{ selected: selectedName4 === item.name }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="box-05">
        <p>海报用途</p>
        <div class="item-container06">
          <div
            v-for="item in gridItems5"
            :key="item.name"
            class="grid-item06"
            @click="handleClick(item.name, 5)"
            :class="{ selected: selectedName5 === item.name }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="box-05">
        <p>添加主体图</p>
        <van-uploader
            v-model="fileListbody"
            :after-read="afterReadbody"
            reupload
            max-count="1"
            :preview-size="[292, 100]"
            upload-text="支持PNG/JPG模式,最大不超过2M"
            
          />
      </div>
    </div>
  </div>
  </div>
      <PageChangeComp :nowStep="nowStep" :total-steps="5" @change-step="handleStep" @start-create="handleCreate"></PageChangeComp>
  
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router=useRouter()
let nowStep = ref(1);
// 使用 ref 创建一个响应式变量 inputValue
const brandName = ref("");
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
const fileListbrandlogo = ref([
// Uploader 根据文件后缀来判断是否为图片文件
// 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
//   { url: 'https://cloud-image' },
]);
const fileListbrandcode = ref([
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
const afterRead1 = (file) => {
// 此时可以自行将文件上传至服务器
brandImg=file.objectUrl
console.log("品牌信息logo", brandImg);


};
const afterRead2 = (file) => {
// 此时可以自行将文件上传至服务器
brandImg=file.objectUrl
console.log("品牌信息二维码", brandImg);


};
//主体图片上传成功后

const afterReadbody = (file) => {
// 此时可以自行将文件上传至服务器
bodyImg=file.objectUrl
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
{ name: "影视" },
{ name: "影视" },
{ name: "影视" },
{ name: "影视" },
{ name: "影视" },
{ name: "影视" },
{ name: "影视" },
{ name: "影视" },
{ name: "影视" },
{ name: "影视" },
{ name: "影视" },
]);
const selectedName1 = ref(null);

// 创建第二个网格数据
const gridItems2 = ref([
{ name: "9:16" },
{ name: "16:9" },
{ name: "2.35:1" },
{ name: "1:1" },
]);
const selectedName2 = ref(null);

const gridItems3 = ref([
{ name: "默认" },
{ name: "日式" },
{ name: "国潮" },
{ name: "扁平" },
{ name: "默认" },
{ name: "日式" },
{ name: "默认" },
{ name: "日式" },
{ name: "默认" },
{ name: "日式" },
]);
const selectedName3 = ref(null);

const gridItems4 = ref([
{ name: "推荐" },
{ name: "推荐" },
{ name: "推荐" },
{ name: "推荐" },
{ name: "推荐" },
{ name: "推荐" },
{ name: "推荐" },
{ name: "推荐" },
{ name: "推荐" },
{ name: "推荐" },
{ name: "推荐" },
]);
const selectedName4 = ref(null);

const gridItems5 = ref([
{ name: "节日祝福" },
{ name: "活动宣传" },
{ name: "商品促销" },
{ name: "企业营销" },
]);
const selectedName5 = ref(null);

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
} else if (gridNumber === 5) {
  // 更新选中名称（第五个网格）
  selectedName5.value = name;
}
};
// -----------------------------

// 处理输入事件
const handleInput = (event) => {
// 截取前35个字符
productCopy.value = event.target.value.slice(0, 35);
};
// 点击生成与后端交互
const handleCreate = () => {
console.log("执行生成逻辑");
router.push({name:'posterview'})

};
</script>

<style lang="scss" scoped>
// ————————————————————————第一个页面的内容——————————————————————
.Poster-logo{
  width:100%;
  height:100%;
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
margin: 0; /* 去除段落的默认边距 */
padding: 5px 50px; /* 添加一些内边距，让文字距离图片有一定的间隔 */
}

.text-overlay p:first-child {
text-align: left; /* 上面左对齐 */
letter-spacing: 5px; /* 设置字间距 */
}

.text-overlay p:last-child {
text-align: right; /* 下面右对齐 */
letter-spacing: 5px; /* 设置字间距 */
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
color: #666; /* 字体颜色 */
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
background-color: #92b0fd; /* 设置选中后的背景颜色 */
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
grid-template-columns: repeat(3, 3fr); /* 创建四列 */
grid-row-gap: 15px; /* 设置行间距 */
grid-column-gap: 20px; /* 设置列间距 */
margin-top:20px;
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
background-color: #92b0fd; /* 设置选中后的背景颜色 */
}

// --------------------------第三个页面
.box-03 {
width: 78%;
margin-top: 30px;
margin-left: 15px;
height: auto;
}
.box-03 p {
font-size: 17px;
letter-spacing: 5px;
}

.item-container03 {
display: grid;
grid-template-columns: repeat(2, 2fr); /* 创建四列 */
grid-row-gap: 25px; /* 设置行间距 */
grid-column-gap: 10px; /* 设置列间距 */
margin-top:20px;
margin-left: -10px;
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
background-color: #92b0fd; /* 设置选中后的背景颜色 */
}

.van-uploader{
  top:10px;
  left: 10px;
}

// --------------------------第四个页面
.box-04 {
width: 78%;
margin-top: 30px;
margin-left: 15px;
height: auto;
}
.box-04 p {
font-size: 17px;
letter-spacing: 5px;
}

.item-container04 {
display: grid;
grid-template-columns: repeat(2, 2fr); /* 创建四列 */
grid-row-gap: 25px; /* 设置行间距 */
grid-column-gap: 10px; /* 设置列间距 */
margin-top:20px;
margin-left: -10px;
}
.item-container04 .grid-item {
background-color: #cfcfcf55;
border: 1px solid #ccc;
border-radius: 10px;
margin-left: 0px;
width: 125px;
height: 35px;
padding: 15px 5px;
text-align: center;
font-size: 17px;
cursor: pointer;
}
.item-container04 .selected {
background-color: #92b0fd; /* 设置选中后的背景颜色 */
}

// --------------------------第五个页面
.box-05 {
width: 78%;
margin-left: 20px;
margin-top: 20px;
height: auto;

}
.box-05 p {
font-size: 17px;
letter-spacing: 5px;
}
.item-container05 {
display: grid;
grid-template-columns: repeat(4, 1fr); /* 创建四列 */
grid-row-gap: 8px; /* 设置行间距 */
grid-column-gap: 5px; /* 设置列间距 */
margin-top: 18px;
}
.grid-item05 {
border: 1px solid #ccc;
border-radius: 10px;
width: 60px;
height: 30px;
margin-left: 15px;
text-align: center;
font-size: 12px;
font-weight: bold;
cursor: pointer;
}
.selected {
background-color: #92b0fd; /* 设置选中后的背景颜色 */
}
.img-up-container05 {
position: relative;
width: 100%;
padding: 7% 0;
margin: 5% 0;
border: 1px solid white;
border-radius: 10px;
}
.img-up-container05 a {
display: flex;
flex-direction: column;
align-items: center;
color: #666;
text-decoration: none;
}
.img-up-container05 a:hover {
color: rgb(211, 211, 211);
}
// -------------------------------------
.item-container06 {
display: grid;
grid-template-columns: repeat(2, 2fr); /* 创建四列 */
grid-row-gap: 25px; /* 设置行间距 */
grid-column-gap: 10px; /* 设置列间距 */
margin-top:20px;
margin-left: 10px;
}
.grid-item06 {
background-color: transparent;
border: 1px solid #ccc;
border-radius: 10px;
margin-left: 4px;
width: 135px;
height: 8px;
padding: 15px 5px;
text-align: center;
font-size: 13px;
font-weight: bold;
cursor: pointer;
}
.item-container06 .selected {
background-color: #92b0fd; /* 设置选中后的背景颜色 */
}
</style>
