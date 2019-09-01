import Vue from "vue";
import App from "./app.vue";
import '@/core/index.js'

new Vue({
  el: "#app",
  template: "<App/>",
  render: h => h(App)
});
