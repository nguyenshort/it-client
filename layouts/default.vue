<template>
  <div
      class="text-gray-600 min-h-screen"
      :class="{
        'bg-gray-50': $route.path === '/'
      }"
  >
    <lazy-includes-header />
    <div class='w-full mx-auto min-h-[52vh] max-w-bootstrap px-4'>
      <nuxt-page />
    </div>
    <lazy-includes-footer />

    <client-only>
      <lazy-includes-spotlight />
      <lazy-modal-auth />
      <lazy-modal-setting />
      <lazy-modal-submit-resume />
      <lazy-includes-notify-wrapper v-if="appStore.auth" />
    </client-only>

  </div>
</template>

<script lang="ts" setup>
import {useAppStore} from "#imports";

const appStore = useAppStore()
</script>

<style scoped></style>
