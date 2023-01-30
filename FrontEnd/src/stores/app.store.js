import { defineStore } from "pinia";
import AuthService from "@/services/account.service";
import CartService from "@/services/cart.service";
import AdminService from "@/services/admin.service";

export const useAppStore = defineStore("auth", {
  state() {
    return {
      user: null,
      products: {},
      SearchText: "",
      role: "",
      totalCart: 0,
    };
  },
  getters: {
    isUserLoggedIn(state) {
      return !!state.user && !!state.user.accessToken;
    },
  },
  actions: {
    formatter(data) {
      const fm = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      });
      data = fm.format(data);
      return data;
    },
    loadAuthState() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.user) {
        this.role = this.user.role;
      }
      this.SearchText = "";
    },
    logout() {
      this.SearchText = "";
      this.role = "";
      this.user = null;
      localStorage.removeItem("user");
    },
    async login(user) {
      const response = await AuthService.login(user);

      if (!response.accessToken) {
        this.logout();
        throw new Error("Whoops, no access token found!");
      }

      this.user = response;
      if (this.user) {
        this.role = this.user.role;
      }

      localStorage.setItem("user", JSON.stringify(response));

      return response;
    },
    register(user) {
      this.user = null;
      return AuthService.register(user);
    },

    //San pham
    async retrieveProducts() {
      try {
        this.products = await AdminService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    //Gio hang
    async getCartStore() {
      this.products = await CartService.getCart();
      this.totalCart = this.products.totalQty;
    },

    async AddCartStore(id) {
      await CartService.addCart(id);
      if (this.totalCart) {
        this.totalCart++;
      } else {
        this.totalCart = 0;
        this.totalCart++;
      }
    },
  },
});
