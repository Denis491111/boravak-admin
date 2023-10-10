import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import LoginLayout from "@/layouts/login.vue";
import LoginPage from "@/views/login/login.vue";
import BaseLayout from "@/layouts/base.vue";
import UsersPage from "@/views/users/users.vue";
import {request, userId} from "@/common/const";
import store from "@/store";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/login",
      component: LoginLayout,
      beforeEnter: (to, from, next) => {
        (document.querySelector("body") as any).classList.remove("body-loading");
        next();
      },
      children: [
        {
          path: "/",
          name: "login",
          component: LoginPage
        }
      ]
    },
    {
      path: "/users",
      beforeEnter: (to, from, next) => {
        request(`/users/${userId()}`).then(res => {
          store.commit("setUser", res);
          next();
          (document.querySelector("body") as any).classList.remove("body-loading");
        }).catch(() => {
          window.location.href = "/login";
        })
      },
      component: BaseLayout,
      children: [
        {
          path: "/",
          name: "users",
          component: UsersPage
        }
      ]
    }
  ]
});

export default router;
