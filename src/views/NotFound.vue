<template>
    <div>
        <CommonHeader :ifback="true" :ifhome="true" mytitle="Not Found"></CommonHeader>
        <van-empty image="error" description="跑丢了..." />
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.van-empty{
    padding-top:150px;
}
</style>