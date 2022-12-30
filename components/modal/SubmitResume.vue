<template>
  <lazy-modal-base
    event="proposal"
    :title="$t('resume.request')"
    @init="open"
  >
    <div v-auto-animate>
      <div
        v-if="currentStep === STATUS.OWNER"
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
            {{ $t("resume.owner") }}
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            {{ $t("resume.controller") }}
          </p>
        </div>
      </div>

      <div v-if="currentStep === STATUS.INPUT" v-auto-animate>
        <div class="mb-3 text-gray-500">
          <Icon name="jam:alert" class="relative !inline text-orange-500" />
          <span class="text-[12px] ml-0.5">
            <template v-if="!form.id">
              {{ $t("resume.warning") }}
            </template>
            <template v-else-if="form.status === ProposalStatus.APPROVED">
              {{ $t("resume.already") }}
            </template>
            <template v-else-if="form.note">
              {{ form.note }}
            </template>
            <template v-else>
              {{ $t("resume.edit") }}
            </template>
          </span>
        </div>

        <h4 class="font-semibold">
          {{ $t("resume.selectPosition") }}
        </h4>

        <ul class="flex flex-wrap justify-between -mx-1.5 mt-2">
          <li
            v-for="(element, index) in Object.entries(positions)"
            :key="index"
            class="mx-1.5 transform transition w-[110px] my-2"
            :class="{
                              'scale-95': element[0] !== form.role
                          }"
            @click.prevent="form.role = element[0]"
          >
            <label
              class="flex cursor-pointer items-center rounded-lg border-[2px] px-3 py-1.5 transition relative"
              :class="{
                               'border-primary-500 bg-primary-100 text-primary font-semibold': element[0] === form.role
                            }"
            >
                            <span class="flex h-4 w-4 items-center justify-center rounded-full border flex-shrink-0">
                              <span class="h-2 w-2 transform rounded-full bg-primary-500 transition"></span>
                            </span>
              <span class="ml-2 transition line-clamp-1">{{ element[1][0].name }}</span>
            </label>
          </li>
        </ul>

        <div v-if="currentRole" class="mt-3">
          <h4 class="font-semibold">Chi tết vị trí công việc</h4>

          <div class="bg-gray-100 rounded-md p-4 mt-3">

            <h5 class="text-[16px] font-semibold mb-2">{{ currentRole?.name }}</h5>

            {{ currentRole?.content }}
          </div>

        </div>
        <h4 class="font-semibold mt-4 mb-2">
          {{ $t("resume.coverLetter") }}
        </h4>
        <textarea
          v-model="form.letter"
          class="w-full bg-gray-100 h-[120px] rounded-md focus:outline-0 p-4"
        />

        <h4 class="font-semibold mt-4 mb-1">
          {{ $t("resume.resume") }}
        </h4>
        <div v-auto-animate class="mt-3">
          <div v-if="!form.resume" class="flex items-center">
            <lazy-theme-button
              size="small"
              :ghost="true"
              class="!py-0.5"
              @click="openUploadFile"
            >
              {{ $t("general.upload") }}
            </lazy-theme-button>
            <span class="ml-2 text-[12px] text-gray-500">
                    {{ $t("resume.uploadYour") }}
                  </span>
          </div>
          <div v-else class="py-1.5 px-3 bg-gray-100 rounded-lg">
            <div class="flex items-center text-gray-500">
              <Icon name="fluent:document-one-page-20-filled" class="text-current transform scale-110" />

              <div class="line-clamp-1 text-[13px] ml-1">
                {{ form.resume?.split("/").pop() }}
              </div>

              <div class="ml-auto text-[16px] pl-8 text-rose-500">
                <Icon class="cursor-pointer" name="material-symbols:delete-outline-rounded" @click="form.resume = ''" />
              </div>

            </div>
          </div>
        </div>

        <div class="flex mt-4">
          <a v-if="!form.id" class="text-[13px] text-green-500 underline">
            {{ $t("resume.tip") }}
          </a>

          <a
            v-if="form.status === ProposalStatus.WAITING"
            class="text-[12px] text-purple-600 underline uppercase font-semibold"
          >
            {{ $t("resume.waiting") }}
          </a>

          <a
            v-if="form.status === ProposalStatus.APPROVED"
            class="text-[12px] text-primary-600 underline uppercase font-semibold"
          >
            {{ $t("resume.approved") }}
          </a>

          <a
            v-if="form.status === ProposalStatus.REJECTED"
            class="text-[12px] text-rose-600 underline uppercase font-semibold"
          >
            {{ $t("resume.rejected") }}
          </a>

          <lazy-theme-button
            icon="ph:person-simple-run-bold"
            type="primary"
            size="tini"
            class="ml-auto"
            @click="submitProposal"
          >
            {{ form.id ? $t("resume.resend") : $t("resume.send") }}
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
            {{ $t("resume.success") }}
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            {{ $t("resume.promise") }}
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
            {{ $t("resume.owner") }}
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            {{ $t("resume.controller") }}
          </p>
        </div>
      </div>
    </div>
  </lazy-modal-base>
