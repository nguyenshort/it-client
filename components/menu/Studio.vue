<template>
  <button
    class="ml-6 text-[12px] w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg shadow-primary-200 py-2 px-4 flex items-center"
  >
    <Icon name="ic:sharp-plus" class="text-[18px] mr-0.5" />
    <span class="font-semibold text-[14px]">New Project</span>
  </button>
</template>

<script lang="ts" setup>
const openStudio = () => {
  window.open('https://studio.enlightenyourcapital.com/', '_blank')
}
</script>

<style scoped></style>
