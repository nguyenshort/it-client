<template>
  <div
    class="rounded-full overflow-hidden border border-dashed flex items-center justify-center text-gray-400"
    @click="$modal().open('proposal', { current, roles })"
  >
    <Icon name="material-symbols:add" />
  </div>
</template>

<script lang="ts" setup>
import { RoleDoc } from '~/apollo/shinzo/queries/__generated__/RoleDoc'

const props = defineProps<{
  current: RoleDoc
  roles: RoleDoc[]
}>()
</script>

<style scoped></style>
