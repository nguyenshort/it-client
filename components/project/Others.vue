<template>
  <div>
    <h3 class="text-[20px] font-semibold text-gray-700 mb-0">
      {{ $t('general.otherProjects') }}
    </h3>

    <div class="mt-5">
      <lazy-template-project
        v-for="(project, index) in projects"
        :key="index"
        :project="project"
        class="mb-5 last:mb-0"
      />
    </div>

  </div>
</template>

<script lang="ts" setup>
import { EXAMPLE_PROJECTS } from '~/apollo/shinzo/queries/coupon.query'
import { ExampleProjects, ExampleProjectsVariables } from "~/apollo/shinzo/queries/__generated__/ExampleProjects";
import { computed, useAsyncQuery } from "#imports";

const props = defineProps<{
  exclude: string[]
}>()

const query = computed<ExampleProjectsVariables>(() => ({
  filter: {
    limit: 3,
    exclude: props.exclude,
  }
}))
const { data } = await useAsyncQuery<ExampleProjects>(EXAMPLE_PROJECTS, query.value)
const projects = computed(() => data?.value?.exampleProjects || [])
</script>

<style scoped></style>
