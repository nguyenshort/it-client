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
            v-if="project.enterprise"
            class="absolute top-3 left-0 text-white transition bg-gradient-to-r from-primary-500 to-primary-600 more-button px-3 py-0.5 rounded-r-lg shadow-md shadow-primary-300 font-semibold text-[13px]"
          >
            Enterprise
          </button>

          <button
            class="absolute top-3 right-2 text-white opacity-0 transition more-button text-[22px]"
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
        <h4 class="mx-3 font-semibold w-full mb-0 text-[14px] line-clamp-1">
          {{ project.name }}
        </h4>
      </div>

      <div
        v-if="project.roles.length"
        class="mt-4"
      >
        <div class="flex flex-wrap -mx-1.5 -mb-1.5">
          <includes-role-avatar
            v-for="(roles2, index) in positions.slice(0, 5)"
            :key="index"
            class="w-2/12"
            :roles="roles2"
            @click.prevent.stop="$authFunc( () => $modal().open('proposal', { project: project.slug, role: roles2 }))"
          ></includes-role-avatar>

          <button
            v-if="roles.length > 6"
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

      <div v-else class="text-sm text-gray-500 mt-3 mb-2 line-clamp-3" v-html="project.content"></div>

      <div class="mt-1.5 flex items-center justify-between">
        <button
          v-if="!roles.length"
          class="text-white bg-green-500 text-xs px-2 py-0.5 rounded-lg shadow-md shadow-green-300 transition hover:scale-105"
        >
          <span>{{ $t("general.waiting") }}...</span>
        </button>

        <button
          v-else-if="roles.length === filledRoles.length"
          class="text-white bg-indigo-500 text-xs px-2 py-0.5 rounded-lg shadow-md shadow-indio-300 transition hover:scale-105"
        >
          <span>
            {{ $("general.full") }}
          </span>
        </button>

        <button
          v-else
          class="text-white bg-primary-500 text-xs px-2 py-0.5 rounded-lg shadow-md shadow-primary-300 transition hover:scale-105"
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
import { computed } from "#imports";
import { ProjectItemDoc } from "~/apollo/shinzo/queries/__generated__/ProjectItemDoc";

const props = defineProps<{
  project: ProjectItemDoc
}>();

const roles = computed(() => props.project.roles)
const filledRoles = computed(() => roles.value.filter((role) => role.user))

const positions = computed(() => {
  const groups = roles.value.reduce((acc, role) => {
    const key = role.group || 0;
    if (!acc[key]) acc[key] = [];
    acc[key].push(role);
    return acc;
  }, {} as Record<number, ProjectItemDoc["roles"]>);

  return Object.values(groups);
});

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
