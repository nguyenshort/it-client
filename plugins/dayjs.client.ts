import {defineNuxtPlugin} from "#imports"

import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import relativeTime from 'dayjs/plugin/relativeTime'

export const DAYJS_CONSTANT = Symbol.for('dayjs')

export default defineNuxtPlugin((nuxtApp) => {

    dayjs.extend(relativeTime)
    dayjs.locale('vi')

    nuxtApp.vueApp.config.globalProperties.$dayjs = dayjs

    return {
        provide: {
            [DAYJS_CONSTANT]: dayjs
        }
    }
})
