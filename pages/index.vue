<template>
  <div>
    <div class='h-7'></div>
    <lazy-home-banner />
    <div class='h-7'></div>
    <lazy-home-broad />
    <div class='h-7'></div>
    <client-only>
      <lazy-home-running />
    </client-only>
    <div class='h-7'></div>
    <lazy-home-done />
    <div class='h-7'></div>
    <lazy-home-show-case />
  </div>
</template>

<script lang="ts" setup>
import {useAsyncQuery, useKoki, useNuxtApp} from "#imports"

const kokiApp = useKoki()

const query = gql`
  query getShips($limit: Int!) {
    ships(limit: $limit) {
      id
      name
    }
  }
`
const variables = { limit: 5 }
const { data } = await useAsyncQuery(query, variables)
const { $hello } = useNuxtApp()
</script>

<style scoped></style>
