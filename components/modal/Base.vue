<template>
  <teleport to="body">
    <div
        :id="event"
        class="fixed flex h-full items-center justify-center top-0 w-full z-50 transition duration-500 ease-in-out left-0"
        :class="{
        'invisible opacity-0': !_visible
      }"
        :style='{ zIndex }'
    >
      <a
          v-if="canCancel"
          class="absolute top-0 left-0 w-full h-full close-overlay cursor-pointer bg-[#00000040]"
          title="Close"
          @click="dispose()"
      />
      <div
          :id="`${event}Body`"
          ref="body"
          class="border-primary-600 border-t-4 modal-content relative pt-6 pb-5 w-full bg-white mx-3 sm:mx-0 overflow-hidden relative shadow-lg"
          :style="{
          maxWidth: maxWidth + 'px'
        }"
      >
        <a
            v-if="canCancel"
            class="-translate-x-7 z-10 absolute close-button right-0 text-xl top-0 transform translate-y-5 cursor-pointer text-gray-600 hover:text-gray-600"
            @click="dispose()"
        >
          <span ref="closeButton" class="opacity-0">
            <Icon name="material-symbols:close" class="fill-current text-[20px]" />
          </span>
        </a>

        <div class="px-7">
          <h4
              v-if="title"
              class="font-bold text-gray-700 text-lg lg:text-2xl mb-3"
          >
            {{ title }}
          </h4>

          <div
              :id="`${event}Content`"
              class="max-h-screen-80 overflow-y-auto overflow-x-hidden scrollbar-none __base-content"
              :class="{
              'opacity-0': !_visible
            }"
          >
            <slot :show="_visible" :data="data" :dispose='dispose' />
          </div>
        </div>

        <div v-if="$slots['bottom']" class="px-7 relative">
          <div class="w-full h-px bg-gray-200 mt-3.5 mb-3" />

          <slot name="bottom" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, ref, watch, useEventBus, useNuxtApp} from '#imports'
type Props = {
  visible?: boolean
  event: string
  title?: string
  maxWidth?: number
  canCancel?: boolean,
  zIndex?: number
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: '',
  maxWidth: 550,
  canCancel: true,
  zIndex: 100
})

const { $anime } = useNuxtApp()


// ???n hi???n modal
const _visible = ref<boolean>(false)
// l???ng nghe props visible => update l???i _visible. V?? visible l?? optional
watch(() => props.visible, () => _visible.value = props.visible)

// Ref DOM
const body = ref<HTMLDivElement>()
const closeButton = ref()

// D??? li???u tu??? ch???nh modal. c?? th??? nh???n t??? ?????ng qua mitter
const data = ref(null)

// Define emit to parent event
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void,
  (e: 'init', data: any): void
  (e: 'dispose', data: any): void
}>()

// L???ng nghe visible ????? binding 2 chi???u v?? do animation
watch(_visible, (value) => {
  // Binding 2 chi???u
  emit('update:visible', value)
  if (value) {
    $anime({
      targets: body.value,
      scale: [1.2, 1],
      opacity: [0, 1],
      duration: 1500
    })

    $anime({
      targets: closeButton.value,
      scale: [0, 1],
      opacity: [0, 1],
      delay: 500,
      duration: 1500
    })
  }
})

// Init, Dispose from mitter
const mitter = useEventBus<string>('modal')

// ????ng modal
const dispose = () => {
  mitter.emit(`Modal-${props.event}-Dispose`, data.value)
}

// M??? modal
const init = () => {
  emit('init', data.value)
  _visible.value = true
}

// Init value => m??? modal ????? value default l?? true
onMounted(() => nextTick(() => props.visible && init() ))

// Khi mound component n???u c?? event => l???ng nghe event

onMounted(() => {
  if(props.event) {

    mitter.on((event, payload) => {
      if(event === `Modal-${props.event}`) {
        data.value = payload
        init()
      } else if (event === `Modal-${props.event}-Dispose`) {
        emit('dispose', data.value)
        _visible.value = false
      }
    })
  }
})

// Hu??? event khi destroy component ????? tr??nh memory leak
onUnmounted(() => {
  // if(props.event) {
  //   mitter.off(props.event)
  //   mitter.off(props.event + 'Dispose')
  // }
})

// Public c??c method, state trong setup script
defineExpose({
  visible: _visible,
  closeButton,
  body,
  data,
  dispose,
  init
})
</script>
