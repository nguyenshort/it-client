<template>
  <div>
    <h3 class="text-[20px] font-semibold text-gray-700">
      {{ $t('general.progress') }}
    </h3>

    <div v-auto-animate>
      <div class="mt-5">

        <div v-if="steps.length">
          <div class="text-gray-500">
            <div ref="containerRef" class="mt-4 flex relative justify-between">
              <div
                v-for="(step, index) in steps"
                :key="index"
                class="relative z-10"
              >
                <button class="text-center" @click="toggleActiveStep(index)">
                  <div
                    class="w-16 h-16 rounded-full border-[3px] flex items-center justify-center bg-white"
                    :class="{
                    'border-primary-500': index <= process,
                  }"
                  >
                    <Icon
                      v-if="index === process + 1"
                      name="eos-icons:loading"
                      class="text-[22px] text-primary-500"
                    />
                    <Icon
                      v-else-if="index <= process"
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
                </button>
              </div>

              <div
                class="absolute h-[4px] top-8 left-3 right-3 transform z-0 -translate-y-1/2"
              >
                <div class="w-full h-full bg-gray-100 relative">
                  <div
                    class="bg-primary-500 h-full _progress"
                    :style="{
                    width: `${(process / (steps.length - 1)) * 100}%`
                  }"
                  ></div>
                </div>
              </div>
            </div>
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
              {{ $t('general.discovering') }}
            </div>
          </div>
        </div>

      </div>

      <div
        v-if="activeStep !== undefined"
        class="bg-primary-100 text-primary-600 p-4 rounded-lg mt-6 relative step-content"
      >
        <div>
          {{ steps[activeStep].content || '---' }}
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { GetProject_project } from '~/apollo/shinzo/queries/__generated__/GetProject'
import { computed, useQuery, ref, watch, useElementSize } from '#imports'
import { StepStatus } from '~/__generated__/shinzoTypes'
import { GET_PROJECT_STEPS } from "~/apollo/shinzo/queries/project.query";
import { GetProjectSteps } from "~/apollo/shinzo/queries/__generated__/GetProjectSteps";
import { GetProjectFilesVariables } from "~/apollo/shinzo/queries/__generated__/GetProjectFiles";
import { VueLottiePlayer } from "@nguyenshort/vue-lottie";

const props = defineProps<{
  project: Pick<GetProject_project, "id" | "slug">
}>()

const { result } = useQuery<GetProjectSteps, GetProjectFilesVariables>(GET_PROJECT_STEPS, {
  project: props.project.slug
})

const steps = computed(() => result.value?.project.steps || [])

const process = computed(() => steps.value.filter(step => step.status === StepStatus.DONE).length - 1)

const activeStep = ref<number>()

const toggleActiveStep = (index: number) => {
  if (activeStep.value === index) {
    activeStep.value = undefined
  } else {
    activeStep.value = index
  }
}

const containerRef = ref<HTMLElement>()
const { width } = useElementSize(containerRef)

const leftScale = ref(0)
watch(() => activeStep.value, () => {
  if(!width.value || activeStep.value === undefined) {
    return
  }

  if(activeStep.value === 0) {
    leftScale.value = 56/2 - 12/2
  } else if (activeStep.value === steps.value.length - 1) {
    leftScale.value = width.value - 56/2 - 12/2
  } else {
    leftScale.value = (width.value / (steps.value.length - 1)) * activeStep.value - 12/2
  }
})

const contentStyle = computed(() => leftScale.value + 'px')
</script>

<style>
.step-content:before {
  position: absolute;
  content: "";
  bottom: 100%;
  left: v-bind(contentStyle);
  border-bottom: 7px solid #ebf0fe;
  border-left: 6px dashed transparent;
  border-right: 6px dashed transparent;
  height: 0;
  width: 0;
}
</style>
