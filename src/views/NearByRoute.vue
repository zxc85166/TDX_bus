<script setup>
import { useRouter } from "vue-router";
import { useStore } from "@/store/store.js";
const router = useRouter();
const store = useStore();
console.log(store.NearByRouteData)
//回首頁
function goToHome() {
  router.push({
    path: '/'
  })
}
</script>

<template>
  <header class="flex items-center justify-between px-24 py-6 bg-gray">
    <div @click="goToHome" class="cursor-pointer">
      <img src="@/assets/images/backhome.png" class="w-[132px]" alt="logo" />
    </div>
    <p
      class="text-white place-items-center text-center"
    >{{ store.NearByRouteData.StationName.Zh_tw }}</p>
    <div></div>
  </header>

  <div class="mx-24 my-10">
    <div
      v-for="(Stops,index) in store.NearByRouteData.Stops "
      :key="index"
      class="odd:bg-gray rounded-[10px] m-3 p-3 cursor-pointer hover:bg-gray-light"
    >
      <div>
        <p class="text-blue text-lg">{{ Stops.RouteName.Zh_tw }}</p>
      </div>
    </div>
  </div>
</template>