<template>
  <div ref="categoriesRef">
    <div
      v-for="(category, index) in categories"
      :key="index"
      class="mt-5 mb-5 item opacity-0"
    >
      <div
        class="flex items-center cursor-pointer hover:text-primary-600"
        :class="{
          'text-primary-600': filter.category === category.id
        }"
        @click="
          filter.category === category.id
            ? (filter.category = null)
            : (filter.category = category.id)
        "
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
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, shallowRef, useNuxtApp, nextTick, onMounted } from '#imports'
import { UnwrapNestedRefs } from '@vue/reactivity'
import { GetProjectsFilter } from '~/apollo/__generated__/serverTypes'

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

const categoriesRef = ref<HTMLUListElement>()
const { $anime } = useNuxtApp()

onMounted(async () => {
  await nextTick()
  $anime({
    targets: categoriesRef.value?.querySelectorAll('.item'),
    translateY: [-30, 0],
    opacity: [0, 1],
    //duration: 300,
    // easing: 'easeOutQuad',
    delay: (el: any, i: number) => 100 + 30 * i
  })
})

</script>

<style scoped></style>
