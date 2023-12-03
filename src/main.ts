import Vue from "vue";
import App from "./app.vue";
import router from "./router";
import store from "./store";
import Notification from "@/common/notification";
import "@/assets/css/notification.css";
import Button from "@/components/button.vue";
import Form from "@/components/form.vue";
import FormItem from "@/components/form-item.vue";
import Input from "@/components/input.vue";
import Link from "@/components/link.vue";
import Selector from "@/components/selector.vue";
import Textarea from "@/components/textarea.vue";
import Loader from "@/components/loader.vue";
import Checkbox from "@/components/checkbox.vue";
import { VueMaskDirective } from "v-mask";

Vue.config.productionTip = false;

Vue.directive("mask", VueMaskDirective);
Vue.use(Notification);
Vue.component("Button", Button);
Vue.component("Form", Form);
Vue.component("FormItem", FormItem);
Vue.component("Input", Input);
Vue.component("Link", Link);
Vue.component("Selector", Selector);
Vue.component("Textarea", Textarea);
Vue.component("Loader", Loader);
Vue.component("Checkbox", Checkbox);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
