<template>
  <div>
    <div class="flex justify-between items-start">
      <h4 class="text-[28px] font-semibold capitalize mt-3 mb-4 text-gray-800">
        {{ project.name }}
      </h4>

      <button
        class="w-10 h-10 bg-rose-500 rounded-lg shadow-md shadow-rose-200 text-white flex items-center justify-center text-[20px] cursor-pointer transition transform hover:scale-105 hover:shadow-none"
        :disabled="loading"
        @click="$authFunc(() => mutate({ input: { project: project.id } }))"
      >
        <Icon v-if="loading" name="eos-icons:loading" />
        <Icon v-else-if="isBookmarked" name="material-symbols:check-small" />
        <Icon v-else name="material-symbols:bookmark-add" />
      </button>
    </div>

    <div class="mt-3">
      <ul class="flex font-semibold">
        <li class="mr-4">
          <a class="text-rose-500">#{{ project.category.name }}</a>
        </li>

        <li
          v-for="(item, index) in project.technologies"
          :key="index"
          class="mr-4"
        >
          <a class="text-primary-500">#{{ item.name }}</a>
        </li>
      </ul>
    </div>

    <div
      class="prose mt-3 text-gray-500 w-full font-semibold"
      v-html="project.content"
    />
    <div class="flex mt-4">
      <div class="flex items-center">
        <button
          v-if="project.files.length"
          class="text-gray-500 bg-gray-100 flex items-center px-3 py-1.5 transition hover:bg-primary hover:text-white hover:shadow hover:shadow-primary-300 rounded-l-lg"
          @click="$modal().open('enclose', { id: project.id, slug: project.slug })"
        >
          <Icon name="ion:document-text" class="text-[16px]" />
          <span class="text-[12px] ml-1"
            >{{ project.files.length }} {{ $t('general.enclose') }}</span
          >
        </button>
        <span v-if="project.files.length" class="h-full w-px bg-gray-200"></span>
        <button class="text-gray-500 bg-gray-100 flex items-center px-3 py-1.5 transition hover:bg-primary hover:text-white hover:shadow hover:shadow-primary-300 rounded-r-lg">
          <Icon name="ic:baseline-remove-red-eye" class="text-[16px]" />
          <span class="text-[12px] ml-1">34350 {{ $t('general.views') }}</span>
        </button>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { GetProject_project } from '~/apollo/shinzo/queries/__generated__/GetProject'
import {
  useAppStore,
  useMutation,
  useQuery,
  computed,
} from '#imports'
import { BOOKMARK_PROJECT } from '~/apollo/shinzo/mutates/bookmark.mutate'
import {
  ToogleBookmark,
  ToogleBookmarkVariables
} from '~/apollo/shinzo/mutates/__generated__/ToogleBookmark'
import { CHECK_BOOKMARK } from '~/apollo/shinzo/queries/bookmark.query'
import {
  CheckBookmark,
  CheckBookmarkVariables
} from '~/apollo/shinzo/queries/__generated__/CheckBookmark'

const props = defineProps<{
  project: GetProject_project
}>()

const app = useAppStore()

const { result, refetch } = useQuery<CheckBookmark, CheckBookmarkVariables>(
  CHECK_BOOKMARK,
  {
    filter: {
      project: props.project.id
    }
  },
  { fetchPolicy: 'network-only', enabled: app.auth }
)

const isBookmarked = computed(() => result.value?.bookmark)

const { mutate, loading, onDone } = useMutation<
  ToogleBookmark,
  ToogleBookmarkVariables
>(BOOKMARK_PROJECT)

onDone(() =>
  refetch()
  // nextTick(() => {
  //   if (isBookmarked) {
  //     $apollo.defaultClient.cache.evict({
  //       id: `Bookmark:${isBookmarked.value?.id}`
  //     })
  //   } else if (val.data?.toggleBookmark) {
  //     $apollo.defaultClient.writeQuery({
  //       query: CHECK_BOOKMARK,
  //       variables: {
  //         filter: {
  //           project: props.project.id
  //         }
  //       },
  //       data: {
  //         bookmark: val.data.toggleBookmark
  //       }
  //     })
  //   }
  // })
)
</script>

<style scoped></style>
