import { defineStore } from "pinia";

export const useStore = defineStore({
  // id: 在所有 Store 中唯一
  id: "myGlobalState",
  // state: 返回函數
  state: () => ({
    RouteData: [],
  }),
});
