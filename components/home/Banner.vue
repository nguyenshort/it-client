<template>
  <div ref="target" class="relative h-[400px] overflow-hidden rounded-lg">
    <img
        class="relative z-0 h-full w-full rounded-lg object-cover"
        src="/images/banner/bg.png"
        alt=""
    />

    <div
        class="absolute top-1/2 left-0 z-10 h-4/5 w-1/2 translate-x-24 -translate-y-1/2 transform"
    >
      <div class="relative h-full w-full">
        <img
            class="absolute top-0 left-0 z-0 h-full w-auto object-cover"
            :style="buildLayerStyle(1)"
            src="/images/banner/eart.png"
            alt=""
        />
        <img
            class="absolute top-0 left-0 z-10 h-full w-auto object-cover"
            :style="buildLayerStyle(2)"
            src="/images/banner/user.png"
            alt=""
        />
        <img
            class="absolute top-0 left-0 z-10 h-auto w-full object-cover"
            :style="buildLayerStyle(3)"
            src="/images/banner/tool.png"
            alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CSSProperties } from 'vue'
import {reactive, ref, useParallax} from "#imports";

const target = ref<HTMLDivElement>()
const parallax = reactive(useParallax(target))

const buildLayerStyle = (index: number): CSSProperties => {
  return {
    transform: `translateX(${parallax.tilt * 10 * index}px) translateY(${
        parallax.roll * 10 * index
    }px)`
  }
}
</script>

<style scoped></style>
