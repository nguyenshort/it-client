<template>
  <div class="custom-shadow rounded-lg flex overflow-hidden items-center">
    <div class="pl-6 py-5">
      <nuxt-link
        :to="$link().product(project)"
        class="block w-[35px] aspect-1 overflow-hidden flex-shrink-0"
      >
        <img
          class="w-full h-full object-contain"
          :src="$cdn(project.logo)"
          alt=""
        />
      </nuxt-link>
    </div>

    <div class="px-6 py-5 flex flex-col">
      <nuxt-link :to="$link().product(project)">
        <h2 class="text-[15px] font-semibold text-gray-700 mb-0">
          {{ project.name }}
        </h2>
      </nuxt-link>

      <div class="mt-1 flex items-center">
        <a
          v-if="project.link"
          :href="project.link"
          target="_blank"
          class="flex items-center text-sm"
        >
          <span>
            <i-ph-link-simple-fill />
          </span>
          <span class="ml-1">{{ project.link }}</span>
        </a>

        <span
          v-if="project.link"
          class="h-[15px] w-px bg-gray-200 block mx-3"
        ></span>

        <div class="flex items-center text-xs text-gray-500">
          <span>
            <i-iconoir-chat-bubble />
          </span>
          <span class="ml-1 relative mt-0.5">
            {{ project.comments }} bình luận
          </span>
        </div>

        <span class="h-[15px] w-px bg-gray-200 block mx-3"></span>

        <div class="flex items-center text-xs text-gray-500">
          <span>
            <i-octicon-issue-draft-16 />
          </span>
          <span class="ml-1 relative mt-0.5">
            {{ project.bookmarks }} issues
          </span>
        </div>
      </div>
    </div>

    <div class="ml-2 px-6 py-5 flex flex-col">
      <h2 class="text-[13px] font-semibold text-gray-700 mb-0">Bắt Đầu</h2>

      <div class="mt-1 flex items-center text-gray-500 text-xs">
        <div class="flex items-center">
          <span>
            <i-mdi-clock-outline />
          </span>
          <span class="ml-1">
            {{ $dayjs(project.estimate[0]).format('DD/MM/YYYY') }}
          </span>
        </div>
      </div>
    </div>

    <div class="ml-2 px-6 py-5 flex flex-col mr-auto">
      <h2 class="text-[13px] font-semibold text-gray-700 mb-0">Kết Thúc</h2>

      <div class="mt-1 flex items-center text-gray-500 text-xs">
        <div class="flex items-center">
          <span>
            <i-ant-design-flag-outlined />
          </span>
          <span class="ml-1">
            {{ $dayjs(project.estimate[1]).format('DD/MM/YYYY') }}
          </span>
        </div>
      </div>
    </div>

    <lazy-includes-group-avatar v-if="filledRoles.length" :avatars="filledRoles.map((e) => e.user.avatar)" />

    <button
      class="flex items-center mr-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-3 py-2 rounded-full shadow-lg shadow-primary-200"
    >
      <span class="text-xs font-semibold mr-1">Đánh Giá</span>
      <i-material-symbols-arrow-circle-right />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ProjectDoneDoc } from '~/apollo/shinzo/queries/__generated__/ProjectDoneDoc'
import {computed} from "#imports";

const props = defineProps<{
  project: ProjectDoneDoc
}>()

const roles = computed(() => props.project.roles)
const filledRoles = computed(() => roles.value.filter((role) => role.user))
</script>

<style scoped></style>
