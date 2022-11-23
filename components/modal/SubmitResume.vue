<template>
  <lazy-modal-base
    event="proposal"
    :title="$t('resume.request')"
    @init="openModal"
    @dispose="currentStep = STATUS.LOADING"
  >
    <div v-auto-animate>
      <div v-if="currentStep === STATUS.INPUT">
        <div class="mb-3 text-gray-500">
          <Icon name="jam:alert" class="relative !inline text-orange-500" />
          <span class="text-[12px] ml-0.5">
            <template v-if="!form.id">
              {{ $t('resume.warning') }}
            </template>
            <template v-else-if="form.status === ProposalStatus.APPROVED">
              {{ $t('resume.already') }}
            </template>
            <template v-else-if="form.note">
              {{ form.note }}
            </template>
            <template v-else>
              {{ $t('resume.edit') }}
            </template>
          </span>
        </div>

        <h4 class="font-semibold">
          {{ $t('resume.selectPosition') }}
        </h4>

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

        <h4 class="font-semibold mt-4 mb-1">
          {{ $t('resume.coverLetter') }}
        </h4>

        <textarea
          class="w-full bg-gray-100 h-[120px] rounded-md focus:outline-0 p-4"
          v-model="form.letter"
        />

        <h4 class="font-semibold mt-4 mb-1">
          {{ $t('resume.resume') }}
        </h4>

        <div class="mt-3" v-auto-animate>
          <div v-if="!form.resume" class="flex items-center">
            <lazy-theme-button
              size="small"
              :ghost="true"
              class="!py-0.5"
              @click="openUploadFile"
            >
              {{ $t('general.upload') }}
            </lazy-theme-button>
            <span class="ml-2 text-[12px] text-gray-500">
              {{ $t('resume.uploadYour') }}
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
            {{ $t('resume.tip') }}
          </a>

          <a
            v-if="form.status === ProposalStatus.WAITING"
            class="text-[12px] text-purple-600 underline uppercase font-semibold"
          >
            {{ $t('resume.waiting') }}
          </a>

          <a
            v-if="form.status === ProposalStatus.APPROVED"
            class="text-[12px] text-primary-600 underline uppercase font-semibold"
          >
            {{ $t('resume.approved') }}
          </a>

          <a
            v-if="form.status === ProposalStatus.REJECTED"
            class="text-[12px] text-rose-600 underline uppercase font-semibold"
          >
            {{ $t('resume.rejected') }}
          </a>

          <lazy-theme-button
            icon="ph:person-simple-run-bold"
            type="primary"
            size="tini"
            :disabled="form.status === ProposalStatus.APPROVED"
            @click="submitProposal"
            class="ml-auto"
          >
            {{ form.id ? $t('resume.resend') : $t('resume.send') }}
          </lazy-theme-button>
        </div>
      </div>

      <div
        v-else-if="currentStep === STATUS.SUCCESS"
        class="flex flex-col items-center justify-center"
      >
        <vue-lottie-player
          width="250px"
          height="200px"
          loop
          path="https://assets10.lottiefiles.com/packages/lf20_muvibu0i.json"
        />
        <div class="mt-4 text-center">
          <h3 class="text-lg font-semibold text-gray-700">
            {{ $t('resume.success') }}
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            {{ $t('resume.promise') }}
          </p>
        </div>
      </div>

      <div
        v-else-if="currentStep === STATUS.OWNER"
        class="flex flex-col items-center justify-center"
      >
        <vue-lottie-player
          width="250px"
          height="200px"
          loop
          path="https://assets8.lottiefiles.com/packages/lf20_ymyikn6l.json"
        />
        <div class="mt-4 text-center">
          <h3 class="text-lg font-semibold text-gray-700">
            {{ $t('resume.owner') }}
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            {{ $t('resume.controller') }}
          </p>
        </div>

        <div class="flex mt-8 w-full">
          <lazy-theme-button
            icon="ph:person-simple-run-bold"
            type="primary"
            size="tini"
            @click="$modal().off('proposal')"
            class="ml-auto"
          >
            {{ $t('resume.ok') }}
          </lazy-theme-button>
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
          {{ $t('resume.collect') }}
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
  useUpload,
  useAppStore
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
  LOADING,
  OWNER
}

const appStore = useAppStore()

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

// Todo: Merge to single query

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

// const getProject = async (project: string) => {
//   const { data } = await $apollo.defaultClient.query({
//     query: GET_OWNER_PROJECT,
//     variables: {
//       project
//     }
//   })
//   return data?.project
// }

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
      form.role = role?.id || ''
      form.letter = ''
      form.resume = ''
    }
    currentStep.value =
      proposal?.project.owner.id === appStore.user?.id
        ? STATUS.OWNER
        : STATUS.INPUT
  } catch (e) {
    //
  }
}

const { $modal } = useNuxtApp()

const afterSubmit = () => {
  console.log('afterSubmit')
  currentStep.value = STATUS.SUCCESS
  setTimeout(() => {
    $modal().off('proposal')
  }, 5000)
}

const {
  loading,
  mutate: createProposal,
  onDone: afterCreated
} = useMutation<CreateProposal, CreateProposalVariables>(SUBMIT_PROPOSAL)
afterCreated(() => afterSubmit())

const {
  loading: updating,
  mutate: updateProposal,
  onDone: afterUpdated
} = useMutation<UpdateProposal, UpdateProposalVariables>(UPDATE_PROPOSAL)
afterUpdated(() => afterSubmit())

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

const { files, open: openUploadFile } = useFileDialog({
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
