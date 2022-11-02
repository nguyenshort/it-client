<template>
  <lazy-template-session title="Running Project">
    <div class="h-[510px]">
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
          <div class="w-full h-full bg-white border-b border-primary-500 border-b-[5px] overflow-hidden rounded-lg bg-white p-5">

            <div class="flex pb-5 border-b border-gray-200 justify-between">
              <div>
                <h2 class="font-semibold text-[16px]">Design UI Todo App</h2>
                <h5 class="text-[12px] font-semibold text-gray-500 mt-1">Friday, 08 Junly 2022</h5>
              </div>

              <a
                href="javascript:void(0)"
                class="block w-[35px] aspect-1 overflow-hidden flex-shrink-0"
              >
                <img class="w-full h-full object-contain" src="/images/done/kdn.png" alt=""/>
              </a>

            </div>

            <div class="mt-2.5 text-[14px] font-semibold">Description: </div>
            <p class="mt-1.5 text-[14px] line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam ducimus earum excepturi iure libero natus optio quisquam recusandae, temporibus. Consequatur, eligendi vel. Accusamus aspernatur cupiditate doloremque, illum ipsum qui?</p>

            <div class="mt-2.5 text-[14px] font-semibold">Teams: </div>

            <div class="flex h-[35px] mt-2.5 justify-between">
              <div
                class="relative h-[35px"
                :style='{
                  width: `${4 * 25}px`,
                }'
              >
                <button
                  v-for="index4 in 3"
                  :key="index4"
                  class="absolute top-0 left-0 h-[35px] w-[35px] overflow-hidden rounded-full border-2 border-white"
                  :style="{
                  transform: 'translateX(' + (index4 - 1) * 25 + 'px)',
                  zIndex: index4
                }"
                >
                  <img
                    class="h-full w-full transform object-cover transition hover:scale-105"
                    src="/images/avatar.jpeg"
                    alt=""
                  />
                </button>
              </div>

              <button class='flex items-center text-gray-500'>
                <i-ep-flag class='text-[12px]' />
                <span class='ml-1 text-[12px]'>Jan 14</span>
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
