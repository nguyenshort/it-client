<template>
  <div>
    <h3 class="text-[20px] font-semibold text-gray-700 mb-0">
      {{ $t('general.review') }}
      <span class="text-[14px] text-gray-500">(250)</span>
    </h3>

    <div class="flex mt-4">
      <div class="w-2/3 pr-10">
        <ul>
          <li
            v-for="comment in poits"
            :key="comment.key"
            class="mb-4 last:mb-0"
          >
            <div class="flex justify-between items-center">
              <h5 class="mb-0 font-semibold text-gray-600">{{ $t('review.' + comment.key) }}</h5>

              <ul class="flex">
                <li
                  v-for="index in 5"
                  :key="index"
                  class="text-[13px] ml-2 first:ml-0"
                >
                  <Icon name="ph:star-fill" v-if="index <= comment.score" class="text-orange-500" />
                  <Icon name="ph:star-fill" v-else class="text-gray-300" />
                </li>
              </ul>

            </div>
          </li>
        </ul>
      </div>
      <div class="w-1/3 border-l">
        <div class="w-full h-full justify-center items-center flex">
          <button
            class="flex items-center mr-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-4 py-2 rounded-full shadow-lg shadow-primary-200"
          >
            <span class="text-[14px] font-semibold mr-2">
              {{ $t('general.review') }}
            </span>
            <Icon name="bx:bxs-message-square-edit" />
          </button>
        </div>
      </div>
    </div>

    <div class="text-center py-10">
      <div style="width: 300px; height: 250px" class="mx-auto">
        <vue-lottie-player
          width="300px"
          height="250px"
          loop
          path="https://assets6.lottiefiles.com/packages/lf20_akvycwlq.json"
        />
        <div class="text-sm text-gray-400">
          {{ $t('review.welcome') }}
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref } from "#imports";
import {useI18n} from "vue-i18n";

interface SratingScore {
  score: number
  name: string
  key: string
}

const poits = ref<SratingScore[]>([
  {
    score: 5,
    name: 'Thi???t K??? ??a Nh??n',
    key: 'design',
  },
  {
    score: 5,
    name: 'T???c ????? Ph??t Tri???n',
    key: 'speed',
  },
  {
    score: 5,
    name: 'T??i Li???u H?????ng D???n',
    key: 'document',
  },
  {
    score: 5,
    name: 'T???m Nh??n D??? ??n',
    key: 'vision',
  }
])
</script>

<style scoped>

</style>
