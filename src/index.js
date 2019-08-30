// import "../assets/index.less";
// import "page/path";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import Vue from "vue";
import App from "./app.vue";
import "@/assets/scss/index.scss";

Vue.use(ElementUI);

new Vue({
  el: "#app",
  template: "<App/>",
  render: h => h(App)
});
