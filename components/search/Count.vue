<template>
  <span ref="countRef" class="opacity-50 text-[16px] ml-2">0</span>
</template>

<script lang="ts" setup>
import { UnwrapNestedRefs } from '@vue/reactivity'
import {
  GetProjectsFilter
} from '~/apollo/__generated__/serverTypes'
import { computed, inject, useQuery, useNuxtApp, ref, watch } from '#imports'
import { CountSearch, CountSearchVariables } from "~/apollo/shinzo/queries/__generated__/CountSearch";
import { COUNT_SEARCH } from "~/apollo/shinzo/queries/projects.query";

const filter: UnwrapNestedRefs<GetProjectsFilter> = inject('searchFilter')!
const vars = computed<CountSearchVariables>(() => ({
  filter: {
    name: filter.name,
    status: filter.status,
    category: filter.category
  }
}))
const { result } = useQuery<CountSearch, CountSearchVariables>(COUNT_SEARCH, vars)
const count = computed(() => result.value?.projectsCount || 0)

const { $anime } = useNuxtApp()
const countRef = ref<HTMLElement>()
watch(count, (val, oldVal) => {
  $anime({
    targets: countRef.value,
    innerHTML: [oldVal, val],
    round: 1,
    easing: 'easeInOutQuad',
    duration: 500
  })
}, { immediate: true })

</script>

<style scoped></style>
