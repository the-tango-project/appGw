<template>
  <b-modal
    ref="baseModal"
    :scrollable="scrollable"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
    :centered="centered"
    :header-bg-variant="variant"
    :header-text-variant="textVariant()"
    footer-border-variant="light"
    header-border-variant="light"
    :size="size"
    :title="title"
  >
    <div>
      <slot></slot>
    </div>

    <template #modal-footer>
      <b-button v-if="isBtnVisible('cancel')" variant="outline-danger" @click="cancelHandler()">{{ $t('entity.action.cancel') }}</b-button>
      <b-button v-if="isBtnVisible('close')" variant="outline-primary" @click="confirmationHandler()">{{
        $t('entity.action.close')
      }}</b-button>
      <b-button v-if="isBtnVisible('confirm')" :disabled="isDisabled" variant="primary" @click="confirmationHandler()">{{
        $t('entity.action.confirm')
      }}</b-button>
    </template>
  </b-modal>
</template>

<script lang="ts" src="./base-modal.component.ts"></script>
