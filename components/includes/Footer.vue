<template>
  <footer class="py-10 bg-slate-900">
    <div class="max-w-bootstrap mx-auto text-gray-100">

      <div class="flex">
        <div class="w-[300px] flex-shrink-0 flex flex-col">
          <h1 class="text-current font-semibold text-[45px]">IT Square</h1>
          <sub class="text-gray-400 mt-8 opacity-50 font-light">Learning with practice</sub>

          <div class="logo-icon mt-auto">
            <button>
              <Icon name="mdi:instagram" />
            </button>
            <button>
              <Icon name="ic:baseline-tiktok" />
            </button>
            <button>
              <Icon name="ion:logo-twitter" />
            </button>
            <button>
              <Icon name="ion:social-facebook" />
            </button>
          </div>

          <h4 class="text-gray-400 text-[10px] mt-4">
            © 2022 IT Square
          </h4>

        </div>

        <div class="w-full flex">

          <div
            v-for="(menu, index) in menus"
            :key="index"
            class="w-1/3"
          >
            <h2 class="text-white opacity-90">{{ menu.name }}</h2>

            <ul class="mt-6">
              <li
                v-for="(child, index2) in menu.child"
                :key="index2"
              >
                <h3 class="text-gray-400 text-[13px] mb-2.5">{{ child }}</h3>
              </li>
            </ul>

          </div>

        </div>

      </div>

    </div>
  </footer>
</template>

<script lang="ts" setup>
import { ref } from "#imports";

const menus = ref<{
  name: string,
  child: string[]
}[]>([
  {
    name: 'TEAMS',
    child: [
      'About Us',
      'Design',
      'Github'
    ]
  },
  {
    name: 'CONTACTS',
    child: [
      'Big Boss',
      'Teach Leader',
      'Designer',
      'Online Services',
      'Seller'
    ]
  },
  {
    name: 'RESOURCES',
    child: [
      'Dowload Apps',
      'Help Center',
      'Terms of Service',
      'Privacy Policy'
    ]
  },
  {
    name: 'REFERRALS',
    child: [
      'Japans',
      'Green Home'
    ]
  }
])
</script>

<style scoped lang="scss">
h1 {
  font-family: 'Dancing Script', cursive;
}

.logo-icon {
  > button {
    @apply text-[17px] text-gray-400 mr-2
  }
}
</style>
