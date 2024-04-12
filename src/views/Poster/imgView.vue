<template>
  <div>
      <CommonHeader
    :ifhome="true"
    :ifback="true"
    mytitle="AI海报设计"
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

.down-title {
position: relative;
top: -50px;
left: 5px;
width: 100%;
display: flex;
flex-direction: row;
}

</style>