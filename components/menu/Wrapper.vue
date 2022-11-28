<template>
  <div class="menu-item">
    <slot name="title"></slot>

    <button v-if="!$slots['title']" class="flex items-center" @click="emit('click')">
      <Icon :name="icon" class="text-[23px]" />
      <h5 class="mb-0 text-current font-semibold ml-2 text-[15px]">
        {{ title }}
      </h5>
    </button>

    <div v-if="$slots['submenu']" class="absolute _sub-menu-wrapper cursor-pointer">
      <div class="relative">
        <div class="bg-[#18181b] text-white rounded-lg overflow-hidden relative _sub-menu-content">
          <slot name="submenu"></slot>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  icon?: string
  title?: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped lang="scss">

.menu-item {
  ._sub-menu-wrapper {
    @apply top-full transform -translate-x-2 pt-4 invisible;

    >div {
      @apply transition duration-300 transform -translate-x-3 opacity-0;
      &:before {
        @apply absolute;
        content: '';
        bottom: 100%;
        left: 14px;
        border-bottom: 7px solid #18181b;
        border-left: 6px dashed transparent;
        border-right: 6px dashed transparent;
        height: 0;
        width: 0;
      }
    }
  }

  &:hover {
    ._sub-menu-wrapper {
      @apply visible;
      >div {
        @apply translate-x-0 opacity-100 visible;
      }
    }
  }
}
</style>
