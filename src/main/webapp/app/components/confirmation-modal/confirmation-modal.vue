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
    <div class="text-center">
      <p v-html="question"></p>
    </div>
    <slot></slot>
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
