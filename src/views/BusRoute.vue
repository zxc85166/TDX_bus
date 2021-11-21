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
    if (store.RouteData.length !== 0) {
        getBus();
    }
});
//ApI
function getBus() {
    axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${city}/${routeName}`,
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
                const index = backData.map(item => item.plateNumb).indexOf(item.PlateNumb)

                if (index === -1) { // 代表沒找到
                    backData.push({
                        plateNumb: item.PlateNumb, //車牌號碼
                        stops: [{
                            estimateTime: item.EstimateTime,//到站時間預估(秒) 
                            stopUID: item.StopUID//站牌唯一識別代碼
                        }]
                    })
                } else { // 有找到
                    backData[index].stops.push({
                        estimateTime: item.EstimateTime,//到站時間預估(秒) 
                        stopUID: item.StopUID//站牌唯一識別代碼
                    });
                }


            })
            console.log('backData', backData)

            getRoute();
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
    <header class="pt-12 grid place-items-center items-start grid-cols-3 w-full h-40 bg-black">
        <LessThanFilled @click="backToBus" class="w-5 h-5 text-white cursor-pointer" />
        <img
            @click="goHome"
            src="@/assets/images/logo_backhome.png"
            class="w-[132px] cursor-pointer"
            alt="logo"
        />
    </header>
    <div class="grid grid-cols-2"></div>
</template>