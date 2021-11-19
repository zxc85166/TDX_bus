<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

//回首頁
function goToHome() {
  router.push({
    path: '/'
  })
}
</script>

<template>
  <div class="grid mx-24 my-6">
    <div @click="goToHome" class="cursor-pointer relative">
      <img src="@/assets/images/logo.png" class="w-[132px]" alt="logo" />
      <p class="text-blue absolute top-0 left-20">回首頁</p>
    </div>
  </div>
</template>
