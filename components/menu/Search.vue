<template>
  <div class="flex h-full w-full justify-end py-3.5">
    <form
        class="h-full w-[280px]"
        action="/search"
        @click="$modal().open('spotlight')"
    >
      <div
          class="flex h-full w-full cursor-pointer items-center rounded-full border pl-4 transition hover:border-primary-500 hover:bg-primary-50 hover:text-primary-500 focus:outline-0 text-gray-500"
      >
        <Icon name="ri:search-2-line" class="flex-shrink-0 text-current text-[16px]" />
        <span class="ml-2 text-current">Tìm kiếm...</span>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped></style>
