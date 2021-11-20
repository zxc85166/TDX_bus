<script setup>
import { useRouter } from "vue-router";
import { LocationOnRound, BackspaceRound } from "@vicons/material";
const router = useRouter();

//回首頁
function goToHome() {
  router.push({
    path: "/",
  });
}
const keyoboard = [
  { text: "紅", text2: "綠", text3: "橘", color: "text-blue" },
  { text: "藍", text2: "棕", text3: "小", color: "text-blue" },
  { text: "1", text2: "4", text3: "7", color: "text-white" },
  { text: "2", text2: "5", text3: "8", color: "text-white" },
  { text: "3", text2: "6", text3: "9", color: "text-white" },
];
</script>

<template>
  <div class="mx-24 my-24 grid place-items-start">
    <div class="flex items-center pb-4">
      <div @click="goToHome" class="cursor-pointer relative">
        <img src="@/assets/images/logo.png" class="w-[132px]" alt="logo" />
        <p class="text-blue absolute top-0 left-20">回首頁</p>
      </div>
      <input
        placeholder="選擇路線或手動輸入關鍵字"
        class="
          form-input
          ml-3
          pl-4
          py-3
          rounded-xl
          bg-gray
          text-gray-light
          h-10
          w-60
        "
      />
    </div>

    <div class="bg-gray rounded-[10px] w-[382px] h-[550px] p-5">
      <div class="flex gap-3">
        <button
          class="
            hover:text-black hover:bg-blue
            py-2
            px-14
            rounded-xl
            border-2 border-blue
            text-white
            flex
            items-center
          "
        >
          <LocationOnRound class="w-5 h-5 mr-1" />
          選擇縣市
        </button>
        <button
          class="
            hover:text-black hover:bg-blue
            py-2
            px-7
            rounded-xl
            border-2 border-blue
            text-blue
          "
        >
          手動輸入
        </button>
      </div>
      <div class="flex gap-3 pt-2">
        <div v-for="(key, index) in keyoboard" :key="index">
          <button
            class="
              hover:text-black hover:bg-blue
              py-2
              px-5
              rounded-xl
              border-2 border-blue
            "
            :class="key.color"
          >
            {{ key.text }}
          </button>
        </div>
      </div>
      <div class="flex gap-3 pt-2">
        <div v-for="(key, index) in keyoboard" :key="index">
          <button
            class="
              hover:text-black hover:bg-blue
              py-2
              px-5
              rounded-xl
              border-2 border-blue
            "
            :class="key.color"
          >
            {{ key.text2 }}
          </button>
        </div>
      </div>
      <div class="flex gap-3 pt-2">
        <div v-for="(key, index) in keyoboard" :key="index">
          <button
            class="
              hover:text-black hover:bg-blue
              py-2
              px-5
              rounded-xl
              border-2 border-blue
            "
            :class="key.color"
          >
            {{ key.text3 }}
          </button>
        </div>
      </div>
      <div class="flex gap-3 pt-2">
        <button
          class="
            hover:text-black hover:bg-blue
            py-2
            px-3
            rounded-xl
            border-2 border-blue
            text-blue
          "
        >
          幹線
        </button>
        <button
          class="
            hover:text-black hover:bg-blue
            py-2
            px-3
            rounded-xl
            border-2 border-blue
            text-blue
          "
        >
          更多
        </button>
        <button
          class="
            hover:text-black hover:bg-blue
            py-2
            px-5
            rounded-xl
            border-2 border-blue
            text-blue
          "
        >
          C
        </button>
        <button
          class="
            hover:text-black hover:bg-blue
            py-2
            px-5
            rounded-xl
            border-2 border-blue
            text-white
          "
        >
          0
        </button>
        <button
          class="group py-2 px-4 rounded-xl border-2 border-blue hover:bg-blue"
        >
          <BackspaceRound class="text-blue group-hover:text-black w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
