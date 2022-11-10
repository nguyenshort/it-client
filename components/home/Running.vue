<template>
  <lazy-template-session title="Running Project">
    <div class="flex flex-wrap -mx-3 -mb-7">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class='w-1/3 px-3 pb-7'
      >
        <div class="w-full h-full bg-white overflow-hidden rounded-lg bg-white p-5">
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
            class="bg-primary-200 relative h-[4px] w-full rounded-full overflow-hidden my-5"
          >
            <div
              class="absolute h-full w-full bg-primary-500"
              :style="{
                  maxWidth: '60%'
                }"
            ></div>
          </div>

          <div class="text-[14px] font-semibold">Description:</div>
          <p class="mt-1.5 text-[14px] line-clamp-2">
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
      </div>
    </div>
  </lazy-template-session>
</template>

<script lang="ts" setup>
import { computed, reactive, useAsyncQuery, useNuxtApp } from "#imports";
import { ProjectStatus } from "~/__generated__/shinzoTypes";
import { GET_HOME_RUNNING } from "~/apollo/shinzo/queries/coupon.query";
import { GetHomeRunning, GetHomeRunningVariables } from "~/apollo/shinzo/queries/__generated__/GetHomeRunning"

const { $dayjs } = useNuxtApp()

const variables = reactive<GetHomeRunningVariables>({
  filter: {
    limit: 6,
    offset: 0,
    sort: 'updatedAt',
    status:ProjectStatus.RUNNING
  }
})
const { data } = await useAsyncQuery<GetHomeRunning>(GET_HOME_RUNNING, variables)
const projects = computed(() => data.value?.projects || [])
</script>
