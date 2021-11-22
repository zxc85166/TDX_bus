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
//ApI
function getBus() {
    axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${store.city}/${store.routeName}?$top=30&$format=JSON`,
        headers: GetAuthorizationHeader()
    })
        .then((response) => {
            console.log('預估', response)
            const data = response.data;

            // 篩出有在跑的公車(存公車物件)
            const bus = data.filter((item) => item.PlateNumb)
            // console.log('bus', bus)

            //從有在跑的公車資料裡分類出「去程0」與「返程1」
            const cachegoData = bus.filter((item) => !item.Direction);
            const cachebackData = bus.filter((item) => item.Direction);

            console.log('cachebackData', cachebackData)
            // console.log('cachegoData',goData)


            // 組出我要的資料格式
            cachebackData.forEach((item) => { // [a,a,b,c]
                const index = backData.value.map(item => item.plateNumb).indexOf(item.PlateNumb)

                if (index === -1) { // 代表沒找到
                    backData.value.push({
                        plateNumb: item.PlateNumb, //車牌號碼
                        stops: [{
                            estimateTime: item.EstimateTime,//到站時間預估(秒) 
                            stopUID: item.StopUID//站牌唯一識別代碼
                        }]
                    })
                } else { // 有找到
                    backData.value[index].stops.push({
                        estimateTime: item.EstimateTime,//到站時間預估(秒) 
                        stopUID: item.StopUID//站牌唯一識別代碼
                    });
                }


            })
            console.log('backData.value', backData.value)
            // getRoute();
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
                src="@/assets/images/logo_backhome.png"
                class="w-[132px] cursor-pointer"
                alt="logo"
            />
        </div>
        <div class="grid grid-cols-2 place-items-center justify-evenly mt-3 text-white">
            <p class="border-b-4 pb-4 border-blue">往 捷運劍潭站</p>
            <p class="border-b-4 pb-4 border-blue">往 捷運劍潭站</p>
        </div>
    </header>
    <div class="grid grid-cols-2 text-white">
        <div v-for="(backData, index) in backData" :key="index">
            <p>{{ backData.plateNumb }}</p>
            <p>{{ backData.stops }}</p>
        </div>
    </div>
</template>