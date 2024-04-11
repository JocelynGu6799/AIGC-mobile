<template>
    <div>
        <CommonHeader
      :ifhome="true"
      :ifback="true"
      mytitle="AILOGO设计"
    ></CommonHeader>
      <div class="content-container">
        
        <div class="img-display-container">
          <div class="img-box"></div>
        </div>
        <div class="down-space">
          <div class="down-title">
            <p>作品下载</p>
            <img src="@/assets/images/down_logo.png" alt="" />
          </div>
          <div class="down-title">
            <button>下载（JPG）</button>
          </div>
        </div>

        <div class="img-display-container">
          <div class="img-box"></div>
        </div>
        <div class="down-space">
          <div class="down-title">
            <p>作品下载</p>
            <img src="@/assets/images/down_logo.png" alt="" />
          </div>
          <div class="down-title">
            <button>下载（JPG）</button>
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
  width: 80%;
  margin-left: 170px;
}
.down-title {
  width: 100%;
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