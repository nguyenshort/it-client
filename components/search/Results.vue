<template>
  <div v-auto-animate>
    <div class="-m-4 flex flex-wrap w-full" v-auto-animate>
      <div v-for="(project, index) in projects" :key="index" class="w-1/3 p-4">
        <search-item :project="project" />
      </div>
    </div>
    <div v-if="scrollStatus === InfiniteStatus.READY" ref="el"></div>
    <div v-else-if="loading" class="flex flex-col items-center justify-center">
      <vue-lottie-player
        width="250px"
        height="200px"
        loop
        path="/json/loading.json"
      />
    </div>
    <div
      v-else-if="scrollStatus === InfiniteStatus.DONE"
      class="flex flex-col items-center justify-center"
    >
      <vue-lottie-player
        width="250px"
        height="180px"
        loop
        path="https://assets7.lottiefiles.com/packages/lf20_EMTsq1.json"
      />

      <div class="mt-4 text-center">
        <h3 class="text-lg font-semibold text-gray-700">
          {{ $t('resume.owner') }}
        </h3>
        <p class="mt-2 text-sm text-gray-500">
          {{ $t('resume.controller') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UnwrapNestedRefs } from '@vue/reactivity'
import { GetProjectsFilter } from '~/apollo/__generated__/serverTypes'
import {
  inject,
  computed,
  useQuery,
  ref,
  useElementVisibility,
  watch
} from '#imports'
import {
  AdvancedSearch,
  AdvancedSearch_projects,
  AdvancedSearchVariables
} from '~/apollo/shinzo/queries/__generated__/AdvancedSearch'
import { ADVANCED_SEARCH } from '~/apollo/shinzo/queries/projects.query'
import { InfiniteStatus } from '~/utils/infinite'

const filter: UnwrapNestedRefs<GetProjectsFilter> = inject('searchFilter')!
const vars = computed<AdvancedSearchVariables>(() => ({
  filter
}))

const scrollStatus = ref<InfiniteStatus>(InfiniteStatus.READY)

const { loading, onResult } = useQuery<AdvancedSearch, AdvancedSearchVariables>(
  ADVANCED_SEARCH,
  vars,
  {
    debounce: 500
  }
)
const projects = ref<AdvancedSearch_projects[]>([])
onResult((data) => {
  if (data.data?.projects.length) {
    projects.value.push(...(data?.data.projects || []))
  } else {
    scrollStatus.value = InfiniteStatus.DONE
  }
})

watch(
  () => [filter.name, filter.status, filter.category],
  () => {
    filter.offset = 0
    projects.value = []
    scrollStatus.value = InfiniteStatus.READY
  }
)

const el = ref<HTMLElement>()
const bttom = useElementVisibility(el)
watch(bttom, (val) => {
  if (val) {
    filter.offset = projects.value.length
  }
})
</script>

<style scoped></style>
