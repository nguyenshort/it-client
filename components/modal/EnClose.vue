<template>
  <lazy-modal-base event="enclose" title="Enclose" @init="open($event)">
    <div>

      <div
        v-for="(file, index) in files"
        :key="index"
        class="py-3.5 cursor-pointer hover:text-primary hover:font-semibold"
        @click="downloadFile(file.name)"
      >
        <div class="flex items-center">
          <img :src='file.icon' :alt="file.shortName" width="22" />

          <div class="line-clamp-1 text-[14px] ml-1">
            {{ file.shortName }}
          </div>

          <div class="ml-auto text-[20px] text-gray-500 pl-8">
            <Icon name="material-symbols:download-for-offline-rounded" />
          </div>

        </div>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center">
        <vue-lottie-player
          width="250px"
          height="200px"
          loop
          path="/json/loading.json"
        />
      </div>
    </div>
  </lazy-modal-base>
</template>

<script lang="ts" setup>
import { useQuery, reactive, computed, useNuxtApp } from '#imports'
import { GET_PROJECT_FILES } from "~/apollo/shinzo/queries/project.query";
import { GetProjectFiles, GetProjectFilesVariables } from "~/apollo/shinzo/queries/__generated__/GetProjectFiles"

import {
  getMaterialFileIcon
} from "file-extension-icon-js";

const vars = reactive<GetProjectFilesVariables>({
  project: ''
})

const options = computed(() => ({
  enabled: !!vars.project
}))

const { result, loading } = useQuery<GetProjectFiles, GetProjectFilesVariables>(GET_PROJECT_FILES, vars, options)

const files = computed(() => (result?.value?.project.files || []).map(file => ({
  name: file,
  shortName: file.split('/').pop() || '',
  icon: getMaterialFileIcon(file)
})))

const open = async (payload: { id: string, slug: string }) => {
  vars.project = payload.slug
}

const { $cdn } = useNuxtApp()

const downloadFile = (file: string) => {
  window.open($cdn(file), '_blank')
}

</script>

<style scoped></style>
