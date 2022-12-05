<template>
  <dev-only>{{ filter }}</dev-only>

  <div>
    <div class="-m-4 flex flex-wrap w-full">
      <div v-for="(project, index) in projects" :key="index" class="w-1/3 p-4">
        <search-item />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UnwrapNestedRefs } from '@vue/reactivity'
import { GetProjectsFilter } from '~/apollo/__generated__/serverTypes'
import { inject, computed, useQuery } from '#imports'
import {
  AdvancedSearch, AdvancedSearch_projects,
  AdvancedSearchVariables
} from "~/apollo/shinzo/queries/__generated__/AdvancedSearch";
import { ADVANCED_SEARCH } from '~/apollo/shinzo/queries/projects.query'

const filter: UnwrapNestedRefs<GetProjectsFilter> = inject('searchFilter')!

const vars = computed<AdvancedSearchVariables>(() => ({
  filter
}))

const { result, loading } = useQuery<AdvancedSearch, AdvancedSearchVariables>(
  ADVANCED_SEARCH,
  vars,
  {
    debounce: 500
  }
)
const projects = computed<AdvancedSearch_projects[]>(() => result.value?.projects || [])
</script>

<style scoped></style>
