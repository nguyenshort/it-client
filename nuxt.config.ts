export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'author', content: 'Yuan - A Queer Developer' }
      ],
      script: [],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,500,600,700'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Merriweather:700,400,400'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600&display=swap'
        }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
    '@vueuse/nuxt',
    // '@intlify/nuxt3',
    'nuxt-icon',
    '@nuxt/image-edge',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore']
      }
    ]
  ],
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs'
  },
  imports: {
    autoImport: true,
    imports: [
      { name: 'useAuth', from: '@vueuse/firebase' },
      { name: 'getDatabase', from: 'firebase/database' },
      { name: 'ref', from: 'firebase/database', as: 'dbRef' },
      { name: 'set', from: 'firebase/database', as: 'dbSet' },
      { name: 'onValue', from: 'firebase/database', as: 'dbOnValue' },
      { name: 'useAxios', from: '@vueuse/integrations/useAxios' }
    ]
  },
  apollo: {
    clients: {
      default: './apollo/shinzo/index.ts'
    }
  },
  image: {

  },
  runtimeConfig: {
    // Private config that is only available on the server
    apiSecret: '123',
    // Config within public will be also exposed to the client
    public: {
      apiBase: '/api',
      apiGraphQL: process.env.NUXT_PUBLIC_API_GRAPHQL_ENDPOINT,
      cdnEndpoint: process.env.NUXT_PUBLIC_API_CDN_ENDPOINT,
      apiBackend: process.env.NUXT_PUBLIC_API_BACKEND_ENDPOINT,
    }
  },
  hooks: {
    'pages:extend'(routes) {
      routes.forEach((route) => {
        if (route.path === '/projects') {
          route.path = '/projects/:id'
        }
      })
    }
  }
})
