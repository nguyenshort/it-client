import {defineStore} from "#imports";

export const useKoki = defineStore('koki', {
    state: () => ({ count: 0 }),
    actions: {
        increment() {
            this.count++
        },
    },
})
