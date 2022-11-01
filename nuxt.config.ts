// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/apollo', '@vueuse/nuxt'],
    apollo: {
        clients: {
            default: './apollo/shinzo/index.ts'
        },
    },
})
