import {defineNuxtPlugin} from "#imports"

export default defineNuxtPlugin(async (nuxtApp) => {
    if(process.server) {
        // server init here
    }
})
