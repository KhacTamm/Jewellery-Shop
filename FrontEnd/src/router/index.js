import { createRouter, createWebHistory } from "vue-router";
import { useAppStore } from "@/stores/app.store";

import NotFound from "../views/NotFound.vue";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";

import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

import CardView from "../views/CartView.vue";

import DetailProductView from "../views/DetailProductView.vue";
import ProductView from "../views/ProductView.vue";
import SearchView from "../views/SearchView.vue";

import AdminView from "../views/AdminView.vue";
import AdminAdd from "../components/AdminAdd.vue";
import AdminAllProduct from "../components/AdminAllProduct.vue";
import AdminEditProduct from "../components/AdminEditProduct.vue";
import AdminTypeProduct from "../components/AdminTypeProducts.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/productdetail/:id",
    name: "productdetail",
    component: DetailProductView,
    props: true,
  },
  {
    path: "/cart",
    name: "cart",
    component: CardView,
    props: true,
    beforeEnter: (to, from, next) => {
      if (useAppStore().isUserLoggedIn) {
        next();
      }
      next({ name: "login" });
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/product",
    name: "product",
    component: ProductView,
  },
  {
    path: "/search",
    name: "SearchView",
    component: SearchView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    children: [
      {
        path: "/admin/allProduct",
        name: "AdminAllProduct",
        component: AdminAllProduct,
      },
      {
        path: "/admin/addProduct",
        name: "AdminAdd",
        component: AdminAdd,
      },
      {
        path: "/admin/:id/edit",
        name: "AdminEditProduct",
        component: AdminEditProduct,
        props: true,
      },
      {
        path: "/admin/typeproduct",
        name: "AdminTypeProduct",
        component: AdminTypeProduct,
        props: true,
      },
    ],
    beforeEnter: (to, from, next) => {
      if (useAppStore().role === "admin") {
        next();
      }
      next({ name: "notfound" });
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
