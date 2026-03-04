// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: [
    "@nuxt/ui",
    "nuxt-lucide-icons",
    "nuxt-viewport",
    "@pinia/nuxt",
    "@nuxt/content",
  ],
  css: ["~/assets/css/main.css"],
});
