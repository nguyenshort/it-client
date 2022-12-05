<template>
  <div
    class="shadow-default p-4 bg-white rounded-lg cursor-pointer transform transition-all hover:shadow-primary-100"
  >
    <div class="flex items-center justify-between">
      <div class="w-12 w-12 transition transform hover:scale-110">
        <img src="/images/logo.png" alt="" class="w-full h-full" />
      </div>

      <div v-if="qrcode" class="w-12 w-12 transition transform hover:scale-110">
        <img :src="qrcode" alt="" class="w-full h-full" />
      </div>
    </div>

    <h4 class="mt-2 text-[18px] font-bold">Memrise</h4>

    <div class="flex flex-wrap -mb-2 mt-3">
      <div
        v-for="(tag, index) in tags"
        :key="index"
        class="mr-3 mb-2 text-primary-500 font-semibold border border-primary-500 rounded-full px-2 text-[11px] transition transform hover:text-white hover:bg-primary-500 hover:shadow-lg shadow-primary-200"
      >
        {{ tag }}
      </div>
    </div>

    <div class="text-[13px] line-clamp-3 mt-2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid
      amet assumenda at cum dolorem eaque iste itaque, magnam minus, mollitia
      nam necessitatibus perspiciatis quas quibusdam sed tempore tenetur totam?
    </div>

    <div class="mt-4 flex">
      <button
        class="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg shadow-primary-200 py-1"
      >
        <span class="font-semibold text-[14px]">Apply</span>
      </button>

      <div class="w-3 flex-shrink-0"></div>

      <button
        class="w-full border-2 border-primary-500 text-primary-500 rounded-full shadow-lg shadow-primary-200 py-1"
      >
        <span class="font-semibold text-[14px]"> Detail </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'

const categories = shallowRef<any[]>([
  {
    id: '1',
    name: 'Mobile',
    slug: 'mobile',
    icon: 'ph:device-mobile-speaker-bold'
  },
  {
    id: '2',
    name: 'Web',
    slug: 'web',
    icon: 'mdi:web'
  },
  {
    id: '3',
    name: 'Design',
    slug: 'design',
    icon: 'ph:figma-logo'
  },
  {
    id: '4',
    name: 'Marketing',
    slug: 'marketing',
    icon: 'nimbus:marketing'
  },
  {
    id: '5',
    name: 'Blockchain',
    slug: 'marketing',
    icon: 'clarity:block-solid'
  },
  {
    id: '6',
    name: 'IoT',
    slug: 'iot',
    icon: 'pepicons:internet'
  },
  {
    id: '7',
    name: 'Cloud',
    slug: 'cloud',
    icon: 'material-symbols:cloud'
  },
  {
    id: '8',
    name: 'DevOps',
    slug: 'devops',
    icon: 'mdi:microsoft-azure-devops'
  },
  {
    id: '10',
    name: 'Data Science',
    slug: 'data-science',
    icon: 'ph:database-bold'
  }
])

const form = reactive({
  keyword: '',
  category: ''
})

const tags = ref(['Web', 'Mobile', 'Design', 'Marketing'])

const qrcode = useQRCode('https://www.facebook.com/kouki.matsuno.1')
</script>

<style scoped></style>
