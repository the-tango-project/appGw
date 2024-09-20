<template>
  <div class="container">
    <h2 v-if="formsCards && formsCards.length > 0" id="page-heading" data-cy="FormHeading">
      <span v-text="$t('form.home.title')" id="form-heading"></span>
      <div class="d-flex justify-content-end">
        <router-link :to="{ name: 'FormCreate' }" custom v-slot="{ navigate }">
          <b-skeleton v-if="isFetching" type="button"></b-skeleton>
          <button
            v-else
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-form"
          >
            <span v-text="$t('form.home.createLabel')"></span>
            <font-awesome-icon icon="plus"></font-awesome-icon>
          </button>
        </router-link>
      </div>
    </h2>
    <core-card-list :items="formsCards" :show="!isFetching"></core-card-list>
    <span ref="infiniteScrollEl"></span>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="apeironGwApp.form.delete.question" data-cy="formDeleteDialogHeading" v-text="$t('entity.delete.title')"></span
      ></span>
      <div class="modal-body">
        <p id="jhi-delete-form-heading" v-text="$t('form.delete.question', { id: removeId })"></p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()"></button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-form"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeForm()"
        ></button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./form.component.ts"></script>
