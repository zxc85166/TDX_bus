<script setup>
import { useRouter } from "vue-router";
import keybordBtn from "@/components/keybordBtn.vue";
const router = useRouter();

//回首頁
function goToHome() {
  router.push({
    path: '/'
  })
}
</script>

<template>
  <div class="mx-24 my-6">
    <div class="grid">
      <div @click="goToHome" class="cursor-pointer relative">
        <img src="@/assets/images/logo.png" class="w-[132px]" alt="logo" />
        <p class="text-blue absolute top-0 left-20">回首頁</p>
      </div>
    </div>
    <div class="bg-gray rounded-[10px] w-[360px] h-[550px] p-5">
      <div class="gird grid-cols-5">
        <div class="ml-7">
          <keybordBtn msg="紅" />
        </div>
        <div class="ml-7">
          <keybordBtn msg="藍" />
        </div>
        <div class="ml-7">
          <keybordBtn msg="1" />
        </div>
      </div>
    </div>
  </div>
</template>
