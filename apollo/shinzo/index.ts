import { defineApolloClient } from '@nuxtjs/apollo'

export default defineApolloClient({
    httpEndpoint: process.env.NUXT_PUBLIC_API_GRAPHQL_ENDPOINT,
    browserHttpEndpoint: '',
    wsEndpoint: '',
    httpLinkOptions: {},
    wsLinkOptions: {},
    websocketsOnly: false,
    connectToDevTools: false,
    defaultOptions: {},
    inMemoryCacheOptions: {},
    tokenName: 'apollo:<client-name>.token',
    tokenStorage: 'cookie',
    authType: 'Bearer',
    authHeader: 'Authorization'
})
