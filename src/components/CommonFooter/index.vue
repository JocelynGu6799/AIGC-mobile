<template>
    <div class="footer">
        <img src="@/assets/images/logo 1-1500h 1.png" alt="">

    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router=useRouter()

</script>

<style scoped>
.footer{
    width: 115px;
    position: absolute;
    /* bottom:30px; */
    top: 790px;
    left: 50%;
    margin-left: -57.5px;
    /* margin: 0 auto; */
    /* display: flex; */
    justify-content: center;
    /* background-color: palegoldenrod; */
}
</style>