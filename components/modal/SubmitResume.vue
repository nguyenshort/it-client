<template>
  <lazy-modal-base event="proposal" title="Yêu Cầu Tham Gia" @init="openModal">
    <div v-auto-animate>
      <div v-if="currentStep === STATUS.INPUT">
        <div class="mb-3 text-gray-500">
          <Icon name="jam:alert" class="relative !inline text-orange-500" />
          <span class="text-[12px] ml-0.5">
            <template v-if="!form.id">
              Chúng tôi sẽ sử dụng thông tin của bạn trên hệ thống để gửi cho
              nhà tuyển dụng
            </template>
            <template v-else-if="form.status === ProposalStatus.APPROVED">
              You are already approved by the employer
            </template>
            <template v-else-if="form.note">
              {{ form.note }}
            </template>
            <template v-else>
              You have already sent a proposal to this job. You can edit your
            </template>
          </span>
        </div>

        <h4 class="font-semibold">Chọn Ví Trí</h4>

        <ul
            class="flex flex-wrap justify-between -mx-1 mt-2"
            :class="{
              'pointer-events-none': form.status === ProposalStatus.APPROVED
            }"

        >
          <li
            v-for="item in jobPositions"
            :key="item.id"
            class="mx-1 transform transition w-[90px] mb-2"
            :class="{
              'scale-95': item.id !== form.role
            }"
            @click.prevent="form.role = item.id"
          >
            <label
              class="flex cursor-pointer items-center rounded-lg border-[2px] px-3 py-1.5 transition"
              :class="{
                'border-primary-500 bg-primary-100 text-white':
                  item.id === form.role
              }"
            >
              <input
                v-model="form.role"
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
                    'scale-0': item.id !== form.role
                  }"
                ></span>
              </span>

              <span
                class="ml-2 transition"
                :class="[
                  item.id === form.role
                    ? 'font-semibold text-primary-600'
                    : 'font-normal text-gray-600'
                ]"
              >
                {{ item.name }}
              </span>
            </label>
          </li>
        </ul>

        <h4 class="font-semibold mt-4 mb-1">Thư Xin Viện</h4>

        <textarea
          class="w-full bg-gray-100 h-[120px] rounded-md focus:outline-0 p-4"
          v-model="form.letter"
        />

        <h4 class="font-semibold mt-4 mb-1">Sơ Yếu Lý Lịch</h4>

        <div class="mt-3" v-auto-animate>
          <div v-if="!form.resume" class="flex items-center">
            <lazy-theme-button
              size="small"
              :ghost="true"
              class="!py-0.5"
              @click="openUploadFile"
            >
              Tải Lên
            </lazy-theme-button>
            <span class="ml-2 text-[12px] text-gray-500">
              Gửi lên hồ sơ của bạn.
            </span>
          </div>
          <div v-else class="py-1 px-3 bg-gray-100 rounded-lg">
            <template-file
              :file="form.resume"
              class="text-[13px] text-gray-500"
              :close="form.status === ProposalStatus.APPROVED"
              @close="form.resume = ''"
            />
          </div>
        </div>

        <div class="flex mt-4">
          <a v-if="!form.id" class="text-[13px] text-green-500 underline">
            Mẹo xin việc
          </a>

          <a
            v-if="form.status === ProposalStatus.WAITING"
            class="text-[12px] text-purple-600 underline uppercase font-semibold"
          >
            Đang Chờ Phê Duyệt
          </a>

          <a
            v-if="form.status === ProposalStatus.APPROVED"
            class="text-[12px] text-primary-600 underline uppercase font-semibold"
          >
            Đã Được Phê Duyệt
          </a>

          <a
            v-if="form.status === ProposalStatus.REJECTED"
            class="text-[12px] text-rose-600 underline uppercase font-semibold"
          >
            Đã Bị Từ Chối
          </a>

          <lazy-theme-button
            icon="ph:person-simple-run-bold"
            type="primary"
            size="tini"
            :disabled="form.status === ProposalStatus.APPROVED"
            @click="submitProposal"
            class="ml-auto"
          >
            {{ form.id ? 'Gửi Lại' : 'Ứng Tuyển' }}
          </lazy-theme-button>
        </div>
      </div>

      <div
        v-else-if="currentStep === STATUS.SUCCESS"
        class="flex flex-col items-center justify-center"
      >
        <div
          class="flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
        >
          <Icon name="ion:checkmark-circled" class="text-3xl text-green-500" />
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

      <div
        v-else
        style="width: 250px; height: 230px"
        class="mx-auto text-center"
      >
        <vue-lottie-player
          width="250px"
          height="200px"
          loop
          path="https://assets10.lottiefiles.com/packages/lf20_muvibu0i.json"
        />
        <p class="text-[11px] text-gray-500">
          Đang thu thập thông tin về dự án
        </p>
      </div>
    </div>
  </lazy-modal-base>
