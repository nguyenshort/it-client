<template>
  <div>
    <div class="h-[180px] flex border-b">
      <div class="mt-auto mb-10 w-full">
        <h1 class="font-semibold text-[30px]">Tìm Kiếm</h1>

        <search-filters />
      </div>
    </div>

    <div class="flex mt-8">
      <div class="w-1/4">
        <div class="w-full">
          <h4 class="font-semibold text-[18px]">Categories</h4>

          <search-categories />
        </div>
      </div>

      <div class="w-3/4">
        <div class="w-full">
          <h4 class="font-semibold text-[18px] mb-5">
            Kết Quả
            <client-only>
              <search-count />
            </client-only>
          </h4>

          <search-results />

          <div class="h-10"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, provide } from '#imports'
import { GetProjectsFilter } from '~/apollo/__generated__/serverTypes'

provide(
  'searchFilter',
  reactive<GetProjectsFilter>({
    offset: 0,
    limit: 9,
    sort: 'name',
    category: '',
    name: '',
    status: null
  })
)
</script>

<style scoped></style>
