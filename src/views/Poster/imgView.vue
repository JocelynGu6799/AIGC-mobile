<template>
  <div>
      <CommonHeader
    :ifhome="true"
    :ifback="true"
    mytitle="AI包装设计"
  ></CommonHeader>
    <div class="content-container">
      <div class="box" style="align-items: center">
      </div>
      <div class="img-display-container">
        <div class="img-box"></div>
      </div>
      <div class="down-space">
        <div class="down-title">
          <p>作品下载</p>
          <img src="@/assets/images/down_logo.png" alt="" />
        </div>
        <div class="down-title" style="justify-content: space-between">
          <button>下载（JPG）</button>
          <button>工程文件下载&nbsp(DXF)</button>
        </div>
      </div>
    </div>
 

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
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
position: absolute;
display: flex;
flex-direction: column;
height: auto;
width: 349px;
margin: 3% 3% 0 3%;
}
.box p {
margin: 0 5%;
font-size: 17px;
letter-spacing: 5px;
}
.custom-input {
outline: none;
background-color: transparent;
/* // width: 80%; */
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
/* // width: 80%; */
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
color: #666; /* 字体颜色 */
}
.LOGO-up-container {
position: relative;
/* // width: 80%; */
/* // height: 40px; */
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

/* // ————————————————————————第二个页面的内容—————————————————————— */
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
/* // ------------------------------------- */
.item-container03 {
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

.img-display-container {
width: 70%;
margin: 80px 0 20px 0;
}
.img-box {
width: 100%;
height: 400px;
position: relative;
top:-50px;
border: 1px solid #ccc;
}
.down-space {
width: 80%;
}
.down-title {
position: relative;
top: -50px;
left: 5px;
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
.van-uploader{
 margin: 15px auto;
 margin-left: 17px;

}
.box-02 .van-uploader{
  margin-left: 0;
}
</style>