import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import path from 'path'

import EnvGenerator from './utils/vite/env'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            meta: [
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                { charset: "utf-8" },
                { name: 'author', content: 'Yuan - A Queer Developer' }
            ],
            script: [],
            link: [
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,500,600,700' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Merriweather:700,400,400' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600&display=swap' }
            ]
        }
    },
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/apollo', '@vueuse/nuxt', '@intlify/nuxt3', [
        '@pinia/nuxt',
        {
            autoImports: ['defineStore'],
        }
    ]],
    alias: {
        pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
    },
    imports: {
        autoImport: true,
        imports: [
            { name: 'useAuth', from: '@vueuse/firebase' },
            { name: 'getDatabase', from: 'firebase/database' },
            { name: 'ref', from: 'firebase/database', as: 'dbRef' },
            { name: 'set', from: 'firebase/database', as: 'dbSet' },
            { name: 'onValue', from: 'firebase/database', as: 'dbOnValue' }
        ]
    },
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
    runtimeConfig: {
        // Private config that is only available on the server
        apiSecret: '123',
        // Config within public will be also exposed to the client
        public: {
            apiBase: '/api'
        }
    },
    vite: {
        plugins: [
            Components({
                types: [],
                resolvers: [
                    IconsResolver({
                        prefix: 'i'
                    })
                ],
                dts: path.resolve(__dirname, 'types/components.d.ts')
            }),
            Icons({
                autoInstall: true
            }),
            EnvGenerator()
        ]
    }
})
