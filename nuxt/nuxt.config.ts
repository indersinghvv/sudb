// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "/node_modules/primeflex/primeflex.css",
    "primeicons/primeicons.css",
    "assets/css/main.css",
  ],

  build: {
    transpile: ["primevue"],
  },
  ssr: false,
  modules: ["nuxt-directus", "@pinia/nuxt"],
  runtimeConfig: {
    directus: {
      url: "",
      autoFetch: true,
    },
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
});
