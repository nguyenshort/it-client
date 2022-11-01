import {defineStore} from "#imports";

export const useKoki = defineStore('koki', {
    state: () => ({ count: 0, token: '' }),
    actions: {
        increment() {
            this.count++
        },
        async getUser() {

        }
    },
})
