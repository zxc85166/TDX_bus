<script setup>
import Button from "@/components/Button.vue";
import { useRouter } from "vue-router";
const router = useRouter();
//前往Bus
function goToBus() {
  router.push({
    path: "/Bus",
  });
}
//前往Transport
function goToTransport() {
  router.push({
    path: "/Transport",
  });
}
</script>

<template>
  <div
    class="bg w-screen h-screen bg-cover bg-center mix-blend-lighten bg-black"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 pt-[20%] md:pt-[10%]">
      <div class="hidden md:grid"></div>
      <div class="pl-5 md:pl-[20%] relative">
        <img src="@/assets/images/logo.png" class="w-[271px]" />
        <img src="@/assets/images/Vector.png" class="absolute pl-8 md:pl-36" />
        <Button
          @click="goToBus"
          class="ml-[200px] md:ml-[330px] mt-[32px] z-50"
          msg="查詢公車"
        />
        <img
          src="@/assets/images/circle.png"
          class="absolute pt-9 md:pl-[112px]"
        />
        <img
          src="@/assets/images/circle.png"
          class="absolute pl-[237px] md:pl-[350px] pt-[358px]"
        />
        <Button
          @click="goToTransport"
          class="ml-[150px] md:ml-[300px] mt-[200px] z-50"
          msg="查詢客運"
        />
        <img
          src="@/assets/images/circle.png"
          class="absolute pl-[61px] md:pl-[173px] pt-[281px]"
        />
      </div>
    </div>
  </div>
  <!-- copyright -->
  <div class="fixed bottom-0 mx-auto pl-20 md:px-5 py-8 text-white">
    <p class="text-sm">Taiwan Bus © Code: 罐頭 / Design: KT</p>
  </div>
</template>
<style scoped>
.bg {
  background-image: url("@/assets/images/home.png");
}
</style>
