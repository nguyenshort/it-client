<template>
  <div
    class="mt-7 bg-white w-full flex shadow-default rounded-xl overflow-hidden px-5 transition hover:shadow-primary-100"
    @submit.prevent
  >
    <div class="w-full flex items-center h-[50px]">
      <Icon
        name="ri:search-line"
        class="flex-shrink-0 text-[24px] text-gray-500"
      />
      <input
        v-model="filter.name"
        type="text"
        class="h-full pl-2 focus:outline-0 w-full text-[18px] ml-1 font-semibold text-gray-500"
        placeholder="Tìm kiếm"
      />
    </div>

    <div
      class="w-[230px] flex items-center h-[50px] flex-shrink-0 border-l border-gray-100 pl-4"
    >
      <Icon
        name="pajamas:status"
        class="flex-shrink-0 text-[24px] text-gray-500"
      />
      <select
        v-model="filter.status"
        type="text"
        class="h-full pl-2 focus:outline-0 w-full text-[14px] ml-2 font-semibold text-gray-500"
      >
        <option :value="null">Tất Cả</option>
        <option :value="ProjectStatus.PREPARE">On Broad</option>
        <option :value="ProjectStatus.RUNNING">Running</option>
        <option :value="ProjectStatus.DONE">Done</option>
        <option :value="ProjectStatus.STUCK">Stuck</option>
      </select>
    </div>

    <div
      class="flex items-center h-[50px] flex-shrink-0 ml-4 border-l border-gray-100 pl-4 transition-all transform"
      :style="{
        width: openRange ? '230px' : '130px'
      }"
    >
      <template v-if="openRange">
        <Icon
          name="material-symbols:timelapse-outline"
          class="flex-shrink-0 text-[24px] text-gray-500 mr-3"
        />
        <div class="w-full relative">
          <client-only>
            <vue-slider color="#3b66f5" track-color="#d0deff" />
          </client-only>
        </div>
        <button
          id="close-range"
          class="ml-3 text-rose-500 transition transform hover:scale-125 hover:shadow-default shadow-rose-200"
          @click="openRange = false"
        >
          <Icon name="ion:ios-close-circle" />
        </button>
      </template>

      <template v-else>
        <button
          id="open-range"
          class="w-6 h-6 border-2 border-primary-500 rounded-lg flex items-center justify-center"
          @click="openRange = true"
        >
          <div
            class="w-4 h-4 bg-primary-500 rounded-lg shadow-default shadow-primary-200 transition transform"
            :class="{
              'scale-0': !openRange
            }"
          />
        </button>
        <span class="ml-2">Lọc thời gian</span>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, inject, useRouter, watch, InfiniteStatus } from "#imports";
import { UnwrapNestedRefs } from '@vue/reactivity'
import {
  GetProjectsFilter,
  ProjectStatus
} from '~/apollo/__generated__/serverTypes'
const VueSlider = defineAsyncComponent(() => import('vue3-slider'))

const openRange = ref(false)

const filter: UnwrapNestedRefs<GetProjectsFilter> = inject('searchFilter')!

const router = useRouter()
watch(
  () => [filter.name],
  ([val]) => {
    router.replace({
      query: {
        ...router.currentRoute.value.query,
        keyword: val
      }
    })
  }
)
</script>

<style scoped></style>
