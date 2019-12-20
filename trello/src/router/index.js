import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomePage.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/home/LogIn.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/components/home/SignUp.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
