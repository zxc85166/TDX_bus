<script setup>
import { LessThanFilled } from "@vicons/material";
import { useRouter } from "vue-router";
import { useStore } from "@/store/store.js";
import axios from "axios";
import jsSHA from "jssha";
import { ref, onMounted } from "vue";

const router = useRouter();
const store = useStore();
//回首頁
function goHome() {
    router.push({ path: "/", });
}
//回Bus
function backToBus() {
    router.push({ path: "/bus", });
}
onMounted(() => {
    if (store.routeName) {
        getBus();
    } else { console.log(store.routeName, store.city); }
});
const backData = ref([]);
const goData = ref([]);
//ApI
function getBus() {
    axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${store.city}/${store.routeName}?$select=StopName&$format=JSON`,
        headers: GetAuthorizationHeader()
    })
        .then((response) => {
            console.log('預估', response.data)
            const data = response.data;
            //按站序排列
            data.sort(function (a, b) {
                return a.StopSequence - b.StopSequence;
            });
            //時間處理
            data.forEach(element => {
                element.EstimateTime = Math.floor(element.EstimateTime / 60);
                if (element.EstimateTime) {
                    element.EstimateTime = element.EstimateTime + '分';
                } else if (element.EstimateTime == '0') {
                    element.EstimateTime = '已到達';
                }
                switch (element.StopStatus) {
                    case 0:
                        element.StopStatus = '';
                        break;
                    case 1:
                        element.StopStatus = "尚未發車";
                        break;
                    case 2:
                        element.StopStatus = "交管不停靠";
                        break;
                    case 3:
                        element.StopStatus = "末班車已過";
                        break;
                    case 4:
                        element.StopStatus = "今日未營運";
                        break;
                }
            });
            //公車資料裡分類出「去程0」與「返程1」
            const cachegoData = data.filter((item) => !item.Direction);
            const cachebackData = data.filter((item) => item.Direction);

            // console.log('cachegoData', cachegoData)



            goData.value = cachegoData;
            backData.value = cachebackData;
            // getRoute();
            console.log('backData.value', backData.value)
            console.log('goData.value', goData.value)
        })
        .catch((error) => console.log('error', error))
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
    <header class="w-full h-40 bg-black">
        <div class="pt-12 grid place-items-center items-start grid-cols-3">
            <LessThanFilled @click="backToBus" class="w-5 h-5 text-white cursor-pointer" />
            <img
                @click="goHome"
                src="@/assets/images/backhome.png"
                class="w-[132px] cursor-pointer"
                alt="logo"
            />
        </div>
        <div class="grid grid-cols-2 place-items-center justify-evenly mt-3 text-white">
            <p class="border-b-4 pb-4 border-blue">
                <span class="text-blue">往</span>
                {{ store.RoutegoName }}
            </p>
            <p class="border-b-4 pb-4 border-blue">
                <span class="text-blue">往</span>
                {{ store.RoutebackName }}
            </p>
        </div>
    </header>
    <div class="grid grid-cols-2 my-10 text-white">
        <div class="grid gap-3 items-center mx-auto">
            <div v-for="(backData,index) in backData" :key="index" class="flex gap-3">
                <p
                    v-if="backData.EstimateTime"
                    class="rounded-xl border-2 border-blue text-blue w-fit py-1 px-3"
                >{{ backData.EstimateTime }}</p>
                <p class="text-red-500">{{ backData.StopStatus }}</p>
                <p>{{ backData.StopName.Zh_tw }}</p>
            </div>
        </div>
        <div class="grid gap-3 items-center mx-auto">
            <div v-for="(goData,index) in goData" :key="index" class="flex gap-3">
                <p
                    v-if="goData.EstimateTime"
                    class="rounded-xl border-2 border-blue text-blue w-fit py-1 px-3"
                >{{ goData.EstimateTime }}</p>
                <p class="text-red-500">{{ goData.StopStatus }}</p>
                <p>{{ goData.StopName.Zh_tw }}</p>
            </div>
        </div>
    </div>
</template>