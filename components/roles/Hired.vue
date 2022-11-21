<template>
  <div class="flex items-center">
    <div
      class="w-12 h-12 rounded-full overflow-hidden shadow-default border border-white"
    >
      <img class="w-full h-full object-cover" :src="role.user?.avatar" alt="" />
    </div>

    <div class="ml-3">
      <h4 class="font-semibold text-gray-700 mb-px text-[15px]">
        {{ role.user?.name }}
      </h4>
      <span
        class="bg-rose-500 px-2 py-px rounded-full text-white text-[10px] font-semibold"
      >
        {{ role.name }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetProject_project_roles } from '~/apollo/shinzo/queries/__generated__/GetProject'

const props = defineProps<{
  role: Omit<Required<GetProject_project_roles>, '__typename'>
}>()
</script>

<style scoped></style>
