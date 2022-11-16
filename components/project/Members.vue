<template>
  <div>
    <h3 class="text-[20px] font-semibold text-gray-700 mb-0">
      Thành Viên
      <span class="text-[14px] text-gray-500"
        >({{ project.roles.length + 1 }})</span
      >
    </h3>

    <div class="mt-3">
      <div class="flex items-center mb-4 last:mb-0">
        <div>
          <div
            class="w-12 h-12 rounded-full overflow-hidden cutsom-shadow border border-white"
          >
            <img
              class="w-full h-full object-cover"
              :src="project.owner.avatar"
              alt=""
            />
          </div>
        </div>

        <div class="ml-3">
          <h4 class="font-semibold text-gray-700 mb-px text-[15px]">
            {{ project.owner.name }}
          </h4>
          <span
            class="bg-rose-500 px-2 py-px rounded-full text-white text-[10px] font-semibold"
            >owner</span
          >
        </div>
      </div>

      <div>
        <div v-if="project.roles.length">
          <div
            v-for="member in project.roles.slice(0, 5)"
            :key="member.id"
            class="flex items-center mb-4 last:mb-0"
          >
            <template v-if="member.user">
              <div>
                <div
                  class="w-12 h-12 rounded-full overflow-hidden cutsom-shadow border border-white"
                >
                  <img
                    class="w-full h-full object-cover"
                    :src="member.user.name"
                    alt=""
                  />
                </div>
              </div>

              <div class="ml-3">
                <h4 class="font-semibold text-gray-700 mb-0.5 text-[15px]">
                  {{ member.name }}
                </h4>
                <span
                  class="bg-rose-500 px-2 py-px rounded-full text-white text-[10px] font-semibold"
                  >{{ member.name }}</span
                >
              </div>
            </template>

            <template v-else>
              <div>
                <lazy-template-proposal-button class="w-12 h-12" :current="member" :roles="emptyRoles" />
              </div>

              <div class="ml-3">
                <h4 class="font-semibold text-gray-700 mb-0.5 text-[15px]">
                  {{ member.name }}
                </h4>
                <span
                  class="bg-primary-500 px-2 py-px rounded-full text-white text-[10px] font-semibold"
                  >Hiring</span
                >
              </div>
            </template>
          </div>
        </div>

        <div v-else class="text-center pt-5">
          <div style="width: 300px; height: 250px" class="mx-auto">
            <vue-lottie-player
              width="300px"
              height="250px"
              loop
              path="https://assets4.lottiefiles.com/packages/lf20_ij2ngolf.json"
            />
            <div class="text-sm text-gray-400">
              Chúng tôi sẽ open thành viên sớm nhất có thể.
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="project.roles.length > 5"
        class="flex flex-wrap justify-between mt-5 -mx-1.5 -mb-1.5"
      >
        <button
          v-for="(role, index2) in project.roles.slice(5, 10)"
          :key="index2"
          class="w-12"
        >
          <div
            class="w-12 h-12 rounded-full overflow-hidden cutsom-shadow border border-dashed flex items-center justify-center text-gray-400"
          >
            <i-material-symbols-add />
          </div>
          <h4 class="text-[10px] mt-0.5">{{ role.name }}</h4>
        </button>

        <button v-if="project.roles.length > 10" class="w-12">
          <div
            class="w-12 h-12 rounded-full overflow-hidden cutsom-shadow border border-dashed flex items-center justify-center text-white bg-primary-600"
          >
            <span
              >+<span class="text-[12px]">{{
                project.roles.length - 10
              }}</span></span
            >
          </div>
          <h4 class="text-[10px] mt-0.5 opacity-0">x</h4>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetProject_project } from '~/apollo/shinzo/queries/__generated__/GetProject'
import {computed} from "#imports";

const props = defineProps<{
  project: GetProject_project
}>()

const emptyRoles = computed(() => props.project.roles.filter((role) => !role.user))
</script>

<style scoped>
.role.owner {
}
</style>
