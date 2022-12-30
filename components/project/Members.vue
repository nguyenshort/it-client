<template>
  <div>
    <h3 class="text-[20px] font-semibold text-gray-700 mb-0">
      {{ $t('general.members') }}
      <span class="text-[14px] text-gray-500">
        ({{ project.roles.length + 1 }})
      </span>
    </h3>

    <div class="mt-3">
      <div
        v-for="(role, index) in filledRoles.slice(0, 5)"
        :key="index"
        class="flex items-center mb-5"
      >
        <div
          class="w-12 h-12 rounded-full overflow-hidden shadow-default border border-white"
        >
          <img class="w-full h-full object-cover" :src="role.user?.avatar" alt="" />
        </div>

        <div class="ml-3">
          <h4 class="font-semibold text-gray-700 mb-px text-[15px]">
            {{ role.user?.name }}
          </h4>
          <span
            class="bg-rose-500 px-2 py-px rounded-full text-white text-[10px] font-semibold"
          >
        {{ role.name }}
      </span>
        </div>
      </div>

    </div>

    <div
      v-if="positions.length"
      class="mt-4"
    >
      <div class="flex flex-wrap -mx-1.5 -mb-1.5">
        <includes-role-avatar
          v-for="(roles2, index) in positions.slice(0, 5)"
          :key="index"
          class="w-2/12"
          :roles="roles2"
          @click="$modal().open('proposal', { project: project.slug, role: roles2 })"
        ></includes-role-avatar>

        <button
          v-if="positions.length > 6"
          class="w-2/12 px-1.5 pb-1.5 text-center transition hover:scale-105"
        >
          <div
            class="w-full aspect-1 rounded-full border border-dashed flex items-center justify-center text-white bg-primary-600"
          >
            <Icon name="ic:round-zoom-out-map" />
          </div>
          <h4 class="text-[10px] mt-0.5 opacity-0">x</h4>
        </button>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { GetProject_project } from '~/apollo/shinzo/queries/__generated__/GetProject'
import { computed, useQuery } from '#imports'
import { GET_PROJECT_MEMBERS } from "~/apollo/shinzo/queries/project.query";
import {
  GetProjectMembers,
  GetProjectMembers_project_roles,
  GetProjectMembersVariables
} from "~/apollo/shinzo/queries/__generated__/GetProjectMembers";

const props = defineProps<{
  project: GetProject_project
}>()

const { result } = useQuery<GetProjectMembers, GetProjectMembersVariables>(GET_PROJECT_MEMBERS, {
  project: props.project.slug
})

const members = computed(() => result.value?.project ? [{
  id: '1',
  user: result.value?.project.owner,
  group: 1,
  name: 'Owner',
}, ...result.value!.project.roles ] : [])

const filledRoles = computed(() =>
  members.value.filter((role) => role.user)
)

// empty array
const positions = computed(() => {
  const groups = members.value.filter((role) => !role.user).reduce((acc, role) => {
    const key = Number(role.group) || 0
    if (!acc[key]) acc[key] = [];
    acc[key].push(role);
    return acc;
  }, {} as Record<number, Omit<GetProjectMembers_project_roles, "__typename">[]>);

  return Object.values(groups);
});
</script>

<style scoped>
.role.owner {
}
</style>
