<template>
  <div
    ref="target"
    class="w-full h-full bg-white overflow-hidden rounded-lg bg-white p-5"
  >
    <div class="flex justify-between">
      <div>
        <h2 class="font-semibold text-[16px]">
          {{ project.name }}
        </h2>
        <h5 class="text-[12px] font-semibold text-gray-500 mt-1">
          {{ $dayjs(project.createdAt).format('LL') }}
        </h5>
      </div>

      <a
        href="javascript:void(0)"
        class="block w-[35px] aspect-1 overflow-hidden flex-shrink-0"
      >
        <img
          class="w-full h-full object-contain"
          :src="'http://localhost:5001' + project.logo"
          alt=""
        />
      </a>
    </div>

    <div
      class="relative h-[4px] w-full rounded-full overflow-hidden my-5 bg-gray-100"
    >
      <div
        ref="line1"
        class="absolute h-full bg-primary-500 z-[1] left-0"
      ></div>
      <div
        ref="line2"
        class="absolute h-full bg-primary-200 z-[0] left-0"
      ></div>
    </div>

    <div class="text-[14px] font-semibold">Description:</div>
    <p class="mt-1.5 text-[12px] line-clamp-2">
      {{ project.content }}
    </p>

    <div class="mt-2.5 text-[14px] font-semibold">Teams:</div>

    <div class="flex mt-2.5 justify-between">
      <lazy-includes-group-avatar
        :avatars="Array(10).fill('/images/avatar.jpeg')"
      />

      <button class="flex items-center text-gray-500">
        <i-ep-flag class="text-[12px]" />
        <span class="ml-1 text-[12px]">
          {{ $dayjs(project.estimate[1]).format('L') }}
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, useElementVisibility, useNuxtApp, watch } from "#imports";
import { GetHomeRunning_projects } from '~/apollo/shinzo/queries/__generated__/GetHomeRunning'

defineProps<{
  project: GetHomeRunning_projects
}>()

const { $dayjs, $anime } = useNuxtApp()

const target = ref<HTMLDivElement>()
const targetIsVisible = useElementVisibility(target)

const line1 = ref<HTMLDivElement>()
const line2 = ref<HTMLDivElement>()
watch(targetIsVisible, (isVisible) => {
  if (isVisible) {
    nextTick(() => {
      setTimeout(() => {
        $anime({
          targets: line2.value,
          width: '100%',
          duration: 1000
        })

        $anime({
          targets: line1.value,
          width: '60%',
          duration: 1500
        })
      }, 500)
    })
  } else {
    $anime({
      targets: line2.value,
      width: '0%',
      duration: 1000
    })

    $anime({
      targets: line1.value,
      width: '0%',
      duration: 1500
    })
  }
})
</script>

<style scoped></style>