</template>

<script lang="ts" setup>
import {
  reactive,
  ref,
  toRaw,
  useFileDialog,
  useMutation,
  useNuxtApp,
  watch,
  useUpload
} from '#imports'
import { RoleDoc } from '~/apollo/shinzo/queries/__generated__/RoleDoc'
import {
  CreateProposal,
  CreateProposalVariables
} from '~/apollo/shinzo/mutates/__generated__/CreateProposal'
import {
  SUBMIT_PROPOSAL,
  UPDATE_PROPOSAL
} from '~/apollo/shinzo/mutates/proposal.mutate'
import { ProjectItemDoc_roles } from '~/apollo/shinzo/queries/__generated__/ProjectItemDoc'
import { GET_PROPOSAL, GET_ROLES } from '~/apollo/shinzo/queries/role.query'
import { GetRolesVariables } from '~/apollo/shinzo/queries/__generated__/GetRoles'
import {
  UpdateProposal,
  UpdateProposalVariables
} from '~/apollo/shinzo/mutates/__generated__/UpdateProposal'
import {
  CreateProposalInput,
  ProposalStatus,
  UpdateProposalInput
} from '~/__generated__/shinzoTypes'
import { GetProposal_proposal } from '~/apollo/shinzo/queries/__generated__/GetProposal'

enum STATUS {
  INPUT,
  SUCCESS,
  LOADING
}

const currentStep = ref<STATUS>(STATUS.LOADING)
const filter = reactive<GetRolesVariables>({
  filter: {
    project: ''
  }
})

const jobPositions = ref<RoleDoc[]>([])

type ProposalForm = CreateProposalInput &
  UpdateProposalInput &
  Pick<GetProposal_proposal, 'status' | 'note'>
const form = reactive<Partial<ProposalForm>>({
  id: '',
  letter: '',
  resume: '',
  role: ''
})

interface OpenModalProp {
  role?: ProjectItemDoc_roles
  project: string
}

const { $apollo } = useNuxtApp()
const getRoles = async (project: string) => {
  const { data } = await $apollo.defaultClient.query({
    query: GET_ROLES,
    variables: {
      filter: {
        project
      }
    }
  })
  return data?.roles || []
}

const getProposal = async (
  project: string
): Promise<GetProposal_proposal | undefined> => {
  const { data } = await $apollo.defaultClient.query({
    query: GET_PROPOSAL,
    variables: {
      filter: {
        project
      }
    },
    fetchPolicy: 'network-only'
  })
  return data?.proposal
}

const openModal = async ({ role, project }: OpenModalProp) => {
  try {
    const [roles, proposal] = await Promise.all([
      getRoles(project),
      getProposal(project)
    ])
    jobPositions.value = roles
    if (proposal) {
      form.id = proposal.id
      form.letter = proposal.letter
      form.resume = proposal.resume
      form.role = proposal.role.id
      form.status = proposal.status
    } else {
      form.role = ''
      form.letter = ''
      form.resume = ''
    }
    currentStep.value = STATUS.INPUT
  } catch (e) {
    //
  }
}

const { $modal } = useNuxtApp()
const {
  loading,
  mutate: createProposal,
  onDone
} = useMutation<CreateProposal, CreateProposalVariables>(SUBMIT_PROPOSAL)
onDone(() => $modal().off('proposal'))

const { loading: updating, mutate: updateProposal } = useMutation<
  UpdateProposal,
  UpdateProposalVariables
>(UPDATE_PROPOSAL)

const submitProposal = () => {
  if (form?.id) {
    const _form = toRaw(form) as UpdateProposalInput
    updateProposal({
      input: {
        id: _form.id,
        letter: _form.letter,
        resume: _form.resume,
        role: _form.role
      }
    })
  } else {
    const _form = toRaw(form) as CreateProposalInput
    createProposal({
      input: {
        role: _form.role,
        letter: _form.letter,
        resume: _form.resume
      }
    })
  }
}

// Upload file
const upload = useUpload()

const {
  files,
  open: openUploadFile,
  reset
} = useFileDialog({
  accept: 'application/pdf',
  multiple: false
})

const uploadResume = async () => {
  try {
    const file = await upload.document(files.value![0], 'resume')
    if (file) {
      form.resume = file
    }
  } catch (e) {
    //
  }
}

watch(files, (file) => file && uploadResume())
</script>
