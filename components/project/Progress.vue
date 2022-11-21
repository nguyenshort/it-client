<template>
  <div>
    <h3 class="text-[20px] font-semibold text-gray-700">Tiến Độ</h3>

    <div class="mt-5">
      <div v-if="steps.length">
        <div class="text-gray-500">
          <div class="flex items-center justify-between">
            <button class="flex items-center">
              <Icon name="ph:person-simple-run-bold" class="text-[13px]" />
              <span class="ml-2 text-[12px]">
                {{ $dayjs(project.estimate[0]).format('DD/MM/YYYY') }}
              </span>
            </button>

            <button class="flex items-center">
              <Icon name="mingcute:flag-1-fill" class="text-[13px]" />
              <span class="ml-2 text-[12px]">
                {{ $dayjs(project.estimate[1]).format('DD/MM/YYYY') }}
              </span>
            </button>
          </div>

          <div class="mt-4 flex relative justify-between">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="relative z-10"
            >
              <div class="text-center">
                <div
                  class="w-16 h-16 rounded-full border-[3px] flex items-center justify-center bg-white"
                  :class="{
                    'border-primary-500': getStatus(index) === 'done',
                  }"
                >
                  <Icon
                    v-if="getStatus(index) === 'doing'"
                    name="eos-icons:loading"
                    class="text-[22px] text-primary-500"
                  />
                  <Icon
                    v-else-if="getStatus(index) === 'done'"
                    name="ic:outline-check"
                    class="text-[22px] text-primary-500"
                  />
                  <Icon
                    v-else
                    name="mdi:clock-time-five-outline"
                    class="text-[22px] text-gray-300"
                  />
                </div>

                <div class="text-[14px] mt-2 font-semibold text-gray-500">
                  {{ step.name }}
                </div>
              </div>
            </div>

            <div
              class="absolute h-[4px] top-8 left-3 right-3 transform z-0 -translate-y-1/2"
            >
              <div class="w-full h-full bg-gray-100 relative">
                <div
                  class="bg-primary-500 h-full _progress"
                  :style="{
                    width: `${(currentActive / (steps.length - 1)) * 100}%`
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="isHiring" class="mt-4">
          Dự án hiện vẫn đang welcome thành viên mới.
          <a
            class="underline text-primary-600 font-semibold"
            href="javascript:void(0)"
            >Đăng ký ngay</a
          >
        </div>
      </div>

      <div v-else class="text-center">
        <div style="width: 300px; height: 250px" class="mx-auto">
          <vue-lottie-player
            width="300px"
            height="250px"
            loop
            path="https://assets5.lottiefiles.com/packages/lf20_dsxct2el.json"
          />
          <div class="text-sm text-gray-500">
            Dự án vẫn đang trong quá trình tìm hiểu
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetProject_project } from '~/apollo/shinzo/queries/__generated__/GetProject'
import { computed } from '#imports'
import { StepStatus } from '~/__generated__/shinzoTypes'

const props = defineProps<{
  project: GetProject_project
}>()

const steps = computed(() => props.project.steps)

const currentActive = computed(() => {
  return steps.value.findIndex((step) => step.status === StepStatus.DONE) + 1
})

const getWidth = computed(() => {
  return (currentActive.value / steps.value.length) * 100
})

const isHiring = computed(() => {
  return props.project.roles.filter((role) => !role.user).length > 0
})

const getStatus = (index: number) => {
  if (index <= currentActive.value) {
    return 'done'
  } else if (index === currentActive.value + 1) {
    return 'doing'
  } else {
    return 'todo'
  }
}
</script>

<style lang="css" scoped>
._progress {
  width: v-bind(getWidth);
}
</style>
