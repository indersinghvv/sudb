// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "primevue/resources/themes/lara-light-indigo/theme.css",
    "primeicons/primeicons.css",
  ],
  build: {
    transpile: ["primevue"],
  },
  ssr: false,
  router: {
    options: {
      hashMode: true,
    },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-directus", "nuxt-mdi", "@pinia/nuxt"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
