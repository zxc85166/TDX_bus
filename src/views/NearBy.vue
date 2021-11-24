<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/store.js";
import axios from "axios";
import jsSHA from "jssha";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
const router = useRouter();
const store = useStore();
const isLoading = ref(false);
const fullPage = ref(false);
const onCancel = () => console.log('User cancelled the loader.')
//回首頁
function goToHome() {
  router.push({
    path: '/'
  })
}
onMounted(() => {
  if (navigator.geolocation) {
    isLoading.value = true;
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const longitude = position.coords.longitude; // 經度
        const latitude = position.coords.latitude; // 緯度
        // 將經緯度當作參數傳給 getData 執行
        getStationData(latitude, longitude);
      },
      // 錯誤訊息
      function (e) {
        const msg = e.code;
        const dd = e.message;
        console.error(msg);
        console.error(dd);
      }
    );
  }
});
// API傳送
function getStationData(latitude, longitude) {
  axios({
    method: "get",
    //取得指定[位置,範圍]的全臺公車站牌資料
    // url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Stop/NearBy?$select=StopName&$top=10&$spatialFilter=nearby(${latitude}%2C%20${longitude}%2C%201000)&$format=JSON`,
    //取得指定[位置,範圍]的全臺公車站位資料
    url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Station/NearBy?$select=StationName%2CStops&$spatialFilter=nearby(${latitude}%2C%20${longitude}%2C%20500)&$format=JSON`,
    headers: GetAuthorizationHeader(),
  })
    .then((response) => {
      // API接收存在store
      const data = response.data;
      //去除物件中重複的值
      const result = [...new Set(data.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));
      store.NearByData = result;
      console.log(store.NearByData);
      isLoading.value = false;
    })
    .catch((error) => {
      console.log("error", error);
      isLoading.value = false;
    });
}
// API 驗證用
function GetAuthorizationHeader() {
  var AppID = import.meta.env.VITE_APP_AppID;
  var AppKey = import.meta.env.VITE_APP_AppKey;
  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  var HMAC = ShaObj.getHMAC("B64");
  var Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return {
    Authorization: Authorization,
    "X-Date": GMTString /*,'Accept-Encoding': 'gzip'*/,
  }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}
</script>

<template>
  <header class="flex items-center justify-between px-24 py-6 bg-gray">
    <div @click="goToHome" class="cursor-pointer">
      <img src="@/assets/images/backhome.png" class="w-[132px]" alt="logo" />
    </div>
    <p class="text-white place-items-center text-center">我的附近</p>
    <div></div>
  </header>

  <div class="mx-24 my-10">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    />
    <div
      v-for="(NearByData,index) in store.NearByData "
      :key="index"
      class="odd:bg-gray rounded-[10px] m-3 p-3 cursor-pointer hover:bg-gray-light"
    >
      <p class="text-blue text-lg">{{ NearByData.StationName.Zh_tw }}</p>
      <p
        v-for="(Stops,index) in NearByData.Stops "
        :key="index"
        class="text-white text-sm"
      >{{ Stops.RouteName.Zh_tw }}</p>
    </div>
  </div>
</template>
