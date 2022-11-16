<template>
  <lazy-template-session title="Running Project">
    <div class="flex flex-wrap -mx-3 -mb-7">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="w-1/3 px-3 pb-7"
      >
        <lazy-template-running :project="project" />
      </div>
    </div>
  </lazy-template-session>
</template>

<script lang="ts" setup>
import { computed, reactive, useAsyncQuery } from '#imports'
import { ProjectStatus } from '~/__generated__/shinzoTypes'
import { GET_HOME_RUNNING } from '~/apollo/shinzo/queries/coupon.query'
import {
  GetHomeRunning,
  GetHomeRunningVariables
} from '~/apollo/shinzo/queries/__generated__/GetHomeRunning'

const variables = reactive<GetHomeRunningVariables>({
  filter: {
    limit: 6,
    offset: 0,
    sort: 'updatedAt',
    status: ProjectStatus.RUNNING
  }
})
const { data } = await useAsyncQuery<GetHomeRunning>(
  GET_HOME_RUNNING,
  variables
)
const projects = computed(() => data.value?.projects || [])
</script>
