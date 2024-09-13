<template>
  <b-modal
    ref="confirmationModal"
    id="confirmationModal"
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
    <div v-if="!noquestion" class="mb-5 text-center">
      <h3 v-text="question"></h3>
    </div>
    <div class="text-center">
      <slot></slot>
    </div>
    <b-form-checkbox v-if="check" v-model="accept" name="terminos-condiciones" size="lg" class="text-center">
      {{ checkMessage }}
    </b-form-checkbox>

    <div v-if="addComentario" class="m-5">
      <b-form-textarea
        id="add-comentario"
        v-model="comentario"
        :placeholder="$t('global.messages.info.add-text')"
        rows="5"
      ></b-form-textarea>
    </div>

    <template #modal-footer>
      <b-button variant="outline-danger" @click="cancelHandler()">{{ $t('entity.action.cancel') }}</b-button>
      <b-button :disabled="isDisabled" variant="primary" @click="confirmationHandler()">{{ $t('entity.action.confirm') }}</b-button>
    </template>
  </b-modal>
</template>

<script lang="ts" src="./confirmation-modal.component.ts"></script>
