import { defineApolloClient } from '@nuxtjs/apollo'
export default defineApolloClient({
    httpEndpoint: 'https://api.spacex.land/graphql',
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
