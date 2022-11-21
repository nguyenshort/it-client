<template>
  <div class="flex flex-wrap -mx-1.5 -mb-1.5">
    <div
      v-for="(role, index2) in roles.slice(0, 5)"
      :key="index2"
      class="w-2/12 px-1.5 pb-1.5 text-center transition hover:scale-105"
    >
      <button
        class="w-full"
        @click.prevent.stop="$modal().open('proposal', { role: role, project })"
      >
        <div
          class="w-full aspect-1 rounded-full border border-dashed flex items-center justify-center text-gray-400"
        >
          <Icon name="material-symbols:add" />
        </div>
        <h4 class="text-[10px] mt-0.5">{{ role.name }}</h4>
      </button>
    </div>

    <button
      v-if="roles.length > 6"
      class="w-2/12 px-1.5 pb-1.5 text-center transition hover:scale-105"
    >
      <div
        class="w-full aspect-1 rounded-full border border-dashed flex items-center justify-center text-white bg-primary-600"
      >
        <span>
          <span>+</span>
          <span class="text-[12px]">{{ roles.length - 5 }}</span>
        </span>
      </div>
      <h4 class="text-[10px] mt-0.5 opacity-0">x</h4>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ProjectItemDoc_roles } from '~/apollo/shinzo/queries/__generated__/ProjectItemDoc'
import { computed } from '#imports'

const props = withDefaults(
  defineProps<{
    roles: ProjectItemDoc_roles[]
    maxRoles?: number
    project?: string
  }>(),
  {
    maxRoles: 6
  }
)
</script>

<style scoped></style>
