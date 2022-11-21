<template>
  <theme-button
    v-if="!kokiApp.auth"
    class="flex-shrink-0"
    @click="$modal().open('auth')"
  >
    Đăng Nhập
  </theme-button>

  <menu-wrapper v-else class="user-menu">
    <template #title>
      <div>
        <div
            class="flex-shrink-0 w-[40px] h-[40px] rounded-full overflow-hidden custom-shadow cursor-pointer"
        >
          <img
              :src="$cdn(kokiApp.user?.avatar)"
              alt=""
              class="w-full h-full object-cover"
          />
        </div>
      </div>
    </template>

    <template #submenu>
      <div class="w-[250px] py-2">

        <div class="flex items-center px-4 py-3 transition hover:bg-primary-500">
          <div class="w-[40px] h-[40px] rounded-full overflow-hidden mr-3">
            <img
                :src="$cdn(kokiApp.user?.avatar)"
                alt=""
                class="w-full h-full object-cover"
            />
          </div>

          <h4 class="font-semibold">{{ kokiApp.user?.name }}</h4>

        </div>

        <div
            class="px-4 py-3 transition hover:bg-primary-500 font-semibold text-gray-200 cursor-pointer"
            @click="logOut"
        >
          Đăng Xuất
        </div>

      </div>
    </template>
  </menu-wrapper>
</template>

<script lang="ts" setup>
import {useAppStore, useCookie} from '#imports'
import { getAuth, signOut } from "firebase/auth"
const kokiApp = useAppStore()

const counter = useCookie('apollo:app.token')

// Todo: Need to improve this function
const logOut = async () => {
  await kokiApp.logOut()
  await signOut(getAuth())
  counter.value = ''
}
</script>

<style lang="scss">
.menu-item.user-menu ._sub-menu-wrapper {
  top: 50px;

  > div {
    right: 203px;
    &:before {
      left: unset;
      right: 13px;
    }
    &:hover {

    }
  }
}
</style>
