<template>
  <button
      class="koki-btn"
      :class="[type, size, [block ? 'block' : '']]"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
type Props = {
  type?: 'primary' | string
  size?: 'small' | 'normal' | 'big'
  block?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'normal'
})

</script>

<style scoped lang="scss">
.koki-btn {
  @apply flex items-center justify-center rounded-full px-3 py-2.5 uppercase text-white shadow-lg;
  &.primary {
    @apply bg-gradient-to-r from-primary-500 to-primary-700 shadow-primary-200;
  }
  &.block {
    @apply w-full;
  }
}
</style>
