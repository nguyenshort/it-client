<template>
  <div>
    <div class="h-[180px] flex border-b">
      <div class="mt-auto mb-7 w-full">
        <h1 class="font-semibold text-[30px]">Tìm Kiếm</h1>

        <form class="mt-7 bg-white w-full flex shadow-default rounded-xl overflow-hidden px-5">
          <label class="w-full flex items-center h-[50px]">
            <Icon name="ri:search-line" class="flex-shrink-0 text-[24px] text-gray-500" />
            <input
              type="text"
              class="h-full pl-2 focus:outline-0 w-full text-[18px] ml-1 font-semibold text-gray-500"
              placeholder="Tìm kiếm"
            />
          </label>

          <label class="w-[230px] flex items-center h-[50px] flex-shrink-0 border-l border-gray-100 pl-4">
            <Icon name="pajamas:status" class="flex-shrink-0 text-[24px] text-gray-500" />
            <select
              type="text"
              class="h-full pl-2 focus:outline-0 w-full text-[14px] ml-2 font-semibold text-gray-500"
            >
              <option>Tất Cả</option>
              <option>On Broad</option>
              <option>Running</option>
              <option>Done</option>
            </select>
          </label>

          <label class="w-[230px] flex items-center h-[50px] flex-shrink-0 ml-4 border-l border-gray-100 pl-4">
            <Icon name="material-symbols:timelapse-outline" class="flex-shrink-0 text-[24px] text-gray-500 mr-3" />
            <client-only>
              <search-slide />
            </client-only>
          </label>

        </form>
      </div>
    </div>

    <div class="flex mt-8">
      <div class="w-1/4">
        <div class="w-full">
          <h4 class="font-semibold text-[18px]">Categories</h4>

          <div
            v-for="(category, index) in categories"
            :key="index"
            class="mt-5 mb-5"
          >
            <div
              class="flex items-center cursor-pointer hover:text-primary-600"
              :class="{
                'text-primary-600': form.category === category.id
              }"
              @click="form.category = category.id"
            >
              <div
                class="w-6 h-6 border-2 border-primary-500 rounded-lg flex items-center justify-center"
              >
                <div
                  class="w-4 h-4 bg-primary-500 rounded-lg shadow-default shadow-primary-200 transition transform"
                  :class="{
                    'scale-0': form.category !== category.id
                  }"
                ></div>
              </div>

              <Icon class="text-[17px] mx-2.5" :name="category.icon" />

              <span class="font-semibold">{{ category.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-3/4">
        <div class="w-full">
          <h4 class="font-semibold text-[18px] mb-5">
            Kết Quả
            <span class="opacity-50 text-[16px] ml-2">30</span>
          </h4>

          <div class="-m-4 flex flex-wrap w-full">
            <div v-for="index in 10" :key="index" class="w-1/3 p-4">
              <div class="shadow-default p-4 bg-white rounded-lg cursor-pointer">
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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci aliquid amet assumenda at cum dolorem eaque iste
                  itaque, magnam minus, mollitia nam necessitatibus perspiciatis
                  quas quibusdam sed tempore tenetur totam?
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
            </div>
          </div>

          <div class="h-10"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef, reactive, ref, defineAsyncComponent } from '#imports'
import { useQRCode } from '@vueuse/integrations/useQRCode'

const SearchSlide = defineAsyncComponent(() => import('../../components/search/SearchSlide.vue'))

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
