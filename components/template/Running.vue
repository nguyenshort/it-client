<template>
  <div
    ref="target"
    class="w-full h-full bg-white overflow-hidden rounded-lg bg-white p-5"
  >
    <div class="flex justify-between">
      <div>
        <nuxt-link :to="$link().product(project)">
          <h2 class="font-semibold text-[16px]">
            {{ project.name }}
          </h2>
        </nuxt-link>
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
          :src="$cdn(project.logo)"
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

    <div class="pt-3">
      <div class="text-[13px] font-semibold">Teams</div>

      <div class="flex items-center justify-between">
        <div
          class="w-9 h-9 flex-shrink-0 border border-white shadow-md rounded-full overflow-hidden mt-1.5"
        >
          <img alt="" :src="$cdn(owner.avatar)" class="w-full h-full" />
        </div>

        <lazy-includes-group-avatar
          v-if="filledRoles.length"
          :avatars="filledRoles.map((role) => role.user.avatar)"
        />

        <button
          v-else-if="project.roles.length"
          class="flex items-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1.5 rounded-full shadow-lg shadow-primary-200"
        >
          <span class="text-xs font-semibold mr-1">Tham Gia</span>
          <i-material-symbols-add-circle-rounded />
        </button>

        <button
          v-else
          class="flex items-center bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-3 py-1.5 rounded-full shadow-lg shadow-primary-200"
        >
          <span class="text-xs font-semibold mr-1">Xin Chờ</span>
          <i-mdi-clock-time-eight-outline />
        </button>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  ref,
  useElementVisibility,
  useNuxtApp,
  watch
} from '#imports'
import { ProjectRunningDoc } from '~/apollo/shinzo/queries/__generated__/ProjectRunningDoc'

const props = defineProps<{
  project: ProjectRunningDoc
}>()
const roles = computed(() => props.project.roles)
const filledRoles = computed(() => roles.value.filter((role) => role.user))
const owner = computed(() => props.project.owner)

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
