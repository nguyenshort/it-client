<template>
  <lazy-modal-base
    event="proposal"
    :title="$t('resume.request')"
    @init="open"
    @dispose="dispose"
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

        <div class="flex flex-wrap justify-between -mx-1.5 mt-2">
          <button
            v-for="(element, index) in Object.entries(positions)"
            :key="index"
            class="mx-1.5 transform transition w-[110px] my-2"
            :class="{
                'scale-95': element[0] !== form.role,
                'pointer-events-none opacity-50': element[1].filter((item) => item.user).length === element[1].length,
            }"
            :disabled="element[1].filter((item) => item.user).length === element[1].length"
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
          </button>
        </div>

        <div v-if="currentRole" class="mt-3">
          <h4 class="font-semibold">
            {{ $t("resume.jobDes") }}
          </h4>

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
            :disabled="disableSubmit"
            :class="{
              'opacity-50': disableSubmit
            }"
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
  nextTick,
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
import { SUBMIT_PROPOSAL, UPDATE_PROPOSAL } from "~/apollo/shinzo/mutates/proposal.mutate";
import { GET_PROPOSAL } from "~/apollo/shinzo/queries/role.query";
import Button from "~/components/theme/Button.vue";
import { UpdateProposal, UpdateProposalVariables } from "~/apollo/shinzo/mutates/__generated__/UpdateProposal";

enum STATUS {
  INPUT,
  SUCCESS,
  EMPTY,
  LOADING,
  OWNER
}

const currentStep = ref<STATUS>(STATUS.LOADING);

interface OpenModalProp {
  role?: GetProjectMembers_project_roles[];
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

const open = async ({ project, role }: OpenModalProp) => {
  const { data } = await $apollo.defaultClient.query({
    query: GET_PROJECT_MEMBERS,
    variables: {
      project
    }
  })

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

    form.value = {
      id: pososal.id,
      letter: pososal.letter,
      note: pososal.note,
      resume: pososal.resume,
      status: pososal.status
    }
    const indexGroup = positions.value.findIndex(group => group.find(item => item.id === pososal.role?.id))
    if(indexGroup !== -1) {
      form.value.role = String(indexGroup)
    }
  } else if (role) {
    const indexGroup = positions.value.findIndex(group => group.find(item => item.id === role[0].id))
    if(indexGroup !== -1) {
      form.value.role = String(indexGroup)
    }
  }


  nextTick(() => {
    setTimeout(() => {
      currentStep.value = STATUS.INPUT;
    }, 500)
  })
}

type ProposalForm = CreateProposalInput &
  UpdateProposalInput &
  Pick<GetProposal_proposal, "status" | "note">
const form = ref<Partial<ProposalForm>>({
  id: "",
  letter: "",
  resume: "",
  role: "",
  note: ""
});

const currentRole = computed(() => {
  return form.value.role !== "" ? positions.value[Number(form.value.role)]?.[0] : undefined;
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
      form.value.resume = file;
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
} = useMutation<CreateProposal, CreateProposalVariables>(SUBMIT_PROPOSAL)

const { loading: loadingUpdate, mutate: updateProposal, onDone: afterUpdateProposal } = useMutation<UpdateProposal, UpdateProposalVariables>(UPDATE_PROPOSAL)


afterCreated(() => {
  currentStep.value = STATUS.SUCCESS;
  setTimeout(() => {
    $modal().off("proposal")
  }, 5000)
})

afterUpdateProposal(() => {
  currentStep.value = STATUS.SUCCESS;
  setTimeout(() => {
    $modal().off("proposal")
  }, 5000)
})

const submitProposal = () => {
  if (form.value.id) {
    updateProposal({
        input: {
          id: form.value.id,
          letter: form.value.letter,
          resume: form.value.resume,
          role: currentRole.value!.id
        }
    })
    //
  } else {
    createProposal({
      input: {
        resume: form.value.resume,
        letter: form.value.letter,
        role: currentRole.value!.id
      }
    })
  }
}


const disableSubmit = computed(() => !form.value.role || form.value.status === ProposalStatus.APPROVED || !loadingUpdate || !loadingCreate);


const dispose = () => {
  currentStep.value = STATUS.LOADING
}
</script>
