import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: true,
  }),
  actions: {
    async login() {
      console.log("login");
      this.isAuthenticated = true;
    },
    async logout() {
      console.log("logout");
      this.isAuthenticated = false;
    },
  },
});
