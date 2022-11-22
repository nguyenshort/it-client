<template>
  <div :class="[notify.error ? 'error' : 'success']">
    {{ notify.msg }}
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, useCurrentElement } from '#imports'
import { SubNotify_subNotify } from '~/apollo/shinzo/subscriptions/__generated__/SubNotify'

const props = defineProps<{
  notify: Pick<SubNotify_subNotify, 'msg' | 'error'>
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const el = useCurrentElement()
onMounted(() =>
  nextTick(() => {
    setTimeout(() => {
      el.value.classList.add('show')

      setTimeout(() => {
        el.value.classList.remove('show')
        setTimeout(() => {
          emit('close')
        }, 300)
      }, 3000)
    }, 100)
  })
)
</script>

<style scoped lang="scss">
div {
  @apply px-6 py-4;
  @apply bg-gradient-to-r shadow-lg;
  @apply rounded-lg overflow-hidden;
  @apply transform transition duration-300 opacity-0 -translate-y-4;

  &.success {
    @apply from-primary-500 to-primary-600 shadow-primary-400;
  }

  &.error {
    @apply from-rose-500 to-rose-600 shadow-rose-400;
  }

  &.show {
    @apply opacity-100 translate-y-0;
  }
}
</style>
