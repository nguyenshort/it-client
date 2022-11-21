<template>
  <lazy-menu-wrapper
    icon="bx:bxs-category"
    title="Category"
    @mouseenter="showCategories"
    @mouseleave="hideCategories"
  >
    <template #submenu>
      <ul ref="categoriesRef">
        <li v-for="category in categories" :key="category.id">
          <router-link to="/">
            <Icon :name="category.icon" />
            <span>{{ category.name }}</span>
          </router-link>
        </li>
      </ul>
    </template>
  </lazy-menu-wrapper>
</template>

<script lang="ts" setup>
import { nextTick, ref, shallowRef, useNuxtApp } from '#imports'

const categories = shallowRef<any[]>([
  {
    id: '1',
    name: 'Mobile',
    slug: 'mobile',
    icon: 'ph:device-mobile-speaker-bold'
  },
  {
    id: '2',
    name: 'Web',
    slug: 'web',
    icon: 'mdi:web'
  },
  {
    id: '3',
    name: 'Design',
    slug: 'design',
    icon: 'ph:figma-logo'
  },
  {
    id: '4',
    name: 'Marketing',
    slug: 'marketing',
    icon: 'nimbus:marketing'
  },
  {
    id: '5',
    name: 'Blockchain',
    slug: 'marketing',
    icon: 'clarity:block-solid'
  },
  {
    id: '6',
    name: 'IoT',
    slug: 'iot',
    icon: 'pepicons:internet'
  },
  {
    id: '7',
    name: 'Cloud',
    slug: 'cloud',
    icon: 'material-symbols:cloud'
  },
  {
    id: '8',
    name: 'DevOps',
    slug: 'devops',
    icon: 'mdi:microsoft-azure-devops'
  },
  {
    id: '10',
    name: 'Data Science',
    slug: 'data-science',
    icon: 'ph:database-bold'
  }
])

const categoriesRef = ref<HTMLUListElement>()
const { $anime } = useNuxtApp()

const showCategories = () => {
  nextTick(() =>
    $anime({
      targets: categoriesRef.value?.querySelectorAll('li'),
      translateY: [-30, 0],
      opacity: [0, 1],
      //duration: 300,
      // easing: 'easeOutQuad',
      delay: (el: any, i: number) => 100 + 30 * i
    })
  )
}

const hideCategories = () => {
  categoriesRef.value?.querySelectorAll('li').forEach((li) => {
    li.style.opacity = '0'
    li.style.transform = 'translateY(-30px)'
  })
}
</script>

<style scoped lang="scss">
ul {
  background: #18181b;
  @apply rounded-lg py-2 overflow-hidden;
  li {
    a {
      @apply flex items-center py-2 px-4 text-white transition hover:bg-primary-500 w-[150px];
      span {
        @apply ml-2;
      }
    }
  }
}
</style>
