<template>
  <div class="relative h-[35px] group-avatar" :class="style">
    <button
      v-for="(avatar, index) in shows"
      :key="index"
      :style="{
        transform: transformX(index),
        zIndex: index
      }"
    >
      <img :src="avatar" alt="" />
    </button>

    <button
      v-if="hasMini"
      class="more-avatar"
      :style="{
        zIndex: shows.length,
        transform: transformX(shows.length),
      }"
    >
      <span>+{{ avatars.length - shows.length }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from '#imports'

const props = withDefaults(
  defineProps<{
    avatars: string[]
    max?: number
    size?: 'small' | 'normal' | 'big'
    scale?: number
  }>(),
  {
    max: 4,
    size: 'small',
    scale: 20
  }
)

const shows = computed(() => props.avatars.slice(0, props.max))
const hasMini = computed(() => props.avatars.length > props.max)
const totalCount = computed<number>(()=> hasMini.value ? shows.value.length + 1 : shows.value.length)

const style = computed(() => [`_size-${props.size}`, [hasMini ? '_mini' : '']])

const maxWidth = computed(
  () => {

    let rate = 0
    switch (props.size) {
      case "big":
        break
      case "normal":
        rate = 35
        break
      case "small":
        rate = 35
        break
    }
    const totalSize = totalCount.value * rate
    const stackSize = totalSize - (rate - props.scale - 3) * totalCount.value

    return `${stackSize}px`
  }
)

const transformX = (index: number) => `translateX(${index * props.scale}px)`
</script>

<style scoped lang="scss">
.group-avatar {
  width: v-bind(maxWidth);
  &._size-small {
    height: 35px;
  }
  > button {
    @apply absolute top-0 left-0 h-full aspect-1 overflow-hidden rounded-full border-2 border-white;
    > img {
      @apply h-full w-full transform object-cover transition hover:scale-105;
    }
    &.more-avatar {
      @apply bg-primary-100 flex items-center justify-center;
      > span {
        @apply text-primary-500 font-semibold text-[12px] transform -translate-x-0.5;
      }
    }
  }
}
</style>
