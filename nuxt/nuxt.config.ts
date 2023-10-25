// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["primevue/resources/themes/lara-light-indigo/theme.css"],
  build: {
    transpile: ["primevue"],
  },
  ssr: true,
  modules: ["@nuxtjs/tailwindcss", "nuxt-directus"],
});
