<template>
  <div class="text-red-500">
    <i-mdi-clover />
  </div>
</template>

<script lang="ts" setup>
import {useAsyncQuery, useNuxtApp} from "#imports";

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