</template>

<script lang="ts" setup>
import {
  GetProjectMembers_project_roles
} from "~/apollo/shinzo/queries/__generated__/GetProjectMembers";
import {
  computed,
  ref,
  useAppStore,
  useNuxtApp,
  reactive,
  useUpload,
  useFileDialog,
  watch,
  useMutation
} from "#imports";
import { GET_PROJECT_MEMBERS } from "~/apollo/shinzo/queries/project.query";
import { ProjectItemDoc } from "~/apollo/shinzo/queries/__generated__/ProjectItemDoc";
import { CreateProposalInput, ProposalStatus, UpdateProposalInput } from "~/apollo/__generated__/serverTypes";
import { GetProposal_proposal } from "~/apollo/shinzo/queries/__generated__/GetProposal";
import { CreateProposal, CreateProposalVariables } from "~/apollo/shinzo/mutates/__generated__/CreateProposal";
import { SUBMIT_PROPOSAL } from "~/apollo/shinzo/mutates/proposal.mutate";
import { GET_PROPOSAL } from "~/apollo/shinzo/queries/role.query";

enum STATUS {
  INPUT,
  SUCCESS,
  EMPTY,
  LOADING,
  OWNER
}

const currentStep = ref<STATUS>(STATUS.LOADING);

interface OpenModalProp {
  role?: GetProjectMembers_project_roles;
  project: string;
}

const roles = ref<GetProjectMembers_project_roles[]>([]);

const positions = computed(() => {
  const groups = roles.value.reduce((acc, role) => {
    const key = role.group || 0;
    if (!acc[key]) acc[key] = [];
    acc[key].push(role as any);
    return acc;
  }, {} as Record<number, ProjectItemDoc["roles"]>);

  return Object.values(groups);
});

const { $apollo } = useNuxtApp();
const appStore = useAppStore();

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
    fetchPolicy: "network-only"
  });
  return data?.proposal;
};

const open = async ({ role, project }: OpenModalProp) => {
  const { data } = await $apollo.defaultClient.query({
    query: GET_PROJECT_MEMBERS,
    variables: {
      project
    }
  });

  const _roles: GetProjectMembers_project_roles[] = data.project?.roles || [];

  // không có vị trí nào dc tạo
  if (!_roles.length) {
    currentStep.value = STATUS.EMPTY;
    return;
  }

  // checking project owner
  if (appStore.user?.id === data.project?.owner?.id) {
    currentStep.value = STATUS.OWNER;
    return;
  }

  roles.value = _roles

  const pososal = await getProposal(data.project!.id);
  if (pososal) {
    form.id = pososal.id
    form.letter = pososal.letter
    form.note = pososal.note
    form.resume = pososal.resume
    form.status = pososal.status
  }


  currentStep.value = STATUS.INPUT
}

type ProposalForm = CreateProposalInput &
  UpdateProposalInput &
  Pick<GetProposal_proposal, "status" | "note">
const form = reactive<Partial<ProposalForm>>({
  id: "",
  letter: "",
  resume: "",
  role: "",
  note: ""
});

const currentRole = computed(() => {
  return form.role !== "" ? positions.value[Number(form.role)]?.[0] : undefined;
});


const { files, open: openUploadFile } = useFileDialog({
  accept: "application/pdf",
  multiple: false
});

const upload = useUpload();
const uploadResume = async () => {
  try {
    const file = await upload.document(files.value![0], "resume");
    if (file) {
      form.resume = file;
    }
  } catch (e) {
    //
  }
};

watch(files, (file) => file && uploadResume());

const { $modal } = useNuxtApp();
const {
  loading: loadingCreate,
  mutate: createProposal,
  onDone: afterCreated
} = useMutation<CreateProposal, CreateProposalVariables>(SUBMIT_PROPOSAL);

const createProposalHandle = () => {
  createProposal({
    input: {
      resume: form.resume,
      letter: form.letter,
      role: currentRole.value!.id
    }
  });
};

afterCreated(() => {
  currentStep.value = STATUS.SUCCESS;
  setTimeout(() => {
    $modal().off("proposal");
  }, 5000);
});

const submitProposal = () => {
  if (form.id) {

  } else {
    createProposalHandle();
  }
};

