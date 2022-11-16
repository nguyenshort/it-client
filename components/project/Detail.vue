<template>
  <div>

    <div class="flex justify-between items-start">
      <h4 class="text-[28px] font-semibold capitalize mt-3 mb-4 text-gray-800">
        {{ project.name }}
      </h4>

      <div class="w-10 h-10 bg-rose-500 rounded-lg shadow-md shadow-rose-200 text-white flex items-center justify-center text-[18px] cursor-pointer transition transform hover:scale-105 hover:shadow-none">
        <i-material-symbols-bookmark-add />
      </div>

    </div>

    <div class="mt-3">

      <ul class="flex font-semibold">

        <li
          class="mr-4"
        >
          <a class="text-rose-500">#{{ project.category.name }}</a>
        </li>

        <li
          v-for="(item, index) in project.technologies"
          :key="index"
          class="mr-4"
        >
          <a class="text-primary-500">#{{ item.name }}</a>
        </li>
      </ul>

    </div>

    <div class="prose mt-3 text-gray-500 w-full font-semibold">
      {{ project.content }}
    </div>
    <div class="flex mt-4">
      <div class="text-gray-500 bg-gray-100 rounded-lg flex items-center">
        <button v-if="project.files.length" class="flex items-center px-3 py-1.5">
          <i-mdi-document class="text-[16px]" />
          <span class="text-[12px] ml-1">{{ project.files.length }} Tệp Đính Kèm</span>
        </button>
        <span v-if="project.files.length" class="h-full w-px bg-gray-200 mx-1"></span>
        <button class="flex items-center px-3 py-1.5">
          <i-ic-baseline-remove-red-eye class="text-[16px]" />
          <span class="text-[12px] ml-1">34350 Lượt Xem</span>
        </button>
      </div>
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
