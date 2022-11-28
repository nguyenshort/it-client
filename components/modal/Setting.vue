<template>
  <lazy-modal-base event="setting" title="Cài Đặt" :max-width="450">
    <div>
      <h4 class="font-semibold mb-1">
        {{ $t('setting.language') }}
      </h4>

      <div class="flex items-center text-[30px] mt-4">
        <div
            class="cursor-pointer transition duration-300 ease-in-out"
            :class="{
              'opacity-40': $i18n.locale !== 'jp'
            }"
            @click="$i18n.locale = 'jp'"
        >
          <Icon name="twemoji:flag-for-flag-japan" />
        </div>

        <div
            class="cursor-pointer transition duration-300 ease-in-out ml-5"
            :class="{
              'opacity-40': $i18n.locale !== 'en'
            }"
            @click="$i18n.locale = 'en'"
        >
          <Icon name="twemoji:flag-for-flag-united-states" />
        </div>

      </div>

      <div class="text-gray-600 mt-3 text-[12px]">
        {{ $t('setting.current') }} : {{ $i18n.locale === 'jp' ? 'Japanese' : 'English' }}
      </div>

      <div class="text-gray-400 text-[12px]">
        {{ $t('setting.tab') }}
      </div>

    </div>
  </lazy-modal-base>
</template>

<script lang="ts" setup></script>

<style scoped></style>