// import {
//   reactive,
//   ref,
//   toRaw,
//   useFileDialog,
//   useMutation,
//   useNuxtApp,
//   watch,
//   useUpload,
//   useAppStore
// } from '#imports'
// import { RoleDoc } from '~/apollo/shinzo/queries/__generated__/RoleDoc'
// import {
//   CreateProposal,
//   CreateProposalVariables
// } from '~/apollo/shinzo/mutates/__generated__/CreateProposal'
// import {
//   SUBMIT_PROPOSAL,
//   UPDATE_PROPOSAL
// } from '~/apollo/shinzo/mutates/proposal.mutate'
// import { ProjectItemDoc_roles } from '~/apollo/shinzo/queries/__generated__/ProjectItemDoc'
// import { GET_PROPOSAL, GET_ROLES } from '~/apollo/shinzo/queries/role.query'
// import { GetRolesVariables } from '~/apollo/shinzo/queries/__generated__/GetRoles'
// import {
//   UpdateProposal,
//   UpdateProposalVariables
// } from '~/apollo/shinzo/mutates/__generated__/UpdateProposal'
// import {
//   CreateProposalInput,
//   ProposalStatus,
//   UpdateProposalInput
// } from '~/__generated__/shinzoTypes'
// import { GetProposal_proposal } from '~/apollo/shinzo/queries/__generated__/GetProposal'
//
// enum STATUS {
//   INPUT,
//   SUCCESS,
//   LOADING,
//   OWNER
// }
//
// const appStore = useAppStore()
//
// const currentStep = ref<STATUS>(STATUS.LOADING)
// const filter = reactive<GetRolesVariables>({
//   filter: {
//     project: ''
//   }
// })
//
// const jobPositions = ref<RoleDoc[]>([])
//
// type ProposalForm = CreateProposalInput &
//   UpdateProposalInput &
//   Pick<GetProposal_proposal, 'status' | 'note'>
// const form = reactive<Partial<ProposalForm>>({
//   id: '',
//   letter: '',
//   resume: '',
//   role: ''
// })
//
// interface OpenModalProp {
//   role?: ProjectItemDoc_roles
//   project: string
// }
//
// const { $apollo } = useNuxtApp()
//
// // Todo: Merge to single query
//
// const getRoles = async (project: string) => {
//   const { data } = await $apollo.defaultClient.query({
//     query: GET_ROLES,
//     variables: {
//       filter: {
//         project
//       }
//     }
//   })
//   return data?.roles || []
// }
//
// const getProposal = async (
//   project: string
// ): Promise<GetProposal_proposal | undefined> => {
//   const { data } = await $apollo.defaultClient.query({
//     query: GET_PROPOSAL,
//     variables: {
//       filter: {
//         project
//       }
//     },
//     fetchPolicy: 'network-only'
//   })
//   return data?.proposal
// }
//
// // const getProject = async (project: string) => {
// //   const { data } = await $apollo.defaultClient.query({
// //     query: GET_OWNER_PROJECT,
// //     variables: {
// //       project
// //     }
// //   })
// //   return data?.project
// // }
//
// const openModal = async ({ role, project }: OpenModalProp) => {
//   try {
//     const [roles, proposal] = await Promise.all([
//       getRoles(project),
//       getProposal(project)
//     ])
//
//     jobPositions.value = roles
//     if (proposal) {
//       form.id = proposal.id
//       form.letter = proposal.letter
//       form.resume = proposal.resume
//       form.role = proposal.role.id
//       form.status = proposal.status
//     } else {
//       form.role = role?.id || ''
//       form.letter = ''
//       form.resume = ''
//     }
//     currentStep.value =
//       proposal?.project.owner.id === appStore.user?.id
//         ? STATUS.OWNER
//         : STATUS.INPUT
//   } catch (e) {
//     //
//   }
// }
//
// const { $modal } = useNuxtApp()
//
// const afterSubmit = () => {
//   console.log('afterSubmit')
//   currentStep.value = STATUS.SUCCESS
//   setTimeout(() => {
//     $modal().off('proposal')
//   }, 5000)
// }
//
// const {
//   loading,
//   mutate: createProposal,
//   onDone: afterCreated
// } = useMutation<CreateProposal, CreateProposalVariables>(SUBMIT_PROPOSAL)
// afterCreated(() => afterSubmit())
//
// const {
//   loading: updating,
//   mutate: updateProposal,
//   onDone: afterUpdated
// } = useMutation<UpdateProposal, UpdateProposalVariables>(UPDATE_PROPOSAL)
// afterUpdated(() => afterSubmit())
//
// const submitProposal = () => {
//   if (form?.id) {
//     const _form = toRaw(form) as UpdateProposalInput
//     updateProposal({
//       input: {
//         id: _form.id,
//         letter: _form.letter,
//         resume: _form.resume,
//         role: _form.role
//       }
//     })
//   } else {
//     const _form = toRaw(form) as CreateProposalInput
//     createProposal({
//       input: {
//         role: _form.role,
//         letter: _form.letter,
//         resume: _form.resume
//       }
//     })
//   }
// }
//
// // Upload file
// const upload = useUpload()
//
// const { files, open: openUploadFile } = useFileDialog({
//   accept: 'application/pdf',
//   multiple: false
// })
//
// const uploadResume = async () => {
//   try {
//     const file = await upload.document(files.value![0], 'resume')
//     if (file) {
//       form.resume = file
//     }
//   } catch (e) {
//     //
//   }
// }
//
// watch(files, (file) => file && uploadResume())
</script>
