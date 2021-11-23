import Home from "./views/Home.vue";
import Bus from "./views/Bus.vue";
import BusRoute from "./views/BusRoute.vue";
import NearBy from "./views/NearBy.vue";
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
  { path: "/:path(.*)", component: NotFound },
];
