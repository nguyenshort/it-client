<template>

  <dev-only>{{ filter }}</dev-only>

  <div class="-m-4 flex flex-wrap w-full">
    <div v-for="index in 10" :key="index" class="w-1/3 p-4">
      <search-item />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UnwrapNestedRefs } from "@vue/reactivity";
import { GetProjectsFilter } from "~/apollo/__generated__/serverTypes";
import { inject } from "#imports";

const filter: UnwrapNestedRefs<GetProjectsFilter> = inject('searchFilter')!
</script>

<style scoped></style>
