<template>
  <div class="w-full aspect-w-12 aspect-h-7 overflow-hidden relative shadow-default hover:shadow-none rounded-lg cursor-pointer">
    <div class="w-full h-full absolute transition transform duration-300 hover:scale-105">
      <img
        class="absolute inset-0 w-full h-full object-cover transition transform duration-500 ease-in-out z-0"
        :src="$cdn(project.cover)"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetProject_project } from "~/apollo/shinzo/queries/__generated__/GetProject";

defineProps<{
  project: GetProject_project
}>()
</script>

<style scoped>

</style>
