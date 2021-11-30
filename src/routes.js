import Home from "./views/Home.vue";
import Bus from "./views/Bus.vue";
import BusRoute from "./views/BusRoute.vue";
import NearBy from "./views/NearBy.vue";
import NearByRoute from "./views/NearByRoute.vue";
import InterCityBus from "./views/InterCityBus.vue";
import NotFound from "./views/NotFound.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: "/", component: Home, meta: { title: "Home" } },
  {
    path: "/Bus",
    meta: { title: "Bus" },
    component: Bus,
  },
  {
    path: "/BusRoute",
    meta: { title: "BusRoute" },
    component: BusRoute,
  },
  {
    path: "/NearBy",
    meta: { title: "NearBy" },
    component: NearBy,
  },
  {
    path: "/NearByRoute",
    meta: { title: "NearByRoute" },
    component: NearByRoute,
  },
  {
    path: "/InterCityBus",
    meta: { title: "InterCityBus" },
    component: InterCityBus,
  },
  { path: "/:path(.*)", component: NotFound },
];
