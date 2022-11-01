import {defineNuxtPlugin} from "#imports";

//CDN
enum CDNLocation {
    LOCAL
}

const $cdn = (path: string, location = CDNLocation.LOCAL) => {
    if (!path) {
        return ''
    }

    if (/^http/.test(path)) {
        return path
    }

    let _path = path.replace(/^\//, '')

    switch (location) {
        case CDNLocation.LOCAL:
            _path = import.meta.env.VITE_IT_CDN + path
            break
    }

    return _path
}

const $moneyFormat = (money: number) => {
    const fotmatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
    return fotmatter.format(money)
}

// Cutsom type
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $cdn: typeof $cdn
        $moneyFormat: typeof $moneyFormat
    }
}

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.config.globalProperties = $cdn
    nuxtApp.vueApp.config.globalProperties.$moneyFormat = $moneyFormat
})

export { CDNLocation }
