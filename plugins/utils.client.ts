import {defineNuxtPlugin, useEventBus} from "#imports";

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
            _path = 'import.meta.env.VITE_IT_CDN' + path
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

const $modal = () => {
    const mitter = useEventBus<string>('modal')

    return {
        open: (name: string, payload: any = undefined) => mitter.emit(name, payload),
        off: (name: string) => mitter.emit(name + 'Dispose')
    }
}

// Cutsom type
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $cdn: typeof $cdn
        $moneyFormat: typeof $moneyFormat
        $modal: typeof $modal
    }
}

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.config.globalProperties = $cdn
    nuxtApp.vueApp.config.globalProperties.$moneyFormat = $moneyFormat
    nuxtApp.vueApp.config.globalProperties.$modal = $modal
})

export { CDNLocation }
