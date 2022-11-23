<template>
  <lazy-template-session :title="$t('home.done')">
    <ul>
      <li
        v-for="(project, index) in projects"
        :key="index"
        class="mb-5 last:mb-0"
      >
        <lazy-template-done :project="project" />
      </li>
    </ul>
  </lazy-template-session>
</template>

<script lang="ts" setup>
import { computed, reactive, useAsyncQuery } from '#imports'
import { ProjectStatus } from '~/__generated__/shinzoTypes'
import { GET_HOME_DONE } from '~/apollo/shinzo/queries/coupon.query'
import {
  GetHomeDone,
  GetHomeDoneVariables
} from '~/apollo/shinzo/queries/__generated__/GetHomeDone'

const variables = reactive<GetHomeDoneVariables>({
  filter: {
    limit: 4,
    offset: 0,
    sort: 'updatedAt',
    status: ProjectStatus.DONE
  }
})
const { data } = await useAsyncQuery<GetHomeDone>(GET_HOME_DONE, variables)
const projects = computed(() => data.value?.projects || [])
</script>
