import {defineNuxtPlugin} from "#imports"

import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

export default defineNuxtPlugin((nuxtApp) => {

    dayjs.extend(relativeTime)
    dayjs.extend(localizedFormat)
    dayjs.locale('vi')

    nuxtApp.vueApp.config.globalProperties.$dayjs = dayjs

    return {
        provide: {
            dayjs
        }
    }
})
