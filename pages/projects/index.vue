<template>
  <div class="py-5">
    <div class="font-semibold">
      <ul class="text-gray-500 opacity-90">
        <li class="flex items-center">
          <span class="flex items-center">
            <Icon name="bx:bxs-home-circle" />
          </span>
          <span class="mx-1.5">/</span>
          <span>{{ project?.name }}</span>
        </li>
      </ul>
    </div>

    <div class="flex mt-3 -mx-4">
      <div class="w-4/5 px-4">
        <lazy-project-banner :project="project" />
        <lazy-project-detail class="mt-7" :project="project" />
        <lazy-project-progress class="mt-10" :project="project" />
        <lazy-project-comments class="mt-10" />
      </div>
      <div class="w-1/3 min-h-screen pr-4 pl-6">
        <lazy-project-members :project="project" />
        <lazy-project-others class="mt-12" :exclude="[project?.id]" />
        <!--        <project-members />-->
        <!--        <project-other class="mt-6" />-->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useAsyncQuery, useRoute } from '#imports'
import { GetProject } from '~/apollo/shinzo/queries/__generated__/GetProject'
import { GET_PROJECT } from '~/apollo/shinzo/queries/project.query'
const route = useRoute()

const { data } = await useAsyncQuery<GetProject>(GET_PROJECT, {
  project: route.params.id
})
const project = computed(() => data.value?.project)
</script>

<style scoped></style>
