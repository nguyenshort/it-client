<template>
  <div v-for="(category, index) in categories" :key="index" class="mt-5 mb-5">
    <div
      class="flex items-center cursor-pointer hover:text-primary-600"
      :class="{
        'text-primary-600': filter.category === category.id
      }"
      @click="filter.category = category.id"
    >
      <div
        class="w-6 h-6 border-2 border-primary-500 rounded-lg flex items-center justify-center"
      >
        <div
          class="w-4 h-4 bg-primary-500 rounded-lg shadow-default shadow-primary-200 transition transform"
          :class="{
            'scale-0': filter.category !== category.id
          }"
        ></div>
      </div>

      <Icon class="text-[17px] mx-2.5" :name="category.icon" />

      <span class="font-semibold">{{ category.name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, shallowRef } from "#imports";
import { UnwrapNestedRefs } from "@vue/reactivity";
import { GetProjectsFilter } from "~/apollo/__generated__/serverTypes";

const categories = shallowRef<any[]>([
  {
    id: '1',
    name: 'Mobile',
    slug: 'mobile',
    icon: 'ph:device-mobile-speaker-bold'
  },
  {
    id: '2',
    name: 'Web',
    slug: 'web',
    icon: 'mdi:web'
  },
  {
    id: '3',
    name: 'Design',
    slug: 'design',
    icon: 'ph:figma-logo'
  },
  {
    id: '4',
    name: 'Marketing',
    slug: 'marketing',
    icon: 'nimbus:marketing'
  },
  {
    id: '5',
    name: 'Blockchain',
    slug: 'marketing',
    icon: 'clarity:block-solid'
  },
  {
    id: '6',
    name: 'IoT',
    slug: 'iot',
    icon: 'pepicons:internet'
  },
  {
    id: '7',
    name: 'Cloud',
    slug: 'cloud',
    icon: 'material-symbols:cloud'
  },
  {
    id: '8',
    name: 'DevOps',
    slug: 'devops',
    icon: 'mdi:microsoft-azure-devops'
  },
  {
    id: '10',
    name: 'Data Science',
    slug: 'data-science',
    icon: 'ph:database-bold'
  }
])
const filter: UnwrapNestedRefs<GetProjectsFilter> = inject('searchFilter')!
</script>

<style scoped></style>
