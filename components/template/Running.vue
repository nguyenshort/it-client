<template>
  <div
    ref="target"
    class="w-full h-full bg-white overflow-hidden rounded-lg bg-white p-5 shadow-default"
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

    <div class="text-[14px] font-semibold">{{ $t('general.des') }}:</div>
    <p class="mt-1.5 text-[12px] line-clamp-2" v-html="project.content" />

    <div class="pt-3">
      <div class="text-[13px] font-semibold">
        {{ $t('general.teams') }}
      </div>

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

        <theme-button
          v-else-if="project.roles.length"
          size="small"
          type="indigo"
          icon="material-symbols:add-circle"
          @click="$modal().open('proposal', { project: project.id })"
        >
          {{ $t('general.join') }}
        </theme-button>

        <theme-button
            v-else
            icon="material-symbols:timelapse-outline"
            size="small"
            type="indigo"
        >
          {{ $t('general.wait') }}
        </theme-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, useElementVisibility, useNuxtApp, watch } from "#imports";
import { GetHomeRunning_projects } from "~/apollo/shinzo/queries/__generated__/GetHomeRunning";
import { StepStatus } from "~/apollo/__generated__/serverTypes";

const props = defineProps<{
  project: GetHomeRunning_projects
}>()
const roles = computed(() => props.project.roles)
const filledRoles = computed(() => roles.value.filter((role) => role.user))
const owner = computed(() => props.project.owner)

const steps = computed(() => props.project.steps)

const { $dayjs, $anime } = useNuxtApp()

const target = ref<HTMLDivElement>()
const targetIsVisible = useElementVisibility(target)

const line1 = ref<HTMLDivElement>()
const line2 = ref<HTMLDivElement>()
watch(targetIsVisible, (isVisible) => {
  if (isVisible) {

    const done = steps.value.filter((step) => step.status === StepStatus.DONE).length
    const total = steps.value.length
    const percent = done / total * 100

    nextTick(() => {
      setTimeout(() => {
        $anime({
          targets: line2.value,
          width: '100%',
          duration: 1000
        })

        $anime({
          targets: line1.value,
          width: percent + '%',
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
