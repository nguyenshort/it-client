<template>
  <lazy-template-session title="Running Project">
    <div class="h-[525px]">
      <swiper
        :slides-per-view="3"
        :grid="{
          rows: 2
        }"
        :space-between="20"
        :pagination="{
          clickable: true
        }"
        :modules="[Grid]"
      >
        <swiper-slide v-for="index in 10" :key="index">
          <div
            class="w-full h-full bg-white overflow-hidden rounded-lg bg-white p-5"
          >
            <div class="flex justify-between">
              <div>
                <h2 class="font-semibold text-[16px]">Design UI Todo App</h2>
                <h5 class="text-[12px] font-semibold text-gray-500 mt-1">
                  Friday, 08 Junly 2022
                </h5>
              </div>

              <a
                href="javascript:void(0)"
                class="block w-[35px] aspect-1 overflow-hidden flex-shrink-0"
              >
                <img
                  class="w-full h-full object-contain"
                  src="/images/done/kdn.png"
                  alt=""
                />
              </a>
            </div>

            <div class="bg-primary-200 relative h-[4px] w-full rounded-full overflow-hidden my-5">
              <div
                class="absolute h-full w-full bg-primary-500"
                :style="{
                  maxWidth: '60%'
                }"
              ></div>
            </div>

            <div class="text-[14px] font-semibold">Description:</div>
            <p class="mt-1.5 text-[14px] line-clamp-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus aliquam ducimus earum excepturi iure libero natus optio
              quisquam recusandae, temporibus. Consequatur, eligendi vel.
              Accusamus aspernatur cupiditate doloremque, illum ipsum qui?
            </p>

            <div class="mt-2.5 text-[14px] font-semibold">Teams:</div>

            <div class="flex mt-2.5 justify-between">
              <lazy-includes-group-avatar
                :avatars="Array(10).fill('/images/avatar.jpeg')"
              />

              <button class="flex items-center text-gray-500">
                <i-ep-flag class="text-[12px]" />
                <span class="ml-1 text-[12px]">Jan 14</span>
              </button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </lazy-template-session>
</template>

<script lang="ts" setup>
import { Grid } from 'swiper'
import 'swiper/css/grid'
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  height: calc((100% - 20px) / 2) !important;
}
</style>
