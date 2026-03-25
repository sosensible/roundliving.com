// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
  ],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'system',
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-05-15',
  nitro: {
    preset: 'cloudflare_pages',
  },
})
