<template>
  <router-link
    :to="$link().product(project)"
    class="rounded-lg overflow-hidden bg-white shadow-default project-item block transition duration-300 hover:shadow-none"
  >
    <div
      class="w-full aspect-w-12 aspect-h-7 overflow-hidden relative project-avatar"
    >
      <div
        class="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-transparent via-transparent to-slate-900 z-20"
      >
        <div class="relative w-full h-full">
          <div
            class="flex justify-around text-white absolute bottom-3 left-0 right-0"
          >
            <button v-if="project.bookmarks" class="flex items-center">
              <Icon name="bx:bxs-like" />
              <span class="mb-0 text-xs relative top-0.5 ml-1">
                {{ project.bookmarks }}
              </span>
            </button>

            <button v-if="project.comments" class="flex items-center">
              <Icon name="ion:chatbubble-ellipses" />
              <span class="mb-0 text-xs relative top-0.5 ml-1">
                {{ project.comments }}
              </span>
            </button>

            <button v-if="false" class="flex items-center">
              <Icon name="ion:share-social-sharp" />
            </button>
          </div>
          <button
            class="absolute top-3 right-2 text-white opacity-0 transition more-button"
          >
            <Icon name="mdi:dots-vertical" />
          </button>

          <button
            class="absolute top-3 left-2 text-white opacity-0 transition scale-0 like-button text-xl"
          >
            <Icon name="material-symbols:bookmark-add-rounded" />
          </button>
        </div>
      </div>
      <img
        class="transition transform absolute w-full h-full z-10 top-0 left-0 object-cover cover"
        :src="$cdn(project.cover)"
        alt=""
      />
    </div>
    <div class="px-3 py-4">
      <div class="flex items-center">
        <div
          class="w-10 h-10 flex-shrink-0 border border-white shadow-md rounded-full overflow-hidden"
        >
          <img alt="" :src="$cdn(owner.avatar)" class="w-full h-full" />
        </div>
        <h4 class="mx-3 font-semibold w-full mb-0 text-[14px]">
          {{ project.name }}
        </h4>
      </div>

      <lazy-roles-hiring-grid
        v-if="project.roles.length"
        :roles="project.roles"
        :project="project.id"
        class="mt-4"
      />

      <div v-else class="text-sm text-gray-500 mt-3 mb-2 line-clamp-3">
        {{ project.content }}
      </div>

      <div class="mt-1.5 flex items-center justify-between">
        <button
          v-if="!roles.length"
          class="text-white bg-green-500 text-xs px-2 py-0.5 rounded-lg shadow-md shadow-green-300"
        >
          <span>{{ $t('general.waiting') }}...</span>
        </button>

        <button
          v-else-if="roles.length === filledRoles.length"
          class="text-white bg-indigo-500 text-xs px-2 py-0.5 rounded-lg shadow-md shadow-indio-300"
        >
          <span>
            {{ $('general.full') }}
          </span>
        </button>

        <button
          v-else
          class="text-white bg-primary-500 text-xs px-2 py-0.5 rounded-lg shadow-md shadow-primary-300"
        >
          <span>{{ filledRoles.length }} / {{ roles.length }}</span>
        </button>

        <span class="text-xs text-gray-500">
          {{ category.name }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from '#imports'
import { ProjectItemDoc } from '~/apollo/shinzo/queries/__generated__/ProjectItemDoc'

const props = defineProps<{
  project: ProjectItemDoc
}>()

const roles = computed(() => props.project.roles)
const filledRoles = computed(() => roles.value.filter((role) => role.user))

const owner = computed(() => props.project.owner)
const category = computed(() => props.project.category)
</script>

<style scoped lang="scss">
.project-item {
  &:hover {
    .more-button {
      opacity: 1;
    }
    .like-button {
      @apply scale-100 opacity-100;
    }
  }
}

.project-avatar:hover {
  .cover {
    @apply scale-110;
  }
}
</style>
