<template>
  <lazy-template-session :title="$t('home.onBroad')" :description="$t('home.onBroadSub')">
    <div
        class='flex flex-wrap -mx-3 -mb-7'
    >

      <div
          v-for='(project, index) in projects'
          :key='index'
          class='w-1/4 px-3 pb-7'
      >
        <lazy-template-project :project="project" />
      </div>

    </div>
  </lazy-template-session>
</template>

<script lang="ts" setup>
import { computed, reactive, useAsyncQuery } from "#imports"
import { GET_HOME_BOARD } from "~/apollo/shinzo/queries/coupon.query"
import { GetHomeOnBoard, GetHomeOnBoardVariables } from "~/apollo/shinzo/queries/__generated__/GetHomeOnBoard"
import { ProjectStatus } from "~/__generated__/shinzoTypes"

const variables = reactive<GetHomeOnBoardVariables>({
  filter: {
    limit: 8,
    offset: 0,
    sort: 'updatedAt',
    status: ProjectStatus.PREPARE
  }
})
const { data } = await useAsyncQuery<GetHomeOnBoard>(GET_HOME_BOARD, variables)
const projects = computed(() => data.value?.projects || [])
</script>

<style scoped></style>
