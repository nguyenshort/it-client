<template>
  <div>
    <h3 class="text-[20px] font-semibold text-gray-700">Tiến Độ</h3>

    <div v-auto-animate class="mt-5">
      <div v-if="steps.length">
        <div class="text-gray-500">
          <div class="flex items-center justify-between">
            <button class="flex items-center">
              <i-ep-flag class="text-[13px]" />
              <span class="ml-2 text-[14px]">
                {{ $dayjs(project.estimate[0]).format('DD/MM/YYYY') }}
              </span>
            </button>

            <button class="flex items-center">
              <i-material-symbols-check-circle class="text-[13px]" />
              <span class="ml-2 text-[14px]">
                {{ $dayjs(project.estimate[1]).format('DD/MM/YYYY') }}
              </span>
            </button>
          </div>

          <div class="flex items-center justify-between mt-4 relative">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="relative z-10"
            >
              <div
                class="w-16 h-16 rounded-full object-cover border-[3px] cutsom-shadow bg-white flex items-center justify-center"
                :class="{
                  'border-primary-500': index <= currentActive,
                  'border-gray-300': index > currentActive
                }"
              >
                <i-ic-baseline-check
                  v-if="currentActive > index"
                  class="text-[22px] text-primary-500"
                />
                <i-eos-icons-loading
                  v-if="currentActive === index"
                  class="text-[22px] text-primary-500"
                />
                <i-mdi-clock-time-eight-outline
                  v-if="currentActive < index"
                  class="text-[22px] text-gray-300"
                />
              </div>
            </div>

            <div class="absolute h-[4px] top-1/2 left-3 right-3 transform z-0">
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

          <div class="flex items-center justify-between mt-2.5 relative">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="w-16 text-center"
            >
              <span class="mt-3 font-semibold text-gray-500">{{
                step.name
              }}</span>
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
</script>

<style lang="css" scoped>
._progress {
  width: v-bind(getWidth);
}
</style>
