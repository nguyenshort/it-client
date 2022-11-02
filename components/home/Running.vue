<template>
  <lazy-template-session title="Running Project">
    <grid-layout
      v-model:layout="layout"
      class="m-[-10px]"
      :responsive-layouts="layout"
      :cols="cols"
      :col-num="24"
      :row-height="30"
      :vertical-compact="true"
      :use-css-transforms="true"
      :responsive="true"
      :is-draggable="false"
      :is-resizable="false"
    >
      <grid-item
        v-for="(item, index) in layout"
        :key="index"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <component :is="item.component === 'RunningVertical' ? RunningVertical : RunningHorizontal" />
      </grid-item>
    </grid-layout>
  </lazy-template-session>
</template>

<script lang="ts" setup>
import { ref } from "#imports";
import RunningVertical from '../template/RunningVertical.vue'
import RunningHorizontal from '../template/RunningHorizontal.vue'


interface GridItem {
  x: number
  y: number
  w: number
  h: number
  i: string
  component: any
}

const cols = { lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 }

const layout = ref<GridItem[]>([
  { x: 0, y: 0, w: 5, h: 10, i: '0', component: 'RunningVertical' },
  { x: 5, y: 0, w: 6, h: 5, i: '1', component: 'RunningHorizontal' },
  { x: 12, y: 0, w: 9, h: 5, i: '2', component: 'RunningHorizontal' },
  { x: 5, y: 5, w: 10, h: 5, i: '3', component: 'RunningHorizontal' },
  { x: 15, y: 5, w: 5, h: 10, i: '4', component: 'RunningVertical' },
  { x: 0, y: 10, w: 8, h: 5, i: '5', component: 'RunningHorizontal' },
  { x: 8, y: 10, w: 7, h: 5, i: '6', component: 'RunningHorizontal' },
])
</script>

<style scoped></style>
