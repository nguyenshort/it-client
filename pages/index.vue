<template>
  <div class="text-red-500">
    <lazy-home-banner />
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
