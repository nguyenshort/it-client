<template>
  <lazy-modal-base event="proposal" title="Yêu Cầu Tham Gia" @init="openModal">
    <div>
      <div v-if="currentStep === 'input'">
        <div class="mb-3 text-gray-500">
          <i-jam-triangle-danger-f
            class="relative -top-0.5 !inline text-orange-500"
          />
          Chúng tôi sẽ sử dụng thông tin của bạn trên hệ thống để gửi cho nhà
          tuyển dụng
        </div>

        <h4 class="font-semibold">Chọn Ví Trí</h4>

        <ul class="flex flex-wrap justify-between -mx-1 mt-2">
          <li
            v-for="item in jobPositions"
            :key="item.id"
            class="mx-1 transform transition w-[90px] mb-2"
            :class="{
              'scale-95': item.id !== form.input.role
            }"
            @click.prevent="form.input.role = item.id"
          >
            <label
              class="flex cursor-pointer items-center rounded-lg border-[2px] px-3 py-1.5 transition"
              :class="{
                'border-primary-500 bg-primary-100 text-white':
                  item.id === form.input.role
              }"
            >
              <input
                v-model="form.input.role"
                class="hidden"
                type="checkbox"
                :value="item.id"
              />

              <span
                class="flex h-4 w-4 items-center justify-center rounded-full border"
              >
                <span
                  class="h-2 w-2 transform rounded-full bg-primary-500 transition"
                  :class="{
                    'scale-0': item.id !== form.input.role
                  }"
                ></span>
              </span>

              <span
                class="ml-2 transition"
                :class="[
                  item.id === form.input.role
                    ? 'font-semibold text-primary-600'
                    : 'font-normal text-gray-600'
                ]"
                >{{ item.name }}</span
              >
            </label>
          </li>
        </ul>

        <h4 class="font-semibold mt-4 mb-1">Thư Xin Viện</h4>

        <textarea class="w-full bg-gray-100 h-[120px] rounded-md focus:outline-0 p-4" />

        <div class="flex justify-between mt-4">
          <a class="text-[13px] text-green-500 underline">Mẹo xin việc</a>

          <button
            class="flex items-center rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-3 py-2 text-white"
            @click="mutate(form)"
          >
            <i-ph-person-simple-run-bold />
            <span class="ml-2 text-xs font-semibold"> Ứng Tuyển </span>
          </button>
        </div>
      </div>
      <div
        v-if="currentStep === 'success'"
        class="flex flex-col items-center justify-center"
      >
        <div
          class="flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
        >
          <i-ion-md-checkmark-circle-outline class="text-3xl text-green-500" />
        </div>
        <div class="mt-4 text-center">
          <h3 class="text-lg font-semibold text-gray-700">
            Yêu cầu tham gia thành công
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            Chúng tôi sẽ thông báo cho bạn khi có phản hồi
          </p>
        </div>
      </div>
    </div>
  </lazy-modal-base>
</template>

<script lang="ts" setup>
import {reactive, ref, useMutation, useNuxtApp} from '#imports'
import { RoleDoc } from '~/apollo/shinzo/queries/__generated__/RoleDoc'
import {CreateProposal, CreateProposalVariables} from '~/apollo/shinzo/mutates/__generated__/CreateProposal'
import {SUBMIT_PROPOSAL} from "~/apollo/shinzo/mutates/proposal.mutate";

const currentStep = ref('input')

const jobPositions = ref<RoleDoc[]>([])

const form = reactive<CreateProposalVariables>({
  input: {
    letter: '',
    resume: '',
    role: ''
  }
})

const openModal = (data: any) => {
  jobPositions.value = data.roles
  form.input.role = data.current.id
}


const { $modal } = useNuxtApp()
const { loading, mutate, onDone } = useMutation<CreateProposal, CreateProposalVariables>(SUBMIT_PROPOSAL)
onDone(() => $modal().off('proposal'))
</script>
