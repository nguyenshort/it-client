<template>
  <menu-wrapper :title="$t('menu.studio')" icon="uil:visual-studio" @click="openStudio"></menu-wrapper>
</template>

<script lang="ts" setup>
const openStudio = () => {
  window.open('https://studio.enlightenyourcapital.com/', '_blank')
}
</script>

<style scoped></style>
