<script setup>
import { useRouter } from "vue-router";
import { useStore } from "@/store/store.js";
import axios from "axios";
import jsSHA from "jssha";
import { ref, watch } from "vue";
import { LocationOnRound, BackspaceRound } from "@vicons/material";
const router = useRouter();
const store = useStore();
//回首頁
function goToHome() {
  router.push({
    path: "/",
  });
}
const keyoboard = [
  { text: "紅", text2: "綠", text3: "橘", text4: "F", text5: "跳蛙", color: "text-blue" },
  { text: "藍", text2: "棕", text3: "小", text4: "R", text5: "通勤", color: "text-blue" },
  { text: "1", text2: "4", text3: "7", text4: "T", text5: "南軟", color: "text-white" },
  { text: "2", text2: "5", text3: "8", text4: "快", text5: "先導", color: "text-white" },
  { text: "3", text2: "6", text3: "9", text4: "內科", text5: "夜間", color: "text-white" },
];
const cityData = [
  {
    name: "臺北市",
    name2: "新竹縣",
    name3: "雲林縣",
    name4: "屏東縣",
  },
  {
    name: "新北市",
    name2: "苗栗縣",
    name3: "嘉義市",
    name4: "臺東縣",
  },
  {
    name: "基隆市",
    name2: "臺中市",
    name3: "嘉義縣",
    name4: "花蓮縣",
  },
  {
    name: "桃園市",
    name2: "南投縣",
    name3: "臺南市",
    name4: "宜蘭縣",
  },
  {
    name: "新竹市",
    name2: "彰化縣",
    name3: "高雄市",
    name4: "澎湖縣",
  },
];
const cityData2 = [{ name: "金門縣" }, { name: "連江縣" }];
// 顯示城市選項
const showcities = ref(false);
// input內容
const inputValue = ref("");
//紀錄城市
const citySelected = ref("選擇縣市");
//紀錄選擇的城市選項
function selectCities(cityName) {
  citySelected.value = cityName;
  showcities.value = !showcities.value;
}
//error顯示
const errtxt = ref('');
//擊打鍵盤
function keyin(data) {
  inputValue.value += data;
}
function deleteKey() {
  inputValue.value = inputValue.value.slice(0, -1);
}
function clearKey() {
  inputValue.value = "";
}
//手動輸入
const myinput = ref(null);
function focusInput() {
  myinput.value.focus();
}
//show其他選項
const showother = ref(false);
//city名字轉換成英文
function cityName(cityName) {
  switch (cityName) {
    case "臺北市":
      return "Taipei";
    case "新北市":
      return "NewTaipei";
    case "基隆市":
      return "Keelung";
    case "桃園市":
      return "Taoyuan";
    case "新竹市":
      return "Hsinchu";
    case "苗栗縣":
      return "MiaoliCounty";
    case "臺中市":
      return "Taichung";
    case "南投縣":
      return "Nantou";
    case "彰化縣":
      return "Changhua";
    case "雲林縣":
      return "YunlinCounty";
    case "嘉義市":
      return "Chiayi";
    case "嘉義縣":
      return "ChiayiCounty";
    case "臺南市":
      return "Tainan";
    case "高雄市":
      return "Kaohsiung";
    case "屏東縣":
      return "PingtungCounty";
    case "臺東縣":
      return "TaitungCounty";
    case "花蓮縣":
      return "HualienCounty";
    case "宜蘭縣":
      return "YilanCounty";
    case "澎湖縣":
      return "PenghuCounty";
    case "金門縣":
      return "KinmenCounty";
    case "連江縣":
      return "LienchiangCounty";
    default:
      return "";
  }
}
//前往BusRoute
function goToBusRoute(city, go, back) {
  store.routeName = city,
    store.RoutegoName = go,
    store.RoutebackName = back,
    router.push({
      path: "/BusRoute",
    });
}
// API傳送
function getStationData() {
  const input = inputValue.value;
  const city = cityName(citySelected.value);
  store.city = city;
  axios({
    method: "get",
    //取得指定[縣市],[路線名稱]的路線資料
    url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}/${input}?$select=RouteName%2CDepartureStopNameZh%2CDestinationStopNameZh&$top=15&$format=JSON
  `,
    headers: GetAuthorizationHeader(),
  })
    .then((response) => {
      // API接收存在store
      store.routeData = response.data;
      if (response.data.length === 0) {
        errtxt.value = "無該路線資料"
        store.routeData = [];
      } else {
        errtxt.value = ''
        document.getElementById('scrollIntoView').scrollIntoView({
          behavior: 'smooth'
        });
      }
    })
    .catch((error) => {
      errtxt.value = "查不到該路線"
      store.routeData = [];
      data.value = [];
      console.log("error", error);
    });
}
watch(inputValue, (value) => {
  if (value.length > 0 && citySelected.value !== "選擇縣市") {
    getStationData();
  }
});
watch(citySelected, (value) => {
  if (value.length > 0 && value !== "選擇縣市" && inputValue.value !== "") {
    getStationData();
  }
});


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
  <div class="mx-3 md:mx-24 my-12 grid place-items-start">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-11">
      <!-- 左欄 -->
      <div>
        <!-- logo 回首頁 -->
        <div class="flex items-center pb-4">
          <div @click="goToHome" class="cursor-pointer relative">
            <img src="@/assets/images/backhome.png" class="w-[132px]" alt="logo" />
          </div>
          <input
            ref="myinput"
            placeholder="選擇路線或手動輸入關鍵字"
            v-model="inputValue"
            class="form-input ml-3 pl-4 py-3 rounded-xl bg-gray text-blue h-10 w-60"
          />
        </div>
        <!-- 鍵盤 -->
        <div v-if="!showcities" class="bg-gray rounded-[10px] w-[382px] h-[550px] p-5">
          <div class="flex gap-3">
            <button
              @click="showcities = !showcities"
              class="hover:text-black hover:bg-blue py-2 px-14 rounded-xl border-2 border-blue text-white flex items-center"
            >
              <LocationOnRound class="w-5 h-5 mr-1" />
              {{ citySelected }}
            </button>
            <button
              @click="focusInput()"
              class="hover:text-black hover:bg-blue py-2 px-7 rounded-xl border-2 border-blue text-blue"
            >手動輸入</button>
          </div>
          <div class="flex gap-3 pt-2">
            <div v-for="(key, index) in keyoboard" :key="index">
              <button
                @click="keyin(key.text)"
                class="hover:text-black hover:bg-blue py-2 px-5 rounded-xl border-2 border-blue"
                :class="key.color"
              >{{ key.text }}</button>
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <div v-for="(key, index) in keyoboard" :key="index">
              <button
                @click="keyin(key.text2)"
                class="hover:text-black hover:bg-blue py-2 px-5 rounded-xl border-2 border-blue"
                :class="key.color"
              >{{ key.text2 }}</button>
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <div v-for="(key, index) in keyoboard" :key="index">
              <button
                @click="keyin(key.text3)"
                class="hover:text-black hover:bg-blue py-2 px-5 rounded-xl border-2 border-blue"
                :class="key.color"
              >{{ key.text3 }}</button>
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <button
              @click="keyin('幹線')"
              class="hover:text-black hover:bg-blue py-2 px-3 rounded-xl border-2 border-blue text-blue"
            >幹線</button>
            <button
              @click="showother = !showother"
              class="hover:text-black hover:bg-blue py-2 px-3 rounded-xl border-2 border-blue text-blue"
            >更多</button>
            <button
              @click="clearKey()"
              class="hover:text-black hover:bg-blue py-2 px-5 rounded-xl border-2 border-blue text-blue"
            >C</button>
            <button
              @click="keyin(0)"
              class="hover:text-black hover:bg-blue py-2 px-5 rounded-xl border-2 border-blue text-white"
            >0</button>
            <button
              @click="deleteKey()"
              class="group py-2 px-4 rounded-xl border-2 border-blue hover:bg-blue"
            >
              <BackspaceRound class="text-blue group-hover:text-black w-5 h-5" />
            </button>
          </div>
          <!-- show更多 -->
          <div v-show="showother">
            <div class="flex gap-3 pt-2">
              <div v-for="(key, index) in keyoboard" :key="index">
                <button
                  @click="keyin(key.text4)"
                  class="hover:text-black hover:bg-blue py-2 px-4 rounded-xl border-2 border-blue"
                  :class="key.color"
                >{{ key.text4 }}</button>
              </div>
            </div>
            <div class="flex gap-3 pt-2">
              <div v-for="(key, index) in keyoboard" :key="index">
                <button
                  @click="keyin(key.text5)"
                  class="hover:text-black hover:bg-blue py-2 px-2 rounded-xl border-2 border-blue"
                  :class="key.color"
                >{{ key.text5 }}</button>
              </div>
            </div>
            <div class="flex gap-3 pt-2">
              <button
                @click="keyin('市民')"
                class="hover:text-black hover:bg-blue py-2 px-2 rounded-xl border-2 border-blue text-blue"
              >市民</button>
              <button
                @click="keyin('其他')"
                class="hover:text-black hover:bg-blue py-2 px-2 rounded-xl border-2 border-blue text-blue"
              >其他</button>
            </div>
          </div>
        </div>
        <!-- 城市 -->
        <div v-if="showcities" class="bg-gray rounded-[10px] w-[382px] h-[550px] p-5">
          <div class="flex gap-3 pt-2">
            <div v-for="(city, index) in cityData" :key="index">
              <button
                @click="selectCities(city.name)"
                class="hover:text-black hover:bg-blue py-2 px-[3px] rounded-xl border-2 border-blue text-blue"
              >{{ city.name }}</button>
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <div v-for="(city, index) in cityData" :key="index">
              <button
                @click="selectCities(city.name3)"
                class="hover:text-black hover:bg-blue py-2 px-[3px] rounded-xl border-2 border-blue text-blue"
              >{{ city.name3 }}</button>
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <div v-for="(city, index) in cityData" :key="index">
              <button
                @click="selectCities(city.name2)"
                class="hover:text-black hover:bg-blue py-2 px-[3px] rounded-xl border-2 border-blue text-blue"
              >{{ city.name2 }}</button>
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <div v-for="(city, index) in cityData" :key="index">
              <button
                @click="selectCities(city.name3)"
                class="hover:text-black hover:bg-blue py-2 px-[3px] rounded-xl border-2 border-blue text-blue"
              >{{ city.name3 }}</button>
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <div v-for="(city, index) in cityData" :key="index">
              <button
                @click="selectCities(city.name4)"
                class="hover:text-black hover:bg-blue py-2 px-[3px] rounded-xl border-2 border-blue text-blue"
              >{{ city.name4 }}</button>
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <div v-for="(city, index) in cityData2" :key="index">
              <button
                @click="selectCities(city.name)"
                class="hover:text-black hover:bg-blue py-2 px-[3px] rounded-xl border-2 border-blue text-blue"
              >{{ city.name }}</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 右欄 -->
      <div id="scrollIntoView">
        <span class="text-white" v-if="citySelected === '選擇縣市'">未</span>
        <span class="text-white">{{ citySelected }}</span>
        <p class="text-gray-light">{{ errtxt }}</p>
        <div
          v-for="(Route, index) in store.routeData"
          :key="index"
          class="even:bg-gray rounded-[10px] m-3 p-3 cursor-pointer hover:bg-gray-light"
        >
          <div
            @click="goToBusRoute(Route.RouteName.Zh_tw, Route.DepartureStopNameZh, Route.DestinationStopNameZh)"
          >
            <p class="text-xl text-blue">{{ Route.RouteName.Zh_tw }}</p>
            <p class="text-white pt-3">
              {{ Route.DepartureStopNameZh }}
              <span class="pl-2 pr-3 text-blue">往</span>
              {{ Route.DestinationStopNameZh }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
