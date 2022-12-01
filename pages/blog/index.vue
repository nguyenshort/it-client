<template>
  <div>
    <div class="h-[120px] flex border-b">
      <h1 class="my-auto font-semibold text-[30px]">Blog</h1>
    </div>

    <div class="flex flex-wrap mt-7 -m-5 mb-7">

      <div
        v-for="(post, index) in posts"
        :key="index"
        class="w-1/3 p-5"
      >
        <div class="bg-white rounded-lg overflow-hidden shadow-default">
          <div
            class="w-full aspect-w-12 aspect-h-7 overflow-hidden relative project-avatar"
          >
            <img
              class="transition transform absolute w-full h-full z-10 top-0 left-0 object-cover cover"
              :src="$cdn(post.avatar)"
              alt=""
            />
          </div>

          <div class="p-4">
            <h4 class="font-semibold w-full mb-0 text-[16px]">
              {{ post.name }}
            </h4>

            <div
              class="text-sm text-gray-500 mt-3 line-clamp-3"
            >
              {{ post.content }}
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref } from '#imports'

const posts = ref(
  Array(10)
    .fill({
      id: '1',
      name: '结婚这件小事',
      avatar: '/images/project3.png',
      content:
        '一直彼此暗恋的林波和郑小涛，因为不知道对方的心意而羞于告白，不得已求助于自己的姐妹，林波的妹妹是超大神级的BL作者，郑小涛的姐姐是超大神级的BL小说读者，两位自诩有完美经验的女孩子纷纷给两人出谋划策，一场轻松搞笑的恋爱戏剧就此展开……',
      user: {
        name: 'Nguyên',
        avatar: '/images/project3.png'
      }
    })
    .map((post, index) => ({ ...post, id: index.toString() }))
)
</script>

<style scoped></style>
