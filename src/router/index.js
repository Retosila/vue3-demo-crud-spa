import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: "/",
      name: "Welcome",
      component: () => import("@/views/Welcome.vue"),
    },

    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login.vue"),
    },

    {
      path: "/signup",
      name: "SignUp",
      component: () => import("@/views/SignUp.vue"),
    },

    {
      path: "/home",
      name: "Home",
      component: () => import("@/views/Home.vue"),
    },

    {
      path: "/admin",
      name: "Admin",
      component: () => import("@/views/Admin.vue"),
    },
  ],
});

export default router;
