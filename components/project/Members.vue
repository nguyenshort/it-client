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
                <div
                  class="w-12 h-12 rounded-full overflow-hidden cutsom-shadow border border-dashed flex items-center justify-center text-gray-400"
                >
                  <i-material-symbols-add />
                </div>
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

        <button
          v-if="project.roles.length > 10"
          class="w-12"
        >
          <div
            class="w-12 h-12 rounded-full overflow-hidden cutsom-shadow border border-dashed flex items-center justify-center text-white bg-primary-600"
          >
            <span>+<span class="text-[12px]">{{ project.roles.length - 10 }}</span></span>
          </div>
          <h4 class="text-[10px] mt-0.5 opacity-0">x</h4>
        </button>
      </div>

      <!--      <li>-->
      <!--        <div class="flex items-center">-->
      <!--          <span class="text-primary-500 text-[14px] font-semibold mr-4">Còn trống 2 vị trí.</span>-->

      <!--          <button-->
      <!--              class="flex items-center mr-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-3 py-2 rounded-full shadow-lg shadow-primary-200"-->
      <!--              @click="$emitter.emit('requiredGrantModal')"-->
      <!--          >-->
      <!--            <span class="text-xs font-semibold mr-1">Tham Gia</span>-->
      <!--            <i-material-symbols-add-circle-rounded/>-->
      <!--          </button>-->

      <!--        </div>-->
      <!--      </li>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetProject_project } from '~/apollo/shinzo/queries/__generated__/GetProject'

defineProps<{
  project: GetProject_project
}>()
</script>

<style scoped>
.role.owner {
}
</style>
