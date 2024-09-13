<template>
  <div v-if="solution">
    <div class="d-flex justify-content-end mb-3">
      <b-button class="mr-2" variant="primary" @click="openAddAutoridadModalHandler">
        <b-icon icon="plus"></b-icon>
        <span>{{ $t('entity.action.add') }}</span>
      </b-button>
    </div>
    <b-table :items="solution.autoridades" :fields="fields" show-empty :busy="busy" head-variant="dark">
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>{{ $t('entity.action.loading') }}</strong>
        </div>
      </template>
      <template #empty="">
        <div class="h4 text-center">{{ $t('entity.info.no-data') }}</div>
      </template>
      <template #cell(roles)="row">
        <b-badge pill class="m-1" v-for="(rol, index) in row.item.roles" :key="index" variant="primary">
          {{ $t('apeironGwApp.RolAutoridad.' + rol) }}
        </b-badge>
      </template>
      <template #cell(acciones)="row">
        <core-button type="edit" size="sm" @click="prepareToRemoveHandler(row.item)" class="mr-2"></core-button>
        <core-button type="delete" size="sm" @click="prepareToRemoveHandler(row.item)"></core-button>
      </template>
    </b-table>

    <core-confirmation-modal ref="addAuthorityModal" noquestion :disabled="!isAuthorityCorrect" @confirmed="addUserHandler">
      <div v-if="autorityToEdit">
        <b-form-group v-if="autorityToEdit" class="text-center" id="componente-add-autoridad" size="sm">
          <b-input-group class="mt-3">
            <b-form-input
              :disabled="isFetching"
              v-model.trim="loginToFind"
              :placeholder="$t('archeApp.solucion.seccion.autoridad.searchPlaceholder')"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="isFetching || !loginToFind" @click="findAuthorityHandler" variant="primary">
                <b-icon v-if="isFetching" icon="arrow-clockwise" animation="spin"></b-icon>
                <span v-else v-text="$t('entity.action.search')"></span>
              </b-button>
            </b-input-group-append>
          </b-input-group>
          <b-alert class="mt-3" variant="warning" :show="userNotFound"
            >{{ $t('entity.info.not-found') }} <strong>{{ loginToFind }}</strong></b-alert
          >
          <b-alert class="mt-3" variant="warning" :show="userAlreadyInList">
            <p v-html="$t('register.messages.error.userexists')"></p>
            <strong>{{ autorityToEdit.login }}</strong></b-alert
          >
        </b-form-group>
        <b-card v-if="autorityToEdit.usuarioId" class="pr-3 shadow rounded border-dark">
          <div class="row">
            <div class="col-2 text-left">
              <strong>{{ $t('global.field.id') }}</strong>
            </div>
            <div class="col text-left">{{ autorityToEdit.usuarioId }}</div>
          </div>
          <div class="row">
            <div class="col-2 text-left">
              <strong>{{ $t('userManagement.firstName') }}</strong>
            </div>
            <div class="col text-left">{{ (autorityToEdit.nombre ?? '') + ' ' + (autorityToEdit.apellidoPaterno ?? '') }}</div>
          </div>
          <div class="row">
            <div class="col-2 text-left">
              <strong>{{ $t('userManagement.login') }}</strong>
            </div>
            <div class="col text-left">{{ autorityToEdit.login }}</div>
          </div>
        </b-card>
        <b-card v-if="autorityToEdit.usuarioId" class="mt-3 shadow rounded border-dark">
          <b-form-group id="componente-add-roles" size="sm" label="Roles" label-for="add-roles" class="text-left">
            <b-form-checkbox-group id="add-roles" v-model="autorityToEdit.roles" :options="authorityOptions"></b-form-checkbox-group>
          </b-form-group>
        </b-card>
      </div>
    </core-confirmation-modal>
  </div>
</template>

<script lang="ts" src="./access-control.component.ts"></script>
