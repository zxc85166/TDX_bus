import { defineStore } from "pinia";

export const useStore = defineStore({
  // id: 在所有 Store 中唯一
  id: "myGlobalState",
  // state: 返回函數
  state: () => ({
    //bus路由往busRoutes傳送資料
    city: "",
    routeName: "",
    RoutegoName: "",
    RoutebackName: "",
    //bus路線資料
    routeData: [],
    //附近資料
    NearByData: [],
  }),
});
