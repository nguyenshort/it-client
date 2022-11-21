<template>
  <div>
    <h3 class="text-[20px] font-semibold text-gray-700 mb-0">
      Thành Viên
      <span class="text-[14px] text-gray-500"
        >({{ project.roles.length + 1 }})</span
      >
    </h3>

    <div class="mt-3">
      <lazy-roles-hired :role="adminRole" />

      <lazy-roles-hired
        v-for="(role, index) in filledRoles.slice(0, 5)"
        :key="index"
        :role="role"
      />
    </div>

    <lazy-roles-hiring-grid
        v-if="project.roles.length > 5"
        :roles="emptyRoles"
        :project="project.id"
        class="mt-3"
    />
  </div>
</template>

<script lang="ts" setup>
import { GetProject_project } from '~/apollo/shinzo/queries/__generated__/GetProject'
import { computed } from '#imports'

const props = defineProps<{
  project: GetProject_project
}>()

const filledRoles = computed(() =>
  props.project.roles.filter((role) => role.user)
)

const adminRole = computed(() => ({
  id: 'admin',
  name: 'Owner',
  user: props.project.owner
}))

const emptyRoles = computed(() =>
  props.project.roles.filter((role) => !role.user)
)
</script>

<style scoped>
.role.owner {
}
</style>
