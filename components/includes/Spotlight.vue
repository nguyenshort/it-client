<template>
  <div
    id="spotlight"
    class="fixed top-0 left-0 w-full h-full z-[100000] flex justify-center transition"
    :class="[isOpen ? '' : 'invisible opacity-0']"
    @keyup.esc="isOpen = false"
  >
    <div
      ref="target"
      class="max-w-[580px] w-full mx-3 pb-3 bg-white h-fit mt-[30vh] rounded-md shadow-lg overflow-hidden transition delay-100 duration-300 ease-in-out"
      :class="{
        'invisible scale-95 opacity-0': !isOpen
      }"
    >
      <form @submit.prevent="openAdvanchedSeach">
        <div class="flex items-center px-4 pb-3.5 pt-4 bg-gray-100">
          <Icon name="lucide:search" class="text-[19px] flex-shrink-0" />
          <input
            ref="inputRef"
            v-model="filter.filter.name"
            class="w-full ml-3 focus:outline-0 bg-transparent text-[17px]"
            type="text"
            placeholder="Nhập từ khoá..."
          />
          <span
            class="bg-gray-300 text-[9px] font-bold px-1.5 py-0.5 rounded-md cursor-pointer"
            @click="isOpen = false"
            >ESC</span
          >
        </div>
      </form>

      <div class="px-4 py-4">
        <div v-auto-animate>
          <div v-if="projects.length">
            <h4 class="text-[16px] capitalize text-gray-700 font-semibold mb-0">
              Dự án nổi bật
            </h4>
            <ul v-auto-animate class="mt-3 mb-0">
              <li
                v-for="(project, index) in projects"
                :key="index"
                class="mb-4 last:mb-0"
              >
                <div class="flex overflow-hidden items-center">
                  <a
                    href="javascript:void(0)"
                    class="block w-[30px] aspect-1 overflow-hidden flex-shrink-0"
                  >
                    <img
                      class="w-full h-full object-contain"
                      :src="$cdn(project.logo)"
                      alt=""
                    />
                  </a>

                  <h2 class="text-[15px] font-semibold text-gray-700 mb-0 ml-4">
                    {{ project.name }}
                  </h2>

                  <span class="h-[15px] w-px bg-gray-200 block mx-3"></span>

                  <div class="flex items-center text-xs text-gray-500">
                    <span>
                      <Icon name="ion:chatbubble-ellipses" />
                    </span>
                    <span class="ml-1 relative mt-0.5">
                      {{ project.comment }} bình luận
                    </span>
                  </div>

                  <span class="h-[15px] w-px bg-gray-200 block mx-3"></span>

                  <div class="flex items-center text-xs text-gray-500">
                    <span>
                      <Icon name="octicon:issue-draft-16" />
                    </span>
                    <span class="ml-1 relative mt-0.5">
                      {{ project.issues }} issues
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="flex flex-col items-center justify-center">
            <vue-lottie-player
              width="250px"
              height="200px"
              loop
              path="https://assets4.lottiefiles.com/datafiles/vhvOcuUkH41HdrL/data.json"
            />
            <div class="mt-4 text-center">
              <p class="mt-2 text-sm text-gray-500">Chẳng có gì ở đây cả</p>
            </div>
          </div>
        </div>
      </div>

      <p class="text-xs mb-0 px-4 text-gray-500">
        Tìm kiếm dự án, công việc, và hơn thế nữa...
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  nextTick,
  onClickOutside,
  onMounted,
  ref,
  useEventBus,
  useMagicKeys,
  watch,
  useQuery,
  reactive,
  computed,
  useRouter
} from '#imports'
import { QUICK_SEARCH } from '~/apollo/shinzo/queries/projects.query'
import {
  QuickSearch,
  QuickSearchVariables
} from '~/apollo/shinzo/queries/__generated__/QuickSearch'

const isOpen = ref(false)

const target = ref<HTMLDivElement>()

const inputRef = ref<HTMLInputElement>()
watch(isOpen, (val, oldValue) => {
  if (val && !oldValue) {
    nextTick(() => {
      setTimeout(() => {
        inputRef.value?.focus()
      }, 300)
    })
  }
})
onClickOutside(target, () => (isOpen.value = false))

// Init, Dispose from mitter
const mitter = useEventBus<string>('modal')
onMounted(() => {
  mitter.on((event) => {
    if (event === `Modal-spotlight`) {
      isOpen.value = true
    } else if (event === `Modal-spotlight-Dispose`) {
      isOpen.value = false
    }
  })
})

// Đóng mằng nhấn đúp phím shift
const timer = ref(0)
const block = ref<boolean>(false)
const { shift } = useMagicKeys()
watch(shift, (val) => {
  if (!val) {
    return
  }
  if (block.value) {
    return
  }

  if (Date.now() - timer.value < 500) {
    block.value = true

    isOpen.value = !isOpen.value

    block.value = true

    setTimeout(() => {
      block.value = false
    }, 300)
  }
  timer.value = Date.now()
})

const filter = reactive<QuickSearchVariables>({
  filter: {
    limit: 3,
    offset: 0,
    sort: 'createdAt',
    name: ''
  }
})

const { result } = useQuery<QuickSearch, QuickSearchVariables>(
  QUICK_SEARCH,
  filter,
  { debounce: 500 }
)
const projects = computed(() => result.value?.projects || [])

const router = useRouter()
const openAdvanchedSeach = () => {
  if (filter.filter.name) {
    isOpen.value = false
    router.push({
      name: 'search',
      query: {
        keyword: filter.filter.name
      }
    })
  }
}
</script>

<style lang="scss">
#spotlight {
  background-color: rgb(15 23 42 / 16%);
}

.line-border {
  @apply border-b border-gray-700;
}
</style>
