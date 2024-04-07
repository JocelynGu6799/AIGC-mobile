<template>
    <div>
        <CommonHeader :ifhome="true" :ifback="true" mytitle="AI包装设计"></CommonHeader>
         <!-- 公共导航栏 -->
        <!-- ifhome是否显示home标志,ifback是否显示back标志 -->
     <!-- nowStep就是当前执行第几步 -->
     <!-- <div>现在是包装页面的第{{ nowStep }}步骤</div> -->
        <!-- 根据nowstep显示对应步骤的内容,按这个逻辑替换对应的需求 -->
        <div v-if="nowStep===1">
            <!-- 包装页面第一步显示的内容 -->
            <div class="all" style="height: 100%; width: 100%;">
                <div class="title-container">
                    <img src="@/assets/images/18-Postedby (4) 1.png" alt="" class="title-img">
                    <div class="text-overlay">
                        <p>智能AI包装设计</p>
                        <p>让创意无界</p>
                    </div>
                </div>
                <div class="content-container">
                    <div class="box">
                        <p>*品牌（公司）名称</p>
                        <input v-model="brandName" type="text" class="custom-input" placeholder="请输入品牌（公司）名称">
                    </div>
                    <div class="box">
                        <p>*产品类型</p>
                        <input v-model="productType" type="text" class="custom-input" placeholder="请输入您的产品，例：红酒、盒子">
                    </div>
                    <div class="box">
                        <p>&nbsp产品文案</p>
                        <div class="textarea-container">
                            <textarea v-model="productCopy" @input="handleInput" class="custom-input-plus" placeholder="请输入文案内容"></textarea>
                            <span class="char-counter">{{ productCopy.length }}/20</span>
                        </div>   
                    </div>             
                    <div class="box" style="border: 0px;">
                        <p>&nbsp品牌信息（LOGO）</p>
                        <div class="LOGO-up-container" >
                           <a href="#">
                            <p style="font-size: 30px;margin: 0;">+</p>
                            <p style="font-size: 12px;">支持PNG/JPG模式,最大不超过2M</p>
                           </a> 
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <div v-if="nowStep===2">
            <div class="content-container" >
                <div class="box-02">
                    <p>选择你喜欢的配色方案</p>
                    <div class="item-container">
                        <div v-for="item in gridItems1" :key="item.name" 
                            class="grid-item" 
                            @click="handleClick(item.name, 1)" :class="{ 'selected': selectedName1 === item.name }">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="box-02">
                    <p>*包装类型</p>
                    <div class="item-container">
                        <div v-for="item in gridItems2" :key="item.name" 
                            class="grid-item" 
                            @click="handleClick(item.name, 2)" :class="{ 'selected': selectedName2 === item.name }">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="box-02">
                    <p>添加主体图</p>
                    <div class="img-up-container">
                        <a href="#">
                            <p style="font-size: 35px;margin: 0;color: white;">+</p>
                            <p style="font-size: 12px;">支持PNG/JPG模式,最大不超过2M</p>
                        </a> 
                    </div> 
                </div>
            </div>
        </div>
        <div v-if="nowStep===3">
            <div class="content-container">
                <div class="box-02">
                    <p>风格设置</p>
                    <div class="item-container03">
                        <div v-for="item in gridItems3" :key="item.name" 
                            class="grid-item" 
                            @click="handleClick(item.name, 3)" :class="{ 'selected': selectedName3 === item.name }">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div v-if="nowStep===4">
            <div class="content-container">
                <div class="box" style="align-items: center;">
                    <p style="margin: 5px 0 15px 0;font-size: 14px;">效果图</p>
                </div>
                <div class="img-display-container">
                    <div class="img-box">

                    </div>
                    <div class="img-box">
                        
                    </div>
                </div>
                <div class="down-space">
                    <div class="down-title">
                        <p>作品下载</p>
                        <img src="@/assets/images/down_logo.png" alt="">
                    </div>
                    <div class="down-title" style="justify-content: space-between; ">
                        <button >下载（JPG）</button>
                        <button >工程文件下载&nbsp(DXF)</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- total-steps可以改成这个工作流程需要的步骤数量, -->
        <PageChangeComp :nowStep="nowStep" :total-steps="4" @change-step="handleStep" @start-create="handleCreate"></PageChangeComp>

    </div >
</template>

<script setup>
import {ref} from 'vue'
let nowStep=ref(1)
// 使用 ref 创建一个响应式变量 inputValue
const brandName = ref('');
const productType = ref('');
const productCopy = ref('');

