<template>
  <button
    class="theme-btn"
    :class="[type, size, [ghost ? 'ghost' : ''], [block ? 'block' : '']]"
    :disabled="disabled"
  >
    <Icon v-if="icon" :name="icon" class="mr-1 _icon"></Icon>
    <div class="text">
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts" setup>
type Props = {
  type?: 'primary' | 'indigo' | string
  size?: 'small' | 'tini' | 'normal' | 'big'
  icon?: string
  block?: boolean
  disabled?: boolean
  ghost?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'normal',
  disabled: false,
  ghost: false
})
</script>

<style scoped lang="scss">
.theme-btn {
  @apply flex items-center justify-center rounded-full uppercase text-white shadow-lg font-bold;

  &.ghost {
    @apply border-[1.5px];

    &.primary {
      @apply text-primary-500 border-primary-500;
    }
    &.indigo {
      @apply text-indigo-500 border-indigo-500;
    }

    .text {
      @apply font-bold;
    }
  }

  &:not(.ghost) {
    // Màu Sắc
    &.primary {
      @apply bg-gradient-to-r from-primary-500 to-primary-700 shadow-primary-200;
    }
    &.indigo {
      @apply bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-indigo-200;
    }
  }

  &.block {
    @apply w-full;
  }

  // Kích Thước
  &.small {
    @apply text-[10px] px-3 py-1 font-semibold;
    ._icon {
      @apply text-[12px];
    }
  }
  &.tini {
    @apply text-[11px] px-4 py-1.5 font-semibold;
    ._icon {
      @apply text-[11px];
    }
  }
  &.normal {
    @apply text-[12px] px-5 py-2.5;
  }
}

.theme-btn[disabled] {
  @apply cursor-not-allowed opacity-50;
}
</style>
