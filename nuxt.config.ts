// https://v3.nuxtjs.org/api/configuration/nuxt.config
import Icons from "unplugin-icons/vite"
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/apollo', '@vueuse/nuxt', '@intlify/nuxt3'],
    apollo: {
        clients: {
            default: './apollo/shinzo/index.ts'
        },
    },
    intlify: {
        localeDir: 'lang',
        vueI18n: {
            locale: 'ja',
            messages: {
                en: {
                    hello: 'Hello, {name}!',
                    language: 'Language',
                    menu: {
                        home: 'Home',
                        about: 'About'
                    },
                    about: {
                        description: 'This is about page'
                    }
                },
                ja: {
                    hello: 'こんにちは、{name}！',
                    language: '言語',
                    menu: {
                        home: 'ホーム',
                        about: 'アバウト'
                    },
                    about: {
                        description:
                            'このページのこのサイトの概要について書かれたページです。'
                    }
                }
            }
        }
    },
    vite: {
        plugins: [
            Components({
                types: [],
                resolvers: [
                    IconsResolver({
                        prefix: 'i'
                    }),
                ]
            }),
            Icons({
                autoInstall: true
            })
        ]
    }
})
