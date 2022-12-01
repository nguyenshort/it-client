<template>
  <Teleport to="body">
    <div class="notify-wrapper">
      <lazy-includes-notify
        v-for="notify in notifies"
        :key="notify.id"
        :notify="notify.notify"
        @close="removeByID(notify.id)"
      />
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, useSubscription } from '#imports'
import { SUB_NOTIFY } from '~/apollo/shinzo/subscriptions/notify.subscription'
import {
  SubNotify,
  SubNotify_subNotify
} from '~/apollo/shinzo/subscriptions/__generated__/SubNotify'
type Notify = {
  id: number
  notify: SubNotify_subNotify
}

const notifies = ref<Notify[]>([])

const { onResult } = useSubscription<SubNotify>(SUB_NOTIFY)
onResult((val) => {
  if (val.data?.subNotify) {
    notifies.value.push({
      id: Math.round(Math.random() * 10000000),
      notify: val.data.subNotify
    })
  }
})

const removeByID = (id: number) => {
  notifies.value = notifies.value.filter((n) => n.id !== id)
}
</script>

<style scoped>
.notify-wrapper {
  @apply text-white fixed z-[10000] top-1/2 left-1/2;
  @apply transform -translate-x-1/2 -translate-y-1/2;
  @apply text-[18px] font-semibold;
}
</style>
