<template>
  <div class="flex items-center file-item cursor-pointer">
    <Icon :name="'bx:bxs-file-' + fileIcon" class="text-current transform scale-110" />
    <span class="text-current ml-1">{{ fileName }}</span>

    <button
        v-if="close"
        class="ml-auto transition transform text-rose-500 scale-0 opacity-0 invisible"
        @click="emit('close', file)"
    >
      <Icon name="fluent:delete-12-filled" class="text-current" />
    </button>

  </div>
</template>

<script lang="ts" setup>
import { computed } from '#imports'

const props = withDefaults(defineProps<{
  file: string
  close?: boolean
}>(), {
  close: true
})

const emit = defineEmits<{
  (e: 'close', file: string): void
}>()

const fileName = computed(() => {
  const file = props.file
  const index = file.lastIndexOf('/')
  return file.substring(index + 1)
})

const fileExtension = computed(() => {
  const file = props.file
  const index = file.lastIndexOf('.')
  return file.substring(index + 1)
})

const fileIcon = computed(() => {
  const extension = fileExtension.value
  switch (extension) {
    case 'pdf':
      return 'pdf'
    case 'doc':
    case 'docx':
      return 'word'
    case 'xls':
    case 'xlsx':
      return 'excel'
    case 'ppt':
    case 'pptx':
      return 'powerpoint'
    case 'zip':
    case 'rar':
      return 'zip'
    default:
      return 'file'
  }
})
</script>

<style scoped lang="scss">
.file-item:hover {
  button {
    @apply scale-110 opacity-100 visible;
  }
}
</style>
