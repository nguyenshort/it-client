<template>
  <div>
    <div id="site-header" class="border-b border-gray-100">
      <div class="mx-auto flex h-full max-w-bootstrap items-center px-4">

        <div class="header-logo mr-3 flex-shrink-0">
          <nuxt-link to="/" title="" class="logo">
            <img
                class="mr-4 h-full w-full object-cover"
                src="/images/logo.svg"
                alt=""
            />
          </nuxt-link>
        </div>

        <div
            class="menu-list mr-auto flex h-full flex-shrink-0 items-center text-gray-500"
        >
          <lazy-menu-tech />
          <lazy-menu-categories />
          <lazy-menu-studio />
        </div>

        <lazy-menu-search class="pr-3" />

        <div class="mx-6 flex flex-shrink-0 items-center text-gray-500">
          <div class="text-[15px] font-semibold">
            {{ $t('menu.job') }}
          </div>

          <button class="ml-6 text-[15px] font-semibold" @click="$router.push('/blog')">
            {{ $t('menu.blog') }}
          </button>

          <button class="ml-6" @click="$modal().open('setting')">
            <Icon name="material-symbols:settings" class="text-[20px]" />
          </button>
        </div>

        <lazy-menu-user />

      </div>
    </div>

    <div class="h-[70px]"></div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, useAppStore } from '#imports'

const kokiApp = useAppStore()

onMounted(() =>
  nextTick(() => {
    ;(window as any).copyJWT = () => kokiApp.token
  })
)
</script>

<style lang="scss">
#site-header {
  @apply fixed top-0 right-0 left-0 z-40 h-[70px] bg-white;
  .header-logo .logo img {
    @apply block w-[50px];
  }

  .header-user {
    @apply flex flex-shrink-0 items-center;
  }

  .menu-list > .menu-item {
    @apply relative ml-7 first:ml-0;
  }

  .menu-list > .menu-item > button {
    @apply hover:text-primary-500;
  }

  .menu-item._has_sub .sub-menu {
    @apply invisible translate-x-[-30px] opacity-0 transition-all ease-in-out;
  }

  .menu-item._has_sub:hover .sub-menu {
    @apply visible translate-x-[-10px] opacity-100;
  }

  .sub-menu-content {
    @apply relative;
    height: calc(100% - 15px);
    top: 15px;
  }

  .sub-menu-content {
    @apply before:absolute;
  }

  .sub-menu-content:before {
    bottom: 100%;
    left: 14px;
    border-bottom: 7px solid #18181b;
    border-left: 6px dashed transparent;
    border-right: 6px dashed transparent;
    height: 0;
    width: 0;
  }

  .parents > li > a {
    @apply relative block text-[16px] font-medium text-gray-300 transition;
    padding: 12px 16px;
  }

  .parents > li.active > a {
    @apply bg-primary-500 text-white;
  }

  .langs-group {
    @apply absolute top-0 left-0 z-0 flex w-full scale-90 flex-wrap px-2 py-3 opacity-0 transition;
  }

  .langs-group.active {
    @apply z-10 scale-100 opacity-100;
  }

  .langs-group > li {
    @apply py-1 pr-8;
  }

  .langs-group > li > a {
    @apply block overflow-hidden rounded-md px-3 py-1 text-gray-200 transition hover:bg-primary-600;
  }
}
</style>
