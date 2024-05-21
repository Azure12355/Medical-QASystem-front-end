import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
const echarts = require("echarts");
require("@/ui/index");
import { Talquei } from "talquei";
import "talquei/dist/index.min.css";

Vue.prototype.$echarts = echarts; // 将 echarts 挂载到 Vue 原型上

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Talquei);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
