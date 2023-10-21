// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "/node_modules/primeflex/primeflex.css",
    "primeicons/primeicons.css",
    "assets/css/main.css",
  ],
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      // script: [
      //   // <script src="https://myawesome-lib.js"></script>
      //   { src: "https://cdn.tailwindcss.com/3.3.3" },
      // ],
    },
  },

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
