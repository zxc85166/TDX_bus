import Home from "./views/Home.vue";
import Bus from "./views/Bus.vue";
import Transport from "./views/Transport.vue";
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
    path: "/Transport",
    meta: { title: "Transport" },
    component: Transport,
  },
  { path: "/:path(.*)", component: NotFound },
];
