import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/css/stype.css";

const vm = createApp(App).use(createPinia()).use(router).mount("#app");
export default vm;
