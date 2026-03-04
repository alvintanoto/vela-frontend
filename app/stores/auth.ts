import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  // arrow function recommended for full type inference
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    async login() {
      console.log("login");
      this.isAuthenticated = true;
    },
  },
});
