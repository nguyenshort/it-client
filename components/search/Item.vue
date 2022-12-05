<template>
  <nuxt-link
    :to="`/projects/${project.slug}`"
    class="shadow-default p-4 bg-white rounded-lg cursor-pointer transform transition-all hover:shadow-primary-100 block"
  >
    <div class="flex items-center justify-between">
      <div class="w-12 w-12 transition transform hover:scale-110">
        <img src="/images/logo.png" alt="" class="w-full h-full" />
      </div>

      <div v-if="qrcode" class="w-12 w-12 transition transform hover:scale-110">
        <img :src="qrcode" alt="" class="w-full h-full" />
      </div>
    </div>

    <h4 class="mt-2 text-[18px] font-bold line-clamp-2">
      {{ project.name }}
    </h4>

    <div class="flex flex-wrap -mb-2 mt-3">
      <div
        v-for="(tag, index) in project.technologies"
        :key="index"
        class="mr-3 mb-2 text-primary-500 font-semibold border border-primary-500 rounded-full px-2 text-[11px] transition transform hover:text-white hover:bg-primary-500 hover:shadow-lg shadow-primary-200"
      >
        {{ tag.name }}
      </div>
    </div>

    <div class="text-[13px] line-clamp-3 mt-2" v-html="project.content"></div>

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
  </nuxt-link>
</template>

<script lang="ts" setup>
import { computed, useRouter } from '#imports'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { AdvancedSearch_projects } from '~/apollo/shinzo/queries/__generated__/AdvancedSearch'

const props = defineProps<{
  project: AdvancedSearch_projects
}>()

const router = useRouter()
const link = computed(
  () =>
    props.project.link ||
    router.resolve({ name: 'projects', params: { id: props.project.slug } }).href
)
const qrcode = useQRCode(link)
</script>

<style scoped></style>
