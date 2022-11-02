<template>
  <div
      class="text-gray-600 min-h-screen bg-gray-50"
  >
    <lazy-includes-header />
    <div class='w-full mx-auto min-h-[52vh] max-w-bootstrap px-4'>
      <nuxt-page />
    </div>
    <lazy-includes-footer />
    <lazy-modal-auth />
    <lazy-includes-spotlight />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
