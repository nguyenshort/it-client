<template>
  <div class="px-1.5 pb-1.5 text-center transition hover:scale-105">
    <button
      class="w-full relative"
    >
      <div
        class="w-full aspect-1 rounded-full border border-dashed flex items-center justify-center text-gray-400"
      >
        <Icon name="material-symbols:add" />
      </div>
      <h4 class="text-[10px] mt-0.5 line-clamp-1">{{ roles[0].name }}</h4>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ProjectItemDoc } from "~/apollo/shinzo/queries/__generated__/ProjectItemDoc";

defineProps<{
  roles: ProjectItemDoc["roles"]
}>()

</script>

<style scoped></style>
