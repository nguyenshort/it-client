<template>
  <lazy-modal-base
    ref="modal"
    event="auth"
    :title="$t('auth.login')"
    :max-width="450"
  >
    <template #default>
      <div style="width: 250px; height: 200px" class="mx-auto">
        <vue-lottie-player
          width="250px"
          height="200px"
          loop
          path="https://assets8.lottiefiles.com/packages/lf20_7jnffdxl.json"
        />
      </div>

      <div class="text-center">
        <small class="text-xs italic text-gray-400 opacity-90">
          {{ $t('auth.login') }}
        </small>
      </div>

      <form
        id="authForm"
        v-auto-animate
        class="mx-auto mt-4 max-w-xs relative"
        @submit.prevent="authAction"
      >
        <form-text
          v-if="mode === 'register'"
          v-model:value="name"
          :placeholder="$t('auth.name')"
          class="mb-3"
        >
          <template #prefix>
            <Icon name="ri:user-4-fill" class="text-gray-400" />
          </template>
        </form-text>

        <form-text v-model:value="email" :placeholder="$t('auth.email')">
          <template #prefix>
            <Icon
              name="material-symbols:alternate-email"
              class="text-gray-400"
            />
          </template>
        </form-text>

        <form-text
          v-model:value="password"
          :placeholder="$t('auth.password')"
          type="password"
          class="mt-3"
        >
          <template #prefix>
            <Icon name="material-symbols:vpn-key" class="text-gray-400" />
          </template>

          <template v-if="mode === 'login'" #suffix>
            <a
              class="ml-3 block flex-shrink-0 cursor-pointer text-xs text-primary-500"
            >
              {{ $t('auth.forgot') }}
            </a>
          </template>
        </form-text>

        <div class="my-1 mt-3 text-center text-xs">
          <p class="text-gray-400">
            {{
              mode === 'login' ? $t('auth.signUpNew') : $t('auth.haveAccount')
            }}
            <a
              class="ml-1 cursor-pointer text-primary-500 capitalize"
              @click="
                mode === 'register' ? (mode = 'login') : (mode = 'register')
              "
            >
              {{ mode === 'login' ? $t('auth.signup') : $t('auth.login') }}
            </a>
          </p>
        </div>

        <form-button type="primary" block class="mt-4">
          <template #icon>
            <Icon name="material-symbols:arrow-circle-right" />
          </template>
          <span class="ml-1 text-xs font-semibold">
            {{ mode === 'login' ? $t('auth.login') : $t('auth.signup') }}
          </span>
        </form-button>

        <div class="mb-1">
          <div class="mt-5 flex items-center">
            <span class="h-px w-full bg-gray-200" />
            <span
              class="mx-3 flex-shrink-0 text-xs font-medium text-gray-400 uppercase"
            >
              {{ $t('auth.with') }}
            </span>
            <span class="h-px w-full bg-gray-200" />
          </div>
          <div class="mt-5 flex items-center justify-center">
            <button class="mx-3" @click="googleSignIn">
              <img width="28" height="28" src="/images/logo/gg.png" alt="" />
            </button>
            <button class="mx-3 -translate-y-0.5 transform">
              <img
                src="/images/logo/apple.png"
                alt=""
                class="object-cover"
                width="26"
                height="26"
              />
            </button>
          </div>
        </div>
      </form>

      <div
        ref="errorRef"
        class="absolute bottom-0 left-0 right-0 bg-rose-500 text-white px-5 py-3 font-semibold opacity-0"
      >
        {{ message }}
      </div>
    </template>
  </lazy-modal-base>
</template>

<script lang="ts" setup>
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth
} from 'firebase/auth'
import type { FirebaseError } from 'firebase/app'
import {
  AuthErrorCodes,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import {
  ref,
  getDatabase,
  computed,
  dbSet,
  dbRef,
  watch,
  useAppStore,
  useNuxtApp,
  nextTick
} from '#imports'

const app = useAppStore()

const mode = ref<'login' | 'register'>('login')

// Form data
const name = ref('Nguyên')
const email = ref<string>('')
const password = ref<string>('')

const message = ref<string>('')

// active button
const isReady = computed(() => email.value && password.value)

// Thông báo

const authAction = async () => {
  if (mode.value === 'login') {
    await login()
  } else {
    await register()
  }
}

function Errorextracted(_e: FirebaseError) {
  if (_e.code === AuthErrorCodes.USER_DELETED) {
    message.value = 'Tài khoản không tồn tại'
  } else if (_e.code === AuthErrorCodes.USER_DISABLED) {
    message.value = 'Tài khoản đã bị khóa'
  } else if (_e.code === AuthErrorCodes.INVALID_PASSWORD) {
    message.value = 'Mật khẩu không đúng'
  } else if (_e.code === AuthErrorCodes.INVALID_EMAIL) {
    message.value = 'Email không hợp lệ'
  } else {
    message.value = 'Đăng nhập thất bại'
  }
}

/**
 * Lưu token vào cookie
 * Gi token vào store vad redirect đến trang chủ
 */
const login = async () => {
  try {
    await signInWithEmailAndPassword(getAuth(), email.value, password.value)
    message.value = 'Đăng nhập thành công'
  } catch (e) {
    Errorextracted(e as FirebaseError)
    //
  }
}

const register = async () => {
  try {
    const data = await createUserWithEmailAndPassword(
      getAuth(),
      email.value,
      password.value
    )

    const db = getDatabase()
    await dbSet(dbRef(db, 'users/' + data.user.uid), {
      name: name,
      email: email
    })
    message.value = 'Đăng ký thành công'
  } catch (e) {
    Errorextracted(e as FirebaseError)
    //
  }
}

const googleSignIn = () => signInWithPopup(getAuth(), new GoogleAuthProvider())

const modal = ref()
watch(
  () => app.auth,
  (val) => val && modal.value?.dispose()
)

const { $anime } = useNuxtApp()
const errorRef = ref()
watch(message, (val) => {
  if (val) {
    nextTick(() => {
      $anime({
        targets: errorRef.value,
        opacity: [0, 1],
        translateY: [30, 0]
      })
      setTimeout(() => {
        $anime({
          targets: errorRef.value,
          opacity: [1, 0],
          translateY: [0, 30],
          complete: () => {
            message.value = ''
          }
        })
      }, 4000)
    })
  }
})
</script>

<style scoped></style>