const handleStep=(mystep)=>{
    // mystep的值为-1或1,对应改变nowStep的值
    console.log("mystep",mystep);
    nowStep.value+=mystep

}
// -------------------------
// 创建网格数据
const gridItems1    = ref([
  { name: 'Item 1' },
  { name: 'Item 2' },
  { name: 'Item 3' },
  { name: 'Item 4' },
  { name: 'Item 5' },
  { name: 'Item 6' },
  { name: 'Item 7' },
  { name: 'Item 8' },
  { name: 'Item 9' },
  { name: 'Item 10' },
  { name: 'Item 11' },
  { name: 'Item 12' }
]);
const selectedName1   = ref(null);

// 创建第二个网格数据
const gridItems2 = ref([
  { name: 'Item A' },
  { name: 'Item B' },
  { name: 'Item C' },
  { name: 'Item D' },
  { name: 'Item E' },
  { name: 'Item F' },
  { name: 'Item G' },
  { name: 'Item H' },
  { name: 'Item I' }
]);
const selectedName2 = ref(null);

const gridItems3    = ref([
  { name: 'Item 1' },
  { name: 'Item 2' },
  { name: 'Item 3' },
  { name: 'Item 4' },
  { name: 'Item 5' },
  { name: 'Item 6' },
  { name: 'Item 7' },
  { name: 'Item 8' },
  { name: 'Item 9' },
  { name: 'Item 10' },
  { name: 'Item 11' },
  { name: 'Item 12' }
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
};
// -----------------------------

// 处理输入事件
const handleInput = (event) => {
  // 截取前20个字符
  productCopy.value = event.target.value.slice(0, 20);
};
// 点击生成与后端交互
const handleCreate=()=>{
    console.log("执行生成逻辑");
}
</script>

<style lang="scss" scoped>
// ————————————————————————第一个页面的内容——————————————————————
.title-container{
    width: 100%;
    height: auto;
    position: relative;
    display: flex; 
    justify-content: center; 
    align-items: center;
}
.title-img{
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

.content-container{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
}

.box{
    // position: absolute;
    display: flex;
    flex-direction: column;
    height: auto; 
    width: 349px;
    margin: 3% 3% 0 3%;
    border-bottom: 1px solid white;
}
.box p{
    margin:0 5% ;
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
.textarea-container{
    position: relative;
    // width: 80%; 
    height: 40px;
    padding: 10px;
    margin: 3% 5% 5% 5%;
    border: 1px solid white;
    border-radius: 10px; 
}
.custom-input-plus{
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
.LOGO-up-container{
    position: relative;
    // width: 80%; 
    // height: 40px;
    padding: 10px 0;
    margin: 3% 5% 5% 5%;
    border: 1px solid white;
    border-radius: 10px; 
}
.LOGO-up-container a{
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
.box-02{
    width: 78%;
    margin-top: 30px;
    height: auto;
}
.box-02 p{
    font-size: 17px;
    letter-spacing: 5px;
}
.item-container{
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 创建四列 */
    grid-row-gap: 8px; /* 设置行间距 */
    grid-column-gap: 15px; /* 设置列间距 */
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
    background-color: #92b0fd; /* 设置选中后的背景颜色 */
}
.img-up-container{
    position: relative;
    width: 100%; 
    padding: 7% 0;
    margin: 5% 0;
    border: 1px solid white;
    border-radius: 10px; 
}
.img-up-container a{
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
.item-container03{
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 创建四列 */
    grid-row-gap: 20px; /* 设置行间距 */
    grid-column-gap: 35px; /* 设置列间距 */
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
    background-color: #92b0fd; /* 设置选中后的背景颜色 */
}
// --------------------------最后一个页面
.img-display-container{
    width: 70%;
    margin: 40px 0 20px 0;
}
.img-box{
    width: 100%;
    height: 150px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
}
.down-space{
    width: 80%;
}
.down-title{
    width: 100%;
    display: flex;
    flex-direction: row;
}
.down-space p{
    font-size: 17px;
    letter-spacing: 4px;
    margin-right: 10px;
}
.down-space button{
    border: 1px solid #ccc;
    border-radius: 10px; 
    width: 45%;
    background-color: transparent; 
    font-size: 12px;
    margin: 15px 0;
    padding: 10px 3px;
    letter-spacing: 1.5px;
}
</style>