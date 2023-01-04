<template>
  <nuxt-link
    :to="`/projects/${project.slug}`"
    class="shadow-default p-4 bg-white rounded-lg cursor-pointer transform transition-all hover:shadow-primary-100 transform hover:scale-105 block"
  >
    <div class="flex items-center justify-between">
      <div class="w-12 w-12 transition transform hover:scale-110">
        <img
          :src="project.logo ? $cdn(project.logo) : '/images/logo.svg'"
          alt=""
          class="w-full h-full"
        />
      </div>

      <div ref="codeRef" class="w-12 w-12 opacity-0">
        <img
          v-if="qrcode"
          :src="qrcode"
          alt=""
          class="w-full h-full transition transform hover:scale-110"
        />
      </div>
    </div>

    <h4 class="mt-2 text-[18px] font-bold line-clamp-2" v-html="highligh" />

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
        v-if="!roles.length"
        class="w-full bg-second text-primary rounded-full py-1"
      >
        <span class="font-semibold text-[14px]">Preparing</span>
      </button>

      <button
        v-else
        class="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg shadow-primary-200 py-1"
        @click.prevent="
          $authFunc(() => $modal().open('proposal', { project: project.id }))
        "
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
import {
  computed,
  inject,
  useRouter,
  ref,
  useNuxtApp,
  watch,
  nextTick
} from '#imports'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { AdvancedSearch_projects } from '~/apollo/shinzo/queries/__generated__/AdvancedSearch'
import { UnwrapNestedRefs } from '@vue/reactivity'
import { GetProjectsFilter } from '~/apollo/__generated__/serverTypes'

const props = defineProps<{
  project: AdvancedSearch_projects
}>()

const router = useRouter()
const link = computed(
  () =>
    props.project.link ||
    router.resolve({ name: 'projects', params: { id: props.project.slug } })
      .href
)
const filter: UnwrapNestedRefs<GetProjectsFilter> = inject('searchFilter')!

const highligh = computed(() => {
  const { name } = filter
  if (!name) return props.project.name
  const regex = new RegExp(name, 'gi')
  return props.project.name.replace(
    regex,
    (match) => `<span class="text-primary-600">${match}</span>`
  )
})

const qrcode = useQRCode(link)
const { $anime } = useNuxtApp()
const codeRef = ref<HTMLElement>()
watch(qrcode, (el) => {
  if (!el) return
  nextTick(() => {
    $anime({
      targets: codeRef.value,
      opacity: [0, 1],
      scale: [0.7, 1]
    })
  })
})

const roles = computed(() => props.project.roles)
const filledRoles = computed(() => roles.value.filter((role) => role.user))
</script>

<style scoped></style>
